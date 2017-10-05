import { Container, Injectable, Inject } from 'container-ioc';

const container = new Container();

interface IService {
    [key: string]: any;
}

@Injectable()
class App {
    constructor(@Inject('IUseFactory') private service: IService) {}
}

@Injectable()
class Service {}

container.register([
    { token: App, useClass: App },
    { token: 'IService', useClass: Service },
    {
        token: 'IUseFactory',
        useFactory: () => {
            return new Service();
        }
    }
]);

const app = container.resolve(App);