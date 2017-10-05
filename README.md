![alt text](http://abcselfstorageperth.com.au/wp-content/uploads/2014/08/icon-container-storage1.png)


## **container-ioc** 
is [Dependency Injection](https://en.wikipedia.org/wiki/Dependency_injection) and [IoC container](http://martinfowler.com/articles/injection.html) for both **Typescript** and **ES6+** projects. It manages the dependencies between classes, so that applications stay easy to change and maintain as they grow.

[![npm version](https://badge.fury.io/js/container-ioc.svg)](https://badge.fury.io/js/container-ioc)
[![Build Status](https://travis-ci.org/thohoh/container-ioc.svg?branch=master)](https://travis-ci.org/thohoh/container-ioc)
[![npm](https://img.shields.io/npm/dt/container-ioc.svg)](https://www.npmjs.com/package/container-ioc)
[![license](https://img.shields.io/github/license/thohoh/container-ioc.svg)](https://github.com/thohoh/container-ioc/blob/master/LICENSE)

### Features:
* Well-known Angular4+ DI API.
* Can be used in ES6+/Typescript projects.
* No external dependencies.
* Singleton and Non-Singleton configuration.
* Hierarchical containers.
* Pluggable metadata annotator.
* 97% test coverage.

#### Installation:
```
npm install --save container-ioc
```

### Quick start

##### Typescript:
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

### Javascript ES6+:
##### use alternative syntax for declaring injections shown below and don't use interfaces.
```javascript

@Injectable(['IService'])
class Service implements IService {
    constructor(service) {
        this.service = service;
    }
}
```

### NOTE: All the examples below are written in Typescript. Check out [examples/javascript](examples/javascript) and [examples/typescript](examples/typescript) for reference.

### Best Practise: use InjectionToken instances for tokens instead of string/class literals:

##### Without InjectionToken:
```typescript
interface IService {}

@Injectable()
class ConcreteService {}

container.register({ token: 'IService', useClass: ConcreteService });
container.resolve('IService');

```
##### With InjectionToken
```typescript
interface IService {}

const TService = new InjectionToken<IService>('IService'); // T stands for Token, you can pick another prefix

@Injectable()
class ConcreteService {}

container.register({ token: TService, useClass: ConcreteService });
container.resolve(TService);
```

### Examples:
* [using factory](https://github.com/thohoh/container-ioc/blob/master/examples/use-factory.ts)
* [using factory with injections](https://github.com/thohoh/container-ioc/blob/master/examples/use-factory-with-injections.ts)
* [using value](https://github.com/thohoh/container-ioc/blob/master/examples/use-value.ts)
* [persistence control](https://github.com/thohoh/container-ioc/blob/master/examples/persistence-control.ts)
* [more examples](https://github.com/thohoh/container-ioc/blob/master/examples/)

### Persistence control.
> By default, resolved instances are singletons. You can change that by setting provider's attribute **LifeTime**  to **LifeTime.PerRequest**.
```typescript
import { Container, Injectable, LifeTime } from 'container-ioc';

const container = new Container();

@Injectable()
class A {}

container.register({ token: A, useClass: A, lifeTime: LifeTime.PerRequest });

const instance1 = container.resolve(A);
const instance2 = container.resolve(A);

// instance1 !== instance2

```

### Hierarchical containers.
> if a provider wasn't found in a container it will look up in ascendant containers if there are any:
```typescript
import { Container } from 'container-ioc';

@Injectable()
class A {}

let parentContainer = new Container();
let childContainer = parentContainer.createScope();

parentContainer.register({ token: 'IA', useClass: A });

childContainer.resolve('IA');

```

### Pluggable metadata annotator.
> By default metadata is assigned to static properties.
> If you want to use Reflect API for annotation, you can implement **IMetadataAnnotator** interface with your implementation using Reflect API. Then plug it into **AnnotatorProvider**
```typescript
import { AnnotatorProvider, IMetadataAnnotator, Container } from 'container-ioc';

class ReflectMetadataAnnotator implements IMetadataAnnotator {
    // your implementation
}

AnnotatorProvider.set(new ReflectMetadataAnnotator());

let container = new Container();

...
```

### Contribution:
Feel free to submit a bug or a feature request.
Or pick an issue from [here](https://github.com/thohoh/container-ioc/issues) and leave a comment with your proposal.

see [CONTRIBUTION.md](CONTRIBUTION.md)