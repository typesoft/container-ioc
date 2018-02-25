export type ProviderToken = any;

export type RegistrationProvider = IProvider | IConstructor;

export enum LifeTime {
    Persistent,
    PerRequest
}

export interface IProvider {
    token: ProviderToken;
    lifeTime?: LifeTime;
}

export interface IProvider {
    useValue?: any;
}

export interface IProvider {
    useClass?: IConstructor;    
}

export interface IProvider {
    useFactory?: any;
    inject?: ProviderToken[];  
}

export interface IInjectionMd {
    token: ProviderToken;
    parameterIndex: number;
}

export type IInjectionInstance = any;

export interface IConstructor {
    new (...args: any[]): any;
}