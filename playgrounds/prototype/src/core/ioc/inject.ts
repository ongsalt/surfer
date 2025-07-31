import { INJECT } from "./constant";

export type AutoInjectConfig = {
    name?: string,
    singleton?: boolean,
    
}
// mark as to be inject
export function Inject(config: AutoInjectConfig = {}) {
    return function decorator(target: any) {
        Reflect.defineMetadata(INJECT, true, target)
    }
}
