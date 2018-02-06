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
var ts = require("typescript");
var stringUtils = require("../strings");
var find_module_1 = require("../utility/find-module");
var change_1 = require("../utility/change");
var route_utils_1 = require("../utility/route-utils");
var ngrx_utils_1 = require("../utility/ngrx-utils");
function addStateToComponent(options) {
    return function (host) {
        if (!options.state && !options.stateInterface) {
            return host;
        }
        var statePath = "/" + options.sourceDir + "/" + options.path + "/" + options.state;
        if (options.state) {
            if (!host.exists(statePath)) {
                throw new Error('Specified state path does not exist');
            }
        }
        var componentPath = "/" + options.sourceDir + "/" + options.path + "/" +
            (options.flat ? '' : stringUtils.dasherize(options.name) + '/') +
            stringUtils.dasherize(options.name) +
            '.component.ts';
        var text = host.read(componentPath);
        if (text === null) {
            throw new schematics_1.SchematicsException("File " + componentPath + " does not exist.");
        }
        var sourceText = text.toString('utf-8');
        var source = ts.createSourceFile(componentPath, sourceText, ts.ScriptTarget.Latest, true);
        var stateImportPath = find_module_1.buildRelativePath(componentPath, statePath);
        var storeImport = route_utils_1.insertImport(source, componentPath, 'Store', '@ngrx/store');
        var stateImport = options.state
            ? route_utils_1.insertImport(source, componentPath, "* as fromStore", stateImportPath, true)
            : new change_1.NoopChange();
        var componentClass = source.statements.find(function (stm) { return stm.kind === ts.SyntaxKind.ClassDeclaration; });
        var component = componentClass;
        var componentConstructor = component.members.find(function (member) { return member.kind === ts.SyntaxKind.Constructor; });
        var cmpCtr = componentConstructor;
        var pos = cmpCtr.pos;
        var stateType = options.state
            ? "fromStore." + options.stateInterface
            : 'any';
        var constructorText = cmpCtr.getText();
        var _a = constructorText.split('()'), start = _a[0], end = _a[1];
        var storeText = "private store: Store<" + stateType + ">";
        var storeConstructor = [start, "(" + storeText + ")", end].join('');
        var constructorUpdate = new change_1.ReplaceChange(componentPath, pos, "  " + constructorText + "\n\n", "\n\n  " + storeConstructor);
        var changes = [storeImport, stateImport, constructorUpdate];
        var recorder = host.beginUpdate(componentPath);
        for (var _i = 0, changes_1 = changes; _i < changes_1.length; _i++) {
            var change = changes_1[_i];
            if (change instanceof change_1.InsertChange) {
                recorder.insertLeft(change.pos, change.toAdd);
            }
            else if (change instanceof change_1.ReplaceChange) {
                recorder.remove(pos, change.oldText.length);
                recorder.insertLeft(change.order, change.newText);
            }
        }
        host.commitUpdate(recorder);
        return host;
    };
}
function default_1(options) {
    return function (host, context) {
        var sourceDir = options.sourceDir;
        if (!sourceDir) {
            throw new schematics_1.SchematicsException("sourceDir option is required.");
        }
        var opts = ['state', 'stateInterface'].reduce(function (current, key) {
            return ngrx_utils_1.omit(current, key);
        }, options);
        var templateSource = schematics_1.apply(schematics_1.url('./files'), [
            options.spec ? schematics_1.noop() : schematics_1.filter(function (path) { return !path.endsWith('__spec.ts'); }),
            schematics_1.template(__assign({ 'if-flat': function (s) { return (options.flat ? '' : s); } }, stringUtils, options, { dot: function () { return '.'; } })),
            schematics_1.move(sourceDir),
        ]);
        return schematics_1.chain([
            schematics_1.externalSchematic('@schematics/angular', 'component', __assign({}, opts, { spec: false })),
            addStateToComponent(options),
            schematics_1.mergeWith(templateSource),
        ])(host, context);
    };
}
exports.default = default_1;
//# sourceMappingURL=index.js.map