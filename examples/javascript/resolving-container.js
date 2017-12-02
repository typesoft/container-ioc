import { Container, Injectable } from 'container-ioc';

const container = new Container();

@Injectable([Container])
class Builder {
    constructor(container) {}
}

container.register({ token: Builder, useClass: Builder });

const builder = container.resolve(Builder);