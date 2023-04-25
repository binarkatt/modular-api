import { AbstractError } from './AbstractError';
import { UnauthorizedError } from './UnauthorizedError';
import { NotFoundError } from './NotFoundError';
import { NotImplementedError } from './NotImplementedError';
import { InternalServerError } from './InternalServerError';
export type TError = UnauthorizedError | NotFoundError | NotImplementedError | InternalServerError;
export declare const transformError: (error: Error | TError) => TError;
export { AbstractError, UnauthorizedError, NotFoundError, NotImplementedError, InternalServerError, };
