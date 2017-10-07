import { IConstructor, IInjectionInstance, IInjectionMd, LifeTime } from './interfaces';

export type FactoryFunction = (...args: any[]) => any;

export interface IFactory {
    value: IConstructor | FactoryFunction;
    isClass: boolean;
    inject?: IInjectionMd[];
}

export interface IRegistryData {
    instance: IInjectionInstance;
    factory: IFactory;
    lifeTime: LifeTime;
}

export class RegistryData {
    public instance: IInjectionInstance;
    public factory: IFactory;
    public lifeTime: LifeTime;
}