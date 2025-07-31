import { AsyncLocalStorage } from "node:async_hooks";
// TODO: type shi 
export class IocContainer {
  #instances = new Map<any, any>();
  #toInits = new Map<any, () => any>();
  #als: AsyncLocalStorage<IocContainer>;
  #parent: IocContainer | undefined;

  constructor(
    als: AsyncLocalStorage<IocContainer>,
    parent?: IocContainer
  ) {
    this.#als = als;
    this.#parent = parent;
  }

  get<T>(key: any): T | null {
    let instance = this.#instances.get(key);
    if (instance) {
      return instance as T;
    }

    const init = this.#toInits.get(key);
    if (init) {
      instance = init();
      this.#instances.set(key, instance);
      return instance as T;
    }

    if (this.#parent) {
      return this.#parent.get(key) as T;
    }

    return null;
  }

  bind<T>(key: any, init: () => T) {
    if (this.#toInits.has(key) || this.#instances.has(key)) {
      throw new Error(`key ${key} already exist`);
    }
    this.#toInits.set(key, init);
  }

  scoped<T>(run: (container: IocContainer) => T) {
    const c = new IocContainer(this.#als, this);
    return this.#als.run(this, async () => await run(c));
  }
}

let activeIoc: IocContainer | undefined;

export function createRootIoc() {
  const als = new AsyncLocalStorage<IocContainer>();
  const container = new IocContainer(als);

  function provideIoc(run: () => any) {
    const previous = activeIoc;
    activeIoc = container;
    als.run(container, run);
    activeIoc = previous;
  }

  return {
    container,
    als,
    provideIoc
  };
}

export function getIoc() {
  return activeIoc;
}

export function get<const Key>(key: Key) {
  if (!activeIoc) {
    return undefined;
  }

  return activeIoc.get(key);
}
