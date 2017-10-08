/* tslint:disable: max-classes-per-file */

// TODO write a test suit
export class InvalidProviderProvidedError extends Error {
    constructor() {
        super('Invalid Provider was provided');
    }
}

export class ClassNotInjectableError extends Error {
    constructor(constructorName: string) {
        super(`Class ${constructorName} is not injectable. Check if it's decorated with @Injectable() decorator`);
    }
}

export class NoProviderError extends Error {
    constructor(token: string, traceMessage: string) {
        super(`No provider for ${token}. ${traceMessage}`);
    }
}