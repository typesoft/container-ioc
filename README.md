![alt text](http://abcselfstorageperth.com.au/wp-content/uploads/2014/08/icon-container-storage1.png)


## **container-ioc** 
is a [Dependency Injection](https://en.wikipedia.org/wiki/Dependency_injection) / [Inversion of Control (IoC) container](http://martinfowler.com/articles/injection.html) package for Javascript and Node.js applications powered by Typescript . It manages the dependencies between classes, so that applications stay easy to change and maintain as they grow.

[![npm version](https://badge.fury.io/js/container-ioc.svg)](https://badge.fury.io/js/container-ioc)
[![Build Status](https://travis-ci.org/thohoh/container-ioc.svg?branch=master)](https://travis-ci.org/thohoh/container-ioc)
[![npm](https://img.shields.io/npm/dt/container-ioc.svg)](https://www.npmjs.com/package/container-ioc)
[![Gitter chat](https://badges.gitter.im/container-ioc/Lobby.png)](https://gitter.im/container-ioc/Lobby)
[![license](https://img.shields.io/github/license/thohoh/container-ioc.svg)](https://github.com/thohoh/container-ioc/blob/master/LICENSE)

### Features:
* Well-known Angular DI API.
* No external dependencies.
* Life Time control.
* Hierarchical containers.
* Resolves values using Classes, Factories and Values.
* Descriptive error messages.
* 97% test coverage.

### Examples:  
* [examples/javascript](examples/javascript)
* [examples/typescript](examples/typescript)


### Installation:
```
npm install --save container-ioc
```
### Basics:
> Code examples below are written in Typescript. Check [examples/javascript](examples/javascript) for examples written in Javascript.

#### Step 1. Define your interfaces and types.
> Possible values for types: **Symbol**, **string**, **Object**.

```typescript
interface IApplication {
    run(): void;
}

interface IService {
    serve(): void;
}

const TApplication = Symbol('IApplication');

const TService = Symbol('IService');
```

#### Step 2. Declare dependencies with decorators **Injectable** and **Inject**.

```typescript
import { Injectable, Inject } from 'container-ioc';

@Injectable()
export class Application implements IApplication {
    constructor(Inject(TService) private service: ISerivce) {}
    
    run(): void {
        this.service.serve();
    }
}

@Injectabe()
export class Service implements IService {
    serve(): void {
        // serves
    }
}
```

#### Step 3. Create a container and register types in there.

```typescript
import { Container } from 'container-ioc';

let container = new Container();

contaoner.register([
    { token: TApplication, useClass: Application },
    { token: TService, useClass: Service }
]);
```

#### Step 4. Resolve value from the container.

```typescript
let app = container.resolve(TApplication);

app.run();
```

#### Step 2 for Javascript.
> Since Javascript does not support parameter decorators, use alternative API for declaring dependencies. In this case we don't use **Inject** decorator. See [examples/javascript](examples/javascript) for more.
```javascript

@Injectable([TService])
class Service {
    constructor(service) {
        this.service = service;
    }
}
```

### Life Time control.
> By default, containers resolve singletons when **useClass** and **useFactory**. Change it by setting **lifeTime** attribute to **LifeTime.PerRequest**.

```typescript
import { LifeTime } from 'container-ioc';

container.register([
    { token: TService, useClass: Service, lifeTime: LifeTime.PerRequest }
]);
```
```typescript
container.register([
    {
        token: TService,
        useFactory: () => { serve(): void {} },
        lifeTime: LifeTime.PerRequest }
]);
```

### Hierarchical containers.
> If container can't find value, it will look it up in ascendant containers.
```typescript

let parentContainer = new Container();
let childContainer = parentContainer.createChild();

parentContainer.register({ token: TApplication, useClass: Application });

childContainer.resolve(TApplication);
```
> You can also assign parent container to any other container
```typescript
let parent = new Container();
let child = new Container();

child.setParent(parent);
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

## Contribution:
Become a contributor to this project. Feel free to submit an [issue](https://github.com/thohoh/container-ioc/issues) or a pull request.

see [CONTRIBUTION.md](CONTRIBUTION.md) for more information.