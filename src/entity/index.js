"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular-devkit/core");
var schematics_1 = require("@angular-devkit/schematics");
var stringUtils = require("../strings");
var ngrx_utils_1 = require("../utility/ngrx-utils");
var find_module_1 = require("../utility/find-module");
function default_1(options) {
    options.path = options.path ? core_1.normalize(options.path) : options.path;
    var sourceDir = options.sourceDir;
    if (!sourceDir) {
        throw new schematics_1.SchematicsException("sourceDir option is required.");
    }
    return function (host, context) {
        if (options.module) {
            options.module = find_module_1.findModuleFromOptions(host, options);
        }
        var templateSource = schematics_1.apply(schematics_1.url('./files'), [
            options.spec ? schematics_1.noop() : schematics_1.filter(function (path) { return !path.endsWith('__spec.ts'); }),
            schematics_1.template(__assign({}, stringUtils, { 'if-flat': function (s) { return (options.flat ? '' : s); }, 'group-actions': function (name) {
                    return stringUtils.group(name, options.group ? 'actions' : '');
                }, 'group-models': function (name) {
                    return stringUtils.group(name, options.group ? 'models' : '');
                }, 'group-reducers': function (s) {
                    return stringUtils.group(s, options.group ? 'reducers' : '');
                } }, options, { dot: function () { return '.'; } })),
            schematics_1.move(sourceDir),
        ]);
        return schematics_1.chain([
            ngrx_utils_1.addReducerToState(__assign({}, options)),
            ngrx_utils_1.addReducerImportToNgModule(__assign({}, options)),
            schematics_1.branchAndMerge(schematics_1.chain([schematics_1.mergeWith(templateSource)])),
        ])(host, context);
    };
}
exports.default = default_1;
//# sourceMappingURL=index.js.map