import { IInjectionInstance, ProviderToken, RegistrationProvider } from './interfaces';

export interface IContainer {
    register(provider: RegistrationProvider|RegistrationProvider[]): void;

    resolve(token: ProviderToken): IInjectionInstance;

    /* @deprecated */
    createScope(): IContainer;

    createChild(): IContainer;

    setParent(parent: IContainer): void;
}