import { Container, Injectable } from 'container-ioc';

const TService = Symbol('IService');

const TManager = Symbol('IManager');

@Injectable([TService])
class App {
    constructor(service) {
        this.service = service;
    }
}

@Injectable()
class Service {}

@Injectable()
class Manager {}

const container = new Container();

container.register([
    { token: App, useClass: App },
    { token: TManager, useClass: Manager },
    {
        token: TService,
        useFactory: (manager) => {
            return manager;
        },
        inject: ['IConfig']
    }
]);

const app = container.resolve(App);