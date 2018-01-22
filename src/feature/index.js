"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var schematics_1 = require("@angular-devkit/schematics");
function default_1(options) {
    return function (host, context) {
        return schematics_1.chain([
            schematics_1.schematic('action', {
                flat: options.flat,
                group: options.group,
                name: options.name,
                path: options.path,
                sourceDir: options.sourceDir,
                spec: false,
            }),
            schematics_1.schematic('reducer', {
                flat: options.flat,
                group: options.group,
                module: options.module,
                name: options.name,
                path: options.path,
                sourceDir: options.sourceDir,
                spec: options.spec,
                reducers: options.reducers,
                feature: true,
            }),
            schematics_1.schematic('effect', {
                flat: options.flat,
                group: options.group,
                module: options.module,
                name: options.name,
                path: options.path,
                sourceDir: options.sourceDir,
                spec: options.spec,
                feature: true,
            }),
        ])(host, context);
    };
}
exports.default = default_1;
//# sourceMappingURL=index.js.map