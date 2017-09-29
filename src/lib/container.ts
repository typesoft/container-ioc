import { IConstructor, IInjectionInstance, IInjectionMd, IProvider, ProviderToken } from './interfaces';
import { IRegistryData, RegistryData } from './registry-data';
import { INJECTIONS_MD_KEY } from './decorators';
import { IContainer } from './container.interface';

export class Container implements IContainer {
    private registry: Map<ProviderToken, IRegistryData> = new Map();

    constructor(private parent?: IContainer) {}

    public register(provider: IProvider|IProvider[]|IConstructor) {
        if (provider instanceof Array) {
            provider.forEach(p => this.registerOne(p));
        } else {
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

    private registerOne(provider: IProvider|IConstructor) {
        let token: any;
        let cls: any;

        if (typeof provider === 'function') {
            token = provider;
            cls = provider;
        } else {
            token = (<IProvider> provider).token;
            cls = (<IProvider> provider).useClass;
        }

        const registryData: IRegistryData = new RegistryData();

        if ((<IProvider> provider).useValue) {
            registryData.value = (<IProvider> provider).useValue;
        } else {
            registryData.cls = cls;
        }

        this.registry.set(token, registryData);
    }

    private getInjections(cls: any): IInjectionMd[] {
        return Reflect.getOwnMetadata(INJECTIONS_MD_KEY, cls) || [];
    }
}