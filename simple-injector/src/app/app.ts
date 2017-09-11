import { Inject } from '../lib/decorators';
import { Service } from './service';

export class App {

    constructor(
        @Inject(Service) private service: Service
    ) {

    }

    public run(): void {
        this.service.log('running the app');
    }
}