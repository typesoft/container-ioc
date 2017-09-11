import { IInjectionMd } from './interfaces';
import 'reflect-metadata';

export const INJECTIONS_MD_KEY: string = 'Reflect:injections';

export function Inject(token: any) {
    return function (target: Object, propertyKey: string | symbol, parameterIndex: number) {
        let injections: IInjectionMd[] = Reflect.getOwnMetadata(INJECTIONS_MD_KEY, target) || [];

        injections.push({
            token,
            parameterIndex: parameterIndex
        });

        Reflect.defineMetadata(INJECTIONS_MD_KEY, injections, target);
    }
}