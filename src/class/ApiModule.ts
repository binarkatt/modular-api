import type { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { transformError } from './errors';
import { IApiRoute } from '../types';
import {
  IEndpoint,
  IEndpoints,
  IApiModule,
  IApiModuleParams,
  IApiRoutes,
} from './types';

export abstract class ApiModule implements IApiModule, IApiRoutes, IEndpoints {
  #name: string;
  #path: string;
  #routes: IApiRoute[];

  constructor ({ name, path, routes }: IApiModuleParams) {
    this.#name = name;
    this.#path = path;
    this.#routes = routes;
  }

  public getName (): string {
    return this.#name;
  }

  public getPath (): string {
    return this.#path;
  }

  public getFullPath (path: string): string {
    return `${this.#path}${path}`;
  }

  public getRoutes (): IApiRoute[] {
    return this.#routes;
  };

  public setRoutes (routes: IApiRoute[]): this {
    this.#routes = routes;

    return this;
  };

  public getEndpoints (): IEndpoint[] {
    const endpoints: IEndpoint[] = [];

    for (const route of this.#routes) {
      endpoints.push({
        method: route.method,
        path: route.path,
        fullPath: this.getFullPath(route.path),
        description: route.description,
      });
    }

    return endpoints;
  };

  public applyRoutes (server: FastifyInstance): void {
    for (const route of this.getRoutes()) {
      this.applyRoute(server, route);
    }
  };

  protected applyRoute (server: FastifyInstance, route: IApiRoute): void {
    const {
      method,
      path,
      controller,
      getRequestArguments = (req: any) => req,
      responseHeaders = [],
    }: IApiRoute = route;

    server[method](this.getFullPath(path), async (req: FastifyRequest, reply: FastifyReply) => {
      try {
        const args = getRequestArguments(req);

        const iterableArgs = Array.isArray(args) ? args : [args];

        const response = await controller(...iterableArgs);

        // Set response headers
        for (const header of responseHeaders) {
          reply.header(header.key, header.value);
        }

        reply.send(response);
      } catch (e: unknown) {
        console.warn(`[${method.toUpperCase()}] ${path} error`, e);

        const { message, error, statusCode } = transformError(e as Error);

        reply.status(statusCode).send({
          message,
          error,
          statusCode,
        });
      }
    });
  };
}
