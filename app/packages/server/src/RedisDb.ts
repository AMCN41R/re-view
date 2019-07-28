import * as redis from 'async-redis';

export type RedisConnectionOptions = {
  name: string;
  host: string;
  port: number;
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

export const createRedisDbAsync = async (opts: RedisConnectionOptions): Promise<redis.RedisClient> => {
  return new Promise((resolve, reject) => {
    const client = redis.createClient(opts.port, opts.host, {
      retry_strategy: retryStrategy
    });

    client.on('ready', () => {
      console.log('Redis Client Ready');
      resolve(client);
    });

    client.on('connect', () => {
      console.log('Redis Client Conected');
      resolve(client);
    });

    client.on('error', (err) => {
      console.log(`Redis Client Error ${err}`);
      reject(err);
    });

    client.on('end', (...args) => {
      console.log('Redis Client Connection Ended.');
      reject();
    });
  });
};

export class RedisDb {
  constructor(private client: redis.RedisClient) { }

  async databases(): Promise<number[]> {
    const count = Number((await this.client.config(['GET', 'DATABASES']) as string[])[1]);
    return Array.from({ length: count }, (_, i) => i);
  }

  async keys(db: string | number, filter: string = '*', pageSize: number = 1000): Promise<{ cursor: string, keys: string[] }> {
    await this.client.select(db);
    if (pageSize === 0) {
      const keys = await this.client.keys(filter);
      return {
        keys,
        cursor: '0'
      };
    }

    const result = await this.client.scan('0', 'MATCH', filter, 'COUNT', `${pageSize}`);
    return {
      cursor: result[0],
      keys: result[1]
    };
  }

  async get(db: string | number, key: string): Promise<string> {
    try {
      await this.client.select(db);
      return await this.client.get(key);

    } catch (error) {
      console.log(error);
    }
  }
}

// // create the client
// const client = redis.createClient();

// // client events
// client.on("connect", () => {
//   console.log("redis client connected");
// });

// client.on("error", err => {
//   console.warn("something went wrong...", err);
// });

// client.on("end", () => {
//   console.warn("redis cliend connection ended");
// });

// // the store
// const store = {

//   databases: async (): Promise<number[]> => {
//     const count = Number((await client.config(["GET", "DATABASES"]) as string[])[1]);
//     return Array.from({ length: count }, (_, i) => i);
//   },

//   keys: async (db: string | number, filter: string = '*', pageSize: number = 1000): Promise<{ cursor: string, keys: string[] }> => {
//     await client.select(db);
//     if (pageSize === 0) {
//       const keys = await client.keys(filter);
//       return {
//         keys,
//         cursor: "0"
//       };
//     }

//     const result = await client.scan("0", "MATCH", filter, "COUNT", `${pageSize}`);
//     return {
//       cursor: result[0],
//       keys: result[1]
//     };
//   },

//   get: async (db: string | number, key: string): Promise<string> => {
//     try {
//       await client.select(db);
//       return await client.get(key);

//     } catch (error) {
//       console.log(error)
//     }
//   },

//   // set: async (db: string | number, key: string, value: string): Promise<void> => {
//   //   await selectAsync(db);
//   //   await setAsync(key, value);
//   // }

// };

// Object.freeze(store);

// export default store;
