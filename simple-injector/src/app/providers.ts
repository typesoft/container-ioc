import { Provider } from './provider';
import { App } from './app';
import { Service } from './service';

export const APP_PROVIDERS = [
    App,
    Service,
    { token: 'IProvider', useClass: Provider }
];