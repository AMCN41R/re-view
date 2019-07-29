import RedisFactory from '../../redis/RedisClientCache';
import { Validate, checkIsValidString } from '../Validators';

export namespace ManagementService {

  export const getActiveClients = (): RedisClientInfo[] => {
    const clients = RedisFactory.getAllClients() || [];

    return clients.map(x => ({
      name: x.name,
      host: x.host,
      port: x.port
    }));
  };

  export const createClient = async (opts: RedisClientInfo): Promise<CreateRedisClientResult> => {
    Validate.redisConnectionInfo(opts);
    return await RedisFactory.createClient(opts);
  };

  export const getDatabases = async (clientName: string): Promise<ClientDatabseResult> => {
    checkIsValidString(clientName);

    const redis = await RedisFactory.getClientOrThrow(clientName);

    const count = Number((await redis.client.config(['GET', 'DATABASES']) as string[])[1]);
    const dbs = Array.from({ length: count }, (_, i) => i);

    return {
      dbs,
      name: clientName
    };
  };

}
