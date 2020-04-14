import { ConnectionsApi as api } from 'api/Redis/Connections';

let connectionsCache: Keyed<RedisConnectionOptions> = {};

let dbInfoCache: {
  [key: string]: DbInfo[];
} = {};

export namespace ConnectionsService {

  export const getConnections = async (): Promise<RedisConnectionOptions[]> => {
    const connections = await api.getConnections();

    if (connections.ok) {
      connectionsCache = connections.data;
    }

    return Object.keys(connectionsCache).map(x => connectionsCache[x]);
  }

  export const getDbInfo = async (name: string): Promise<DbInfo[]> => {
    const info = await api.getDatabaseInfo(name);

    if (info.ok) {
      dbInfoCache[name] = info.data.dbs;
    }

    return dbInfoCache[name];
  }
}
