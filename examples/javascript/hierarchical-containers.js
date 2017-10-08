import { Container } from 'container-ioc';

/*
    If a container can't find a value within itself, it will look it up in ascendant containers.
    There a 3 ways to set a parent for a container:
 */

const grandParentContainer = new Container();

// 1.
const parentContainer = grandParentContainer.createChild();

// 2.
const childContainer = new Container();
childContainer.setParent(parentContainer);

// 3.
const deepNestedContainer = new Container({
    parent: childContainer
});

grandParentContainer.register([
    { token: 'IConfig', useValue: {}}
]);

deepNestedContainer.resolve('IConfig');