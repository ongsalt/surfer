import 'reflect-metadata';
import { createRootIoc } from '../ioc/api';
import { IocContainer } from '../ioc/container';

interface SurferConfig {

}

export function start(config: SurferConfig = {}) {
  const { als, container, provideIoc } = createRootIoc();

  // if we extract this to a folder, we can typegen this
  container.bind(IocContainer, () => container).alias('ioc');

  provideIoc(() => {

  });
}