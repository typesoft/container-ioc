import { App } from './app/app';
import { Container } from './lib/container';

let container: Container = new Container();

container.resolve(App);