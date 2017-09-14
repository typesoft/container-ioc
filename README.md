## IoC Container in Typescript

### API usage:

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