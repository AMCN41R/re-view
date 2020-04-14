import { container } from '../../../utils/container';

import {
  checkIsValidString,
  checkIsValidDb
} from '../../Validators';

export namespace HashSets {

  export const getHashSet = async (
    clientName: string,
    db: number | string,
    key: string
  ): Promise<Keyed<string> | false | null> => {
    checkIsValidString(clientName);
    checkIsValidDb(db);
    checkIsValidString(key);

    const redis = await container().redisFactory.getClientOrCreate(clientName, db);

    const type = await redis.type(key);

    switch (type) {
      case 'hash':
        return await redis.hgetall(key);

      case 'none':
        return null;

      default:
        return false;
    }
  };

  export const getHashField = async (
    clientName: string,
    db: number | string,
    key: string,
    field: string
  ): Promise<string | false | null> => {
    checkIsValidString(clientName);
    checkIsValidDb(db);
    checkIsValidString(key);

    const redis = await container().redisFactory.getClientOrCreate(clientName, db);

    const type = await redis.type(key);

    switch (type) {
      case 'hash':
        return await redis.hget(key, field);

      case 'none':
        return null;

      default:
        return false;
    }
  };

}
