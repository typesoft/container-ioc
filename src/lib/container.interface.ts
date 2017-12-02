import { IInjectionInstance, ProviderToken, RegistrationProvider, LifeTime } from './interfaces';

export interface IContainerOptions {
    parent?: IContainer;
    defaultLifeTime?: LifeTime;
}

export interface IContainer {    
    register(provider: RegistrationProvider|RegistrationProvider[]): void;

    resolve(token: ProviderToken): IInjectionInstance;

    resolveInternal(token: ProviderToken, container: IContainer, traceMessage?: string): IInjectionInstance;

    /* @deprecated */
    createScope(): IContainer;

    createChild(): IContainer;

    setParent(parent: IContainer): void;
}