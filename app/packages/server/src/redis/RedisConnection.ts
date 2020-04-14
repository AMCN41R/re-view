import * as redis from 'async-redis';

export class RedisConnection {
  constructor(private opts: RedisConnectionOptions) {
    this.client = redis.createClient(this.opts.port, this.opts.host, {
      retry_strategy: retryStrategy,
      password: this.opts.password || null,
      tls: this.opts.useSsl ? { servername: this.opts.host } : null
    });

    this.connect();
  }

  public client: redis.RedisClient;

  async isConnected(): Promise<boolean> {
    if (!this.client) {
      return false;
    }

    const ping = await this.client.ping();

    return ping === 'PONG';
  }

  async close(): Promise<void> {
    if (!this.client) {
      return;
    }

    await this.client.quit();
  }

  private async connect(): Promise<void> {
    this.client.on('ready', () => {
      console.log('Redis Client Ready');
      return;
    });

    this.client.on('error', (err) => {
      console.error(`Redis Client Error: ${err}`);
      return;
    });

    this.client.on('end', () => {
      console.warn('Redis Client Connection Ended.');
      return;
    });
  }
}

// export const createRedisDbAsync = async (opts: RedisConnectionOptions): Promise<redis.RedisClient> => {
//   return new Promise(
//     (
//       resolve: (client: redis.RedisClient) => void,
//       reject: (reason?: any) => void
//     ) => {
//       const client = redis.createClient(opts.port, opts.host, {
//         retry_strategy: retryStrategy,
//         password: opts.password || null,
//         tls: opts.useSsl ? { servername: opts.host } : null
//       });

//       client.on('ready', () => {
//         console.log('Redis Client Ready');
//         resolve(client);
//         return;
//       });

//       client.on('error', (err) => {
//         console.error(`Redis Client Error: ${err}`);
//         reject(err);
//         return;
//       });

//       client.on('end', () => {
//         console.warn('Redis Client Connection Ended.');
//         reject('Redis Client Connection Ended.');
//         return;
//       });
//     });
// };

const retryStrategy = (options: redis.RedisRetryStrategyOptions): number | Error | undefined => {
  if (options.error) {
    // End reconnecting on a specific error and flush all commands with a individual error
    if (options.error.code === 'ECONNREFUSED') {
      return new Error('The server refused the connection.');
    }

    if (options.error.code === 'ENOTFOUND') {
      // return new Error('The server could not be found.');
      return undefined;
    }
  }

  // End reconnecting
  return new Error('Failed to connect to server.');
};
