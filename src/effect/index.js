var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
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
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@ngrx/schematics/src/effect/index", ["require", "exports", "@angular-devkit/schematics", "typescript", "@ngrx/schematics/schematics-core/index"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var schematics_1 = require("@angular-devkit/schematics");
    var ts = require("typescript");
    var schematics_core_1 = require("@ngrx/schematics/schematics-core/index");
    function addImportToNgModule(options) {
        return function (host) {
            var modulePath = options.module;
            if (!modulePath) {
                return host;
            }
            if (!host.exists(modulePath)) {
                throw new Error('Specified module does not exist');
            }
            var text = host.read(modulePath);
            if (text === null) {
                throw new schematics_1.SchematicsException("File " + modulePath + " does not exist.");
            }
            var sourceText = text.toString('utf-8');
            var source = ts.createSourceFile(modulePath, sourceText, ts.ScriptTarget.Latest, true);
            var effectsName = "" + schematics_core_1.stringUtils.classify(options.name + "Effects");
            var effectsModuleImport = schematics_core_1.insertImport(source, modulePath, 'EffectsModule', '@ngrx/effects');
            var effectsPath = "/" + options.path + "/" +
                (options.flat ? '' : schematics_core_1.stringUtils.dasherize(options.name) + '/') +
                (options.group ? 'effects/' : '') +
                schematics_core_1.stringUtils.dasherize(options.name) +
                '.effects';
            var relativePath = schematics_core_1.buildRelativePath(modulePath, effectsPath);
            var effectsImport = schematics_core_1.insertImport(source, modulePath, effectsName, relativePath);
            var _a = __read(schematics_core_1.addImportToModule(source, modulePath, "EffectsModule.for" + (options.root ? 'Root' : 'Feature') + "([" + effectsName + "])", relativePath), 1), effectsNgModuleImport = _a[0];
            var changes = [effectsModuleImport, effectsImport, effectsNgModuleImport];
            var recorder = host.beginUpdate(modulePath);
            try {
                for (var changes_1 = __values(changes), changes_1_1 = changes_1.next(); !changes_1_1.done; changes_1_1 = changes_1.next()) {
                    var change = changes_1_1.value;
                    if (change instanceof schematics_core_1.InsertChange) {
                        recorder.insertLeft(change.pos, change.toAdd);
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (changes_1_1 && !changes_1_1.done && (_b = changes_1.return)) _b.call(changes_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            host.commitUpdate(recorder);
            return host;
            var e_1, _b;
        };
    }
    function default_1(options) {
        return function (host, context) {
            options.path = schematics_core_1.getProjectPath(host, options);
            if (options.module) {
                options.module = schematics_core_1.findModuleFromOptions(host, options);
            }
            var templateSource = schematics_1.apply(schematics_1.url('./files'), [
                options.spec ? schematics_1.noop() : schematics_1.filter(function (path) { return !path.endsWith('__spec.ts'); }),
                schematics_1.template(__assign({}, schematics_core_1.stringUtils, { 'if-flat': function (s) {
                        return schematics_core_1.stringUtils.group(options.flat ? '' : s, options.group ? 'effects' : '');
                    } }, options, { dot: function () { return '.'; } })),
            ]);
            return schematics_1.chain([
                schematics_1.branchAndMerge(schematics_1.chain([
                    schematics_1.filter(function (path) {
                        return path.endsWith('.module.ts') &&
                            !path.endsWith('-routing.module.ts');
                    }),
                    addImportToNgModule(options),
                    schematics_1.mergeWith(templateSource),
                ])),
            ])(host, context);
        };
    }
    exports.default = default_1;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3NjaGVtYXRpY3Mvc3JjL2VmZmVjdC9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFBQSx5REFjb0M7SUFDcEMsK0JBQWlDO0lBQ2pDLDBFQVEwQztJQUcxQyw2QkFBNkIsT0FBc0I7UUFDakQsTUFBTSxDQUFDLFVBQUMsSUFBVTtZQUNoQixJQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDO1lBRWxDLEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztnQkFDaEIsTUFBTSxDQUFDLElBQUksQ0FBQztZQUNkLENBQUM7WUFFRCxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM3QixNQUFNLElBQUksS0FBSyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7WUFDckQsQ0FBQztZQUVELElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDbkMsRUFBRSxDQUFDLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ2xCLE1BQU0sSUFBSSxnQ0FBbUIsQ0FBQyxVQUFRLFVBQVUscUJBQWtCLENBQUMsQ0FBQztZQUN0RSxDQUFDO1lBQ0QsSUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUUxQyxJQUFNLE1BQU0sR0FBRyxFQUFFLENBQUMsZ0JBQWdCLENBQ2hDLFVBQVUsRUFDVixVQUFVLEVBQ1YsRUFBRSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQ3RCLElBQUksQ0FDTCxDQUFDO1lBRUYsSUFBTSxXQUFXLEdBQUcsS0FBRyw2QkFBVyxDQUFDLFFBQVEs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MkJBQWMsQ0FDWixrQkFBSyxDQUFDO29CQUNKLG1CQUFNLENBQ0osVUFBQSxJQUFJO3dCQUNGLE9BQUEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUM7NEJBQzNCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQztvQkFEcEMsQ0FDb0MsQ0FDdkM7b0JBQ0QsbUJBQW1CLENBQUMsT0FBTyxDQUFDO29CQUM1QixzQkFBUyxDQUFDLGNBQWMsQ0FBQztpQkFDMUIsQ0FBQyxDQUNIO2FBQ0YsQ0FBQyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNwQixDQUFDLENBQUM7SUFDSixDQUFDO0lBcENELDRCQW9DQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIFJ1bGUsXG4gIFNjaGVtYXRpY0NvbnRleHQsXG4gIFNjaGVtYXRpY3NFeGNlcHRpb24sXG4gIFRyZWUsXG4gIGFwcGx5LFxuICBicmFuY2hBbmRNZXJnZSxcbiAgY2hhaW4sXG4gIGZpbHRlcixcbiAgbWVyZ2VXaXRoLFxuICBtb3ZlLFxuICBub29wLFxuICB0ZW1wbGF0ZSxcbiAgdXJsLFxufSBmcm9tICdAYW5ndWxhci1kZXZraXQvc2NoZW1hdGljcyc7XG5pbXBvcnQgKiBhcyB0cyBmcm9tICd0eXBlc2NyaXB0JztcbmltcG9ydCB7XG4gIHN0cmluZ1V0aWxzLFxuICBpbnNlcnRJbXBvcnQsXG4gIGJ1aWxkUmVsYXRpdmVQYXRoLFxuICBhZGRJbXBvcnRUb01vZHVsZSxcbiAgSW5zZXJ0Q2hhbmdlLFxuICBnZXRQcm9qZWN0UGF0aCxcbiAgZmluZE1vZHVsZUZyb21PcHRpb25zLFxufSBmcm9tICdAbmdyeC9zY2hlbWF0aWNzL3NjaGVtYXRpY3MtY29yZSc7XG5pbXBvcnQgeyBTY2hlbWEgYXMgRWZmZWN0T3B0aW9ucyB9IGZyb20gJy4vc2NoZW1hJztcblxuZnVuY3Rpb24gYWRkSW1wb3J0VG9OZ01vZHVsZShvcHRpb25zOiBFZmZlY3RPcHRpb25zKTogUnVsZSB7XG4gIHJldHVybiAoaG9zdDogVHJlZSkgPT4ge1xuICAgIGNvbnN0IG1vZHVsZVBhdGggPSBvcHRpb25zLm1vZHVsZTtcblxuICAgIGlmICghbW9kdWxlUGF0aCkge1xuICAgICAgcmV0dXJuIGhvc3Q7XG4gICAgfVxuXG4gICAgaWYgKCFob3N0LmV4aXN0cyhtb2R1bGVQYXRoKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdTcGVjaWZpZWQgbW9kdWxlIGRvZXMgbm90IGV4aXN0Jyk7XG4gICAgfVxuXG4gICAgY29uc3QgdGV4dCA9IGhvc3QucmVhZChtb2R1bGVQYXRoKTtcbiAgICBpZiAodGV4dCA9PT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IFNjaGVtYXRpY3NFeGNlcHRpb24oYEZpbGUgJHttb2R1bGVQYXRofSBkb2VzIG5vdCBleGlzdC5gKTtcbiAgICB9XG4gICAgY29uc3Qgc291cmNlVGV4dCA9IHRleHQudG9TdHJpbmcoJ3V0Zi04Jyk7XG5cbiAgICBjb25zdCBzb3VyY2UgPSB0cy5jcmVhdGVTb3VyY2VGaWxlKFxuICAgICAgbW9kdWxlUGF0aCxcbiAgICAgIHNvdXJjZVRleHQsXG4gICAgICB0cy5TY3JpcHRUYXJnZXQuTGF0ZXN0LFxuICAgICAgdHJ1ZVxuICAgICk7XG5cbiAgICBjb25zdCBlZmZlY3RzTmFtZSA9IGAke3N0cmluZ1V0aWxzLmNsYXNzaWZ5KGAke29wdGlvbnMubmFtZX1FZmZlY3RzYCl9YDtcblxuICAgIGNvbnN0IGVmZmVjdHNNb2R1bGVJbXBvcnQgPSBpbnNlcnRJbXBvcnQoXG4gICAgICBzb3VyY2UsXG4gICAgICBtb2R1bGVQYXRoLFxuICAgICAgJ0VmZmVjdHNNb2R1bGUnLFxuICAgICAgJ0BuZ3J4L2VmZmVjdHMnXG4gICAgKTtcblxuICAgIGNvbnN0IGVmZmVjdHNQYXRoID1cbiAgICAgIGAvJHtvcHRpb25zLnBhdGh9L2AgK1xuICAgICAgKG9wdGlvbnMuZmxhdCA/ICcnIDogc3RyaW5nVXRpbHMuZGFzaGVyaXplKG9wdGlvbnMubmFtZSkgKyAnLycpICtcbiAgICAgIChvcHRpb25zLmdyb3VwID8gJ2VmZmVjdHMvJyA6ICcnKSArXG4gICAgICBzdHJpbmdVdGlscy5kYXNoZXJpemUob3B0aW9ucy5uYW1lKSArXG4gICAgICAnLmVmZmVjdHMnO1xuICAgIGNvbnN0IHJlbGF0aXZlUGF0aCA9IGJ1aWxkUmVsYXRpdmVQYXRoKG1vZHVsZVBhdGgsIGVmZmVjdHNQYXRoKTtcbiAgICBjb25zdCBlZmZlY3RzSW1wb3J0ID0gaW5zZXJ0SW1wb3J0KFxuICAgICAgc291cmNlLFxuICAgICAgbW9kdWxlUGF0aCxcbiAgICAgIGVmZmVjdHNOYW1lLFxuICAgICAgcmVsYXRpdmVQYXRoXG4gICAgKTtcbiAgICBjb25zdCBbZWZmZWN0c05nTW9kdWxlSW1wb3J0XSA9IGFkZEltcG9ydFRvTW9kdWxlKFxuICAgICAgc291cmNlLFxuICAgICAgbW9kdWxlUGF0aCxcbiAgICAgIGBFZmZlY3RzTW9kdWxlLmZvciR7b3B0aW9ucy5yb290ID8gJ1Jvb3QnIDogJ0ZlYXR1cmUnfShbJHtlZmZlY3RzTmFtZX1dKWAsXG4gICAgICByZWxhdGl2ZVBhdGhcbiAgICApO1xuICAgIGNvbnN0IGNoYW5nZXMgPSBbZWZmZWN0c01vZHVsZUltcG9ydCwgZWZmZWN0c0ltcG9ydCwgZWZmZWN0c05nTW9kdWxlSW1wb3J0XTtcbiAgICBjb25zdCByZWNvcmRlciA9IGhvc3QuYmVnaW5VcGRhdGUobW9kdWxlUGF0aCk7XG4gICAgZm9yIChjb25zdCBjaGFuZ2Ugb2YgY2hhbmdlcykge1xuICAgICAgaWYgKGNoYW5nZSBpbnN0YW5jZW9mIEluc2VydENoYW5nZSkge1xuICAgICAgICByZWNvcmRlci5pbnNlcnRMZWZ0KGNoYW5nZS5wb3MsIGNoYW5nZS50b0FkZCk7XG4gICAgICB9XG4gICAgfVxuICAgIGhvc3QuY29tbWl0VXBkYXRlKHJlY29yZGVyKTtcblxuICAgIHJldHVybiBob3N0O1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihvcHRpb25zOiBFZmZlY3RPcHRpb25zKTogUnVsZSB7XG4gIHJldHVybiAoaG9zdDogVHJlZSwgY29udGV4dDogU2NoZW1hdGljQ29udGV4dCkgPT4ge1xuICAgIG9wdGlvbnMucGF0aCA9IGdldFByb2plY3RQYXRoKGhvc3QsIG9wdGlvbnMpO1xuXG4gICAgaWYgKG9wdGlvbnMubW9kdWxlKSB7XG4gICAgICBvcHRpb25zLm1vZHVsZSA9IGZpbmRNb2R1bGVGcm9tT3B0aW9ucyhob3N0LCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICBjb25zdCB0ZW1wbGF0ZVNvdXJjZSA9IGFwcGx5KHVybCgnLi9maWxlcycpLCBbXG4gICAgICBvcHRpb25zLnNwZWMgPyBub29wKCkgOiBmaWx0ZXIocGF0aCA9PiAhcGF0aC5lbmRzV2l0aCgnX19zcGVjLnRzJykpLFxuICAgICAgdGVtcGxhdGUoe1xuICAgICAgICAuLi5zdHJpbmdVdGlscyxcbiAgICAgICAgJ2lmLWZsYXQnOiAoczogc3RyaW5nKSA9PlxuICAgICAgICAgIHN0cmluZ1V0aWxzLmdyb3VwKFxuICAgICAgICAgICAgb3B0aW9ucy5mbGF0ID8gJycgOiBzLFxuICAgICAgICAgICAgb3B0aW9ucy5ncm91cCA/ICdlZmZlY3RzJyA6ICcnXG4gICAgICAgICAgKSxcbiAgICAgICAgLi4uKG9wdGlvbnMgYXMgb2JqZWN0KSxcbiAgICAgICAgZG90OiAoKSA9PiAnLicsXG4gICAgICB9IGFzIGFueSksXG4gICAgXSk7XG5cbiAgICByZXR1cm4gY2hhaW4oW1xuICAgICAgYnJhbmNoQW5kTWVyZ2UoXG4gICAgICAgIGNoYWluKFtcbiAgICAgICAgICBmaWx0ZXIoXG4gICAgICAgICAgICBwYXRoID0+XG4gICAgICAgICAgICAgIHBhdGguZW5kc1dpdGgoJy5tb2R1bGUudHMnKSAmJlxuICAgICAgICAgICAgICAhcGF0aC5lbmRzV2l0aCgnLXJvdXRpbmcubW9kdWxlLnRzJylcbiAgICAgICAgICApLFxuICAgICAgICAgIGFkZEltcG9ydFRvTmdNb2R1bGUob3B0aW9ucyksXG4gICAgICAgICAgbWVyZ2VXaXRoKHRlbXBsYXRlU291cmNlKSxcbiAgICAgICAgXSlcbiAgICAgICksXG4gICAgXSkoaG9zdCwgY29udGV4dCk7XG4gIH07XG59XG4iXX0=