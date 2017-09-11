import { Inject } from '../lib/decorators';
import { IProvider } from '../lib/interfaces';
import { CalculatorService } from './calculator-service';

export class Service {
    constructor(
        @Inject('ICalculator') private provider: CalculatorService
    ) {
    }

    log(str: string): void {
        console.log(str);
        this.provider.calculate();
    }
}