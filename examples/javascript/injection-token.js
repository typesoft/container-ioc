import { Container, Injectable, InjectionToken } from 'container-ioc';

const TService = new InjectionToken('IService');

@Injectable()
class Service {}

const container = new Container();

container.register([
    { token: TService, useClass: Service }
]);

const service = container.resolve(TService);