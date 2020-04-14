import {
  Express,
  Router,
  Request,
  Response
} from '../RouteTypes';

import { ConnectionsService } from './ConnectionsService';

export const addConnectionsController = (app: Express) => app.use('/api/redis/con', routes);

const routes = Router();

// get all saved connections
routes.get('/all', async (
  _: Request<any>,
  res: Response<Keyed<RedisConnectionOptions>>
) => {
  const clients = ConnectionsService.getConnections();
  res.send(clients);
});

// connect to a server
routes.post('/create', async (
  req: Request<RedisConnectionOptions>,
  res: Response<CreateRedisClientResult>
) => {
  const client = await ConnectionsService.createClient(req.body);
  res.send(client);
});

// get databases
routes.get('/:name/databases', async (
  req: Request<any, { name: string }>,
  res: Response<ClientDatabaseResult>
) => {
  const dbs = await ConnectionsService.getDbInfo(req.params.name);
  res.send(dbs);
});
