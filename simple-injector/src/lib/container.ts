import { IProvider } from './interfaces';
import { RegistryData } from './registry-data';

export class Container {
    private registry: Map = new Map();

    constructor() {
    }

    public register(provider: IProvider|IProvider[]) {
        if (provider instanceof Array) {
            provider.forEach(provider => this.registerOne(provider));
        } else {
            this.registerOne(provider);
        }
    }

    public registerOne(provider: IProvider) {
        let token: any;
        let constructorClass: any;

        // TODO add input data validation
        if (typeof provider === 'function') {
            token = provider;
            constructorClass = provider;
        } else {
            token = provider.token;
            constructorClass = provider.useClass;
        }

        let registryData = new RegistryData(provider.useClass);
        this.registry.set(provider.token, registryData);
    }

    public resolve(token: string|any) {
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