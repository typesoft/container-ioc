export type ProviderToken = any;

export interface IProvider {
    token: ProviderToken;
    useClass?: IConstructor;
    useValue?: any;
    useFactory?: any;
    inject?: ProviderToken[];
}

export interface IInjectionMd {
    token: ProviderToken;
    parameterIndex: number;
}

export interface IInjectionInstance {
    [key: string]: any;
}

export interface IConstructor {
    new (...args: any[]): any;
}