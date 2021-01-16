"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
exports.__esModule = true;
exports.migrateToCreators = void 0;
var ts = require("typescript");
var schematics_1 = require("@angular-devkit/schematics");
var schematics_core_1 = require("@ngrx/schematics/schematics-core");
function migrateToCreators() {
    return function (host) {
        return host.visit(function (path) {
            if (!path.endsWith('.ts')) {
                return;
            }
            var sourceFile = ts.createSourceFile(path, host.read(path).toString(), ts.ScriptTarget.Latest);
            if (sourceFile.isDeclarationFile) {
                return;
            }
            var effectsPerClass = sourceFile.statements
                .filter(ts.isClassDeclaration)
                .map(function (clas) {
                return clas.members
                    .filter(ts.isPropertyDeclaration)
                    .filter(function (property) {
                    return property.decorators &&
                        property.decorators.some(isEffectDecorator);
                });
            });
            var effects = effectsPerClass.reduce(function (acc, effects) { return acc.concat(effects); }, []);
            var createEffectsChanges = replaceEffectDecorators(host, path, effects);
            var importChanges = schematics_core_1.replaceImport(sourceFile, path, '@ngrx/effects', 'Effect', 'createEffect');
            return schematics_core_1.commitChanges(host, sourceFile.fileName, __spread(importChanges, createEffectsChanges));
        });
    };
}
exports.migrateToCreators = migrateToCreators;
function replaceEffectDecorators(host, path, effects) {
    var inserts = effects
        .filter(function (effect) { return !!effect.initializer; })
        .map(function (effect) {
        var decorator = (effect.decorators || []).find(isEffectDecorator);
        var effectArguments = getDispatchProperties(host, path, decorator);
        var end = effectArguments ? ", " + effectArguments + ")" : ')';
        return [
            new schematics_core_1.InsertChange(path, effect.initializer.pos, ' createEffect(() =>'),
            new schematics_core_1.InsertChange(path, effect.initializer.end, end),
        ];
    })
        .reduce(function (acc, inserts) { return acc.concat(inserts); }, []);
    var removes = effects
        .map(function (effect) { return effect.decorators; })
        .filter(function (decorators) { return decorators; })
        .map(function (decorators) {
        var effectDecorators = decorators.filter(isEffectDecorator);
        return effectDecorators.map(function (decorator) {
            return new schematics_core_1.RemoveChange(path, decorator.expression.pos - 1, // also get the @ sign
            decorator.expression.end);
        });
    })
        .reduce(function (acc, removes) { return acc.concat(removes); }, []);
    return __spread(inserts, removes);
}
function isEffectDecorator(decorator) {
    return (ts.isCallExpression(decorator.expression) &&
        ts.isIdentifier(decorator.expression.expression) &&
        decorator.expression.expression.text === 'Effect');
}
function getDispatchProperties(host, path, decorator) {
    if (!decorator.expression || !ts.isCallExpression(decorator.expression)) {
        return '';
    }
    // just copy the effect properties
    var content = host.read(path).toString('utf8');
    var args = content
        .substring(decorator.expression.arguments.pos, decorator.expression.arguments.end)
        .trim();
    return args;
}
function default_1() {
    return schematics_1.chain([migrateToCreators()]);
}
exports["default"] = default_1;
//# sourceMappingURL=index.js.map