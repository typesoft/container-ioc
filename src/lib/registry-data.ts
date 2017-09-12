import { IInjectionInstance } from './interfaces';

export interface IRegistryData {
    instance: IInjectionInstance;
    cls: any;
}

export class RegistryData {
    public instance: any;

    constructor(public cls: any) {
        this.instance = null;
    }
}