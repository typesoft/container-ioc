import { Container } from 'container-ioc';

const container = new Container();

container.register([
    { token: 'IConfig', useValue: {}}
]);

const app = container.resolve('IConfig');