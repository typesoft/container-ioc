import { Container, LifeTime, Injectable } from 'container-ioc';

/*
    By default, containers resolve singletons when using useClass and useFactory.
    Default life time for all items in a container can be set by passing an option object to it's contructor with **defailtLifeTime** attribute.
    Possible values: LifeTime.PerRequest (resolves instances) and LifeTime.Persistent (resolves singletons);
*/
const container = new Container({
    defaultLifeTime: LifeTime.PerRequest
});

/*
    You can also specify life time individually for each item in a container by specifying lifeTime attribute.
*/
@Injectable()
class ServiceA {}

/* With classes */
container.register([
    {
        token: 'ISerivceA',
        useClass: ServiceA,
        lifeTime: LifeTime.PerRequest
    }
]);

/* With factories */
container.register([
    {
        token: 'IServiceB',
        useFactory: () => {
            return {
                serve(): void {
                    return;
                }
            };
        },
        lifeTime: LifeTime.Persistent
    }
]);

const service1 = container.resolve('IServiceA');
const service2 = container.resolve('IServiceB');