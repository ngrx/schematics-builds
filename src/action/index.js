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
var schematics_1 = require("@angular-devkit/schematics");
var stringUtils = require("../strings");
var project_1 = require("../utility/project");
function default_1(options) {
    return function (host, context) {
        options.path = project_1.getProjectPath(host, options);
        var templateSource = schematics_1.apply(schematics_1.url('./files'), [
            options.spec ? schematics_1.noop() : schematics_1.filter(function (path) { return !path.endsWith('__spec.ts'); }),
            schematics_1.template(__assign({ 'if-flat': function (s) {
                    return stringUtils.group(options.flat ? '' : s, options.group ? 'actions' : '');
                } }, stringUtils, options, { dot: function () { return '.'; } })),
        ]);
        return schematics_1.chain([schematics_1.branchAndMerge(schematics_1.chain([schematics_1.mergeWith(templateSource)]))])(host, context);
    };
}
exports.default = default_1;
//# sourceMappingURL=index.js.map