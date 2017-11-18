/* @deprecated */
export class InjectionToken<T> {
    constructor(private description: string) {}

    public toString(): string {
        return this.description;
    }
}