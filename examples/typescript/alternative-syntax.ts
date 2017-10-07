import { Container, Injectable } from 'container-ioc';

interface IService {
    [key: string]: any;
}

const TSerivice = Symbol('IService');

@Injectable([TSerivice])
class App {
    constructor(private service: IService) {}
}

const container = new Container();

container.register([
    { token: App, useClass: App },
    { token: TSerivice, useValue: {}}
]);

const app = container.resolve(App);