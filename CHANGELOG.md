<a name="1.4.0"></a>
# [1.4.0]() (2017-10-01)

### Features

* **@Injectable() decorator:** now to make a class available for injection you have to mark it with @Injectable() decorator: [86fede13](https://github.com/thohoh/container-ioc/commit/86fede13be7147079c36bc77e204ac21deb360bc)

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

* **Value and Factory:** support using values and factories for registrations. commit
[50ebb63](https://github.com/thohoh/container-ioc/commit/50ebb63451878b262626446828f7b7ac5ce6afe5)
* **Injection Token** added InjectionToken class to facilitate working with abstractions. [3c380c878](https://github.com/thohoh/container-ioc/commit/3c380c878abef883b293007f97299d5053eafe5b)