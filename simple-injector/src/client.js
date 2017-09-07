let container = require('./lib/container');

let App = require('./app/app');
let Service = require('./app/service');
let Logger = require('./app/logger');

let providers = [
    { token: 'IApp', useClass: App },
    { token: 'IService', useClass: Service },
    { token: 'ILogger', useClass: Logger }
];

container.register(providers);

let app = container.resolve('IApp');
app.run();