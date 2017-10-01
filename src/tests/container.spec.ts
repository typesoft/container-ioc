import { IContainer } from '../lib/container.interface';
import { Container } from '../lib/index';

import 'mocha';
import { expect } from 'chai';
import { IConstructor, IProvider } from '../lib/interfaces';
import { InjectionToken } from '../lib/index';

/* tslint:disable: no-unused-expression max-classes-per-file*/

describe('Container', () => {

    let container: IContainer;

    beforeEach(() => {
        container = new Container();
    });

    describe('resolve()', () => {
        it('should resolve an instance when registered with a class Literal', () => {
            const testClass: IConstructor = class TestClass {};
            container.register(testClass);
            const instance = container.resolve(testClass);
            expect(instance).to.be.ok;
            expect(instance instanceof testClass).to.be.true;
        });

        it('should resolve an instance when registered "useClass" attribute', () => {
            const testClass = class TestClass {};
            const testToken = 'ITestClass';

            container.register({ token: testToken, useClass: testClass });
            const instance = container.resolve(testToken);
            expect(instance).to.be.ok;
            expect(instance instanceof testClass).to.be.true;
        });

        it('should resolve an instance when registered with "useValue" attribute', () => {
            const value = {};
            container.register({ token: 'Token', useValue: value });
            const instance = container.resolve('Token');
            expect(instance).to.be.ok;
            expect(instance === value).to.be.true;
        });

        it('should resolve an instance if registered with array of providers', () => {
            const testClass = class TestClass {};
            const testToken = 'ITestClass';

            container.register([{ token: testToken, useClass: testClass }]);
            const instance = container.resolve(testToken);
            expect(instance).to.be.ok;
            expect(instance instanceof testClass).to.be.true;
        });

        it('should resolve a value if registered and resolved with a token which is a string literal', () => {
            const testClass = class TestClass {};
            const testToken = 'ITestClass';

            container.register({ token: testToken, useClass: testClass });
            const instance = container.resolve(testToken);
            expect(instance).to.be.ok;
            expect(instance instanceof testClass).to.be.true;
        });

        it('should resolve a value when registered with a token which is an Object literal', () => {
            const testClass = class TestClass {};
            container.register({ token: testClass, useClass: testClass });
            const instance = container.resolve(testClass);
            expect(instance).to.be.ok;
            expect(instance instanceof testClass).to.be.true;
        });

        it('should throw an error if provided token is not registered', () => {
            const testClass = class TestClass {};
            container.register([{ token: 'Token', useClass: testClass }]);

            const throwableFunc = () => container.resolve('NotRegisteredToken');
            expect(throwableFunc).to.throw();
        });

        it(`should resolve an instance found in ascendant containers if wasn't found in current container`, () => {
            const testClass: IConstructor = class TestClass {};
            container.register(testClass);
            const childContainer = container.createScope();
            const grandChildContainer = childContainer.createScope();

            const instance = grandChildContainer.resolve(testClass);
            expect(instance).to.be.ok;
            expect(instance instanceof testClass).to.be.true;
        });

        it('should resolve ф value when registered with "useFactory"', () => {
            container.register({
                token: 'V',
                useFactory: () => {
                    return 'result';
                }
            });

            const inst = container.resolve('V');
            expect(inst).to.be.equal('result');
        });

        it('should resolve a value if registered with "useFactory" + "inject" attributes', () => {
            class Foo {
                bar = 'works';
            }
            container.register({ token: 'IFoo', useClass: Foo} );

            container.register({
                token: 'V',
                useFactory: (foo: any) => {
                    return foo.bar;
                },
                inject: ['IFoo']
            });

            const inst = container.resolve('V');
            expect(inst).to.be.equal('works');
        });

        it('should resolve value if registered with InjectionToken', () => {
            interface IFactory {
                create(): any;
            }

            class ConcreteFactory implements IFactory {
                create(): any {
                    return;
                }
            }

            const TFactory = new InjectionToken<IFactory>('IFactory');

            container.register({ token: TFactory, useClass: ConcreteFactory } );

            const concreteFactory = container.resolve(TFactory);

            expect(concreteFactory instanceof ConcreteFactory).to.be.true;
        });
    });

    describe('createScope()', () => {
        it('should create child scope', () => {
            const childContainer: any = container.createScope();
            expect(childContainer).to.be.ok;
            expect(childContainer.parent).to.equal(container);
        });
    });
});