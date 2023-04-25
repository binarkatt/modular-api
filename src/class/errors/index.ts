import { AbstractError } from './AbstractError';
// 400+
import { UnauthorizedError } from './UnauthorizedError';
import { NotFoundError } from './NotFoundError';
// 500+
import { NotImplementedError } from './NotImplementedError';
import { InternalServerError } from './InternalServerError';

export type TError =
  UnauthorizedError |
  NotFoundError |
  NotImplementedError |
  InternalServerError;

export const transformError = (error: Error | TError): TError => {
  if (error instanceof AbstractError) {
    return error;
  }

  return new InternalServerError();
};

export {
  AbstractError,
  UnauthorizedError,
  NotFoundError,
  NotImplementedError,
  InternalServerError,
};
