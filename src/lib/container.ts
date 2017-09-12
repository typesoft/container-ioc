import 'reflect-metadata';

import { IInjectionMd, IProvider, ProviderToken } from './interfaces';
import { IRegistryData, RegistryData } from './registry-data';
import { INJECTIONS_MD_KEY } from './decorators';

export class Container {
    private registry: Map<ProviderToken, IRegistryData> = new Map();

    public register(provider: IProvider|IProvider[]) {
        if (provider instanceof Array) {
            provider.forEach(provider => this.registerOne(provider));
        } else {
            this.registerOne(provider);
        }
    }

    public registerOne(provider: IProvider) {
        let token: any;
        let cls: any;

        if (typeof provider === 'function') {
            token = provider;
            cls = provider;
        } else {
            token = provider.token;
            cls = provider.useClass;
        }

        let registryData: IRegistryData = new RegistryData(cls);
        this.registry.set(token, registryData);
    }

    public resolve(token: string|any): any {
        let registryData: IRegistryData = this.registry.get(token);

        if (!registryData) {
            throw new Error(`No provider for ${token}`);
        }

        if (registryData.instance) {
            return registryData.instance;
        }

        let cls = registryData.cls;
        let injectionsMd: IInjectionMd[] = this.getInjections(cls);
        let resolvedInjections: any[] = injectionsMd.map(injectionMd => this.resolve(injectionMd.token));

        let args: any[] = [];
        injectionsMd.forEach((injection: IInjectionMd, index) => {
            args[injection.parameterIndex] = resolvedInjections[index];
        });

        registryData.instance = new cls(...args);
        this.registry.set(token, registryData);

        return registryData.instance;
    }

    public getInjections(cls: any): IInjectionMd[] {
        return Reflect.getOwnMetadata(INJECTIONS_MD_KEY, cls) || [];
    }
}

export let container: Container = new Container();