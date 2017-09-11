"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("./app/app");
var container_1 = require("./lib/container");
var providers_1 = require("./app/providers");
container_1.container.register(providers_1.APP_PROVIDERS);
var app = container_1.container.resolve(app_1.App);
app.run();
//# sourceMappingURL=client.js.map