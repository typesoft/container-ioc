export interface IMetadataAnnotator {
    defineMetadata<T>(metadataKey: string|symbol, value: T, target: any): void;
    getMetadata<T>(metadataKey: string|symbol, target: any): T;
}