import { ApiModule } from './ApiModule';
export interface IModularApiConfig {
    port: number;
    host: string;
    serverName?: string;
    serverVersion?: string;
    serverDescription?: string;
    enableInfoModule?: boolean;
}
export declare class ModularApi {
    #private;
    constructor(config: IModularApiConfig, modules?: ApiModule[]);
    addModules(apiModules: ApiModule | ApiModule[]): this;
    start(message?: string): void;
}
