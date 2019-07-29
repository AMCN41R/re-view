import {
  Router,
  Request,
  IRequest,
  IResponse
} from './RouteTypes';

import { ManagementService } from './Management/ManagementService.ts';
import { KeyService } from './Data/KeyService';
import { ValueService } from './Data/ValueService';

const routes = Router();

routes.get('/test', (_, res) => {
  res.send({ test: 'HEY' });
});

routes.get('/redis/connections', async (
  _: Request,
  res: IResponse<RedisClientInfo[]>
) => {
  const clients = ManagementService.getActiveClients();
  res.send(clients);
});

routes.post('/redis/create', async (
  req: IRequest<RedisClientInfo>,
  res: IResponse<CreateRedisClientResult>
) => {
  const client = await ManagementService.createClient(req.body);
  res.send(client);
});


routes.get('/redis/:name/databases', async (
  req: IRequest<any, { name: string }>,
  res: IResponse<ClientDatabseResult>
) => {
  const dbs = await ManagementService.getDatabases(req.params.name);
  res.send(dbs);
});

routes.post('/redis/:name/:db/keys', async (
  req: IRequest<DbKeysRequest, { name: string; db: string }>,
  res: IResponse<DbKeySearchResult>
) => {
  const { name, db } = req.params;
  const keys = await KeyService.getKeys(name, db, req.body);
  res.send(keys);
});

routes.get('/redis/:name/:db/keys/:key', async (
  req: IRequest<any, { name: string; db: string; key: string }>,
  res: IResponse<{ value: string }>
) => {
  const { name, db, key } = req.params;
  const value = await ValueService.getValue(name, db, key);
  res.send({ value });
});

routes.delete('/redis/:name/:db/keys/:key', async (
  req: IRequest<any, { name: string; db: string; key: string }>,
  res: IResponse<{ result: string }>
) => {
  const { name, db, key } = req.params;
  await KeyService.deleteKey(name, db, key);
  res.send({ result: 'OK' });
});

export default routes;
