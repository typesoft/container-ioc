export type ProviderToken = any;

export type RegistrationProvider = IProvider | IConstructor;

export enum LifeTime {
    Persistent,
    PerRequest
}

export interface IProvider {
    token: ProviderToken;
    useClass?: IConstructor;
    useValue?: any;
    useFactory?: any;
    inject?: ProviderToken[];
    lifeTime?: LifeTime;
}

export interface IInjectionMd {
    token: ProviderToken;
    parameterIndex: number;
}

export type IInjectionInstance = any;

export interface IConstructor {
    new (...args: any[]): any;
}