/*tslint:disable*/

import { Container } from './container';
import { Inject, Injectable } from './decorators';

const container = new Container();

@Injectable()
class C {}

@Injectable()
class AscendantC {}

@Injectable()
class B {
    constructor(@Inject('IC') private c: C) {}
}

@Injectable()
class A {
    constructor(@Inject('IB') private b: B) {}
}

const childContainer = container.createChild();

container.register([
    { token: 'IB', useClass: B },
    { token: 'IC', useClass: AscendantC }
]);

childContainer.register([
    { token: 'IA', useClass: A },
    { token: 'IC', useClass: C }
]);

const a = childContainer.resolve('IA');