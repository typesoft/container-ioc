"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var registry_data_1 = require("./registry-data");
var Container = (function () {
    function Container() {
        this.registry = new Map();
    }
    Container.prototype.register = function (provider) {
        var _this = this;
        if (provider instanceof Array) {
            provider.forEach(function (provider) { return _this.registerOne(provider); });
        }
        else {
            this.registerOne(provider);
        }
    };
    Container.prototype.registerOne = function (provider) {
        var token;
        var constructorClass;
        if (typeof provider === 'function') {
            token = provider;
            constructorClass = provider;
        }
        else {
            token = provider.token;
            constructorClass = provider.useClass;
        }
        var registryData = new registry_data_1.RegistryData(provider.useClass);
        this.registry.set(provider.token, registryData);
    };
    Container.prototype.resolve = function (token) {
        var registryData = this.registry.get(token);
        if (!registryData) {
            throw new Error("No provider for " + token);
        }
        if (registryData.instance) {
            return registryData.instance;
        }
        var constructor = registryData.constructor;
        registryData.instance = new constructor();
        this.registry.set(token, registryData);
        return registryData.instance;
    };
    return Container;
}());
exports.Container = Container;
//# sourceMappingURL=container.js.map