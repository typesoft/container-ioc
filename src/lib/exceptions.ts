/* tslint:disable: max-classes-per-file */

export class InvalidProviderProvidedError extends Error {
    constructor() {
        super('Invalid Provider was provided');
    }
}

export class ClassNotInjectableError extends Error {
    constructor(constructorName: string) {
        super(`Class ${constructorName} is not injectable`);
    }
}