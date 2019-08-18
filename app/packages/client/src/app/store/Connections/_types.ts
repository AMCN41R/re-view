type NewConnectionStatus = 'none' | 'requesting' | 'created' | 'failed';

interface IConnectionsState {
  requestingConnections: boolean;
  connections: IRedisConnection[];
  newConnection: {
    state: NewConnectionStatus;
  };
}

interface IRedisConnection {
  name: string;
  host: string;
  port: number;
  password?: string;
  useSsl?: boolean;
  isFavourite: boolean;
}
