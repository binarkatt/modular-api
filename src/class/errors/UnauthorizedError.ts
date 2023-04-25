import { AbstractError } from './AbstractError';
import { composeErrorParams } from './utils';

export class UnauthorizedError extends AbstractError {
  constructor (message?: string) {
    super(composeErrorParams('UNAUTHORIZED', message));
  }
}
