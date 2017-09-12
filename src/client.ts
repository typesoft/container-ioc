import { App } from './app/app';
import { container } from './lib/container';
import { APP_PROVIDERS } from './app/providers';

container.register(APP_PROVIDERS);

let app: any = container.resolve(App);
app.run();