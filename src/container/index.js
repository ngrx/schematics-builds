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
require("rxjs/add/operator/merge");
var ts = require("typescript");
var stringUtils = require("../strings");
var ast_utils_1 = require("../utility/ast-utils");
var change_1 = require("../utility/change");
var find_module_1 = require("../utility/find-module");
function addDeclarationToNgModule(options) {
    return function (host) {
        if (options.skipImport || !options.module) {
            return host;
        }
        var modulePath = options.module;
        var text = host.read(modulePath);
        if (text === null) {
            throw new schematics_1.SchematicsException("File " + modulePath + " does not exist.");
        }
        var sourceText = text.toString('utf-8');
        var source = ts.createSourceFile(modulePath, sourceText, ts.ScriptTarget.Latest, true);
        var componentPath = "/" + options.sourceDir + "/" + options.path + "/" +
            (options.flat ? '' : stringUtils.dasherize(options.name) + '/') +
            stringUtils.dasherize(options.name) +
            '.component';
        var relativePath = find_module_1.buildRelativePath(modulePath, componentPath);
        var classifiedName = stringUtils.classify(options.name + "Component");
        var declarationChanges = ast_utils_1.addDeclarationToModule(source, modulePath, classifiedName, relativePath);
        var declarationRecorder = host.beginUpdate(modulePath);
        for (var _i = 0, declarationChanges_1 = declarationChanges; _i < declarationChanges_1.length; _i++) {
            var change = declarationChanges_1[_i];
            if (change instanceof change_1.InsertChange) {
                declarationRecorder.insertLeft(change.pos, change.toAdd);
            }
        }
        host.commitUpdate(declarationRecorder);
        if (options.export) {
            // Need to refresh the AST because we overwrote the file in the host.
            var text_1 = host.read(modulePath);
            if (text_1 === null) {
                throw new schematics_1.SchematicsException("File " + modulePath + " does not exist.");
            }
            var sourceText_1 = text_1.toString('utf-8');
            var source_1 = ts.createSourceFile(modulePath, sourceText_1, ts.ScriptTarget.Latest, true);
            var exportRecorder = host.beginUpdate(modulePath);
            var exportChanges = ast_utils_1.addExportToModule(source_1, modulePath, stringUtils.classify(options.name + "Component"), relativePath);
            for (var _a = 0, exportChanges_1 = exportChanges; _a < exportChanges_1.length; _a++) {
                var change = exportChanges_1[_a];
                if (change instanceof change_1.InsertChange) {
                    exportRecorder.insertLeft(change.pos, change.toAdd);
                }
            }
            host.commitUpdate(exportRecorder);
        }
        return host;
    };
}
function buildSelector(options) {
    var selector = stringUtils.dasherize(options.name);
    if (options.prefix) {
        selector = options.prefix + "-" + selector;
    }
    return selector;
}
function default_1(options) {
    var sourceDir = options.sourceDir;
    if (!sourceDir) {
        throw new schematics_1.SchematicsException("sourceDir option is required.");
    }
    return function (host, context) {
        options.selector = options.selector || buildSelector(options);
        options.path = options.path ? core_1.normalize(options.path) : options.path;
        options.module = find_module_1.findModuleFromOptions(host, options);
        var componentPath = "/" + options.sourceDir + "/" + options.path + "/" +
            (options.flat ? '' : stringUtils.dasherize(options.name) + '/') +
            stringUtils.dasherize(options.name) +
            '.component';
        if (options.state) {
            var statePath = "/" + options.sourceDir + "/" + options.path + "/" + options.state;
            options.state = find_module_1.buildRelativePath(componentPath, statePath);
        }
        var templateSource = schematics_1.apply(schematics_1.url('./files'), [
            options.spec ? schematics_1.noop() : schematics_1.filter(function (path) { return !path.endsWith('__spec.ts'); }),
            options.inlineStyle
                ? schematics_1.filter(function (path) { return !path.endsWith('.__styleext__'); })
                : schematics_1.noop(),
            options.inlineTemplate ? schematics_1.filter(function (path) { return !path.endsWith('.html'); }) : schematics_1.noop(),
            schematics_1.template(__assign({}, stringUtils, { 'if-flat': function (s) { return (options.flat ? '' : s); } }, options, { dot: function () { return '.'; } })),
            schematics_1.move(sourceDir),
        ]);
        return schematics_1.chain([
            schematics_1.branchAndMerge(schematics_1.chain([addDeclarationToNgModule(options), schematics_1.mergeWith(templateSource)])),
        ])(host, context);
    };
}
exports.default = default_1;
//# sourceMappingURL=index.js.map