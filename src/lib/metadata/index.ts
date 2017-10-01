import { IMetadataAnnotator } from './metadata-annotator.interface';
import { StaticMetadataAnnotator } from './static-metadata-annotator';

export const MetadataAnnotator: IMetadataAnnotator = new StaticMetadataAnnotator();