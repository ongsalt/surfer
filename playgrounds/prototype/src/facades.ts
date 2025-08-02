import { Application } from "./core/foundation/application";
import { ioc } from "./core/ioc/api";
import { IocContainer } from "./core/ioc/container";
import { createFacade } from "./core/ioc/facade";

function facade(key: any) {
  return createFacade(() => ioc(key));
}

const _Application = facade(Application) as Application;
const _IocContainer = facade(IocContainer) as IocContainer;

export {
  _Application as Application,
  _IocContainer as _IocContainer
};
