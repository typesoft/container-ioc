import { IInjectionMd, ProviderToken } from './interfaces';
import { INJECTABLE_MD_KEY, INJECTIONS_MD_KEY } from './metadata/keys';
import { IMetadataAnnotator } from './metadata/metadata-annotator.interface';
import { AnnotatorProvider } from './metadata/index';

const MetadataAnnotator: IMetadataAnnotator = AnnotatorProvider.get();

export function Injectable(injections?: ProviderToken[]) {
    return (target: object) => {
        MetadataAnnotator.defineMetadata(INJECTABLE_MD_KEY, true, target);

        if (injections && Array.isArray(injections)) {
            const injectionMd: IInjectionMd[] = MetadataAnnotator.getMetadata(INJECTIONS_MD_KEY, target) || [];
            injections.forEach(token => injectionMd.push(token));
            MetadataAnnotator.defineMetadata(INJECTIONS_MD_KEY, injectionMd, target);
        }
    };
}

export function Inject(token: any) {
    return (target: object, propertyKey: string | symbol, parameterIndex: number) => {
        const injections: IInjectionMd[] = MetadataAnnotator.getMetadata(INJECTIONS_MD_KEY, target) || [];
        injections.push(token);
        MetadataAnnotator.defineMetadata(INJECTIONS_MD_KEY, injections, target);
    };
}