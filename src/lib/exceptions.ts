/* tslint:disable: max-classes-per-file */

export class InvalidProviderProvidedError extends Error {
    constructor(provider: any) {
        super(`${JSON.stringify(provider)} - is not a valid provider.`);
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