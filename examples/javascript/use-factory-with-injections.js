import { Container, Injectable } from 'container-ioc';

const container = new Container();

@Injectable(['IUserFactory'])
class App {
    constructor(service) {
        this.service = service;
    }
}

@Injectable()
class Service {}

container.register([
    App,
    { token: 'IService', useClass: Service },
    {
        token: 'IUseFactory',
        useFactory: (service) => {
            return service;
        },
        inject: ['IService']
    }
]);

const app = container.resolve(App);