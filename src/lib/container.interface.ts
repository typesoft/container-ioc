import { IInjectionInstance, ProviderToken, RegistrationProvider } from './interfaces';

export interface IContainer {
    register(provider: RegistrationProvider|RegistrationProvider[]): void;
    resolve(token: ProviderToken): IInjectionInstance;
    createScope(): IContainer;
}