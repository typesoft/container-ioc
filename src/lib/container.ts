import { IConstructor, IInjectionInstance, IInjectionMd, IProvider, LifeTime, ProviderToken, RegistrationProvider } from './interfaces';
import { FactoryFunction, IFactory, IRegistryData, RegistryData } from './registry-data';
import { IContainer, IContainerOptions } from './container.interface';
import { ClassNotInjectableError, InvalidProviderProvidedError, NoProviderError } from './exceptions';
import { INJECTABLE_MD_KEY, INJECTIONS_MD_KEY } from './metadata/keys';
import { IMetadataAnnotator } from './metadata/metadata-annotator.interface';
import { AnnotatorProvider } from './metadata/index';

const MetadataAnnotator: IMetadataAnnotator = AnnotatorProvider.get();

export class Container implements IContainer {
    private static DEFAULT_LIFE_TIME = LifeTime.Persistent;
    private registry: Map<ProviderToken, IRegistryData> = new Map();
    private parent: IContainer;
    private defaultLifeTime: LifeTime = Container.DEFAULT_LIFE_TIME;

    constructor(options?: IContainerOptions) {
        if (options) {
            this.parent = <IContainer> options.parent;
            this.defaultLifeTime = options.defaultLifeTime || this.defaultLifeTime;
        }
    }

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
        return new Container({ parent: this });
    }

    public createChild(): IContainer {
        return this.createScope();
    }

    public setParent(parent: IContainer): void {
        this.parent = parent;
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

        const instance: IInjectionInstance = this.instantiateWithFactory(registryData.factory, traceMessage);

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
        } else {
            const factoryValue = provider.useFactory || provider.useClass;
            const isClass: boolean = !!provider.useClass;

            registryData.factory = {
                value: factoryValue,
                isClass
            };

            if (isClass) {
                registryData.factory.inject = this.retrieveInjectionsFromClass(<IConstructor> registryData.factory.value);
            } else {
                registryData.factory.inject = this.convertTokensToInjectionMd(<ProviderToken> provider.inject);
            }

            registryData.lifeTime = provider.lifeTime || this.defaultLifeTime;
        }

        this.registry.set(provider.token, registryData);
    }

    private convertTokensToInjectionMd(tokens: ProviderToken[]): IInjectionMd[] {
        let injections: IInjectionMd[] = [];

        if (tokens) {
            injections = tokens.map((token: ProviderToken, index: number) => {
                return {
                    token,
                    parameterIndex: index
                };
            });
        }

        return injections;
    }

    private instantiateWithFactory(factory: IFactory, traceMessage: string): IInjectionInstance {
        if (factory.isClass) {
            const injectable: boolean = this.isInjectable(<IConstructor> factory.value);

            if (!injectable) {
                throw new ClassNotInjectableError((<IConstructor> factory.value).name);
            }
        }

        const injections = <IInjectionMd[]> factory.inject;

        const resolvedInjections: any[] = injections.map(injection => this.resolveInternal(injection.token, traceMessage));

        const args: any[] = [];
        injections.forEach((injection: IInjectionMd, index: number) => {
            args[injection.parameterIndex] = resolvedInjections[index];
        });

        if (factory.isClass) {
            return new (<IConstructor> factory.value)(...args);
        } else {
            return (<FactoryFunction> factory.value)(...args);
        }
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

        if (matches) {
            return matches[1];
        } else {
            throw new Error(`Symbol name couldn't be retrieved, please check if it's not empty`);
        }
    }

    private isInjectable(cls: IConstructor): boolean {
        return !!(MetadataAnnotator.getMetadata(INJECTABLE_MD_KEY, cls));
    }

    private retrieveInjectionsFromClass(cls: IConstructor): IInjectionMd[] {
        const injections: IInjectionMd[] = MetadataAnnotator.getMetadata(INJECTIONS_MD_KEY, cls) || [];
        return this.convertTokensToInjectionMd(injections);
    }
}