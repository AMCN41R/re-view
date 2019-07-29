import RedisFactory from '../../redis/RedisClientCache';
import {
  checkIsValidString,
  checkIsValidDb
} from '../Validators';

export namespace ValueService {

  export const getValue = async (clientName: string, db: number | string, key: string): Promise<string> => {
    checkIsValidString(clientName);
    checkIsValidDb(db);
    checkIsValidString(key);

    const redis = await RedisFactory.getClientOrThrow(clientName, db);

    const value = await redis.client.get(key);

    return value;
  };

}
