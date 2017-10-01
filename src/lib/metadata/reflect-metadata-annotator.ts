import 'reflect-metadata';
import { IMetadataAnnotator } from './metadata-annotator.interface';

export class ReflectMetadataAnnotator implements IMetadataAnnotator {
    public getMetadata<T>(metadataKey: string|symbol, target: any): T {
        return Reflect.getOwnMetadata(metadataKey, target);
    }

    public defineMetadata<T>(metadataKey: string|symbol, value: T, target: any): void {
        return Reflect.defineMetadata(metadataKey, value, target);
    }
}