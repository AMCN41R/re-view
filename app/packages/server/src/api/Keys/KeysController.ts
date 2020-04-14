import { RedisValueType } from 'async-redis';

import {
  Express,
  Router,
  Request,
  Response,
  RedisDbRequest
} from '../RouteTypes';

import { convertToTree } from '../../utils/tree';

import { Keys } from './types/Keys';
import { StringValues } from './types/Strings';
import { HashSets } from './types/HashSets';

export const addKeysController = (app: Express) => app.use('/api/redis/keys', routes);

const routes = Router();

// get the value TYPE
routes.get('/:name/:db/type/:key', async (
  req: Request<any, { key: string } & RedisDbRequest>,
  res: Response<{ value: RedisValueType }>
) => {
  const { name, db, key } = req.params;
  const value = await Keys.getType(name, db, key);

  res.send({ value });
});

// get a STRING value
routes.get('/:name/:db/string/:key', async (
  req: Request<any, { key: string } & RedisDbRequest>,
  res: Response<{ value: string }>
) => {
  const { name, db, key } = req.params;
  const value = await StringValues.getValue(name, db, key);

  if (value === null) {
    res.sendStatus(404);
    return;
  }

  if (value === false) {
    res.status(400).send('Key type not supported.');
    return;
  }
  res.send({ value });
});

// get a HASH set
routes.get('/:name/:db/hash/:key', async (
  req: Request<any, { key: string } & RedisDbRequest>,
  res: Response<{ value: Keyed<string> }>
) => {
  const { name, db, key } = req.params;
  const value = await HashSets.getHashSet(name, db, key);

  if (value === null) {
    res.sendStatus(404);
    return;
  }

  if (value === false) {
    res.status(400).send('Key type not supported.');
    return;
  }

  res.send({ value });
});

// get a HASH set FIELD
routes.get('/:name/:db/hash/:key/:field', async (
  req: Request<any, { key: string, field: string } & RedisDbRequest>,
  res: Response<{ value: string }>
) => {
  const { name, db, key, field } = req.params;
  const value = await HashSets.getHashField(name, db, key, field);

  if (value === null) {
    res.sendStatus(404);
    return;
  }

  if (value === false) {
    res.status(400).send('Key type not supported.');
    return;
  }

  res.send({ value });
});

// query for keys
routes.post('/:name/:db/search-flat', async (
  req: Request<DbKeysRequest, RedisDbRequest>,
  res: Response<DbFlatKeySearchResult>
) => {
  const { name, db } = req.params;
  const keys = await Keys.getKeys(name, db, req.body);
  res.send(keys);
});

// query for keys
routes.post('/:name/:db/search', async (
  req: Request<DbKeysRequest, RedisDbRequest>,
  res: Response<DbKeySearchResult>
) => {
  const { name, db } = req.params;
  const keys = await Keys.getKeys(name, db, req.body);
  const tree: TreeItem[] = convertToTree(keys.keys);
  res.send({ cursor: keys.cursor, items: tree });
});

// rename a key
routes.post('/:name/:db/rename/:key', async (
  req: Request<{ newName: string, force?: boolean }, { key: string } & RedisDbRequest>,
  res: Response<{ success: boolean }>
) => {
  const { name, db, key } = req.params;
  const result = await Keys.renameKey(name, db, key, req.body.newName, req.body.force);
  res.send({ success: result });
});

// delete a key
routes.delete('/:name/:db/delete/:key', async (
  req: Request<any, { key: string } & RedisDbRequest>,
  res: Response<{ result: string }>
) => {
  const { name, db, key } = req.params;
  await Keys.deleteKey(name, db, key);
  res.send({ result: 'OK' });
});
