import { IConstructor, IInjectionInstance } from './interfaces';

export interface IRegistryData {
    instance: IInjectionInstance;
    cls: IConstructor;
}

export class RegistryData {
    public instance: any;

    constructor(public cls: any) {
        this.instance = null;
    }
}