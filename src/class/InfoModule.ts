import { ApiModule } from './ApiModule';

export const INFO_MODULE_NAME = 'Info';

export class InfoModule extends ApiModule {
  constructor () {
    super({
      name: INFO_MODULE_NAME,
      path: '',
      routes: [],
    });
  }
}
