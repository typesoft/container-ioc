import { IProvider, ProviderToken } from './interfaces';

export interface IContainer {
    register(provider: IProvider|IProvider[]): void;
    resolve(token: ProviderToken): void;
    createScope(): IContainer;
}