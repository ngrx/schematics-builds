"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("typescript");
var stringUtils = require("../strings");
var change_1 = require("./change");
var schematics_1 = require("@angular-devkit/schematics");
var core_1 = require("@angular-devkit/core");
var find_module_1 = require("./find-module");
var route_utils_1 = require("./route-utils");
var ast_utils_1 = require("./ast-utils");
function addReducerToState(options) {
    return function (host) {
        if (!options.reducers) {
            return host;
        }
        var reducersPath = core_1.normalize("/" + options.sourceDir + "/" + options.path + "/" + options.reducers);
        if (!host.exists(reducersPath)) {
            throw new Error('Specified reducers path does not exist');
        }
        var text = host.read(reducersPath);
        if (text === null) {
            throw new schematics_1.SchematicsException("File " + reducersPath + " does not exist.");
        }
        var sourceText = text.toString('utf-8');
        var source = ts.createSourceFile(reducersPath, sourceText, ts.ScriptTarget.Latest, true);
        var reducerPath = "/" + options.sourceDir + "/" + options.path + "/" +
            (options.flat ? '' : stringUtils.dasherize(options.name) + '/') +
            (options.group ? 'reducers/' : '') +
            stringUtils.dasherize(options.name) +
            '.reducer';
        var relativePath = find_module_1.buildRelativePath(reducersPath, reducerPath);
        var reducerImport = route_utils_1.insertImport(source, reducersPath, "* as from" + stringUtils.classify(options.name), relativePath, true);
        var stateInferfaceInsert = addReducerToStateInferface(source, reducersPath, options);
        var reducerMapInsert = addReducerToActionReducerMap(source, reducersPath, options);
        var changes = [reducerImport, stateInferfaceInsert, reducerMapInsert];
        var recorder = host.beginUpdate(reducersPath);
        for (var _i = 0, changes_1 = changes; _i < changes_1.length; _i++) {
            var change = changes_1[_i];
            if (change instanceof change_1.InsertChange) {
                recorder.insertLeft(change.pos, change.toAdd);
            }
        }
        host.commitUpdate(recorder);
        return host;
    };
}
exports.addReducerToState = addReducerToState;
/**
 * Insert the reducer into the first defined top level interface
 */
function addReducerToStateInferface(source, reducersPath, options) {
    var stateInterface = source.statements.find(function (stm) { return stm.kind === ts.SyntaxKind.InterfaceDeclaration; });
    var node = stateInterface;
    if (!node) {
        return new change_1.NoopChange();
    }
    var keyInsert = stringUtils.camelize(options.name) +
        ': from' +
        stringUtils.classify(options.name) +
        '.State;';
    var expr = node;
    var position;
    var toInsert;
    if (expr.members.length === 0) {
        position = expr.getEnd() - 1;
        toInsert = "  " + keyInsert + "\n";
    }
    else {
        node = expr.members[expr.members.length - 1];
        position = node.getEnd() + 1;
        // Get the indentation of the last element, if any.
        var text = node.getFullText(source);
        var matches = text.match(/^\r?\n+(\s*)/);
        if (matches.length > 0) {
            toInsert = "" + matches[1] + keyInsert + "\n";
        }
        else {
            toInsert = "\n" + keyInsert;
        }
    }
    return new change_1.InsertChange(reducersPath, position, toInsert);
}
exports.addReducerToStateInferface = addReducerToStateInferface;
/**
 * Insert the reducer into the ActionReducerMap
 */
function addReducerToActionReducerMap(source, reducersPath, options) {
    var initializer;
    var actionReducerMap = source.statements
        .filter(function (stm) { return stm.kind === ts.SyntaxKind.VariableStatement; })
        .filter(function (stm) { return !!stm.declarationList; })
        .map(function (stm) {
        var declarations = stm.declarationList.declarations;
        var variable = declarations.find(function (decl) { return decl.kind === ts.SyntaxKind.VariableDeclaration; });
        var type = variable ? variable.type : {};
        return { initializer: variable.initializer, type: type };
    })
        .find(function (_a) {
        var type = _a.type;
        return type.typeName.text === 'ActionReducerMap';
    });
    if (!actionReducerMap || !actionReducerMap.initializer) {
        return new change_1.NoopChange();
    }
    var node = actionReducerMap.initializer;
    var keyInsert = stringUtils.camelize(options.name) +
        ': from' +
        stringUtils.classify(options.name) +
        '.reducer,';
    var expr = node;
    var position;
    var toInsert;
    if (expr.properties.length === 0) {
        position = expr.getEnd() - 1;
        toInsert = "  " + keyInsert + "\n";
    }
    else {
        node = expr.properties[expr.properties.length - 1];
        position = node.getEnd() + 1;
        // Get the indentation of the last element, if any.
        var text = node.getFullText(source);
        var matches = text.match(/^\r?\n+(\s*)/);
        if (matches.length > 0) {
            toInsert = "\n" + matches[1] + keyInsert;
        }
        else {
            toInsert = "\n" + keyInsert;
        }
    }
    return new change_1.InsertChange(reducersPath, position, toInsert);
}
exports.addReducerToActionReducerMap = addReducerToActionReducerMap;
/**
 * Add reducer feature to NgModule
 */
function addReducerImportToNgModule(options) {
    return function (host) {
        if (!options.module) {
            return host;
        }
        var modulePath = options.module;
        if (!host.exists(options.module)) {
            throw new Error('Specified module does not exist');
        }
        var text = host.read(modulePath);
        if (text === null) {
            throw new schematics_1.SchematicsException("File " + modulePath + " does not exist.");
        }
        var sourceText = text.toString('utf-8');
        var source = ts.createSourceFile(modulePath, sourceText, ts.ScriptTarget.Latest, true);
        var commonImports = [
            route_utils_1.insertImport(source, modulePath, 'StoreModule', '@ngrx/store'),
        ];
        var reducerPath = "/" + options.sourceDir + "/" + options.path + "/" +
            (options.flat ? '' : stringUtils.dasherize(options.name) + '/') +
            (options.group ? 'reducers/' : '') +
            stringUtils.dasherize(options.name) +
            '.reducer';
        var relativePath = find_module_1.buildRelativePath(modulePath, reducerPath);
        var reducerImport = route_utils_1.insertImport(source, modulePath, "* as from" + stringUtils.classify(options.name), relativePath, true);
        var storeNgModuleImport = ast_utils_1.addImportToModule(source, modulePath, "StoreModule.forFeature('" + stringUtils.camelize(options.name) + "', from" + stringUtils.classify(options.name) + ".reducer)", relativePath)[0];
        var changes = commonImports.concat([reducerImport, storeNgModuleImport]);
        var recorder = host.beginUpdate(modulePath);
        for (var _i = 0, changes_2 = changes; _i < changes_2.length; _i++) {
            var change = changes_2[_i];
            if (change instanceof change_1.InsertChange) {
                recorder.insertLeft(change.pos, change.toAdd);
            }
        }
        host.commitUpdate(recorder);
        return host;
    };
}
exports.addReducerImportToNgModule = addReducerImportToNgModule;
function omit(object, keyToRemove) {
    return Object.keys(object)
        .filter(function (key) { return key !== keyToRemove; })
        .reduce(function (result, key) {
        return Object.assign(result, (_a = {}, _a[key] = object[key], _a));
        var _a;
    }, {});
}
exports.omit = omit;
//# sourceMappingURL=ngrx-utils.js.map