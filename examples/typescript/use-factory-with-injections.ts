/* tslint:disable: no-unused-expression max-classes-per-file*/

import { Container, Injectable, Inject } from 'container-ioc';

interface IService {
    [key: string]: any;
}

interface IManager {
    [key: string]: any;
}

const TService = Symbol('IService');

const TManager = Symbol('IManager');

@Injectable()
class App {
    constructor(@Inject(TService) private service: IService) {}
}

@Injectable()
class Service implements IService {}

@Injectable()
class Manager implements IManager {}

const container = new Container();

container.register([
    { token: App, useClass: App },
    { token: TManager, useClass: Manager },
    {
        token: TService,
        useFactory: (manager: IManager) => {
            return manager;
        },
        inject: [TManager]
    }
]);

const app = container.resolve(App);