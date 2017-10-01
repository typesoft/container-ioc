import { IContainer } from '../lib/container.interface';
import { Container } from '../lib/index';

import 'mocha';
import { expect } from 'chai';
import { Inject } from '../lib/decorators';

/* tslint:disable: no-unused-expression max-classes-per-file*/

describe('Decorators', () => {
    let container: IContainer;

    beforeEach(() => {
        container = new Container();
    });

    describe('@Inject()', () => {
        it('should inject dependency in to the constructor of a resolved class', () => {
            class A {}
            const providerA = { token: 'IA', useClass: A };

            class B {
                constructor(@Inject('IA') private a: A) {}
            }
            const providerB = { token: 'IB', useClass: B };

            container.register([providerA, providerB]);

            const instanceB = container.resolve('IB');

            expect(instanceB.a).to.be.instanceOf(A);
        });

        it('should throw an error when wrong token was provided not registered token', () => {
            class A {}
            const providerA = { token: 'IA', useClass: A };

            class B {
                constructor(@Inject('IC') private a: A) {}
            }
            const providerB = { token: 'IB', useClass: B };

            container.register([providerA, providerB]);

            const throwableFunc = () => container.resolve('IB');
            expect(throwableFunc).to.throw();
        });

        it('should throw an error when wrong token was provided not valid token', () => {
            class A {}
            const providerA = { token: 'IA', useClass: A };

            class B {
                constructor(@Inject('IC') private a: A) {}
            }
            const providerB = { token: 'IB', useClass: B };

            container.register([providerA, providerB]);

            const throwableFunc = () => container.resolve(1);
            expect(throwableFunc).to.throw();
        });
    });
});