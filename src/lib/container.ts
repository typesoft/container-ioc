import { IConstructor, IInjectionInstance, IInjectionMd, IProvider, ProviderToken } from './interfaces';
import { IRegistryData, RegistryData } from './registry-data';
import { INJECTIONS_MD_KEY } from './decorators';
import { IContainer } from './container.interface';

export class Container implements IContainer {
    private registry: Map<ProviderToken, IRegistryData> = new Map();

    constructor(private parent?: IContainer) {}

    public register(provider: IProvider|IProvider[]|IConstructor): void {
        if (provider instanceof Array) {
            provider = provider.map(p => this.nornalizeProvider(p));
            provider.forEach(p => this.registerOne(p));
        } else {
            provider = this.nornalizeProvider(provider);
            this.registerOne(provider);
        }
    }

    public resolve(token: ProviderToken): IInjectionInstance {
        const registryData = <IRegistryData> this.registry.get(token);

        if (!registryData) {
            if (this.parent) {
                return this.parent.resolve(token);
            } else {
                throw new Error(`No provider for ${token}`);
            }
        }

        if (registryData.value) {
            return registryData.value;
        }

        if (registryData.instance) {
            return registryData.instance;
        }

        if (registryData.factory) {
            let injections: ProviderToken[] = [];

            if (registryData.injections) {
                injections = registryData.injections.map(i => this.resolve(i));
            }

            return registryData.factory(...injections);
        }

        const cls = registryData.cls;
        const injectionsMd: IInjectionMd[] = this.getInjections(cls);
        const resolvedInjections: any[] = injectionsMd.map(injectionMd => this.resolve(injectionMd.token));

        const args: any[] = [];
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
        const registryData: IRegistryData = new RegistryData();

        if (provider.useValue) {
            registryData.value = provider.useValue;
        } else if (provider.useClass) {
            registryData.cls = provider.useClass;
        } else if (provider.useFactory) {
            registryData.factory = provider.useFactory;
            registryData.injections = <ProviderToken[]> provider.inject;
        }

        this.registry.set(provider.token, registryData);
    }

    private nornalizeProvider(provider: IProvider|IConstructor): IProvider {
        if (typeof provider === 'function') {
            provider = { token: provider, useClass: provider };
        }

        return provider;
    }

    private getInjections(cls: any): IInjectionMd[] {
        return Reflect.getOwnMetadata(INJECTIONS_MD_KEY, cls) || [];
    }
}