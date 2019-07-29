type RedisClientInfo = {
  name: string;
  host: string;
  port: number;
};

type CreateRedisClientResult = {
  status: 'created' | 'cached' | 'failed';
  error?: Error;
};

type ClientDatabseResult = {
  name: string;
  dbs: number[];
};

type DbKeysRequest = {
  filter?: string;
  pageSize?: number;
};

type DbKeySearchResult = {
  cursor: string;
  keys: string[];
};
