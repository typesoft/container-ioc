let container = require('../lib/container');

class App {
    constructor() {
        this.service = container.resolve('IService');
    }

    run() {
        this.service.connect();
    }
}

module.exports = App;