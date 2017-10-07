import { Container, Injectable } from 'container-ioc';

const TService = Symbol('IService');

@Injectable([TService])
class App {
    constructor(service) {}
}

const container = new Container();

container.register([
    { token: App, useClass: App },
    {
        token: TService,
        useFactory: () => {
            return {
                serve () {
                    // do stuff
                }
            };
        }
    }
]);

const app = container.resolve(App);