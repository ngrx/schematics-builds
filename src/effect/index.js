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
        define("@ngrx/schematics/src/effect/index", ["require", "exports", "@angular-devkit/schematics", "typescript", "@ngrx/schematics/schematics-core/index", "@ngrx/schematics/schematics-core/index"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var schematics_1 = require("@angular-devkit/schematics");
    var ts = require("typescript");
    var schematics_core_1 = require("@ngrx/schematics/schematics-core/index");
    var schematics_core_2 = require("@ngrx/schematics/schematics-core/index");
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
            var parsedPath = schematics_core_2.parseName(options.path, options.name);
            options.name = parsedPath.name;
            options.path = parsedPath.path;
            var templateSource = schematics_1.apply(schematics_1.url('./files'), [
                options.spec ? schematics_1.noop() : schematics_1.filter(function (path) { return !path.endsWith('__spec.ts'); }),
                schematics_1.template(__assign({}, schematics_core_1.stringUtils, { 'if-flat': function (s) {
                        return schematics_core_1.stringUtils.group(options.flat ? '' : s, options.group ? 'effects' : '');
                    } }, options, { dot: function () { return '.'; } })),
                schematics_1.move(parsedPath.path),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3NjaGVtYXRpY3Mvc3JjL2VmZmVjdC9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFBQSx5REFjb0M7SUFDcEMsK0JBQWlDO0lBQ2pDLDBFQVEwQztJQUUxQywwRUFBNkQ7SUFFN0QsNkJBQTZCLE9BQXNCO1FBQ2pELE1BQU0sQ0FBQyxVQUFDLElBQVU7WUFDaEIsSUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztZQUVsQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hCLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDZCxDQUFDO1lBRUQsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDN0IsTUFBTSxJQUFJLEtBQUssQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO1lBQ3JELENBQUM7WUFFRCxJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ25DLEVBQUUsQ0FBQyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNsQixNQUFNLElBQUksZ0NBQW1CLENBQUMsVUFBUSxVQUFVLHFCQUFrQixDQUFDLENBQUM7WUFDdEUsQ0FBQztZQUNELElBQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7WUFFMUMsSUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDLGdCQUFnQixDQUNoQyxVQUFVLEVBQ1YsVUFBVSxFQUNWLEVBQUUsQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUN0QixJQUFJLENBQ0wsQ0FBQztZQUVGLElBQU0sV0FBVyxHQUFHLEtBQUcsNkJB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LE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUMvQjtvQkFIRCxDQUdDLElBQ0MsT0FBa0IsSUFDdEIsR0FBRyxFQUFFLGNBQU0sT0FBQSxHQUFHLEVBQUgsQ0FBRyxHQUNSLENBQUM7Z0JBQ1QsaUJBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDO2FBQ3RCLENBQUMsQ0FBQztZQUVILE1BQU0sQ0FBQyxrQkFBSyxDQUFDO2dCQUNYLDJCQUFjLENBQ1osa0JBQUssQ0FBQztvQkFDSixtQkFBTSxDQUNKLFVBQUEsSUFBSTt3QkFDRixPQUFBLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDOzRCQUMzQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsb0JBQW9CLENBQUM7b0JBRHBDLENBQ29DLENBQ3ZDO29CQUNELG1CQUFtQixDQUFDLE9BQU8sQ0FBQztvQkFDNUIsc0JBQVMsQ0FBQyxjQUFjLENBQUM7aUJBQzFCLENBQUMsQ0FDSDthQUNGLENBQUMsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDcEIsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQXpDRCw0QkF5Q0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBSdWxlLFxuICBTY2hlbWF0aWNDb250ZXh0LFxuICBTY2hlbWF0aWNzRXhjZXB0aW9uLFxuICBUcmVlLFxuICBhcHBseSxcbiAgYnJhbmNoQW5kTWVyZ2UsXG4gIGNoYWluLFxuICBmaWx0ZXIsXG4gIG1lcmdlV2l0aCxcbiAgbW92ZSxcbiAgbm9vcCxcbiAgdGVtcGxhdGUsXG4gIHVybCxcbn0gZnJvbSAnQGFuZ3VsYXItZGV2a2l0L3NjaGVtYXRpY3MnO1xuaW1wb3J0ICogYXMgdHMgZnJvbSAndHlwZXNjcmlwdCc7XG5pbXBvcnQge1xuICBzdHJpbmdVdGlscyxcbiAgaW5zZXJ0SW1wb3J0LFxuICBidWlsZFJlbGF0aXZlUGF0aCxcbiAgYWRkSW1wb3J0VG9Nb2R1bGUsXG4gIEluc2VydENoYW5nZSxcbiAgZ2V0UHJvamVjdFBhdGgsXG4gIGZpbmRNb2R1bGVGcm9tT3B0aW9ucyxcbn0gZnJvbSAnQG5ncngvc2NoZW1hdGljcy9zY2hlbWF0aWNzLWNvcmUnO1xuaW1wb3J0IHsgU2NoZW1hIGFzIEVmZmVjdE9wdGlvbnMgfSBmcm9tICcuL3NjaGVtYSc7XG5pbXBvcnQgeyBwYXJzZU5hbWUgfSBmcm9tICdAbmdyeC9zY2hlbWF0aWNzL3NjaGVtYXRpY3MtY29yZSc7XG5cbmZ1bmN0aW9uIGFkZEltcG9ydFRvTmdNb2R1bGUob3B0aW9uczogRWZmZWN0T3B0aW9ucyk6IFJ1bGUge1xuICByZXR1cm4gKGhvc3Q6IFRyZWUpID0+IHtcbiAgICBjb25zdCBtb2R1bGVQYXRoID0gb3B0aW9ucy5tb2R1bGU7XG5cbiAgICBpZiAoIW1vZHVsZVBhdGgpIHtcbiAgICAgIHJldHVybiBob3N0O1xuICAgIH1cblxuICAgIGlmICghaG9zdC5leGlzdHMobW9kdWxlUGF0aCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignU3BlY2lmaWVkIG1vZHVsZSBkb2VzIG5vdCBleGlzdCcpO1xuICAgIH1cblxuICAgIGNvbnN0IHRleHQgPSBob3N0LnJlYWQobW9kdWxlUGF0aCk7XG4gICAgaWYgKHRleHQgPT09IG51bGwpIHtcbiAgICAgIHRocm93IG5ldyBTY2hlbWF0aWNzRXhjZXB0aW9uKGBGaWxlICR7bW9kdWxlUGF0aH0gZG9lcyBub3QgZXhpc3QuYCk7XG4gICAgfVxuICAgIGNvbnN0IHNvdXJjZVRleHQgPSB0ZXh0LnRvU3RyaW5nKCd1dGYtOCcpO1xuXG4gICAgY29uc3Qgc291cmNlID0gdHMuY3JlYXRlU291cmNlRmlsZShcbiAgICAgIG1vZHVsZVBhdGgsXG4gICAgICBzb3VyY2VUZXh0LFxuICAgICAgdHMuU2NyaXB0VGFyZ2V0LkxhdGVzdCxcbiAgICAgIHRydWVcbiAgICApO1xuXG4gICAgY29uc3QgZWZmZWN0c05hbWUgPSBgJHtzdHJpbmdVdGlscy5jbGFzc2lmeShgJHtvcHRpb25zLm5hbWV9RWZmZWN0c2ApfWA7XG5cbiAgICBjb25zdCBlZmZlY3RzTW9kdWxlSW1wb3J0ID0gaW5zZXJ0SW1wb3J0KFxuICAgICAgc291cmNlLFxuICAgICAgbW9kdWxlUGF0aCxcbiAgICAgICdFZmZlY3RzTW9kdWxlJyxcbiAgICAgICdAbmdyeC9lZmZlY3RzJ1xuICAgICk7XG5cbiAgICBjb25zdCBlZmZlY3RzUGF0aCA9XG4gICAgICBgLyR7b3B0aW9ucy5wYXRofS9gICtcbiAgICAgIChvcHRpb25zLmZsYXQgPyAnJyA6IHN0cmluZ1V0aWxzLmRhc2hlcml6ZShvcHRpb25zLm5hbWUpICsgJy8nKSArXG4gICAgICAob3B0aW9ucy5ncm91cCA/ICdlZmZlY3RzLycgOiAnJykgK1xuICAgICAgc3RyaW5nVXRpbHMuZGFzaGVyaXplKG9wdGlvbnMubmFtZSkgK1xuICAgICAgJy5lZmZlY3RzJztcbiAgICBjb25zdCByZWxhdGl2ZVBhdGggPSBidWlsZFJlbGF0aXZlUGF0aChtb2R1bGVQYXRoLCBlZmZlY3RzUGF0aCk7XG4gICAgY29uc3QgZWZmZWN0c0ltcG9ydCA9IGluc2VydEltcG9ydChcbiAgICAgIHNvdXJjZSxcbiAgICAgIG1vZHVsZVBhdGgsXG4gICAgICBlZmZlY3RzTmFtZSxcbiAgICAgIHJlbGF0aXZlUGF0aFxuICAgICk7XG4gICAgY29uc3QgW2VmZmVjdHNOZ01vZHVsZUltcG9ydF0gPSBhZGRJbXBvcnRUb01vZHVsZShcbiAgICAgIHNvdXJjZSxcbiAgICAgIG1vZHVsZVBhdGgsXG4gICAgICBgRWZmZWN0c01vZHVsZS5mb3Ike29wdGlvbnMucm9vdCA/ICdSb290JyA6ICdGZWF0dXJlJ30oWyR7ZWZmZWN0c05hbWV9XSlgLFxuICAgICAgcmVsYXRpdmVQYXRoXG4gICAgKTtcbiAgICBjb25zdCBjaGFuZ2VzID0gW2VmZmVjdHNNb2R1bGVJbXBvcnQsIGVmZmVjdHNJbXBvcnQsIGVmZmVjdHNOZ01vZHVsZUltcG9ydF07XG4gICAgY29uc3QgcmVjb3JkZXIgPSBob3N0LmJlZ2luVXBkYXRlKG1vZHVsZVBhdGgpO1xuICAgIGZvciAoY29uc3QgY2hhbmdlIG9mIGNoYW5nZXMpIHtcbiAgICAgIGlmIChjaGFuZ2UgaW5zdGFuY2VvZiBJbnNlcnRDaGFuZ2UpIHtcbiAgICAgICAgcmVjb3JkZXIuaW5zZXJ0TGVmdChjaGFuZ2UucG9zLCBjaGFuZ2UudG9BZGQpO1xuICAgICAgfVxuICAgIH1cbiAgICBob3N0LmNvbW1pdFVwZGF0ZShyZWNvcmRlcik7XG5cbiAgICByZXR1cm4gaG9zdDtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24ob3B0aW9uczogRWZmZWN0T3B0aW9ucyk6IFJ1bGUge1xuICByZXR1cm4gKGhvc3Q6IFRyZWUsIGNvbnRleHQ6IFNjaGVtYXRpY0NvbnRleHQpID0+IHtcbiAgICBvcHRpb25zLnBhdGggPSBnZXRQcm9qZWN0UGF0aChob3N0LCBvcHRpb25zKTtcblxuICAgIGlmIChvcHRpb25zLm1vZHVsZSkge1xuICAgICAgb3B0aW9ucy5tb2R1bGUgPSBmaW5kTW9kdWxlRnJvbU9wdGlvbnMoaG9zdCwgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgY29uc3QgcGFyc2VkUGF0aCA9IHBhcnNlTmFtZShvcHRpb25zLnBhdGgsIG9wdGlvbnMubmFtZSk7XG4gICAgb3B0aW9ucy5uYW1lID0gcGFyc2VkUGF0aC5uYW1lO1xuICAgIG9wdGlvbnMucGF0aCA9IHBhcnNlZFBhdGgucGF0aDtcblxuICAgIGNvbnN0IHRlbXBsYXRlU291cmNlID0gYXBwbHkodXJsKCcuL2ZpbGVzJyksIFtcbiAgICAgIG9wdGlvbnMuc3BlYyA/IG5vb3AoKSA6IGZpbHRlcihwYXRoID0+ICFwYXRoLmVuZHNXaXRoKCdfX3NwZWMudHMnKSksXG4gICAgICB0ZW1wbGF0ZSh7XG4gICAgICAgIC4uLnN0cmluZ1V0aWxzLFxuICAgICAgICAnaWYtZmxhdCc6IChzOiBzdHJpbmcpID0+XG4gICAgICAgICAgc3RyaW5nVXRpbHMuZ3JvdXAoXG4gICAgICAgICAgICBvcHRpb25zLmZsYXQgPyAnJyA6IHMsXG4gICAgICAgICAgICBvcHRpb25zLmdyb3VwID8gJ2VmZmVjdHMnIDogJydcbiAgICAgICAgICApLFxuICAgICAgICAuLi4ob3B0aW9ucyBhcyBvYmplY3QpLFxuICAgICAgICBkb3Q6ICgpID0+ICcuJyxcbiAgICAgIH0gYXMgYW55KSxcbiAgICAgIG1vdmUocGFyc2VkUGF0aC5wYXRoKSxcbiAgICBdKTtcblxuICAgIHJldHVybiBjaGFpbihbXG4gICAgICBicmFuY2hBbmRNZXJnZShcbiAgICAgICAgY2hhaW4oW1xuICAgICAgICAgIGZpbHRlcihcbiAgICAgICAgICAgIHBhdGggPT5cbiAgICAgICAgICAgICAgcGF0aC5lbmRzV2l0aCgnLm1vZHVsZS50cycpICYmXG4gICAgICAgICAgICAgICFwYXRoLmVuZHNXaXRoKCctcm91dGluZy5tb2R1bGUudHMnKVxuICAgICAgICAgICksXG4gICAgICAgICAgYWRkSW1wb3J0VG9OZ01vZHVsZShvcHRpb25zKSxcbiAgICAgICAgICBtZXJnZVdpdGgodGVtcGxhdGVTb3VyY2UpLFxuICAgICAgICBdKVxuICAgICAgKSxcbiAgICBdKShob3N0LCBjb250ZXh0KTtcbiAgfTtcbn1cbiJdfQ==