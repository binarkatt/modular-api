import { AbstractError } from './AbstractError';
import { composeErrorParams } from './utils';

export class NotFoundError extends AbstractError {
  constructor (message?: string) {
    super(composeErrorParams('NOT_FOUND', message));
  }
}
