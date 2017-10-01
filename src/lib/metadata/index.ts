import { StaticMetadataAnnotator } from './static-metadata-annotator';
import { AnnotatorProvider } from './annotator-provider';

AnnotatorProvider.set(new StaticMetadataAnnotator());

export { AnnotatorProvider } from './annotator-provider';