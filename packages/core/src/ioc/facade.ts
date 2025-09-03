export function createFacade<T extends object>(getInstance: () => T): T {
  return new Proxy({}, {
    getOwnPropertyDescriptor(target, p) {
      return Reflect.getOwnPropertyDescriptor(getInstance(), p);
    },
    defineProperty(target, property, attributes) {
      return Reflect.defineProperty(getInstance(), property, attributes);
    },
    has(target, p) {
      return Reflect.has(getInstance(), p);
    },
    getPrototypeOf(target) {
      return Reflect.getPrototypeOf(getInstance());
    },
    get(target, p) {
      return Reflect.get(getInstance(), p);
    },
    set(target, p, newValue) {
      return Reflect.set(getInstance(), p, newValue);
    },
    deleteProperty(target, p) {
      return Reflect.deleteProperty(getInstance(), p);
    },
    ownKeys(target) {
      return Reflect.ownKeys(getInstance());
    },
  }) as T;
}
