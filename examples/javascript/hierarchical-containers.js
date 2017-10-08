import { Container } from 'container-ioc';

const grandParentContainer = new Container();

const parentContainer = grandParentContainer.createChild();

const childContainer = new Container();
childContainer.setParent(parentContainer);

const deepNestedContainer = new Container({
    parent: childContainer
});

grandParentContainer.register([
    { token: 'IConfig', useValue: {}}
]);

deepNestedContainer.resolve('IConfig');