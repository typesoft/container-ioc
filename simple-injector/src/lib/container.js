let RegistryData = require('./registry-data');

class Container {
    constructor() {
        this.registry = new Map();
    }

    register(provider) {
        if (provider instanceof Array) {
            provider.forEach(provider => this.registerOne(provider));
        } else {
            this.registerOne(provider);
        }
    }

    registerOne(provider) {
        let registryData = new RegistryData(provider.useClass);
        this.registry.set(provider.token, registryData);
    }

    resolve(token) {
        let registryData = this.registry.get(token);

        if (!registryData) {
            throw new Error(`No provider for ${token}`);
        }

        if (registryData.instance) {
            return registryData.instance;
        }

        let constructor = registryData.constructor;
        registryData.instance = new constructor();
        this.registry.set(token, registryData);

        return registryData.instance;
    }
}

module.exports = new Container();