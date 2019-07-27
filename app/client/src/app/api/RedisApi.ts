import { FetchBase as api, FetchResponse } from './FetchBase';

export type CreateConnectionResponse = {
  status: 'created' | 'cached' | 'failed';
  error?: any;
};

export namespace RedisApi {
  export const createConnection = async (opts: IRedisConnection): Promise<FetchResponse<CreateConnectionResponse>> => {
    const response = await api.post<CreateConnectionResponse>('redis/create', opts);
    return response;
  };

  export const getConnectionNames = async (): Promise<FetchResponse<IRedisConnection[]>> => {
    const response = await api.get<IRedisConnection[]>('redis/connections');
    return response;
  };
}
