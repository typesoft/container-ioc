import { Container, Injectable } from 'container-ioc';

const container = new Container();

interface IService {
    [key: string]: any;
}

@Injectable(['IService'])
class App {
    constructor(private service: IService) {}
}

container.register([
    App,
    { token: 'IService', useValue: {}}
]);

const app = container.resolve(App);