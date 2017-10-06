import { Container, Injectable, Inject } from 'container-ioc';

/* tslint:disable: no-unused-expression max-classes-per-file*/

const container = new Container();

interface IService {
    [key: string]: any;
}

@Injectable()
class App {
    constructor(@Inject('IUseFactory') private service: IService) {}
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