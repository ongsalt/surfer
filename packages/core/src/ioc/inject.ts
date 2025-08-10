
export const INJECT_SYMBOL = Symbol.for("surfer.ioc.inject");

export type AutoInjectConfig = {
    name?: string,
    singleton?: boolean,

};

// a decorator
export function inject(config: AutoInjectConfig = {}) {
    return function decorator(target: any, propertyKey?: string, descriptor?: TypedPropertyDescriptor<any>) {
        // console.log({ propertyKey, descriptor, target });
        if (propertyKey) {
            Reflect.defineMetadata(INJECT_SYMBOL, config, target, propertyKey);
        } else {
            Reflect.defineMetadata(INJECT_SYMBOL, config, target);
        }
    };
}

export function isMarkedAsInject<T extends object>(target: T, key?: keyof T) {
    if (key) {
        // TODO: handle number key
        return !!Reflect.getMetadata(INJECT_SYMBOL, target, key as any);
    }
    return !!Reflect.getMetadata(INJECT_SYMBOL, target);
};

export function getDependencies<T extends object>(target: T, key?: keyof T): any[] {
    if (key) {
        return Reflect.getMetadata("design:paramtypes", target, key as any) ?? [];
    } else {
        const keys = Reflect.getMetadataKeys(target);
        console.log(target, keys);
        // for (const k of keys) {
        // console.log(k, Reflect.getMetadata(k, target));
        // }
        return Reflect.getMetadata("design:paramtypes", target) ?? [];
    }
}

