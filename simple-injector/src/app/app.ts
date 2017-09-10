import { Injectable } from '../lib/decorators';

@Injectable()
export class App {

    public run(): void {
        console.log('running the app');
    }
}