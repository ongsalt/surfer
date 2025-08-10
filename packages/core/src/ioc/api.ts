import { IocContainer } from "./container";
import { AsyncLocalStorage } from "node:async_hooks";
import type { IocRegistry } from "./type";

const als = new AsyncLocalStorage<IocContainer>();

export function createRootIoc() {
  const container = new IocContainer(als);

  function provideIoc<T>(run: () => T) {
    return als.run(container, run);
  }

  return {
    container,
    als,
    provideIoc
  };
}

export function getIoc() {
  const ioc = als.getStore();
  if (!ioc) {
    throw new Error(`No ioc context: Please run this under provideIoc`);
  }

  return ioc;
}

export function ioc<const T>(key: T): T extends keyof IocRegistry ? IocRegistry[T] : any {
  const ioc = als.getStore();
  if (!ioc) {
    throw new Error(`No ioc context: Please run this under provideIoc`);
  }

  return ioc.get(key) as any;
}
