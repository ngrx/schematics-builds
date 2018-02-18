"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular-devkit/core");
var strings_1 = require("../strings");
/**
 * Find the module referred by a set of options passed to the schematics.
 */
function findModuleFromOptions(host, options) {
    if (options.hasOwnProperty('skipImport') && options.skipImport) {
        return undefined;
    }
    if (!options.module) {
        var pathToCheck = (options.sourceDir || '') +
            '/' +
            (options.path || '') +
            (options.flat ? '' : '/' + strings_1.dasherize(options.name));
        return core_1.normalize(findModule(host, pathToCheck));
    }
    else {
        var modulePath = core_1.normalize('/' +
            options.sourceDir +
            '/' +
            (options.appRoot || options.path) +
            '/' +
            options.module);
        var moduleBaseName = core_1.normalize(modulePath)
            .split('/')
            .pop();
        if (host.exists(modulePath)) {
            return core_1.normalize(modulePath);
        }
        else if (host.exists(modulePath + '.ts')) {
            return core_1.normalize(modulePath + '.ts');
        }
        else if (host.exists(modulePath + '.module.ts')) {
            return core_1.normalize(modulePath + '.module.ts');
        }
        else if (host.exists(modulePath + '/' + moduleBaseName + '.module.ts')) {
            return core_1.normalize(modulePath + '/' + moduleBaseName + '.module.ts');
        }
        else {
            throw new Error('Specified module does not exist');
        }
    }
}
exports.findModuleFromOptions = findModuleFromOptions;
/**
 * Function to find the "closest" module to a generated file's path.
 */
function findModule(host, generateDir) {
    var dir = host.getDir('/' + generateDir);
    var moduleRe = /\.module\.ts$/;
    var routingModuleRe = /-routing\.module\.ts/;
    while (dir) {
        var matches = dir.subfiles.filter(function (p) { return moduleRe.test(p) && !routingModuleRe.test(p); });
        if (matches.length == 1) {
            return core_1.join(dir.path, matches[0]);
        }
        else if (matches.length > 1) {
            throw new Error('More than one module matches. Use skip-import option to skip importing ' +
                'the component into the closest module.');
        }
        dir = dir.parent;
    }
    throw new Error('Could not find an NgModule for the new component. Use the skip-import ' +
        'option to skip importing components in NgModule.');
}
exports.findModule = findModule;
/**
 * Build a relative path from one file path to another file path.
 */
function buildRelativePath(from, to) {
    from = core_1.normalize(from);
    to = core_1.normalize(to);
    // Convert to arrays.
    var fromParts = from.split('/');
    var toParts = to.split('/');
    // Remove file names (preserving destination)
    fromParts.pop();
    var toFileName = toParts.pop();
    var relativePath = core_1.relative(core_1.normalize(fromParts.join('/')), core_1.normalize(toParts.join('/')));
    var pathPrefix = '';
    // Set the path prefix for same dir or child dir, parent dir starts with `..`
    if (!relativePath) {
        pathPrefix = '.';
    }
    else if (!relativePath.startsWith('.')) {
        pathPrefix = "./";
    }
    if (pathPrefix && !pathPrefix.endsWith('/')) {
        pathPrefix += '/';
    }
    return pathPrefix + (relativePath ? relativePath + '/' : '') + toFileName;
}
exports.buildRelativePath = buildRelativePath;
//# sourceMappingURL=find-module.js.map