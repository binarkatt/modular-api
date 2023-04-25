import { ModularApi } from '../src';
import { apiModules } from './modules';

const { PORT = 3000 } = process.env;

const srv = new ModularApi({
  port: Number(PORT),
  host: '0.0.0.0',

  serverName: 'The cat server',
  serverVersion: 'v0.0.1',
  serverDescription: 'The cats api server',

  enableInfoModule: true,
});
srv.addModules(apiModules);
srv.start();
