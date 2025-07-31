import { INJECT } from "./constant"

type Initializer<T = unknown> = (resolver: Resolver) => T
export type Constructor<T> = new (...params: any[]) => T
// type Key<T> = Constructor<T> | string | symbol
type Key<T> = Constructor<T>

interface Resolver {
    make<T = any>(key: new () => T | any): T | undefined
}

// todo: named instance, singleton
export class Container implements Resolver {
    // Literally anything can be threre
    private instances = new Map<Constructor<unknown>, any>()
    private initializers = new Map<Constructor<unknown>, Initializer>()
    private aliases = new Map<any, any>()

    // todo: auto resolve Class constructor from instance
    register<T>(key: Constructor<T>, initializer: Initializer<T>) {
        this.initializers.set(key, initializer)
    }

    make<T>(keyOrAlias: Key<T>): T | undefined {
        // todo: alias lookup
        const key = keyOrAlias
        const instance = this.instances.get(key)
        if (instance) {
            return instance
        }
        const initializer = this.initializers.get(key)
        if (initializer) {
            // console.log(`[make] initializing ${key.name}`)
            const instance = initializer(this) as T
            this.instances.set(key, instance)
            return instance
        }
        throw new Error(`Class ${keyOrAlias} not found`)
    }

    bind<T>(clazz: Constructor<T>) {
        this._bind(clazz, false)
    }

    singleton<T>(clazz: Constructor<T>) {
        this._bind(clazz, true)
    }

    private  _bind<T>(clazz: Constructor<T>, singleton = false) {
        if (!this.canBeInjected(clazz)) {
            throw new Error(`Class ${clazz.name} can not be auto injected.`)
        }

        const dependencies = this.getDependencies(clazz)
        // console.log(`[bind] create an initializer for ${clazz.name}`)
        const initializer = () => {
            const params = dependencies.map(it => {
                // todo: alias lookup
                if (this.instances.has(it) && singleton) {
                    return this.instances.get(it)
                } else if  (this.initializers.has(it)) {
                    return this.make(it)!
                }  else if (this.canBeInjected(it)) {
                    // recursively bind dependencies
                    this._bind(it, singleton)
                    return this.make(it)
                } else {
                    if (it.name === "Object") {
                        throw new Error("Please import entire dependency class instead of 'import type'")
                    }
                    throw new Error(`Error while instantiating ${clazz.name}: Dependency of type ${it.name} can not be auto injected.`)
                }
            })
            return new clazz(...params)
        }

        this.initializers.set(clazz, initializer)
    }

    private getDependencies(target: any): Constructor<unknown>[] {
        return Reflect.getMetadata("design:paramtypes", target) ?? []
    }

    private canBeInjected(target: any): boolean {
        return !!Reflect.getMetadata(INJECT, target)
    }
}