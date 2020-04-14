import { RedisValueType } from 'async-redis';

import { container } from '../../../utils/container';

import {
  Validate,
  checkIsValidString,
  checkIsValidDb
} from '../../Validators';

export namespace Keys {

  export const getType = async (
    clientName: string,
    db: number | string,
    key: string
  ): Promise<RedisValueType> => {
    checkIsValidString(clientName);
    checkIsValidDb(db);
    checkIsValidString(key);

    const redis = await container().redisFactory.getClientOrCreate(clientName, db);

    const type = await redis.type(key);

    return type;
  }

  export const getKeys = async (
    clientName: string,
    db: number | string,
    query: DbKeysRequest
  ): Promise<DbFlatKeySearchResult> => {
    checkIsValidString(clientName);
    Validate.dbKeysRequest(query);

    const redis = await container().redisFactory.getClientOrCreate(clientName, db);

    const filter = query.filter || '*';

    await redis.select(db);
    if (query.pageSize === 0) {
      const keys = await redis.keys(filter);
      return {
        keys,
        cursor: '0'
      };
    }

    const pageSize = query.pageSize || 1000;

    const result = await redis.scan('0', 'MATCH', filter, 'COUNT', `${pageSize}`);

    return {
      cursor: result[0],
      keys: result[1]
    };
  };

  export const renameKey = async (clientName: string, db: number | string, key: string, newKey: string, overwrite?: boolean): Promise<boolean> => {
    checkIsValidString(clientName);
    checkIsValidDb(db);
    checkIsValidString(key);
    checkIsValidString(newKey);

    const redis = await container().redisFactory.getClientOrCreate(clientName, db);

    if (overwrite) {
      await redis.rename(key, newKey);
      return true;
    }

    const result = await redis.renamenx(key, newKey);

    return result === 1;
  }

  export const deleteKey = async (clientName: string, db: number | string, key: string): Promise<void> => {
    checkIsValidString(clientName);
    checkIsValidDb(db);
    checkIsValidString(key);

    const redis = await container().redisFactory.getClientOrCreate(clientName, db);

    await redis.del(key);
  };

}
