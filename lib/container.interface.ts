import { IInjectionInstance, IProvider, ProviderToken } from './interfaces';

export interface IContainer {
    register(provider: IProvider|IProvider[]|Function): void;
    resolve(token: ProviderToken): IInjectionInstance;
    createScope(): IContainer;
}