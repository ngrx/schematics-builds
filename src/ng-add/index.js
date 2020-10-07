"use strict";
exports.__esModule = true;
var schematics_1 = require("@angular-devkit/schematics");
var config_1 = require("../../schematics-core/utility/config");
function updateWorkspace(host, key, value) {
    var workspace = config_1.getWorkspace(host);
    var path = config_1.getWorkspacePath(host);
    workspace[key] = value;
    host.overwrite(path, JSON.stringify(workspace, null, 2));
}
function setAsDefaultSchematics() {
    var cli = {
        defaultCollection: '@ngrx/schematics'
    };
    return function (host) {
        updateWorkspace(host, 'cli', cli);
        return host;
    };
}
function default_1(options) {
    return function (host, context) {
        return schematics_1.chain([
            options && options.defaultCollection ? setAsDefaultSchematics() : schematics_1.noop(),
        ])(host, context);
    };
}
exports["default"] = default_1;
//# sourceMappingURL=index.js.map