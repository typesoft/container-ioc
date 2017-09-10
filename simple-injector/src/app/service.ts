import { Injectable } from '../lib/decorators';

@Injectable()
export class Service {
    calculate(): void {
        console.log('calculating');
    }
}