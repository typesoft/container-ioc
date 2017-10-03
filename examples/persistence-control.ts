import { Container, Injectable, LifeTime } from 'container-ioc';

const container = new Container();

@Injectable()
class A {}

container.register({ token: A, useClass: A, lifeTime: LifeTime.PerRequest });

const instance1 = container.resolve(A);
const instance2 = container.resolve(A);

// instance1 !== instance2