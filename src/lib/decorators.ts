import 'reflect-metadata';
import { IInjectionMd } from './interfaces';

export const INJECTIONS_MD_KEY: string = 'DI:injections';
export const INJECTABLE_MD_KEY: string = 'DI:injectable';

export function Injectable() {
    return (target: object) => {
        Reflect.defineMetadata(INJECTABLE_MD_KEY, true, target);
    };
}

export function Inject(token: any) {
    return (target: object, propertyKey: string | symbol, parameterIndex: number) => {
        const injections: IInjectionMd[] = Reflect.getOwnMetadata(INJECTIONS_MD_KEY, target) || [];

        injections.push({
            token,
            parameterIndex
        });

        Reflect.defineMetadata(INJECTIONS_MD_KEY, injections, target);
    };
}