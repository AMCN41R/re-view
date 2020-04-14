import {
  Request as ExpressRequest,
  Response as ExpressResponse,
  Router,
  Express
} from 'express';

export type RedisDbRequest = {
  name: string;
  db: string;
}

export type Request<T, P = any> = ExpressRequest & {
  body: T;
  params: P;
}

export type Response<T> = {
  send: (body: string | T) => ExpressResponse;

  /**
   * Set status `code`.
   */
  status(code: number): ExpressResponse;

  /**
   * Set the response HTTP status code to `statusCode` and send its string representation as the response body.
   * @link http://expressjs.com/4x/api.html#res.sendStatus
   *
   * Examples:
   *
   *    res.sendStatus(200); // equivalent to res.status(200).send('OK')
   *    res.sendStatus(403); // equivalent to res.status(403).send('Forbidden')
   *    res.sendStatus(404); // equivalent to res.status(404).send('Not Found')
   *    res.sendStatus(500); // equivalent to res.status(500).send('Internal Server Error')
   */
  sendStatus(code: number): ExpressResponse;
}

export {
  Router,
  Express
};
