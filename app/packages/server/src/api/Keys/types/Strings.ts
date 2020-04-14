import { container } from '../../../utils/container';

import {
  checkIsValidString,
  checkIsValidDb
} from '../../Validators';

export namespace StringValues {

  export const getValue = async (clientName: string, db: number | string, key: string): Promise<string | false | null> => {
    checkIsValidString(clientName);
    checkIsValidDb(db);
    checkIsValidString(key);

    const redis = await container().redisFactory.getClientOrCreate(clientName, db);

    const type = await redis.type(key);

    switch (type) {
      case 'string':
        return await redis.get(key);

      case 'none':
        return null;

      default:
        return false;
    }
  };

}
