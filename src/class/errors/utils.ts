import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { IAbstractErrorParams } from './AbstractError';

export const composeErrorParams = (type: string, message?: string): IAbstractErrorParams | never => {
  const statusCode = StatusCodes[type];

  if (!statusCode) {
    throw new Error(`Status code for ${type} was not found.`);
  }

  const error = ReasonPhrases[type];

  if (!error) {
    throw new Error(`Reason phrases for type ${type} was not found.`);
  }

  return {
    statusCode,
    error,
    message: message || error,
  };
};
