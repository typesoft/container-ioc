import { Container, Injectable } from 'container-ioc';

// Not recommended

@Injectable() class App {}
const container = new Container();

container.register(App);

const app = container.resolve(App);