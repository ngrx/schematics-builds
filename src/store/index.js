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
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
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
        define("@ngrx/schematics/src/store/index", ["require", "exports", "@angular-devkit/schematics", "@angular-devkit/core", "typescript", "@ngrx/schematics/schematics-core/index"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var schematics_1 = require("@angular-devkit/schematics");
    var core_1 = require("@angular-devkit/core");
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
            var statePath = options.path + "/" + options.statePath;
            var relativePath = schematics_core_1.buildRelativePath(modulePath, statePath);
            var srcPath = core_1.dirname(options.path);
            var environmentsPath = schematics_core_1.buildRelativePath(statePath, srcPath + "/environments/environment");
            var storeNgModuleImport = schematics_core_1.addImportToModule(source, modulePath, options.root
                ? "StoreModule.forRoot(reducers, { metaReducers })"
                : "StoreModule.forFeature('" + schematics_core_1.stringUtils.camelize(options.name) + "', from" + schematics_core_1.stringUtils.classify(options.name) + ".reducers, { metaReducers: from" + schematics_core_1.stringUtils.classify(options.name) + ".metaReducers })", relativePath).shift();
            var commonImports = [
                schematics_core_1.insertImport(source, modulePath, 'StoreModule', '@ngrx/store'),
                options.root
                    ? schematics_core_1.insertImport(source, modulePath, 'reducers, metaReducers', relativePath)
                    : schematics_core_1.insertImport(source, modulePath, "* as from" + schematics_core_1.stringUtils.classify(options.name), relativePath, true),
                storeNgModuleImport,
            ];
            var rootImports = [];
            if (options.root) {
                var storeDevtoolsNgModuleImport = schematics_core_1.addImportToModule(source, modulePath, "!environment.production ? StoreDevtoolsModule.instrument() : []", relativePath).shift();
                rootImports = rootImports.concat([
                    schematics_core_1.insertImport(source, modulePath, 'StoreDevtoolsModule', '@ngrx/store-devtools'),
                    schematics_core_1.insertImport(source, modulePath, 'environment', environmentsPath),
                    storeDevtoolsNgModuleImport,
                ]);
            }
            var changes = __spread(commonImports, rootImports);
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
                    if (changes_1_1 && !changes_1_1.done && (_a = changes_1.return)) _a.call(changes_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            host.commitUpdate(recorder);
            return host;
            var e_1, _a;
        };
    }
    function default_1(options) {
        return function (host, context) {
            options.path = schematics_core_1.getProjectPath(host, options);
            var parsedPath = schematics_core_1.parseName(options.path, options.name);
            options.name = parsedPath.name;
            options.path = parsedPath.path;
            var statePath = "/" + options.path + "/" + options.statePath + "/index.ts";
            var srcPath = core_1.dirname(options.path);
            var environmentsPath = schematics_core_1.buildRelativePath(statePath, srcPath + "/environments/environment");
            if (options.module) {
                options.module = schematics_core_1.findModuleFromOptions(host, options);
            }
            if (options.root &&
                options.stateInterface &&
                options.stateInterface !== 'State') {
                options.stateInterface = schematics_core_1.stringUtils.classify(options.stateInterface);
            }
            var templateSource = schematics_1.apply(schematics_1.url('./files'), [
                schematics_1.template(__assign({}, schematics_core_1.stringUtils, options, { environmentsPath: environmentsPath })),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3NjaGVtYXRpY3Mvc3JjL3N0b3JlL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFBQSx5REFhb0M7SUFDcEMsNkNBQXFEO0lBQ3JELCtCQUFpQztJQUNqQywwRUFVMEM7SUFHMUMsNkJBQTZCLE9BQXFCO1FBQ2hELE1BQU0sQ0FBQyxVQUFDLElBQVU7WUFDaEIsSUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztZQUVsQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hCLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDZCxDQUFDO1lBRUQsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDN0IsTUFBTSxJQUFJLEtBQUssQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO1lBQ3JELENBQUM7WUFFRCxJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ25DLEVBQUUsQ0FBQyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNsQixNQUFNLElBQUksZ0NBQW1CLENBQUMsVUFBUSxVQUFVLHFCQUFrQixDQUFDLENBQUM7WUFDdEUsQ0FBQztZQUNELElBQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7WUFFMUMsSUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDLGdCQUFnQixDQUNoQyxVQUFVLEVBQ1YsVUFBVSxFQUNWLEVBQUUsQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUN0QixJQUFJLENBQ0wsQ0FBQztZQUVGLElBQU0sU0FBUyxHQUFNLE9BQU8s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SSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUM7NEJBQzNCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQztvQkFEcEMsQ0FDb0MsQ0FDdkM7b0JBQ0QsbUJBQW1CLENBQUMsT0FBTyxDQUFDO29CQUM1QixzQkFBUyxDQUFDLGNBQWMsQ0FBQztpQkFDMUIsQ0FBQyxDQUNIO2FBQ0YsQ0FBQyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNwQixDQUFDLENBQUM7SUFDSixDQUFDO0lBbERELDRCQWtEQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIFJ1bGUsXG4gIFNjaGVtYXRpY0NvbnRleHQsXG4gIFNjaGVtYXRpY3NFeGNlcHRpb24sXG4gIFRyZWUsXG4gIGFwcGx5LFxuICBicmFuY2hBbmRNZXJnZSxcbiAgY2hhaW4sXG4gIGZpbHRlcixcbiAgbWVyZ2VXaXRoLFxuICB0ZW1wbGF0ZSxcbiAgdXJsLFxuICBtb3ZlLFxufSBmcm9tICdAYW5ndWxhci1kZXZraXQvc2NoZW1hdGljcyc7XG5pbXBvcnQgeyBQYXRoLCBkaXJuYW1lIH0gZnJvbSAnQGFuZ3VsYXItZGV2a2l0L2NvcmUnO1xuaW1wb3J0ICogYXMgdHMgZnJvbSAndHlwZXNjcmlwdCc7XG5pbXBvcnQge1xuICBzdHJpbmdVdGlscyxcbiAgYnVpbGRSZWxhdGl2ZVBhdGgsXG4gIGluc2VydEltcG9ydCxcbiAgQ2hhbmdlLFxuICBJbnNlcnRDaGFuZ2UsXG4gIGdldFByb2plY3RQYXRoLFxuICBmaW5kTW9kdWxlRnJvbU9wdGlvbnMsXG4gIGFkZEltcG9ydFRvTW9kdWxlLFxuICBwYXJzZU5hbWUsXG59IGZyb20gJ0BuZ3J4L3NjaGVtYXRpY3Mvc2NoZW1hdGljcy1jb3JlJztcbmltcG9ydCB7IFNjaGVtYSBhcyBTdG9yZU9wdGlvbnMgfSBmcm9tICcuL3NjaGVtYSc7XG5cbmZ1bmN0aW9uIGFkZEltcG9ydFRvTmdNb2R1bGUob3B0aW9uczogU3RvcmVPcHRpb25zKTogUnVsZSB7XG4gIHJldHVybiAoaG9zdDogVHJlZSkgPT4ge1xuICAgIGNvbnN0IG1vZHVsZVBhdGggPSBvcHRpb25zLm1vZHVsZTtcblxuICAgIGlmICghbW9kdWxlUGF0aCkge1xuICAgICAgcmV0dXJuIGhvc3Q7XG4gICAgfVxuXG4gICAgaWYgKCFob3N0LmV4aXN0cyhtb2R1bGVQYXRoKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdTcGVjaWZpZWQgbW9kdWxlIGRvZXMgbm90IGV4aXN0Jyk7XG4gICAgfVxuXG4gICAgY29uc3QgdGV4dCA9IGhvc3QucmVhZChtb2R1bGVQYXRoKTtcbiAgICBpZiAodGV4dCA9PT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IFNjaGVtYXRpY3NFeGNlcHRpb24oYEZpbGUgJHttb2R1bGVQYXRofSBkb2VzIG5vdCBleGlzdC5gKTtcbiAgICB9XG4gICAgY29uc3Qgc291cmNlVGV4dCA9IHRleHQudG9TdHJpbmcoJ3V0Zi04Jyk7XG5cbiAgICBjb25zdCBzb3VyY2UgPSB0cy5jcmVhdGVTb3VyY2VGaWxlKFxuICAgICAgbW9kdWxlUGF0aCxcbiAgICAgIHNvdXJjZVRleHQsXG4gICAgICB0cy5TY3JpcHRUYXJnZXQuTGF0ZXN0LFxuICAgICAgdHJ1ZVxuICAgICk7XG5cbiAgICBjb25zdCBzdGF0ZVBhdGggPSBgJHtvcHRpb25zLnBhdGh9LyR7b3B0aW9ucy5zdGF0ZVBhdGh9YDtcbiAgICBjb25zdCByZWxhdGl2ZVBhdGggPSBidWlsZFJlbGF0aXZlUGF0aChtb2R1bGVQYXRoLCBzdGF0ZVBhdGgpO1xuICAgIGNvbnN0IHNyY1BhdGggPSBkaXJuYW1lKG9wdGlvbnMucGF0aCBhcyBQYXRoKTtcbiAgICBjb25zdCBlbnZpcm9ubWVudHNQYXRoID0gYnVpbGRSZWxhdGl2ZVBhdGgoXG4gICAgICBzdGF0ZVBhdGgsXG4gICAgICBgJHtzcmNQYXRofS9lbnZpcm9ubWVudHMvZW52aXJvbm1lbnRgXG4gICAgKTtcblxuICAgIGNvbnN0IHN0b3JlTmdNb2R1bGVJbXBvcnQgPSBhZGRJbXBvcnRUb01vZHVsZShcbiAgICAgIHNvdXJjZSxcbiAgICAgIG1vZHVsZVBhdGgsXG4gICAgICBvcHRpb25zLnJvb3RcbiAgICAgICAgPyBgU3RvcmVNb2R1bGUuZm9yUm9vdChyZWR1Y2VycywgeyBtZXRhUmVkdWNlcnMgfSlgXG4gICAgICAgIDogYFN0b3JlTW9kdWxlLmZvckZlYXR1cmUoJyR7c3RyaW5nVXRpbHMuY2FtZWxpemUoXG4gICAgICAgICAgICBvcHRpb25zLm5hbWVcbiAgICAgICAgICApfScsIGZyb20ke3N0cmluZ1V0aWxzLmNsYXNzaWZ5KFxuICAgICAgICAgICAgb3B0aW9ucy5uYW1lXG4gICAgICAgICAgKX0ucmVkdWNlcnMsIHsgbWV0YVJlZHVjZXJzOiBmcm9tJHtzdHJpbmdVdGlscy5jbGFzc2lmeShcbiAgICAgICAgICAgIG9wdGlvbnMubmFtZVxuICAgICAgICAgICl9Lm1ldGFSZWR1Y2VycyB9KWAsXG4gICAgICByZWxhdGl2ZVBhdGhcbiAgICApLnNoaWZ0KCk7XG5cbiAgICBsZXQgY29tbW9uSW1wb3J0cyA9IFtcbiAgICAgIGluc2VydEltcG9ydChzb3VyY2UsIG1vZHVsZVBhdGgsICdTdG9yZU1vZHVsZScsICdAbmdyeC9zdG9yZScpLFxuICAgICAgb3B0aW9ucy5yb290XG4gICAgICAgID8gaW5zZXJ0SW1wb3J0KFxuICAgICAgICAgICAgc291cmNlLFxuICAgICAgICAgICAgbW9kdWxlUGF0aCxcbiAgICAgICAgICAgICdyZWR1Y2VycywgbWV0YVJlZHVjZXJzJyxcbiAgICAgICAgICAgIHJlbGF0aXZlUGF0aFxuICAgICAgICAgIClcbiAgICAgICAgOiBpbnNlcnRJbXBvcnQoXG4gICAgICAgICAgICBzb3VyY2UsXG4gICAgICAgICAgICBtb2R1bGVQYXRoLFxuICAgICAgICAgICAgYCogYXMgZnJvbSR7c3RyaW5nVXRpbHMuY2xhc3NpZnkob3B0aW9ucy5uYW1lKX1gLFxuICAgICAgICAgICAgcmVsYXRpdmVQYXRoLFxuICAgICAgICAgICAgdHJ1ZVxuICAgICAgICAgICksXG4gICAgICBzdG9yZU5nTW9kdWxlSW1wb3J0LFxuICAgIF07XG4gICAgbGV0IHJvb3RJbXBvcnRzOiAoQ2hhbmdlIHwgdW5kZWZpbmVkKVtdID0gW107XG5cbiAgICBpZiAob3B0aW9ucy5yb290KSB7XG4gICAgICBjb25zdCBzdG9yZURldnRvb2xzTmdNb2R1bGVJbXBvcnQgPSBhZGRJbXBvcnRUb01vZHVsZShcbiAgICAgICAgc291cmNlLFxuICAgICAgICBtb2R1bGVQYXRoLFxuICAgICAgICBgIWVudmlyb25tZW50LnByb2R1Y3Rpb24gPyBTdG9yZURldnRvb2xzTW9kdWxlLmluc3RydW1lbnQoKSA6IFtdYCxcbiAgICAgICAgcmVsYXRpdmVQYXRoXG4gICAgICApLnNoaWZ0KCk7XG5cbiAgICAgIHJvb3RJbXBvcnRzID0gcm9vdEltcG9ydHMuY29uY2F0KFtcbiAgICAgICAgaW5zZXJ0SW1wb3J0KFxuICAgICAgICAgIHNvdXJjZSxcbiAgICAgICAgICBtb2R1bGVQYXRoLFxuICAgICAgICAgICdTdG9yZURldnRvb2xzTW9kdWxlJyxcbiAgICAgICAgICAnQG5ncngvc3RvcmUtZGV2dG9vbHMnXG4gICAgICAgICksXG4gICAgICAgIGluc2VydEltcG9ydChzb3VyY2UsIG1vZHVsZVBhdGgsICdlbnZpcm9ubWVudCcsIGVudmlyb25tZW50c1BhdGgpLFxuICAgICAgICBzdG9yZURldnRvb2xzTmdNb2R1bGVJbXBvcnQsXG4gICAgICBdKTtcbiAgICB9XG5cbiAgICBjb25zdCBjaGFuZ2VzID0gWy4uLmNvbW1vbkltcG9ydHMsIC4uLnJvb3RJbXBvcnRzXTtcbiAgICBjb25zdCByZWNvcmRlciA9IGhvc3QuYmVnaW5VcGRhdGUobW9kdWxlUGF0aCk7XG4gICAgZm9yIChjb25zdCBjaGFuZ2Ugb2YgY2hhbmdlcykge1xuICAgICAgaWYgKGNoYW5nZSBpbnN0YW5jZW9mIEluc2VydENoYW5nZSkge1xuICAgICAgICByZWNvcmRlci5pbnNlcnRMZWZ0KGNoYW5nZS5wb3MsIGNoYW5nZS50b0FkZCk7XG4gICAgICB9XG4gICAgfVxuICAgIGhvc3QuY29tbWl0VXBkYXRlKHJlY29yZGVyKTtcblxuICAgIHJldHVybiBob3N0O1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihvcHRpb25zOiBTdG9yZU9wdGlvbnMpOiBSdWxlIHtcbiAgcmV0dXJuIChob3N0OiBUcmVlLCBjb250ZXh0OiBTY2hlbWF0aWNDb250ZXh0KSA9PiB7XG4gICAgb3B0aW9ucy5wYXRoID0gZ2V0UHJvamVjdFBhdGgoaG9zdCwgb3B0aW9ucyk7XG5cbiAgICBjb25zdCBwYXJzZWRQYXRoID0gcGFyc2VOYW1lKG9wdGlvbnMucGF0aCwgb3B0aW9ucy5uYW1lKTtcbiAgICBvcHRpb25zLm5hbWUgPSBwYXJzZWRQYXRoLm5hbWU7XG4gICAgb3B0aW9ucy5wYXRoID0gcGFyc2VkUGF0aC5wYXRoO1xuXG4gICAgY29uc3Qgc3RhdGVQYXRoID0gYC8ke29wdGlvbnMucGF0aH0vJHtvcHRpb25zLnN0YXRlUGF0aH0vaW5kZXgudHNgO1xuICAgIGNvbnN0IHNyY1BhdGggPSBkaXJuYW1lKG9wdGlvbnMucGF0aCBhcyBQYXRoKTtcbiAgICBjb25zdCBlbnZpcm9ubWVudHNQYXRoID0gYnVpbGRSZWxhdGl2ZVBhdGgoXG4gICAgICBzdGF0ZVBhdGgsXG4gICAgICBgJHtzcmNQYXRofS9lbnZpcm9ubWVudHMvZW52aXJvbm1lbnRgXG4gICAgKTtcblxuICAgIGlmIChvcHRpb25zLm1vZHVsZSkge1xuICAgICAgb3B0aW9ucy5tb2R1bGUgPSBmaW5kTW9kdWxlRnJvbU9wdGlvbnMoaG9zdCwgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgb3B0aW9ucy5yb290ICYmXG4gICAgICBvcHRpb25zLnN0YXRlSW50ZXJmYWNlICYmXG4gICAgICBvcHRpb25zLnN0YXRlSW50ZXJmYWNlICE9PSAnU3RhdGUnXG4gICAgKSB7XG4gICAgICBvcHRpb25zLnN0YXRlSW50ZXJmYWNlID0gc3RyaW5nVXRpbHMuY2xhc3NpZnkob3B0aW9ucy5zdGF0ZUludGVyZmFjZSk7XG4gICAgfVxuXG4gICAgY29uc3QgdGVtcGxhdGVTb3VyY2UgPSBhcHBseSh1cmwoJy4vZmlsZXMnKSwgW1xuICAgICAgdGVtcGxhdGUoe1xuICAgICAgICAuLi5zdHJpbmdVdGlscyxcbiAgICAgICAgLi4uKG9wdGlvbnMgYXMgb2JqZWN0KSxcbiAgICAgICAgZW52aXJvbm1lbnRzUGF0aCxcbiAgICAgIH0gYXMgYW55KSxcbiAgICAgIG1vdmUocGFyc2VkUGF0aC5wYXRoKSxcbiAgICBdKTtcblxuICAgIHJldHVybiBjaGFpbihbXG4gICAgICBicmFuY2hBbmRNZXJnZShcbiAgICAgICAgY2hhaW4oW1xuICAgICAgICAgIGZpbHRlcihcbiAgICAgICAgICAgIHBhdGggPT5cbiAgICAgICAgICAgICAgcGF0aC5lbmRzV2l0aCgnLm1vZHVsZS50cycpICYmXG4gICAgICAgICAgICAgICFwYXRoLmVuZHNXaXRoKCctcm91dGluZy5tb2R1bGUudHMnKVxuICAgICAgICAgICksXG4gICAgICAgICAgYWRkSW1wb3J0VG9OZ01vZHVsZShvcHRpb25zKSxcbiAgICAgICAgICBtZXJnZVdpdGgodGVtcGxhdGVTb3VyY2UpLFxuICAgICAgICBdKVxuICAgICAgKSxcbiAgICBdKShob3N0LCBjb250ZXh0KTtcbiAgfTtcbn1cbiJdfQ==