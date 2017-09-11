export interface IProvider {
    token: string|any;
    useClass: any;
}

export interface IInjectionMd {
    token: any;
    parameterIndex: number;
}