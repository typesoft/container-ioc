import { Container, Injectable, Inject } from 'container-ioc';

/* tslint:disable: no-unused-expression max-classes-per-file*/

interface IService {
    [key: string]: any;
}

const TService = Symbol('IService');

@Injectable()
class App {
    constructor(@Inject(TService) private service: IService) {}
}

class Service implements IService {}

const container = new Container();

container.register([
    { token: App, useClass: App },
    {
        token: TService,
        useFactory: () => {
            return new Service();
        }
    }
]);

const app = container.resolve(App);