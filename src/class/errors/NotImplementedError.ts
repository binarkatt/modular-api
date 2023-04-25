import { AbstractError } from './AbstractError';
import { composeErrorParams } from './utils';

export class NotImplementedError extends AbstractError {
  constructor (message?: string) {
    super(composeErrorParams('NOT_IMPLEMENTED', message));
  }
}
