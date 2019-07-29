import * as redis from 'async-redis';
import { createRedisDbAsync } from './RedisClientFactory';
import { ValidationError } from '..//errors/ValidationError';

type RedisDbInfo = RedisClientInfo & {
  client: redis.RedisClient;
};

type DbCache = {
  [clientName: string]: RedisDbInfo;
};

const cache: DbCache = {};

const redisClientCache = {

  getAllClients: (): RedisDbInfo[] => {
    const clients: RedisDbInfo[] = [];
    for (const key in cache) {
      clients.push(cache[key]);
    }
    return clients;
  },

  getClient: async (name: string, db?: number | string): Promise<RedisDbInfo> => {
    const client = cache[name] || null;

    if (client && db) {
      await client.client.select(db);
    }

    return client;
  },

  getClientOrThrow: async (name: string, db?: number | string): Promise<RedisDbInfo> => {
    const client = cache[name];

    if (!client) {
      throw new ValidationError('Client does not exist.');
    }

    if (db) {
      await client.client.select(db);
    }

    return client;
  },

  createClient: async (opts: RedisClientInfo): Promise<CreateRedisClientResult> => {
    const existing = cache[opts.name];

    if (existing) {
      return {
        status: 'cached',
      };
    }

    try {
      const client = await createRedisDbAsync(opts);

      cache[opts.name] = {
        client,
        name: opts.name,
        host: opts.host,
        port: opts.port
      };

      return {
        status: 'created'
      };

    } catch (error) {
      return {
        error,
        status: 'failed'
      };
    }
  }
};

Object.freeze(redisClientCache);

export default redisClientCache;
