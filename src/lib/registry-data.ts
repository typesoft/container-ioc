import { IConstructor, IInjectionInstance, ProviderToken } from './interfaces';

export interface IRegistryData {
    instance: IInjectionInstance;
    cls: IConstructor;
    value: any;
    factory: (...args: any[]) => any;
    injections: ProviderToken[];
}

export class RegistryData {
    public instance: IInjectionInstance;
    public value: any;
    public cls: IConstructor;
    public factory: (...args: any[]) => any;
    public injections: ProviderToken[];
}