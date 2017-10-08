import { Injectable, Inject, Container } from 'container-ioc';

interface IApplication {
    run(): void;
}

interface IService {
    serve(): void;
}

const TApplication = Symbol('IApplication');

const TService = Symbol('IService');

@Injectable()
export class Application implements IApplication {
    constructor(@Inject(TService) private service: IService) {}

    run(): void {
        this.service.serve();
    }
}

@Injectable()
export class Service implements IService {
    serve(): void {
        // serves
    }
}

const container = new Container();

container.register([
    { token: TApplication, useClass: Application },
    { token: TService, useClass: Service }
]);

const app: IApplication = container.resolve(TApplication);

app.run();