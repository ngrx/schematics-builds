"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var schematics_1 = require("@angular-devkit/schematics");
var schematics_core_1 = require("../../schematics-core");
function updateWorkspaceCli(host, value) {
    var workspace = (0, schematics_core_1.getWorkspace)(host);
    var path = (0, schematics_core_1.getWorkspacePath)(host);
    workspace['cli'] = __assign(__assign({}, workspace['cli']), value);
    host.overwrite(path, JSON.stringify(workspace, null, 2));
}
function setAsDefaultSchematics() {
    var cli = {
        defaultCollection: '@ngrx/schematics'
    };
    return function (host) {
        updateWorkspaceCli(host, cli);
        return host;
    };
}
function default_1(options) {
    return function (host, context) {
        return (0, schematics_1.chain)([
            options && options.defaultCollection ? setAsDefaultSchematics() : (0, schematics_1.noop)(),
        ])(host, context);
    };
}
exports["default"] = default_1;
//# sourceMappingURL=index.js.map