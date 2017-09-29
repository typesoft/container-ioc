export type ProviderToken = any;

export interface IProvider {
    token: ProviderToken;
    useClass?: any;
    useValue?: any;
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