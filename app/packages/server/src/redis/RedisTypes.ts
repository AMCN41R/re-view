type RedisClientInfo = {
  name: string;
  host: string;
  port: number;
  password?: string;
  useSsl?: boolean;
};

type CreateRedisClientResult = {
  status: 'created' | 'cached' | 'failed';
  error?: Error;
};

type ClientDatabaseResult = {
  name: string;
  dbs: number[];
};

type DbKeysRequest = {
  filter?: string;
  pageSize?: number;
};

type TreeItem = {
  name: string;
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
