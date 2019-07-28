import * as path from 'path';

import express from 'express';

import RedisFactory, { RedisConnectionOptions } from './RedisDbFactory';

const app = express();

app.use(express.static(path.join(__dirname, '/../../../packages/client/dist')));
app.use(express.json());

app.get('/api/test', (req, res) => {
  res.send({ test: 'HEY' });
});

app.get('/api/redis/connections', async (req, res) => {
  const clients = RedisFactory.getAllClients().map(x => ({
    name: x.name,
    host: x.host,
    port: x.port
  }));
  res.send(clients);
});

type CreateOpts = RedisConnectionOptions;
app.post('/api/redis/create', async (req, res) => {
  const body = req.body as CreateOpts;
  const result = await RedisFactory.createClient(body);
  res.send({
    status: result.status,
    error: result.error
  });
});

app.get('/api/redis/:name/databases', async (req, res) => {
  const redis = RedisFactory.getClient(req.params.name);
  const db = await redis.db.databases();
  res.send({ db });
});

interface IKeysRequest {
  db: number | string;
  filter?: string;
  pageSize?: number;
}
app.post('/api/redis/:name/keys', async (req, res) => {
  const redis = RedisFactory.getClient(req.params.name);
  const body = req.body as IKeysRequest;
  const keys = await redis.db.keys(body.db);
  res.send({ keys });
});

interface IGetValueRequest {
  db: number | string;
  key: string;
}
app.post('/api/redis/:name/get', async (req, res) => {
  const redis = RedisFactory.getClient(req.params.name);
  const body = req.body as IGetValueRequest;
  const value = await redis.db.get(body.db, body.key);
  res.send({ value });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/../../../packages/client/dist/index.html'));
});

console.log('App available at localhost:8080');
app.listen(8080);
