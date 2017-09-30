export class InjectionToken<T> {
    constructor(private desc: string) {

    }

    toString(): string {
        return this.desc;
    }
}