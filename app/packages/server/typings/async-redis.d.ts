declare module 'async-redis' {

  function createClient(): RedisClient;
  function createClient(port: number, host: string): RedisClient;
  function createClient(port: number, host: string, options: RedisCreateClientOptions): RedisClient;

  interface RedisRetryStrategyOptions {
    attempt: number;
    total_retry_time: number;
    error: any;
    times_connected: number;
  }

  interface RedisCreateClientOptions {
    // A function that receives an options object as parameter including the retry attempt,
    // the total_retry_time indicating how much time passed since the last time connected,
    // the error why the connection was lost and the number of times_connected in total.
    // If you return a number from this function, the retry will happen exactly after that
    // time in milliseconds. If you return a non-number, no further retry will happen and
    // all offline commands are flushed with errors. Return an error to return that specific
    // error to all offline commands.
    // Example:
    //   var client = redis.createClient({
    //     retry_strategy: function (options) {
    //         if (options.error && options.error.code === 'ECONNREFUSED') {
    //             // End reconnecting on a specific error and flush all commands with
    //             // a individual error
    //             return new Error('The server refused the connection');
    //         }
    //         if (options.total_retry_time > 1000 * 60 * 60) {
    //             // End reconnecting after a specific timeout and flush all commands
    //             // with a individual error
    //             return new Error('Retry time exhausted');
    //         }
    //         if (options.attempt > 10) {
    //             // End reconnecting with built in error
    //             return undefined;
    //         }
    //         // reconnect after
    //         return Math.min(options.attempt * 100, 3000);
    //     }
    // });
    retry_strategy: (opts: RedisRetryStrategyOptions) => number | Error | undefined;
  }

  interface RedisClient {
    config: OverloadedCommand<string, any>;

    get(key: string): Promise<string>;

    keys(pattern: string): Promise<string[]>;

    on(event: string, listener: (...args: any[]) => void): this;

    select(index: number | string): Promise<void>

    set(key: string, value: string): Promise<'OK'>;

    scan: OverloadedCommand<string, [string, string[]]>;

    end(flush?: boolean): void;

    on(event: 'ready' | 'connect' | 'reconnecting' | 'error' | 'warning' | 'end', listener: (...args: any[]) => void): this;
  }

  interface OverloadedCommand<T, U> {
    (arg1: T, arg2: T, arg3: T, arg4: T, arg5: T, arg6: T): Promise<U>;
    (arg1: T, arg2: T, arg3: T, arg4: T, arg5: T): Promise<U>;
    (arg1: T, arg2: T, arg3: T, arg4: T): Promise<U>;
    (arg1: T, arg2: T, arg3: T): Promise<U>;
    (arg1: T, arg2: T | T[]): Promise<U>;
    (arg1: T | T[]): Promise<U>;
  }
}
