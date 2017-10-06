![alt text](http://abcselfstorageperth.com.au/wp-content/uploads/2014/08/icon-container-storage1.png)


## **container-ioc** 
is a [Dependency Injection](https://en.wikipedia.org/wiki/Dependency_injection) / [IoC container](http://martinfowler.com/articles/injection.html) package for  **Typescript**/**ES6+** projects. It manages the dependencies between classes, so that applications stay easy to change and maintain as they grow.

[![npm version](https://badge.fury.io/js/container-ioc.svg)](https://badge.fury.io/js/container-ioc)
[![Build Status](https://travis-ci.org/thohoh/container-ioc.svg?branch=master)](https://travis-ci.org/thohoh/container-ioc)
[![npm](https://img.shields.io/npm/dt/container-ioc.svg)](https://www.npmjs.com/package/container-ioc)
[![Gitter chat](https://badges.gitter.im/container-ioc/Lobby.png)](https://gitter.im/container-ioc/Lobby)
[![license](https://img.shields.io/github/license/thohoh/container-ioc.svg)](https://github.com/thohoh/container-ioc/blob/master/LICENSE)

### Features:
* Well-known Angular4+ DI API.
* ES6+/Typescript.
* No external dependencies.
* Life Time control.
* Hierarchical containers.
* Resolves values using Classes, Factories and Values.
* Descriptive error messages.
* 97% test coverage.

### Quick start

#### Installation:
```
npm install --save container-ioc
```

#### Typescript:
```typescript
import { Container, Inject, Injectable } from 'container-ioc';

let container = new Container();

@Injectable()
class App {}

interface IService {}

@Injectable()
class Service implements IService {
    constructor(@Inject('IService') public service: IService) {}
}

let providers = [
    { token: App, useClass: App }, 
    { token: 'IService', useClass: Service }
];

container.register(providers);

let app = container.resolve(App);
```

#### Javascript ES6+:
> Use alternative syntax for declaring injections shown below and don't use interfaces. See [examples/javascript](examples/javascript) for more.
```javascript

@Injectable(['IService'])
class Service {
    constructor(service) {
        this.service = service;
    }
}
```

### Examples:  
* [examples/javascript](examples/javascript)
* [examples/typescript](examples/typescript)

## Code examples below are written in Typescript.

### Life Time control.
> By default, containers resolve singletons. You can change that by setting provider's attribute **LifeTime**  to **LifeTime.PerRequest**.
```typescript
import { Container, Injectable, LifeTime } from 'container-ioc';

const container = new Container();

@Injectable()
class A {}

container.register([
    { token: A, useClass: A, lifeTime: LifeTime.PerRequest }
]);

const instance1 = container.resolve(A);
const instance2 = container.resolve(A);
```

### Hierarchical containers.
> If a provider wasn't found in a container it will look up in ascendant containers if there are any:
```typescript
import { Container } from 'container-ioc';

@Injectable()
class A {}

let parentContainer = new Container();
let childContainer = parentContainer.createScope();

parentContainer.register({ token: 'IA', useClass: A });

childContainer.resolve('IA');

```

### Using Factories
```typescript
/* Without injections */
container.register([
    {
        token: 'TokenForFactory',
        useFactory: () => {
            return 'any-value';
        }
    }
]);

/* With injections */
container.register([
    { token: 'EnvProvider', useClass: EnvProvider },
    {
        token: 'TokenForFactory',
        useFactory: (envProvider) => {
            // do something
            return 'something';
        },
        inject: ['EnvProvider']
    }
]);
```

### Using Values 
```typescript
container.register([
    { token: 'IConfig', useValue: {}}
]);
```

### Shortcut for Classes
```typescript
container.register([
    App
]);
```
Is the same as:
```typescript
container.register([
    { token: App, useClass: App }
]);
```

### Best Practise, use InjectionToken
> Use **InjectionToken** instances for tokens instead of string/class literals, 
it saves from using hardcoded string and **helps in keeping abstractions intact**.

Before:
```typescript
interface IService {}

@Injectable()
class ConcreteService {}

container.register({ token: 'IService', useClass: ConcreteService });
container.resolve('IService');
```
After:

```typescript
interface IService {}

const TService = new InjectionToken<IService>('IService'); // T stands for Token, you can pick another prefix

@Injectable()
class ConcreteService {}

container.register({ token: TService, useClass: ConcreteService });
container.resolve(TService);
```


## Contribution:
Become a contributor to this project. Feel free to submit an [issue](https://github.com/thohoh/container-ioc/issues) or a pull request.

see [CONTRIBUTION.md](CONTRIBUTION.md) for more information.