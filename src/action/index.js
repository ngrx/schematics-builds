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
var schematics_core_1 = require("@ngrx/schematics/schematics-core");
function default_1(options) {
    return function (host, context) {
        options.path = schematics_core_1.getProjectPath(host, options);
        var parsedPath = schematics_core_1.parseName(options.path, options.name);
        options.name = parsedPath.name;
        options.path = parsedPath.path;
        var templateSource = schematics_1.apply(schematics_1.url(options.creators ? './creator-files' : './files'), [
            options.skipTests
                ? schematics_1.filter(function (path) { return !path.endsWith('.spec.ts.template'); })
                : schematics_1.noop(),
            schematics_1.applyTemplates(__assign(__assign(__assign({}, schematics_core_1.stringUtils), { 'if-flat': function (s) {
                    return schematics_core_1.stringUtils.group(options.flat ? '' : s, options.group ? 'actions' : '');
                } }), options)),
            schematics_1.move(parsedPath.path),
        ]);
        return schematics_1.chain([schematics_1.branchAndMerge(schematics_1.chain([schematics_1.mergeWith(templateSource)]))])(host, context);
    };
}
exports["default"] = default_1;
//# sourceMappingURL=index.js.map