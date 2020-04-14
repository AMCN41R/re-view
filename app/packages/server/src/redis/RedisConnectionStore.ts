import { Storage } from '../utils/storage';

export class RedisConnectionStore {
  constructor() {
    const existing = Storage.loadConnections() || [];

    if (existing.length > 0) {
      this.connections = existing.reduce((obj, item) => ({
        ...obj,
        [item.name]: item
      }), {});
    }
  }

  private connections: Keyed<RedisConnectionOptions> = {};

  get(name: string): RedisConnectionOptions | null {
    return this.connections[name] || null;
  }

  getAll(): Keyed<RedisConnectionOptions> {
    return this.connections
  }

  add(opts: RedisConnectionOptions): void {
    const existing = this.connections[opts.name];

    if (existing) {
      throw new Error("");
    }

    this.connections[opts.name] = opts;
    Storage.saveConnection(opts);
  }

  update(opts: RedisConnectionOptions): void {
    this.connections[opts.name] = opts;
  }
}
