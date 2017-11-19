import { IContainer, Container, TContainer, Injectable, Inject } from 'container-ioc';

const container = new Container();

@Injectable()
class Builder {
    constructor(@Inject(TContainer) private container: IContainer) {}
}

container.register({ token: Builder, useClass: Builder });

const builder = container.resolve(Builder);