export class InvalidProviderProvidedError extends Error {
    constructor() {
        super('Invalid Provider was provided');
    }
}