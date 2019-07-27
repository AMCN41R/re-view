import { createRedisDbAsync, RedisDb, RedisConnectionOptions } from './RedisDb';

type CreateRedisDbResult = {
  status: 'created' | 'cached' | 'failed';
  error?: Error;
};

type RedisDbInfo = {
  db: RedisDb;
  name: string;
  host: string;
  port: number;
};

type DbCache = {
  [key: string]: RedisDbInfo;
};

const cache: DbCache = {};

const redisDbFactory = {

  getAllClients: (): RedisDbInfo[] => {
    const clients: RedisDbInfo[] = [];
    for (const key in cache) {
      clients.push(cache[key]);
    }
    return clients;
  },

  getClient: (name: string): RedisDbInfo => {
    return cache[name] || null;
  },

  createClient: async (opts: RedisConnectionOptions): Promise<CreateRedisDbResult> => {
    const existing = cache[opts.name];

    if (existing) {
      return {
        status: 'cached',
      };
    }

    try {
      const client = await createRedisDbAsync(opts);
      const db = new RedisDb(client);

      cache[opts.name] = {
        db,
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

Object.freeze(redisDbFactory);

export default redisDbFactory;

export { RedisConnectionOptions, CreateRedisDbResult };
