import { IInjectionMd } from './interfaces';
import 'reflect-metadata';

export const INJECTIONS_MD_KEY: string = 'Reflect:injections';

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