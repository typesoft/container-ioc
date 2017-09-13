import { IContainer } from '../lib/container.interface';
import { Container } from '../lib/container';

import 'mocha';
import { expect } from 'chai';

describe('Container', function() {

    let container: IContainer;

    beforeEach(function() {
        container = new Container();
    });

    describe('resolve()', () => {
        it('should resolve an instance of a given provider when registered with a single class literal', () => {
            let testClass = class TestClass {};
            container.register(testClass);
            let instance = container.resolve(testClass);
            expect(instance).to.be.ok;
            expect(instance instanceof testClass).to.be.true;
        });

        it('should resolve an instance of a given class when registered with a provider literal', () => {
            let testClass = class TestClass {};
            const testToken = 'ITestClass';

            container.register({ token: testToken, useClass: testClass });
            let instance = container.resolve(testToken);
            expect(instance).to.be.ok;
            expect(instance instanceof testClass).to.be.true;
        });

        it('should resolve an instance of a given when registered with array of providers/tokens', () => {
            let testClass = class TestClass {};
            const testToken = 'ITestClass';

            container.register([{ token: testToken, useClass: testClass }]);
            let instance = container.resolve(testToken);
            expect(instance).to.be.ok;
            expect(instance instanceof testClass).to.be.true;
        });

        it('should throw an error if provided token is not registered', () => {
            let testClass = class TestClass {};
            const testToken = 'ITestClass';

            container.register([{ token: testToken, useClass: testClass }]);


            let throwableFunc = () => container.resolve('RandomToken');
            expect(throwableFunc).to.throw();
        });

        it('should look for instance in ascendant containers if it wasnt found in the current container', () => {
            let testClass = class TestClass {};
            container.register(testClass);
            let childContainer = container.createScope();
            let grandChildContainer = childContainer.createScope();

            let instance = grandChildContainer.resolve(testClass);
            expect(instance).to.be.ok;
            expect(instance instanceof testClass).to.be.true;
        });
    });

    describe('createScope()', () => {
        it('should create child scope', () => {
            let childContainer: any = container.createScope();
            expect(childContainer).to.be.ok;
            expect(childContainer.parent).to.equal(container);
        });
    });
});