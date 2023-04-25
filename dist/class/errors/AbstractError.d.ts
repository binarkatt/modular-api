export interface IAbstractErrorParams {
    statusCode: number;
    error: string;
    message: string;
}
export declare abstract class AbstractError extends Error {
    statusCode: number;
    error: string;
    constructor({ statusCode, error, message }: IAbstractErrorParams);
}
