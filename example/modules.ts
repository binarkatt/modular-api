import { FastifyRequest } from 'fastify';
import { ApiModule } from '../src';

class HelloModule extends ApiModule {}

export const catModule = new HelloModule({
  name: 'Cats module',
  path: '/cats',

  routes: [{
    method: 'get',
    path: '/meow',
    description: 'A cat response',
    controller: () => ({ result: 'Meow!' }),
  }, {
    method: 'post',
    path: '/meow/:name',
    description: 'A cat response with name',
    getRequestArguments: (req: FastifyRequest) => [req.params],
    controller: (params: { name: string }) => {
      const { name } = params;

      return {
        result: `Meow, ${name}!`,
      };
    },
  }],
});

export const apiModules = [
  catModule,
];
