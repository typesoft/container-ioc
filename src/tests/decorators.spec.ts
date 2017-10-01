import { IContainer } from '../lib/container.interface';
import { Container } from '../lib/index';

import 'mocha';
import { expect } from 'chai';
import { Inject, Injectable } from '../lib/decorators';

/* tslint:disable: no-unused-expression max-classes-per-file*/

describe('Decorators', () => {
    let container: IContainer;

    beforeEach(() => {
        container = new Container();
    });

    describe('@Inject()', () => {
        it('should inject dependency in to the constructor of a resolved class', () => {

            @Injectable()
            class A {}
            const providerA = { token: 'IA', useClass: A };

            @Injectable()
            class B {
                constructor(@Inject('IA') private a: A) {}
            }
            const providerB = { token: 'IB', useClass: B };

            container.register([providerA, providerB]);

            const instanceB = container.resolve('IB');

            expect(instanceB.a).to.be.instanceOf(A);
        });

        it('should throw an error when wrong token was provided not registered token', () => {
            @Injectable()
            class A {}
            const providerA = { token: 'IA', useClass: A };

            @Injectable()
            class B {
                constructor(@Inject('IC') private a: A) {}
            }
            const providerB = { token: 'IB', useClass: B };

            container.register([providerA, providerB]);

            const throwableFunc = () => container.resolve('IB');
            expect(throwableFunc).to.throw();
        });

        it('should throw an error when wrong token was provided not valid token', () => {
            @Injectable()
            class A {}
            const providerA = { token: 'IA', useClass: A };

            @Injectable()
            class B {
                constructor(@Inject('IC') private a: A) {}
            }
            const providerB = { token: 'IB', useClass: B };

            container.register([providerA, providerB]);

            const throwableFunc = () => container.resolve(1);
            expect(throwableFunc).to.throw();
        });
    });

    describe('@Injectable()', () => {
        it('container should instantiate a class marked with @Injectable() decorator', () => {
            @Injectable()
            class A {}

            container.register(A);

            const instance = container.resolve(A);

            expect(instance).to.be.instanceOf(A);
        });

        it('should throw an error when trying instantiating a class not marked with @Injectable', () => {
            class A {
            }

            container.register(A);
            expect(() => container.resolve(A)).to.throw();
        });
    });
});