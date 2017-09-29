import { IConstructor, IInjectionInstance } from './interfaces';

export interface IRegistryData {
    instance: IInjectionInstance;
    cls: IConstructor;
    value: any;
}

export class RegistryData {
    public instance: IInjectionInstance;
    public value: any;
    public cls: IConstructor;
}