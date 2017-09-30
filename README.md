## IoC Container written in Typescript
<p> Annotation based Inversion of Controll container implementation.

#### Installation:
```
npm install --save container-ioc
```

### API usage:
> Container's API and behaviour is very similar to the one used in **Angular4**.

##### in a Typescript project:
```Typescript
import { Container, Inject } from 'container-ioc';

let container = new Container();

// Register classes:
class A {}
class B {}

class C {
    constructor(@Inject(B) public b: B) { // use @Inject() decorator to mark injections in a class
    }
}


// Register classes in the container:
// You can pass just a Class literal alone or a provider literal -> 
// { token: 'string or class literal', useClass: 'class literal' }
let providers = [
    A,
    { token: 'IB', useClass: B }, 
    { token: C, useClass: C },
    { token: 'UseValue', useValue: 'any-primitive-or-object'},
    {
        token: 'FromFactory',
        useFactory: () => {
            return 'something';
        }
    },
    {
        token: 'FromFactoryWithInjections',
        useFactory: (value, b, c) => {
            return `${value + b.constructor.name + c.constructor.name}`;
        },
        inject: ['UseValue', 'IB', C]
    }
];

container.register(providers);


// Resolve instances
let a: A = container.resolve(A);
let b: B = container.resolve('IB');
let c: C = container.resolve(C);
let value: string = container.resolve('UseValue');
let fromFactory: string = container.resolve('FromFactory');
let fromFactoryWithInjections: string = container.resolve('FromFactoryWithInjections');
```

### Injection Token
> Using string literals for tokens can become a head ache, use Injection Token instread:
```Typescript
import { InjectionToken, Container } from 'container-ioc';

let container = new Container();

interface IFactory {
    create(): any;
}

const TFactory = new InjectionToken<IFactory>('IFactory'); // T in TFactory stands for token

class ConcreteFactory implements IFactory {}

container.register({ token: TFactory, useClass: ConcreteFactory });

let factory: IFactory = container.resolve(TFactory);

```


### Scoped containers
> if a provider wasn't found in a container it will look up in ascendant containers if there's any:
```Typescript
import { Container } from 'container-ioc';

class A {}

let parentContainer = new Container();
let childContainer = parentContainer.createScope();

parentContainer.register({ token: 'IA', useClass: A });

let a = childContainer.resolve('IA');
a.doStuff(); // hello world

```

### Future:

It's just a very basic version. I'm going to add more functionality to meet common use cases, such as ability 
to mark injections in constructor with types for typescript projects and more handy API.

### Contribution:
If you want to help feel free to submit a bug or a feature request.
Also leave a comment under the issue you'd like to work on.

see [CONTRIBUTION.md](CONTRIBUTION.md)