import 'reflect-metadata';

import { IInjectionInstance, IInjectionMd, IProvider, ProviderToken } from './interfaces';
import { IRegistryData, RegistryData } from './registry-data';
import { INJECTIONS_MD_KEY } from './decorators';
import { IContainer } from './container.interface';

export class Container implements IContainer {
    private registry: Map<ProviderToken, IRegistryData> = new Map();

    constructor(private parent?: IContainer) {}

    public register(provider: IProvider|IProvider[]) {
        if (provider instanceof Array) {
            provider.forEach(provider => this.registerOne(provider));
        } else {
            this.registerOne(provider);
        }
    }

    public resolve(token: ProviderToken): IInjectionInstance {
        let registryData: IRegistryData = this.registry.get(token);

        if (!registryData) {
            if (this.parent) {
                return this.parent.resolve(token);
            } else {
                throw new Error(`No provider for ${token}`);
            }
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

    public createScope(): IContainer {
        return new Container(this);
    }

    private registerOne(provider: IProvider) {
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

    private getInjections(cls: any): IInjectionMd[] {
        return Reflect.getOwnMetadata(INJECTIONS_MD_KEY, cls) || [];
    }
}

export let container: Container = new Container();