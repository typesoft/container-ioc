## IoC Container written in Typescript
Annotation based Inversion of Controll container with friendly API.

#### Installation:
```
npm install --save container-ioc
```

### API usage:
> Container's API and behaviour is very similar to the one used in **Angular4**.

##### in your Typescript project:
```Typescript
import { Container, Inject } from 'container-ioc';

let container = new Container();

@Injectable()
class A {}

@Injectable()
class B {}

@Injectable()
class C {
    constructor(@Inject(B) public b: B) { // use @Inject() decorator to mark dependencies
    }
}

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

@Injectable()
class ConcreteFactory implements IFactory {}

container.register({ token: TFactory, useClass: ConcreteFactory });

let factory: IFactory = container.resolve(TFactory);

```


### Scoped containers
> if a provider wasn't found in a container it will look up in ascendant containers if there's any:
```Typescript
import { Container } from 'container-ioc';

@Injectable()
class A {}

let parentContainer = new Container();
let childContainer = parentContainer.createScope();

parentContainer.register({ token: 'IA', useClass: A });

childContainer.resolve('IA');

```

### Contribution:
Feel free to submit a bug or a feature request.
Or pick an issue from [here](https://github.com/thohoh/container-ioc/issues) and leave a comment with your proposal.

see [CONTRIBUTION.md](CONTRIBUTION.md)