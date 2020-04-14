import { ValidationError } from '../errors/ValidationError';

export namespace Validate {
  export const redisConnectionInfo = (value: RedisConnectionOptions): void => {
    checkNotNullOrUndefined(value);
    checkIsValidString(value.name);
    checkIsValidString(value.host);
    checkIsPositive(value.port);
  };

  export const dbKeysRequest = (value: DbKeysRequest): void => {
    checkNotNullOrUndefined(value);

    if (value.pageSize) {
      checkIsPositive(value.pageSize);
    }
  };
}

export const checkNotNullOrUndefined = (value: any): void => {
  if (value === null || typeof value === 'undefined') {
    throw new ValidationError('Value must be supplied');
  }
};

export const checkIsValidString = (value: string): void => {
  if (value === null
    || typeof value === 'undefined'
    || value.trim() === ''
  ) {
    throw new ValidationError('Value must be supplied');
  }
};

export const checkIsPositive = (value: number): void => {
  if (value < 0) {
    throw new ValidationError('Value must be greater than zero');
  }
};

export const checkIsValidDb = (value: string | number): void => {
  if (typeof value === 'number') {
    checkIsPositive(value);
  } else {
    checkIsPositive(Number(value as string));
  }
};
