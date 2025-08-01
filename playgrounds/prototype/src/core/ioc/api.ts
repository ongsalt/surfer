import { IocContainer } from "./container";
import { AsyncLocalStorage } from "node:async_hooks";

const als = new AsyncLocalStorage<IocContainer>();

export function createRootIoc() {
  const container = new IocContainer(als);

  function provideIoc(run: () => unknown) {
    als.run(container, run);
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

export function ioc<const Key>(key: Key) {
  const ioc = als.getStore();
  if (!ioc) {
    throw new Error(`No ioc context: Please run this under provideIoc`);
  }

  return ioc.get(key);
}
