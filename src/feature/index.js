"use strict";
exports.__esModule = true;
var schematics_1 = require("@angular-devkit/schematics");
function default_1(options) {
    if (!options.skipTests && options.skipTest) {
        options.skipTests = options.skipTest;
    }
    return function (host, context) {
        return schematics_1.chain([
            schematics_1.schematic('action', {
                flat: options.flat,
                group: options.group,
                name: options.name,
                path: options.path,
                project: options.project,
                skipTests: options.skipTests,
                api: options.api,
                creators: options.creators
            }),
            schematics_1.schematic('reducer', {
                flat: options.flat,
                group: options.group,
                module: options.module,
                name: options.name,
                path: options.path,
                project: options.project,
                skipTests: options.skipTests,
                reducers: options.reducers,
                feature: true,
                api: options.api,
                creators: options.creators
            }),
            schematics_1.schematic('effect', {
                flat: options.flat,
                group: options.group,
                module: options.module,
                name: options.name,
                path: options.path,
                project: options.project,
                skipTests: options.skipTests,
                feature: true,
                api: options.api,
                creators: options.creators
            }),
            schematics_1.schematic('selector', {
                flat: options.flat,
                group: options.group,
                name: options.name,
                path: options.path,
                project: options.project,
                skipTests: options.skipTests,
                feature: true
            }),
        ])(host, context);
    };
}
exports["default"] = default_1;
//# sourceMappingURL=index.js.map