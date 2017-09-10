"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("./app/app");
var container_1 = require("./lib/container");
var container = new container_1.Container();
container.resolve(app_1.App);
//# sourceMappingURL=client.js.map