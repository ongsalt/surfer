import type Elysia from "elysia";
import { createFacade, ioc, IocContainer } from "surfer/ioc";

function facade(key: any) {
  return createFacade(() => ioc(key));
}

const _IocContainer = facade(IocContainer) as IocContainer;

export {
  _IocContainer as _IocContainer
};

declare module "surfer/ioc" {
  interface IocRegistry {
    "elysia": Elysia;
  }
}
