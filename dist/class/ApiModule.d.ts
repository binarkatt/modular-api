import type { FastifyInstance } from 'fastify';
import { IApiRoute } from '../types';
import { IEndpoint, IEndpoints, IApiModule, IApiModuleParams, IApiRoutes } from './types';
export declare abstract class ApiModule implements IApiModule, IApiRoutes, IEndpoints {
    #private;
    constructor({ name, path, routes }: IApiModuleParams);
    getName(): string;
    getPath(): string;
    getFullPath(path: string): string;
    getRoutes(): IApiRoute[];
    setRoutes(routes: IApiRoute[]): this;
    getEndpoints(): IEndpoint[];
    applyRoutes(server: FastifyInstance): void;
    protected applyRoute(server: FastifyInstance, route: IApiRoute): void;
}
