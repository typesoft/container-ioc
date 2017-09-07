let container = require('../lib/container');

class Service {
    constructor() {
        this.logger = container.resolve('ILogger');
    }

    connect() {
        this.logger.log('connected!');
    }
}

module.exports = Service;