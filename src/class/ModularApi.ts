import Fastify, { FastifyInstance } from 'fastify';
import { ApiModule } from './ApiModule';
import { InfoModule, INFO_MODULE_NAME } from './InfoModule';

export interface IModularApiConfig {
  port: number;
  host: string;

  serverName?: string;
  serverVersion?: string;
  serverDescription?: string;

  enableInfoModule?: boolean;
}

export class ModularApi {
  #server: FastifyInstance;
  #config: IModularApiConfig;
  #apiModules: ApiModule[];
  #infoModule: InfoModule | undefined;

  constructor (config: IModularApiConfig, modules?: ApiModule[]) {
    this.#config = config;
    this.#server = Fastify();
    this.#apiModules = modules || [];

    if (config.enableInfoModule) {
      this.#infoModule = new InfoModule()
        .setRoutes([{
          method: 'get',
          path: '/',
          controller: () => ({
            name: this.#config.serverName,
            version: this.#config.serverVersion,
            description: this.#config.serverName,
            modules: this.#apiModules
              .filter((apiModule: ApiModule) => apiModule.getName() !== INFO_MODULE_NAME)
              .map((apiModule: ApiModule) => ({
                name: apiModule.getName(),
                modulePath: apiModule.getPath(),
                endpoints: apiModule.getEndpoints(),
              })),
          }),
        }]);

      this.#apiModules.push(this.#infoModule);
    }
  }

  public addModules (apiModules: ApiModule | ApiModule[]): this {
    apiModules = Array.isArray(apiModules)
      ? apiModules
      : [apiModules];

    for (const apiModule of apiModules) {
      this.#apiModules.push(apiModule);
    }

    return this;
  }

  public start (message?: string): void {
    for (const apiModule of this.#apiModules) {
      apiModule.applyRoutes(this.#server);
    }

    this.#server.listen({
      port: Number(this.#config.port),
      host: '0.0.0.0',
    }).then(() => {
      for (const apiModule of this.#apiModules) {
        const apiName = apiModule.getName();
        const apiPath = apiModule.getPath();

        for (const { method, path } of apiModule.getRoutes()) {
          const fullPath = `${apiPath}${path}`;
          console.warn(`[${apiName}] Route [${method.toUpperCase()}] on path [${fullPath}]`);
        }
      }

      console.warn(message || `Modular api server has started on ${this.#config.host}:${this.#config.port}`);
    });
  }
}
