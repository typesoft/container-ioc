import { IConstructor, IInjectionInstance, IInjectionMd, IProvider, LifeTime, ProviderToken, RegistrationProvider } from './interfaces';
import { IRegistryData, RegistryData } from './registry-data';
import { IContainer } from './container.interface';
import { ClassNotInjectableError, InvalidProviderProvidedError, NoProviderError } from './exceptions';
import { INJECTABLE_MD_KEY, INJECTIONS_MD_KEY } from './metadata/keys';
import { IMetadataAnnotator } from './metadata/metadata-annotator.interface';
import { AnnotatorProvider } from './metadata/index';

const MetadataAnnotator: IMetadataAnnotator = AnnotatorProvider.get();

export class Container implements IContainer {
    private registry: Map<ProviderToken, IRegistryData> = new Map();

    constructor(private parent?: IContainer) {}

    public register(provider: RegistrationProvider|RegistrationProvider[]): void {
        provider = this.nornalizeProvider(provider);

        if (Array.isArray(provider)) {
            this.registerAll(<RegistrationProvider[]> provider);
        } else {
            provider = this.nornalizeProvider(provider);
            this.registerOne(<IProvider> provider);
        }
    }

    public resolve(token: ProviderToken): IInjectionInstance {
        return this.resolveInternal(token);
    }

    public createScope(): IContainer {
        return new Container(this);
    }

    private resolveInternal(token: ProviderToken, traceMessage?: string): IInjectionInstance {
        traceMessage = this.buildTraceMessage(token, traceMessage);

        const registryData = <IRegistryData> this.registry.get(token);

        if (!registryData) {
            if (!this.parent) {
                throw new NoProviderError(this.getTokenString(token), traceMessage );
            }
            return this.parent.resolve(token);
        }

        if (registryData.instance) {
            return registryData.instance;
        }

        if (registryData.factory) {
            let injections: ProviderToken[] = [];

            if (registryData.injections) {
                injections = registryData.injections.map(i => this.resolveInternal(i, traceMessage));
            }

            return registryData.factory(...injections);
        }

        const constructor: IConstructor = registryData.cls;

        const isInjectable: boolean = this.isInjectable(constructor);
        if (!isInjectable) {
            throw new ClassNotInjectableError(constructor.name);
        }

        const instance: IInjectionInstance = this.createInstance(constructor, traceMessage);

        if (registryData.lifeTime === LifeTime.Persistent) {
            registryData.instance = instance;
            this.registry.set(token, registryData);
        }

        return instance;
    }

    private registerAll(providers: RegistrationProvider[]): void {
        providers.forEach((p: IProvider) => this.registerOne(p));
    }

    private registerOne(provider: IProvider) {
        const registryData: IRegistryData = new RegistryData();

        if (provider.useValue) {
            registryData.instance = provider.useValue;
        } else if (provider.useClass) {
            registryData.cls = provider.useClass;
        } else if (provider.useFactory) {
            registryData.factory = provider.useFactory;
            registryData.injections = <ProviderToken[]> provider.inject;
        }

        registryData.lifeTime = provider.lifeTime || LifeTime.Persistent;

        this.registry.set(provider.token, registryData);
    }

    private createInstance(cls: IConstructor, message: string): IInjectionInstance {
        const injectionsMd: IInjectionMd[] = this.getInjections(cls);
        const resolvedInjections: any[] = injectionsMd.map(injectionMd => this.resolveInternal(injectionMd.token, message));

        const args: any[] = [];
        injectionsMd.forEach((injection: IInjectionMd, index) => {
            args[injection.parameterIndex] = resolvedInjections[index];
        });

        return new cls(...args);
    }

    private nornalizeProvider(provider: RegistrationProvider|RegistrationProvider[]): IProvider {
        let normalizedProvider: any;

        if (Array.isArray(provider)) {
            normalizedProvider = provider.map<IProvider>((p: IProvider|IConstructor) => this.normalizeSingleProvider(p));
        } else {
            normalizedProvider = this.normalizeSingleProvider(provider);
        }
        return normalizedProvider;
    }

    // TODO move into a helper service
    private normalizeSingleProvider(provider: RegistrationProvider): IProvider {
        if (typeof provider === 'function') {
            provider = { token: <IConstructor> provider, useClass: <IConstructor> provider };
        } else if (!(provider instanceof Object)) {
            throw new InvalidProviderProvidedError();
        }
        return <IProvider> provider;
    }

    private buildTraceMessage(token: ProviderToken, message: string|undefined): string {
        const tokenStr: string = this.getTokenString(token);
        return message ? `${message} --> ${tokenStr}` : `Trace: ${tokenStr}`;
    }

    private getTokenString(token: ProviderToken): string {
        if (typeof token === 'function') {
            return (<IConstructor> token).name;
        } else if (typeof token === 'symbol') {
            return this.symbol2string(token);
        } else {
            return `${token}`;
        }
    }

    private symbol2string(symbol: symbol): string {
        const regExp = /\(([^)]+)\)/;
        const matches = regExp.exec(symbol.toString());
        return matches[1];
    }

    private isInjectable(cls: IConstructor): boolean {
        return !!(MetadataAnnotator.getMetadata(INJECTABLE_MD_KEY, cls));
    }

    private getInjections(cls: any): IInjectionMd[] {
        return MetadataAnnotator.getMetadata(INJECTIONS_MD_KEY, cls) || [];
    }
}