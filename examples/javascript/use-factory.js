import { Container, Injectable } from 'container-ioc';

const container = new Container();

@Injectable(['IUseFactory'])
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
        useFactory: () => {
            return new Service();
        }
    }
]);

const app = container.resolve(App);