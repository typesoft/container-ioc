<a name="1.7.16"></a>
# [1.7.16]() (2017-11-30)

### Added 
* **Component** decorator - functions the same as Injectable.

<a name="1.7.15"></a>
# [1.7.15]() (2017-10-18)

### Fixed
* **Wrong hierarchical dependency resolution**.

<a name="1.7.14"></a>
# [1.7.14]() (2017-10-14)

### Fixed
* **Wrong injections order when using Inject decorator**.

<a name="1.7.3"></a>
# [1.7.3]() (2017-10-07)

### API changes
#### Container
* **Added option parameter to constructor**. - options object has two attributes: (parent and defaultLifeTime).

### Fixed
* **Factories always resolve instances**.

<a name="1.7.0"></a>
# [1.7.0]() (2017-10-07)

### API changes
#### Container
* **Container.createScope() is marked as deprecated, use Container.createChild() instead+**.
* **Added method Container.setParent()**.

### Fixed
* **Symbol values for types are now properly handled in error messages**.

<a name="1.6.8"></a>
# [1.6.8]() (2017-10-05)

### Features

* **Added support for ES6+** - Added new syntax for declaring injectioins of a class, now it's possible via Injectable decorator. see [examples/javascript](examples/javascript).

<a name="1.6.0"></a>
# [1.6.0]() (2017-10-04)

### Features

* **Life Time control** - added LifeTime managment configuration, see [example](examples/typescript/life-time-control.ts) [5ba097a9cb](https://github.com/thohoh/container-ioc/commit/5ba097a9cb41277e0e9013d4ef5e694f3595de36)

<a name="1.5.0"></a>
# [1.5.0]() (2017-10-02)

### Features

* **Plugable MetadataAnnotator via AnnotatorProvider** examples on [README.md](README.md) [551cbc9c](https://github.com/thohoh/container-ioc/commit/551cbc9cfc9316ce72ad9572ac500089b011ca12)

### Removed
* **reflect-metadata as a dependency**

<a name="1.4.0"></a>
# [1.4.0]() (2017-10-01)

### Features

* **@Injectable() decorator:** - now to make a class available for injection you have to mark it with @Injectable() decorator: [86fede13](https://github.com/thohoh/container-ioc/commit/86fede13be7147079c36bc77e204ac21deb360bc)

### Breaking Changes
* **Class registration:** - now it's necessary to mark the class you want to make available for injections with **Injectable** decorator.
    ```Typescript
    // old version
    class A {}
    container.register({ token: 'IA', useClass: A });
    
    // new version
    @Injectable()
    class A {}
    container.register({ token: 'IA', useClass: A });
    ```


<a name="1.3.1"></a>
# [1.3.1]() (2017-09-30)

### Features

* **Value and Factory:** - container now can resolve values or anything returned from a factory. commit
[50ebb63](https://github.com/thohoh/container-ioc/commit/50ebb63451878b262626446828f7b7ac5ce6afe5)
* **Injection Token** - added InjectionToken class to facilitate working with abstractions. [3c380c878](https://github.com/thohoh/container-ioc/commit/3c380c878abef883b293007f97299d5053eafe5b)