import { Container } from 'container-ioc';

const grandParentContainer = new Container();

const parentContainer = grandParentContainer.createChild();

const childContainer = new Container();
childContainer.setParent(parentContainer);

grandParentContainer.register([
    { token: 'IConfig', useValue: {}}
]);

childContainer.resolve('IConfig');