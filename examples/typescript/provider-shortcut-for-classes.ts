import { Container, Injectable } from 'container-ioc';

@Injectable() class App {}
const container = new Container();

container.register(App); // the same as { token: App, useClass: App }

const app = container.resolve(App);