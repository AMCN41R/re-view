import * as path from 'path';
import express from 'express';

import routes from './api/Routes';

const app = express();

app.use(express.static(path.join(__dirname, '/../../../packages/client/dist')));
app.use(express.json());

app.use('/api', routes);

app.get('/', (_, res) => {
  res.sendFile(path.join(__dirname + '/../../../packages/client/dist/index.html'));
});

console.log('App available at localhost:8080');
app.listen(8080);
