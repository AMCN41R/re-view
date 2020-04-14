import { RedisConnectionStore } from "../redis/RedisConnectionStore";
import { RedisConnectionFactory } from "../redis/RedisConnectionFactory";

class IoC {
  private static instance: IoC;

  public static getInstance(): IoC {
    if (!IoC.instance) {
      IoC.instance = new IoC();
    }

    return IoC.instance;
  }

  private constructor() {
    this.store = new RedisConnectionStore();
    this.redisFactory = new RedisConnectionFactory(this.store);
  }

  public store: RedisConnectionStore;

  public redisFactory: RedisConnectionFactory;
}

export const container = (): IoC => IoC.getInstance();
