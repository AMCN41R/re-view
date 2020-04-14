import { container } from '../../utils/container';

import { parseInfo } from '../../redis/RedisUtils';

import { Validate, checkIsValidString } from '../Validators';

export namespace ConnectionsService {

  export const getConnections = (): Keyed<RedisConnectionOptions> => {
    return container().redisFactory.getConnections();
  }

  export const createClient = async (opts: RedisConnectionOptions): Promise<CreateRedisClientResult> => {
    Validate.redisConnectionInfo(opts);
    return await container().redisFactory.createConnection(opts);
  };

  export const getDbInfo = async (clientName: string): Promise<ClientDatabaseResult> => {
    checkIsValidString(clientName);

    const redis = await container().redisFactory.getClientOrCreate(clientName);

    const count = Number((await redis.config(['GET', 'DATABASES']) as string[])[1]);
    const dbs = Array.from({ length: count }, (_, i) => i);

    const infoStr = await redis.info('ALL');
    const info = parseInfo(infoStr);

    const dbData = dbs.map(x => ({
      db: x,
      keys: info.keys[x] || 0
    }));

    return {
      name: clientName,
      dbs: dbData
    };
  };

  export const getServerInfo = async (clientName: string): Promise<RedisInfo> => {
    checkIsValidString(clientName);

    const redis = await container().redisFactory.getClientOrCreate(clientName);

    const infoStr = await redis.info('ALL');

    var info = parseInfo(infoStr);

    return info;
  }

}
