import { FetchBase as api, FetchResponse } from '../FetchBase';

export namespace ConnectionsApi {
  const base = '/api/redis/con';

  export const getConnections = async (): Promise<FetchResponse<Keyed<RedisConnectionOptions>>> => {
    const response = await api.get<Keyed<RedisConnectionOptions>>(
      `${base}/all`);

    return response;
  };

  export const createConnection = async (options: RedisConnectionOptions): Promise<FetchResponse<CreateRedisClientResult>> => {
    const response = await api.post<CreateRedisClientResult>(
      `${base}/create`,
      options);

    return response;
  }

  export const getDatabaseInfo = async (connectionName: string): Promise<FetchResponse<ClientDatabaseResult>> => {
    const response = await api.get<ClientDatabaseResult>(
      `${base}/${connectionName}/databases`
    );

    return response;
  }
}
