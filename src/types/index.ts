export type THttpMethod = 'get' | 'post' | 'put' | 'delete';

export interface IApiHeader {
  key: string;
  value: string;
}

export interface IApiRoute {
  description?: string;
  path: string;
  method: THttpMethod;
  controller: (args?: any) => any | Promise<any>;
  getRequestArguments?: (req: any) => any | any[] | Promise<any | any[]>;
  responseHeaders?: IApiHeader[];
}
