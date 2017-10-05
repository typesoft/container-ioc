import { Container, Injectable, Inject } from 'container-ioc';

const container = new Container();

interface IService {
    [key: string]: any;
}

@Injectable()
class App {
    constructor(@Inject('IService') private service: IService) {}
}

container.register([
    App,
    { token: 'IService', useValue: {}}
]);

const app = container.resolve(App);