"use strict";
exports.__esModule = true;
exports.exportReactiveComponentModule = exports.importReactiveComponentModule = exports.migrateToNgrxPush = void 0;
var ts = require("typescript");
var schematics_1 = require("@angular-devkit/schematics");
var schematics_core_1 = require("../../schematics-core");
var ASYNC_REGEXP = /\| {0,}async/g;
var REACTIVE_MODULE = 'ReactiveComponentModule';
var COMPONENT_MODULE = '@ngrx/component';
var reactiveModuleToFind = function (node) {
    return ts.isIdentifier(node) && node.text === REACTIVE_MODULE;
};
var ngModulesToFind = function (node) {
    return ts.isIdentifier(node) &&
        (node.text === 'CommonModule' || node.text === 'BrowserModule');
};
function migrateToNgrxPush() {
    return function (host) {
        return (0, schematics_core_1.visitTemplates)(host, function (template) {
            var match;
            var changes = [];
            while ((match = ASYNC_REGEXP.exec(template.content)) !== null) {
                var m = match.toString();
                changes.push(new schematics_core_1.ReplaceChange(template.fileName, 
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                template.start + match.index, m, m.replace('async', 'ngrxPush')));
            }
            return (0, schematics_core_1.commitChanges)(host, template.fileName, changes);
        });
    };
}
exports.migrateToNgrxPush = migrateToNgrxPush;
function importReactiveComponentModule() {
    return function (host) {
        (0, schematics_core_1.visitTSSourceFiles)(host, function (sourceFile) {
            var hasCommonModuleOrBrowserModule = false;
            var hasReactiveComponentModule = false;
            (0, schematics_core_1.visitNgModuleImports)(sourceFile, function (_, importNodes) {
                hasCommonModuleOrBrowserModule = importNodes.some(ngModulesToFind);
                hasReactiveComponentModule = importNodes.some(reactiveModuleToFind);
            });
            if (hasCommonModuleOrBrowserModule && !hasReactiveComponentModule) {
                var changes = (0, schematics_core_1.addImportToModule)(sourceFile, sourceFile.fileName, REACTIVE_MODULE, COMPONENT_MODULE);
                (0, schematics_core_1.commitChanges)(host, sourceFile.fileName, changes);
            }
        });
    };
}
exports.importReactiveComponentModule = importReactiveComponentModule;
function exportReactiveComponentModule() {
    return function (host) {
        (0, schematics_core_1.visitTSSourceFiles)(host, function (sourceFile) {
            var hasCommonModuleOrBrowserModule = false;
            var hasReactiveComponentModule = false;
            (0, schematics_core_1.visitNgModuleExports)(sourceFile, function (_, exportNodes) {
                hasCommonModuleOrBrowserModule = exportNodes.some(ngModulesToFind);
                hasReactiveComponentModule = exportNodes.some(reactiveModuleToFind);
            });
            if (hasCommonModuleOrBrowserModule && !hasReactiveComponentModule) {
                var changes = (0, schematics_core_1.addExportToModule)(sourceFile, sourceFile.fileName, REACTIVE_MODULE, COMPONENT_MODULE);
                (0, schematics_core_1.commitChanges)(host, sourceFile.fileName, changes);
            }
        });
    };
}
exports.exportReactiveComponentModule = exportReactiveComponentModule;
function default_1() {
    return (0, schematics_1.chain)([
        migrateToNgrxPush(),
        importReactiveComponentModule(),
        exportReactiveComponentModule(),
    ]);
}
exports["default"] = default_1;
//# sourceMappingURL=index.js.map