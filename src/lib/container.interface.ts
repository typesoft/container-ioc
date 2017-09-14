import { IConstructor, IInjectionInstance, IProvider, ProviderToken } from './interfaces';

export interface IContainer {
    register(provider: IProvider|IProvider[]|IConstructor): void;
    resolve(token: ProviderToken): IInjectionInstance;
    createScope(): IContainer;
}