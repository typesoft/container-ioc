import { IMetadataAnnotator } from './metadata-annotator.interface';

export class StaticMetadataAnnotator implements IMetadataAnnotator {
    public getMetadata<T>(metadataKey: string|symbol, target: any): T {
        return target[metadataKey];
    }

    public defineMetadata<T>(metadataKey: string|symbol, value: T, target: any): void {
        target[metadataKey] = value;
    }
}