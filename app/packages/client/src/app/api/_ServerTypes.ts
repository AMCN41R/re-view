type Keyed<T> = { [key: string]: T };

type RedisConnectionOptions = {
  name: string;
  host: string;
  port: number;
  password?: string;
  useSsl?: boolean;
  sslPort?: number;
  namespaceSeparator?: string;
};

type CreateRedisClientResult = {
  status: 'created' | 'cached' | 'failed';
  error?: Error;
};

type DbInfo = {
  db: number;
  keys: number;
};

type ClientDatabaseResult = {
  name: string;
  dbs: DbInfo[];
};

type DbKeysRequest = {
  filter?: string;
  pageSize?: number;
};

type TreeItem = {
  name: string;
  path: string;
  children?: TreeItem[];
};

type DbFlatKeySearchResult = {
  cursor: string;
  keys: string[];
};

type DbKeySearchResult = {
  cursor: string;
  items: TreeItem[];
};

type RedisInfo = {
  server: string[];
  keys: {
    [key: number]: number
  }
}
