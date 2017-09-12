export type ProviderToken = any;

export interface IProvider {
    token: ProviderToken
    useClass: any;
}

export interface IInjectionMd {
    token: ProviderToken;
    parameterIndex: number;
}

export interface IInjectionInstance {

}