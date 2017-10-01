import { IInjectionMd } from './interfaces';
import { INJECTABLE_MD_KEY, INJECTIONS_MD_KEY } from './metadata/keys';
import { IMetadataAnnotator } from './metadata/metadata-annotator.interface';
import { AnnotatorProvider } from './metadata/index';

const MetadataAnnotator: IMetadataAnnotator = AnnotatorProvider.get();

export function Injectable() {
    return (target: object) => {
        MetadataAnnotator.defineMetadata(INJECTABLE_MD_KEY, true, target);
    };
}

export function Inject(token: any) {
    return (target: object, propertyKey: string | symbol, parameterIndex: number) => {
        const injections: IInjectionMd[] = MetadataAnnotator.getMetadata(INJECTIONS_MD_KEY, target) || [];

        injections.push({
            token,
            parameterIndex
        });

        MetadataAnnotator.defineMetadata(INJECTIONS_MD_KEY, injections, target);
    };
}