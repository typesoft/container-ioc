"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var decorators_1 = require("../lib/decorators");
var Service = (function () {
    function Service(provider) {
        this.provider = provider;
    }
    Service.prototype.log = function (str) {
        console.log(str);
        this.provider.calculate();
    };
    Service = __decorate([
        __param(0, decorators_1.Inject('ICalculator'))
    ], Service);
    return Service;
}());
exports.Service = Service;
//# sourceMappingURL=service.js.map