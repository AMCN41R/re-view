import * as redis from 'async-redis';
// import * as r from 'redis';

export const createRedisDbAsync = async (opts: RedisClientInfo): Promise<redis.RedisClient> => {
  return new Promise(
    // tslint:disable-next-line: typedef
    (
      resolve: (client: redis.RedisClient) => void,
      reject: (reason?: any) => void
    ) => {
      const client = redis.createClient(opts.port, opts.host, {
        retry_strategy: retryStrategy
      });

      client.on('ready', () => {
        console.log('Redis Client Ready');
        resolve(client);
        return;
      });

      client.on('error', (err) => {
        console.log(`Redis Client Error: ${err}`);
        reject(err);
        return;
      });

      client.on('end', () => {
        console.log('Redis Client Connection Ended.');
        reject('Redis Client Connection Ended.');
        return;
      });
    });
};

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
