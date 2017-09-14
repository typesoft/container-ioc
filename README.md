## IoC Container written in Typescript


### API usage:

##### in a Typescript project:
```Typescript
import { Container, Inject } from 'container-ioc';

let container = new Container();


// Register classes:
class RandomClass1 {};
class RandomClass3 {
    doSomething(): void {
        console.log('hello world');
    }
};


// Use Injector decorater to inject dependencies:
class RandomClass2 {
    constructor(@Inject(RandomClass3) public instance3: any) {
    }
};


// Register classes in the container:
// You can pass just a Class literal alone or a provider literal -> 
// { token: 'string or class literal', useClass: 'class literal' }
let providers = [
    RandomClass1,
    { token: 'anystring', useClass: RandomClass2 }, 
    { token: RandomClass3, useClass: RandomClass3 }
];

container.register(providers);


// Resolve instances
let instance1: RandomClass1 = container.resolve(RandomClass1);
let instance2: RandomClass2 = container.resolve('anystring');
instance2.instance3.doSomething(); // hello world
```

##### in a ES6 project:
```Javascript
let Container = require('container-ioc').Container;

let container = new Container();


// Register classes:
class RandomClass1 {};
class RandomClass3 {
    doSomething() {
        console.log('hello world');
    }
};


// Use Injector decorater to inject dependencies:
class RandomClass2 {
    instance3;
    constructor() {
        this.instance3 = container.resolve(RandomClass3);
    }
};


// Register classes in the container:
// You can pass just a Class literal alone or a provider literal -> 
// { token: 'string or class literal', useClass: 'class literal' }
let providers = [
    RandomClass1,
    { token: 'anystring', useClass: RandomClass2 }, 
    { token: RandomClass3, useClass: RandomClass3 }
];

container.register(providers);


// Resolve instances
let instance1 = container.resolve(RandomClass1);
let instance2 = container.resolve('anystring');
instance2.instance3.doSomething(); // hello world
```

### Scoped containers
> if a provider wasn't found in a container it will look up in ascendant containers if there's any:
```Typescript
import { Container } from 'container-ioc';

class SomeClass {
    doStuff(): void {
        console.log('hello world');
    }
}

let parentContainer = new Container();
let childContainer = parentContainer.createScope();

parentContainer.register({ token: 'ISome', useClass: SomeClass });
childContainer.resolve('ISome');

let instance = childContainer.resolve('ISome');
instance.doStuff(); // hello world

```