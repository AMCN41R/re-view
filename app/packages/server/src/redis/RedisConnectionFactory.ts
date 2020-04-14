import { RedisConnection } from './RedisConnection';
import { RedisConnectionStore } from './RedisConnectionStore';
import { ValidationError } from '../errors/ValidationError';
import { RedisClient } from 'async-redis';

export class RedisConnectionFactory {
  constructor(
    private store: RedisConnectionStore
  ) { }

  private cache: Keyed<RedisConnection> = {};

  getConnections(): Keyed<RedisConnectionOptions> {
    return this.store.getAll();
  }

  async getClient(name: string, db?: number | string): Promise<RedisClient | null> {
    const connection = this.cache[name] || null;

    if (connection && db) {
      await connection.client.select(db);
    }

    return connection.client;
  }

  async getClientOrThrow(name: string, db?: number | string): Promise<RedisClient> {
    const connection = this.cache[name];

    if (!connection) {
      throw new ValidationError('Client does not exist.');
    }

    if (connection && db) {
      await connection.client.select(db);
    }

    return connection.client;
  }

  async getClientOrCreate(name: string, db?: number | string): Promise<RedisClient> {
    let connection = this.cache[name];

    if (!connection) {
      const opts = this.store.get(name);
      if (!opts) {
        throw new ValidationError('Client options not found.');
      }

      await this.createConnection(opts);
      connection = this.cache[name]
    }

    if (connection && db) {
      await connection.client.select(db);
    }

    return connection.client;
  }

  async createConnection(opts: RedisConnectionOptions): Promise<CreateRedisClientResult> {
    const existing = this.cache[opts.name];

    if (existing) {
      return {
        status: 'cached',
      };
    }

    try {
      const connection = new RedisConnection(opts);

      this.cache[opts.name] = connection;

      this.store.add(opts);

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
}
