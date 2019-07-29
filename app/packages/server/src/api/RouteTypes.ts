import { Request, Response, Router } from 'express';

export interface IRequest<T, P = any> extends Request {
  body: T;
  params: P;
}

export interface IResponse<T> extends Response {
  send: (body: T) => Response;
}

export {
  Request,
  Response,
  Router
};
