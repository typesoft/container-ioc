import { IContainer } from '../lib/container.interface';
import { Container } from '../lib/index';

import 'mocha';
import { expect } from 'chai';
import { InjectionToken } from '../lib/index';
import { Inject, Injectable } from '../lib/decorators';
import { LifeTime } from '../lib/interfaces';

/* tslint:disable: no-unused-expression max-classes-per-file*/

describe('Container', () => {

    let container: IContainer;

    beforeEach(() => {
        container = new Container();
    });

    describe('resolve()', () => {
        it('should resolve an instance when registered with a class Literal', () => {
            @Injectable()
            class TestClass {}
            container.register(TestClass);

            const instance = container.resolve(TestClass);
            expect(instance).to.be.ok;
            expect(instance instanceof TestClass).to.be.true;
        });

        it('should resolve an instance when registered "useClass" attribute', () => {
            @Injectable()
            class TestClass {}
            const testToken = 'ITestClass';

            container.register({ token: testToken, useClass: TestClass });
            const instance = container.resolve(testToken);
            expect(instance).to.be.ok;
            expect(instance instanceof TestClass).to.be.true;
        });

        it('should resolve an instance when registered with "useValue" attribute', () => {
            const value = {};
            container.register({ token: 'Token', useValue: value });
            const instance = container.resolve('Token');
            expect(instance).to.be.ok;
            expect(instance === value).to.be.true;
        });

        it('should resolve an instance if registered with array of providers', () => {
            @Injectable()
            class TestClass {}
            const testToken = 'ITestClass';

            container.register([{ token: testToken, useClass: TestClass }]);
            const instance = container.resolve(testToken);
            expect(instance).to.be.ok;
            expect(instance instanceof TestClass).to.be.true;
        });

        it('should resolve a value if registered and resolved with a token which is a string literal', () => {
            @Injectable()
            class TestClass {}
            const testToken = 'ITestClass';

            container.register({ token: testToken, useClass: TestClass });
            const instance = container.resolve(testToken);
            expect(instance).to.be.ok;
            expect(instance instanceof TestClass).to.be.true;
        });

        it('should resolve a value when registered with a token which is an Object literal', () => {
            @Injectable()
            class TestClass {}
            container.register({ token: TestClass, useClass: TestClass });
            const instance = container.resolve(TestClass);
            expect(instance).to.be.ok;
            expect(instance instanceof TestClass).to.be.true;
        });

        it(`should resolve an instance found in ascendant containers if wasn't found in current container`, () => {
            @Injectable()
            class TestClass {}

            container.register(TestClass);
            const childContainer = container.createScope();
            const grandChildContainer = childContainer.createScope();

            const instance = grandChildContainer.resolve(TestClass);
            expect(instance).to.be.ok;
            expect(instance instanceof TestClass).to.be.true;
        });

        it('should resolve value when registered with "useFactory"', () => {
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
            @Injectable()
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

            @Injectable()
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

        describe('LifeTime', () => {
            it('should resolve a singleton by default if LifeTime was not specified with useClass', () => {
                @Injectable()
                class A {}

                container.register({ token: A, useClass: A });

                const instance1 = container.resolve(A);
                const instance2 = container.resolve(A);

                expect(instance1).to.be.equal(instance2);
            });

            it('should resolve a singleton by default if LifeTime was not specified with useFactory', () => {
                class A {}

                container.register([
                    {
                        token: A,
                        useFactory: () => new A()
                    }
                ]);

                const instance1 = container.resolve(A);
                const instance2 = container.resolve(A);

                expect(instance1).to.be.equal(instance2);
            });

            it('should resolve an instance with useFactory if LifeTime was set to LifeTime.PerRequest', () => {
                class A {}

                container.register([
                    {
                        token: A,
                        useFactory: () => new A(),
                        lifeTime: LifeTime.PerRequest
                    }
                ]);

                const instance1 = container.resolve(A);
                const instance2 = container.resolve(A);

                expect(instance1).not.to.be.equal(instance2);
            });

            it('should resolve an instances if LifeTime was set to LifeTime.PerRequest', () => {
                @Injectable()
                class A {}

                container.register({ token: A, useClass: A, lifeTime: LifeTime.PerRequest });

                const instance1 = container.resolve(A);
                const instance2 = container.resolve(A);

                expect(instance1).not.to.be.equal(instance2);
            });

            it('should resolve different instances if LifeTime was set to LifeTime.PerRequest in case of nested dependencies', () => {
                @Injectable()
                class A {
                    constructor(@Inject('IB') private b: any) {}
                }

                @Injectable()
                class B {

                }

                container.register({ token: A, useClass: A, lifeTime: LifeTime.PerRequest });
                container.register({ token: 'IB', useClass: B});

                const instance1: any = container.resolve(A);
                const instance2: any = container.resolve(A);

                expect(instance1).not.to.be.equal(instance2);
                expect(instance1.b).to.be.equal(instance2.b);
            });

            it('should set default lifeTime via options', () => {
                const cont = new Container({
                    defaultLifeTime: LifeTime.PerRequest
                });

                @Injectable()
                class A {}

                cont.register({ token: A, useClass: A });
                let instance1 = cont.resolve(A);
                let instance2 = cont.resolve(A);

                expect(instance1).not.to.be.equal(instance2);

                cont.register({ token: 'IB', useFactory: () => ({}) });
                instance1 = cont.resolve('IB');
                instance2 = cont.resolve('IB');

                expect(instance1).not.to.be.equal(instance2);
            });
        });

        describe('Errors', () => {
            it('should throw an error if provided token is not registered', () => {
                @Injectable()
                class TestClass {}
                container.register([{ token: 'Token', useClass: TestClass }]);

                const throwableFunc = () => container.resolve('NotRegisteredToken');
                expect(throwableFunc).to.throw();
            });

            it('should correctly print token in error messages: Token is a class literal', () => {
                @Injectable()
                class B {}

                @Injectable()
                class A {
                    constructor(@Inject(B) private b: any) {}
                }

                container.register({ token: 'IA', useClass: A });

                const throwableFunc = () => container.resolve('IA');
                expect(throwableFunc).to.throw('No provider for B. Trace: IA --> B');
            });

            it('should correctly print token in error messages: Token is an InjectionToken', () => {
                @Injectable()
                class A {}

                container.register({ token: 'IA', useClass: A });

                interface IB {
                    [key: string]: any;
                }

                const TB = new InjectionToken<IB>('IB');

                const throwableFunc = () => container.resolve(TB);
                expect(throwableFunc).to.throw('No provider for IB. Trace: IB');
            });

            it('should correctly print token in error messages: Token is a string', () => {
                @Injectable()
                class A {}

                container.register({ token: 'IA', useClass: A });

                const throwableFunc = () => container.resolve('str');
                expect(throwableFunc).to.throw('No provider for str. Trace: str');
            });

            it('should throw an error with a specific message if the 1st token in the line is not registered', () => {
                @Injectable()
                class A {
                    constructor(@Inject('d') private a: any) {}
                }
                container.register([{ token: 'IA', useClass: A }]);

                const throwableFunc = () => container.resolve('Fish');
                expect(throwableFunc).to.throw('No provider for Fish. Trace: Fish');
            });

            it('should throw an error with a specific message if the 2nd token in the line is not registered', () => {
                @Injectable()
                class A {
                    constructor(@Inject('IB') private b: any) {}
                }
                container.register([{ token: 'IA', useClass: A }]);

                const throwableFunc = () => container.resolve('IA');
                expect(throwableFunc).to.throw('No provider for IB. Trace: IA --> IB');
            });

            it('should throw an error with a specific message if the 3nd token in the line is not registered', () => {
                @Injectable()
                class A {
                    constructor(@Inject('IB') private b: any) {}
                }

                @Injectable()
                class B {
                    constructor(@Inject('IC') private c: any) {}
                }
                container.register({ token: 'IA', useClass: A });
                container.register({ token: 'IB', useClass: B });

                const throwableFunc = () => container.resolve('IA');
                expect(throwableFunc).to.throw('No provider for IC. Trace: IA --> IB --> IC');
            });

            it('should throw an error if registered class isnt marked with Injectable() decorator', () => {
                class A {
                }
                container.register({ token: 'IA', useClass: A });

                const throwableFunc = () => container.resolve('IA');
                expect(throwableFunc).to.throw(`Class A is not injectable. Check if it's decorated with @Injectable() decorator`);
            });

            it('should print Symbol types properly in error messages', () => {
                const TB = Symbol('IB');

                @Injectable()
                class A {
                    constructor(@Inject(TB) private b: any) {}
                }
                container.register({ token: 'IA', useClass: A });

                const throwableFunc = () => container.resolve('IA');

                expect(throwableFunc).to.throw('No provider for IB. Trace: IA --> IB');
            });

            it('should resolve container instance when injected into class Literal', () => {
                @Injectable()
                class TestClass {
                    constructor(@Inject(Container) public a: IContainer) {}
                }

                container.register({ token: TestClass, useClass: TestClass });
                const actual = container.resolve(TestClass);

                expect(actual).to.be.ok;
                expect(actual.a).to.be.ok;
                expect(actual.a).to.equal(container);
            });
        });

        describe('Hierarchial', () => {
            it(`should start looking up dependencies by starting from the container it's first entity was resolved from`, () => {

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

                expect(a.b.c).to.be.instanceof(C);
            });

            it(`should start looking up dependencies by starting from the container it's first entity was resolved from`, () => {
                @Injectable()
                class D {}

                @Injectable()
                class C {
                    constructor(@Inject('ID') public d: D) {}
                }

                @Injectable()
                class AscendantC {}

                @Injectable()
                class B {
                    constructor(@Inject('IC') public c: C) {}
                }

                @Injectable()
                class A {
                    constructor(@Inject('IB') public b: B) {}
                }

                const childContainer = container.createChild();

                container.register([
                    { token: 'IB', useClass: B },
                    { token: 'IC', useClass: AscendantC },
                    { token: 'ID', useClass: Function }
                ]);

                childContainer.register([
                    { token: 'IA', useClass: A },
                    { token: 'IC', useClass: C },
                    { token: 'ID', useClass: D }
                ]);

                const a = childContainer.resolve('IA');

                expect(a.b.c).to.be.instanceof(C);
                expect(a.b.c.d).to.be.instanceof(D);
            });
        });
    });

    describe('Constructor', () => {
        it('should set defaultLife through option object', () => {
            const cont = new Container({ defaultLifeTime: LifeTime.PerRequest });

            cont.register({ token: 'A', useFactory: () => ({})});

            const instance1 = cont.resolve('A');
            const instance2 = cont.resolve('A');

            expect(instance1).not.to.be.equal(instance2);
        });

        it('should register itself for injection', () => {
            const actual = container.resolve(Container);

            expect(actual).to.be.ok;
            expect(actual).to.equal(container);
        });
    });

    describe('createChild()', () => {
        it('should create child container', () => {
            const childContainer: any = container.createChild();
            expect(childContainer).to.be.ok;
            expect(childContainer.parent).to.equal(container);
        });
    });

    describe('setParent()', () => {
        it('should set parent for a container', () => {
            const parentContainer = new Container();
            const childContainer = new Container();
            childContainer.setParent(parentContainer);

            parentContainer.register({ token: 'A', useValue: 'string' });

            const value = childContainer.resolve('A');

            expect(value).to.be.equal('string');
        });
    });    
});