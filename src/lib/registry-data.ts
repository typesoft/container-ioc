import { IConstructor, IInjectionInstance, LifeTime, ProviderToken } from './interfaces';

export interface IRegistryData {
    instance: IInjectionInstance;
    cls: IConstructor;
    factory: (...args: any[]) => any;
    injections: ProviderToken[];
    lifeTime: LifeTime;
}

export class RegistryData {
    public instance: IInjectionInstance;
    public cls: IConstructor;
    public factory: (...args: any[]) => any;
    public injections: ProviderToken[];
    public lifeTime: LifeTime;
}