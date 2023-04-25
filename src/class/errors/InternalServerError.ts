import { AbstractError } from './AbstractError';
import { composeErrorParams } from './utils';

export class InternalServerError extends AbstractError {
  constructor (message?: string) {
    super(composeErrorParams('INTERNAL_SERVER_ERROR', message));
  }
}
