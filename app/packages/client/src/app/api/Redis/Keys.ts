import { FetchBase as api, FetchResponse } from '../FetchBase';

export namespace KeysApi {
  const base = '/api/redis/keys';

  export const getKeys = async (
    connectionName: string,
    db: string,
    filter?: string,
    pageSize?: number
  ): Promise<FetchResponse<DbKeySearchResult>> => {
    const response = await api.post<DbKeySearchResult>(
      `${base}/${connectionName}/${db}/search`,
      {
        filter,
        pageSize
      }
    );

    return response;
  }

  export const getKeyType = async (
    connectionName: string,
    db: string,
    key: string
  ): Promise<FetchResponse<{ value: string }>> => {
    const response = await api.get<{ value: string }>(
      `${base}/${connectionName}/${db}/type/${key}`
    );

    return response;
  }

  export const getStringValue = async (
    connectionName: string,
    db: string,
    key: string
  ): Promise<FetchResponse<{ value: string }>> => {
    const response = await api.get<{ value: string }>(
      `${base}/${connectionName}/${db}/string/${key}`
    );

    return response;
  }

  export const getHashSetField = async (
    connectionName: string,
    db: string,
    key: string,
    field: string
  ): Promise<FetchResponse<{ value: string }>> => {
    const response = await api.get<{ value: string }>(
      `${base}/${connectionName}/${db}/hash/${key}/${field}`
    );

    return response;
  }

  export const renameKey = async (
    connectionName: string,
    db: string,
    key: string,
    newName: string,
    force?: boolean
  ): Promise<FetchResponse<{ success: boolean }>> => {
    const response = await api.post<{ success: boolean }>(
      `${base}/${connectionName}/${db}/rename/${key}`,
      {
        newName,
        force: force || false
      }
    );

    return response;
  }

  export const deleteKey = async (
    connectionName: string,
    db: string,
    key: string
  ): Promise<boolean> => {
    const response = await api.del(
      `${base}/${connectionName}/${db}/delete/${key}`
    );

    return response;
  }

}
