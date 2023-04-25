import { IApiRoute, THttpMethod } from '../types';
export interface IApiModuleParams {
    name: string;
    path: string;
    routes: IApiRoute[];
}
export interface IApiModule {
    getName: () => string;
    getPath: () => string;
    getFullPath: (path: string) => string;
}
export interface IEndpoint {
    path: string;
    fullPath: string;
    method: THttpMethod;
    description?: string;
}
export interface IEndpoints {
    getEndpoints: () => IEndpoint[];
}
export interface IApiRoutes {
    getRoutes: () => IApiRoute[];
}
