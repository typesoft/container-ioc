import { Container, Injectable, Inject, InjectionToken } from 'container-ioc';

interface IService {
    [key: string]: any;
}

const TService = new InjectionToken<IService>('IService');

@Injectable()
class Service {}

const container = new Container();

container.register([
    { token: TService, useClass: Service }
]);

const service = container.resolve(TService);