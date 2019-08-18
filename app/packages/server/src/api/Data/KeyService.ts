import RedisFactory from '../../redis/RedisClientCache';
import { Validate, checkIsValidString, checkIsValidDb } from '../Validators';

export namespace KeyService {

  export const getKeys = async (
    clientName: string,
    db: number | string,
    query: DbKeysRequest
  ): Promise<DbFlatKeySearchResult> => {
    checkIsValidString(clientName);
    Validate.dbKeysRequest(query);

    const redis = await RedisFactory.getClientOrThrow(clientName, db);

    const filter = query.filter || '*';

    await redis.client.select(db);
    if (query.pageSize === 0) {
      const keys = await redis.client.keys(filter);
      return {
        keys,
        cursor: '0'
      };
    }

    const pageSize = query.pageSize || 1000;

    const result = await redis.client.scan('0', 'MATCH', filter, 'COUNT', `${pageSize}`);

    return {
      cursor: result[0],
      keys: result[1]
    };
  };

  export const deleteKey = async (clientName: string, db: number | string, key: string): Promise<void> => {
    checkIsValidString(clientName);
    checkIsValidDb(db);
    checkIsValidString(key);

    const redis = await RedisFactory.getClientOrThrow(clientName, db);

    await redis.client.del(key);
  };

}
