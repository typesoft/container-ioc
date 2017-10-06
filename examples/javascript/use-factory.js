import { Container, Injectable } from 'container-ioc';

const container = new Container();

@Injectable(['IUseFactory'])
class App {
    constructor(service) {
        this.service = service;
    }
}

class Service {}

container.register([
    { token: App, useClass: App },
    {
        token: 'IUseFactory',
        useFactory: () => {
            return new Service();
        }
    }
]);

const app = container.resolve(App);