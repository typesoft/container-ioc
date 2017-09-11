export interface IRegistryData {
    instance: any;
    cls: any;
}

export class RegistryData {
    public instance: any;

    constructor(public cls: any) {
        this.instance = null;
    }
}