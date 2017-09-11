"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var registry_data_1 = require("./registry-data");
var decorators_1 = require("./decorators");
require("reflect-metadata");
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
        var cls;
        if (typeof provider === 'function') {
            token = provider;
            cls = provider;
        }
        else {
            token = provider.token;
            cls = provider.useClass;
        }
        var registryData = new registry_data_1.RegistryData(cls);
        this.registry.set(token, registryData);
    };
    Container.prototype.resolve = function (token) {
        var _this = this;
        var registryData = this.registry.get(token);
        if (!registryData) {
            throw new Error("No provider for " + token);
        }
        if (registryData.instance) {
            return registryData.instance;
        }
        var cls = registryData.cls;
        var injectionsMd = this.getInjections(cls);
        var resolvedInjections = injectionsMd.map(function (injectionMd) { return _this.resolve(injectionMd.token); });
        var args = [];
        injectionsMd.forEach(function (injection, index) {
            args[injection.paramIndex] = resolvedInjections[index];
        });
        registryData.instance = new (cls.bind.apply(cls, [void 0].concat(args)))();
        this.registry.set(token, registryData);
        return registryData.instance;
    };
    Container.prototype.getInjections = function (cls) {
        return Reflect.getOwnMetadata(decorators_1.INJECTIONS_MD_KEY, cls) || [];
    };
    return Container;
}());
exports.Container = Container;
exports.container = new Container();
//# sourceMappingURL=container.js.map