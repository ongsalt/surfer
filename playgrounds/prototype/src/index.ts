/*
So app entry is: http, console, schedule -> console, rpc/ipc stuff??, 

wtf do i want, if this is for client side reactivity we need some kind of observable too 

Expected interfaces:

export default defineShit({

})

export default class SomeShit extends Shit {

}

*/

import Elysia from "elysia";
import "reflect-metadata";
import { createRootIoc } from "./core/ioc/api";
import { IocContainer } from "./core/ioc/container";
import { inject } from "./core/ioc/inject";

class Admksdc {
  #name: string;
  constructor(name: string) {
    this.#name = name;
  }

  @inject()
  ssss(a: Elysia) {
    console.log(a.config, this.#name);
    return { a, name: this.#name };
  }
}

const { als, container, provideIoc } = createRootIoc();
// if we extract this to a folder, we can typegen this
container.bind(IocContainer, () => container).alias('ioc');

provideIoc(() => {
  container.bind(Elysia, () => new Elysia());
  const a = new Admksdc("kebin");
  const { name } = container.injectFn(a, "ssss");
  console.log({ name });
});