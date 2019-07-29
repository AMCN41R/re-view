import { FetchBase as api, FetchResponse } from './FetchBase';

export namespace RedisApi {
  export const getConnectionNames = async (): Promise<FetchResponse<RedisClientInfo[]>> => {
    const response = await api.get<RedisClientInfo[]>('redis/connections');
    return response;
  };

  export const createConnection = async (opts: RedisClientInfo): Promise<FetchResponse<CreateRedisClientResult>> => {
    const response = await api.post<CreateRedisClientResult>('redis/create', opts);
    return response;
  };

  export const getDatabases = async (clientName: string): Promise<FetchResponse<ClientDatabseResult>> => {
    const response = await api.get<ClientDatabseResult>(`redis/${clientName}/databases`);
    return response;
  };

  export const getKeys = async (
    clientName: string,
    db: string,
    query: DbKeysRequest
  ): Promise<FetchResponse<DbKeySearchResult>> => {
    const response = await api.post<DbKeySearchResult>(`redis/${clientName}/${db}/keys`, query);
    return response;
  };

  export const getValue = async (
    clientName: string,
    db: string,
    key: string
  ): Promise<FetchResponse<{ value: string }>> => {
    const response = await api.get<{ value: string }>(`redis/${clientName}/${db}/keys/${key}`);
    return response;
  };
}
