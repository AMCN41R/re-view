import * as path from 'path';
import express from 'express';

import { addKeysController } from "./api/Keys/KeysController";
import { addConnectionsController } from "./api/Connections/ConnectionsController";

const app = express();

app.use(express.static(path.join(__dirname, '/../../../packages/client/dist')));
app.use(express.json());

addKeysController(app);
addConnectionsController(app);

app.get('/test', (_, res) => {
  res.send({ test: 'HEY' });
});

app.get('/', (_, res) => {
  res.sendFile(path.join(__dirname + '/../../../packages/client/dist/index.html'));
});

console.log('App available at localhost:8080');
app.listen(8080);




// function wrapAsync(fn) {
//   return function(req, res, next) {
//     // Make sure to `.catch()` any errors and pass them along to the `next()`
//     // middleware in the chain, in this case the error handler.
//     fn(req, res, next).catch(next);
//   };
// }

// app.use(function(error, req, res, next) {
//   // Gets called because of `wrapAsync()`
//   res.json({ message: error.message });
// });
