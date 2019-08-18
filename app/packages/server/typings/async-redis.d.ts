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

    /**
     * If set, client will run Redis auth command on connect. Alias: auth_pass, default: null.
     */
    password?: string | null;

    tls?: {
      servername: string
    } | null;
  }

  interface RedisCommands {
    /**
     * Get the value of key. If the key does not exist the special value nil is
     * returned. An error is returned if the value stored at key is not a string,
     * because GET only handles string values.
     *
     * @param  {string} key
     * @returns the value of key, or nil when key does not exist.
     */
    get(key: string): Promise<string>;

    /**
     * Set key to hold the string value. If key already holds a value, it is
     * overwritten, regardless of its type. Any previous time to live associated
     * with the key is discarded.
     *
     * @param  {string} key
     * @param  {string} value
     * @returns 'OK'
     */
    set(key: string, value: string): Promise<'OK'>;

    /**
     * Set key to hold the string value and set key to timeout after a given number of seconds.
     *
     * @param  {string} key
     * @param  {number} seconds
     * @param  {string} value
     * @returns 'OK'
     */
    setex(key: string, seconds: number, value: string): Promise<'OK'>;

    /**
     * Removes the specified keys. A key is ignored if it does not exist.
     *
     * @param  {string} key
     * @returns the number of keys that were deleted.
     */
    del(key: string): Promise<number>;

    /**
     * Determies if a key exists.
     *
     * @param  {string} key
     * @returns 1 if the key exists, otherwise 0.
     */
    exists(key: string): Promise<number>;

    /**
     * Set a timeout on key. After the timeout has expired, the key will
     * automatically be deleted.
     *
     * @param  {string} key
     * @param  {number} seconds
     * @returns 1 if the timeout was set, 0 if key does not exist.
     */
    expire(key: string, seconds: number): Promise<number>;

    /**
     * Remove the existing timeout on the given key.
     *
     * @param  {string} key
     * @returns 1 if the timeout was removed, 0 if key does not exist or does
     * not have an associated timeout.
     */
    persist(key: string): Promise<number>;

    /**
     * Returns the remaining time to live in seconds of a key that has a timeout.
     * This introspection capability allows a Redis client to check how many seconds
     * a given key will continue to be part of the dataset.
     *
     * @param  {string} key
     * @returns -2 if the key does not exist, -1 if the key exists but has no
     * associated expire, otherwise the ttl in seconds.
     */
    ttl(key: string): Promise<number>;
  }

  interface RedisClient extends RedisCommands {
    config: OverloadedCommand<string, any>;

    scan: OverloadedCommand<string, [string, string[]]>;

    keys(pattern: string): Promise<string[]>;

    select(index: number | string): Promise<void>

    on(event: 'ready' | 'connect' | 'reconnecting' | 'error' | 'warning' | 'end', listener: (...args: any[]) => void): this;

    auth(password: string): Promise<string>;
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
