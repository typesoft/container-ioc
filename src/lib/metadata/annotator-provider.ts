import { IMetadataAnnotator } from './metadata-annotator.interface';

export class AnnotatorProvider {
    static annotator: IMetadataAnnotator;

    static set(annotator: IMetadataAnnotator): void {
        this.annotator = annotator;
    }

    static get(): IMetadataAnnotator {
        return this.annotator;
    }
}