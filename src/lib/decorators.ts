import { IInjectionMd, ProviderToken } from './interfaces';
import { INJECTABLE_MD_KEY, INJECTIONS_MD_KEY } from './metadata/keys';
import { IMetadataAnnotator } from './metadata/metadata-annotator.interface';
import { AnnotatorProvider } from './metadata/index';
import 'reflect-metadata';

const MetadataAnnotator: IMetadataAnnotator = AnnotatorProvider.get();

export function Injectable(injections?: ProviderToken[]) {
    return (target: object) => {
        MetadataAnnotator.defineMetadata(INJECTABLE_MD_KEY, true, target);

        if (injections && Array.isArray(injections)) {
            const injectionsMd: IInjectionMd[] = MetadataAnnotator.getMetadata(INJECTIONS_MD_KEY, target) || [];
            injections.forEach(token => injectionsMd.push(token));
            MetadataAnnotator.defineMetadata(INJECTIONS_MD_KEY, injectionsMd, target);
        }

        const parameters = Reflect.getMetadata('design:paramtypes', target);
        if (parameters && Array.isArray(parameters)) {
            const injectionsMd: IInjectionMd[] = MetadataAnnotator.getMetadata(INJECTIONS_MD_KEY, target) || [];
            parameters.forEach((param, index) => {
                if (param['DI:injectable'] && !injectionsMd[index]) {
                    injectionsMd[index] = param;
                }
            });
            MetadataAnnotator.defineMetadata(INJECTIONS_MD_KEY, injectionsMd, target);
        }
    };
}

export const Component = Injectable;

export function Inject(token: any) {
    return (target: object, propertyKey: string | symbol, parameterIndex: number) => {
        const injections: IInjectionMd[] = MetadataAnnotator.getMetadata(INJECTIONS_MD_KEY, target) || [];
        injections[parameterIndex] = token;
        MetadataAnnotator.defineMetadata(INJECTIONS_MD_KEY, injections, target);
    };
}