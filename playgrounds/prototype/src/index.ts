import 'reflect-metadata';

import { Container } from './core/ioc/container';
import { inject } from './core/ioc/inject';

@inject()
class Example {
  constructor(private name: NoDependency) { }

  sayHi(a: string) {
    console.log(`Hi ${this.name.makeString()} ${a}!`);
  }
}

class NoDependency {
  makeString() {
    return "fjsdkyugjhHb,k";
  }
  hi() {
    console.log("hi");
  }
}

const container = new Container();
container.register(NoDependency, () => new NoDependency());
container.bind(Example);
const i = container.make(Example);
i?.sayHi("s");

const j = container.make(NoDependency);

console.log({
  i,
  j
});