import { KeysApi as keys } from 'api/Redis/Keys';

// export namespace KeysService {

//   export const search = async (
//     connectionName: string,
//     db: string,
//     pageSize?: number,
//     filter?: string
//   ): Promise<DbKeySearchResult> => {
//     const result = await keys.getKeys(
//       connectionName,
//       db,
//       filter,
//       pageSize
//     );

//     if (!result.ok) {
//       return {
//         cursor: null,
//         items: []
//       }
//     }

//     return result.data;
//   }

//   export const getType = async (key: string): string => {
//     const result = await keys.getKeyType()
//   }
// }

export class KeysService {
  constructor(
    private connectionName: string,
    private db: string
  ) { }

  async search(
    pageSize?: number,
    filter?: string
  ): Promise<DbKeySearchResult> {
    const result = await keys.getKeys(
      this.connectionName,
      this.db,
      filter,
      pageSize
    );

    if (!result.ok) {
      return {
        cursor: null,
        items: []
      }
    }

    return result.data;
  }

  async getValue(key: string): Promise<KeyValue> {
    const result = await keys.getKeyType(
      this.connectionName,
      this.db,
      key
    );

    if (!result.ok) {
      return null;
    }

    if (result.data.value === 'string') {
      const value = await this.getStringValue(key);
      return {
        name: key,
        type: result.data.value,
        value: value
      };
    }

    // if (result.data.value === 'hash') {
    //   return {
    //     type: result.data.value,
    //     value: false
    //   };
    // }

    return {
      name: key,
      type: result.data.value,
      value: false
    };
  }

  async getStringValue(key: string): Promise<string> {
    const result = await keys.getStringValue(
      this.connectionName,
      this.db,
      key
    );

    if (!result.ok) {
      return null;
    }

    return result.data.value;
  }
}

export type KeyValue = {
  name: string;
  type: string;
  value: string | Keyed<string> | false
}
