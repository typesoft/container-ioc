import { CalculatorService } from './calculator-service';
import { App } from './app';
import { Service } from './service';

export const APP_PROVIDERS: any[] = [
    App,
    Service,
    { token: 'ICalculator', useClass: CalculatorService }
];