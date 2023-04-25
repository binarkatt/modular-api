export interface IAbstractErrorParams {
  statusCode: number;
  error: string;
  message: string;
}

export abstract class AbstractError extends Error {
  public statusCode: number;
  public error: string;

  constructor ({ statusCode, error, message }: IAbstractErrorParams) {
    super();

    this.statusCode = statusCode;
    this.error = error;
    this.message = message;
  }
}
