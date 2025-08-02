import type { AsyncLocalStorage } from "node:async_hooks";
import type { Constructor } from "./legacy/container";
import { getDependencies, isMarkedAsInject } from "./inject";
// TODO: type shi 
export class IocContainer {
  #instances = new Map<any, any>();
  #toInits = new Map<any, () => any>();
  #aliases = new Map<any, any>();
  #als: AsyncLocalStorage<IocContainer>;
  #parent: IocContainer | undefined;
  #latestBindedKey: any;

  constructor(
    als: AsyncLocalStorage<IocContainer>,
    parent?: IocContainer
  ) {
    this.#als = als;
    this.#parent = parent;
  }

  get<T>(key: any): T {
    if (this.#aliases.has(key)) {
      return this.get(this.#aliases.get(key)!);
    }

    if (this.#instances.has(key)) {
      return this.#instances.get(key)! as T;
    }

    const init = this.#toInits.get(key);
    if (init) {
      const instance = init();
      this.#instances.set(key, instance);
      return instance as T;
    }

    if (this.#parent) {
      return this.#parent.get(key) as T;
    }

    throw new Error(`Key ${key} does not exists`);
  }

  has(key: any): boolean {
    if (this.#aliases.has(key)) {
      return this.has(this.#aliases.get(key)!);
    }

    if (this.#instances.has(key)) {
      return true;
    }

    if (this.#toInits.has(key)) {
      return true;
    }

    if (this.#parent && this.#parent.has(key)) {
      return true;
    }

    return false;
  }


  bind<T>(key: any, init: () => T) {
    if (this.#toInits.has(key) || this.#instances.has(key)) {
      throw new Error(`key ${key} already exist`);
    }
    this.#toInits.set(key, init);
    this.#latestBindedKey = key;
    return this;
  }

  make<T>(clazz: Constructor<T>, bind = false): T {
    if (!isMarkedAsInject(clazz)) {
      throw new Error(`Class ${clazz.name} is not marked with @inject. (so typescript dont generate runtime type info for it)`);
    }
    const dependencies = getDependencies(clazz);
    const args = [];
    for (const d of dependencies) {
      args.push(this.get(d));
    }
    const instance = new clazz(...args);
    if (bind) {
      this.#instances.set(clazz, instance);
    }
    return instance;
  }

  // TODO: partial inject
  injectFn<T extends object, const Key extends keyof T>(instance: T, key: Key): T[Key] extends (...args: any) => any ? ReturnType<T[Key]> : never {
    if (!isMarkedAsInject(instance, key)) {
      throw new Error(`This class (:${String(key)}) is not marked with @inject. (so typescript dont generate runtime type info for it)`);
    }
    if (typeof instance[key] !== 'function') {
      throw new Error(`${String(key)} is not a function`);
    }
    const dependencies = getDependencies(instance, key);
    const args = [];
    for (const d of dependencies) {
      args.push(this.get(d));
    }

    return instance[key](...args);
  }

  scoped<T>(run: (container: IocContainer) => T, name?: string) {
    const c = new IocContainer(this.#als, this);
    return this.#als.run(this, async () => await run(c));
  }

  alias(name: any, to?: any) {
    if (!to) {
      to = this.#latestBindedKey;
    }
    this.#aliases.set(name, to);
    return this;
  }
}

