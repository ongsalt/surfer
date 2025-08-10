/*
So app entry is: http, console, schedule -> console, rpc/ipc stuff??, 

wtf do i want, if this is for client app, we need some kind of observable too 

Expected interfaces:

export default defineShit({ })
  
if this, why ioc then

export default class SomeShit extends Shit {

}

Routes.get("")
Routes.group("")

*/

import Elysia from "elysia";
import "reflect-metadata";
import { createRootIoc, inject, ioc, IocContainer } from "surfer/ioc";

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
  container.bind("elysia", () => new Elysia());
  const a = new Admksdc("kebin");
  const { name } = container.injectFn(a, "ssss");
  console.log({ name });
  console.log(ioc("elysia").config);
});
