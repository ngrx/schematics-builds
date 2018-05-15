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
        define("@ngrx/schematics/src/store/index", ["require", "exports", "@angular-devkit/schematics", "typescript", "@ngrx/schematics/schematics-core/index"], factory);
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
            var statePath = options.path + "/" + options.statePath;
            var relativePath = schematics_core_1.buildRelativePath(modulePath, statePath);
            var environmentsPath = schematics_core_1.buildRelativePath(statePath, "/" + options.path + "/environments/environment");
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
            var environmentsPath = schematics_core_1.buildRelativePath(statePath, "/" + options.path + "/environments/environment");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3NjaGVtYXRpY3Mvc3JjL3N0b3JlL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFBQSx5REFhb0M7SUFDcEMsK0JBQWlDO0lBQ2pDLDBFQVUwQztJQUcxQyw2QkFBNkIsT0FBcUI7UUFDaEQsTUFBTSxDQUFDLFVBQUMsSUFBVTtZQUNoQixJQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDO1lBRWxDLEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztnQkFDaEIsTUFBTSxDQUFDLElBQUksQ0FBQztZQUNkLENBQUM7WUFFRCxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM3QixNQUFNLElBQUksS0FBSyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7WUFDckQsQ0FBQztZQUVELElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDbkMsRUFBRSxDQUFDLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ2xCLE1BQU0sSUFBSSxnQ0FBbUIsQ0FBQyxVQUFRLFVBQVUscUJBQWtCLENBQUMsQ0FBQztZQUN0RSxDQUFDO1lBQ0QsSUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUUxQyxJQUFNLE1BQU0sR0FBRyxFQUFFLENBQUMsZ0JBQWdCLENBQ2hDLFVBQVUsRUFDVixVQUFVLEVBQ1YsRUFBRSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQ3RCLElBQUksQ0FDTCxDQUFDO1lBRUYsSUFBTSxTQUFTLEdBQU0sT0FBTyxDQUFDLElBQUksU0FB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LG1CQUFtQixDQUFDLE9BQU8sQ0FBQztvQkFDNUIsc0JBQVMsQ0FBQyxjQUFjLENBQUM7aUJBQzFCLENBQUMsQ0FDSDthQUNGLENBQUMsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDcEIsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQWpERCw0QkFpREMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBSdWxlLFxuICBTY2hlbWF0aWNDb250ZXh0LFxuICBTY2hlbWF0aWNzRXhjZXB0aW9uLFxuICBUcmVlLFxuICBhcHBseSxcbiAgYnJhbmNoQW5kTWVyZ2UsXG4gIGNoYWluLFxuICBmaWx0ZXIsXG4gIG1lcmdlV2l0aCxcbiAgbW92ZSxcbiAgdGVtcGxhdGUsXG4gIHVybCxcbn0gZnJvbSAnQGFuZ3VsYXItZGV2a2l0L3NjaGVtYXRpY3MnO1xuaW1wb3J0ICogYXMgdHMgZnJvbSAndHlwZXNjcmlwdCc7XG5pbXBvcnQge1xuICBzdHJpbmdVdGlscyxcbiAgYnVpbGRSZWxhdGl2ZVBhdGgsXG4gIGluc2VydEltcG9ydCxcbiAgQ2hhbmdlLFxuICBJbnNlcnRDaGFuZ2UsXG4gIGdldFByb2plY3RQYXRoLFxuICBmaW5kTW9kdWxlRnJvbU9wdGlvbnMsXG4gIGFkZEltcG9ydFRvTW9kdWxlLFxuICBwYXJzZU5hbWUsXG59IGZyb20gJ0BuZ3J4L3NjaGVtYXRpY3Mvc2NoZW1hdGljcy1jb3JlJztcbmltcG9ydCB7IFNjaGVtYSBhcyBTdG9yZU9wdGlvbnMgfSBmcm9tICcuL3NjaGVtYSc7XG5cbmZ1bmN0aW9uIGFkZEltcG9ydFRvTmdNb2R1bGUob3B0aW9uczogU3RvcmVPcHRpb25zKTogUnVsZSB7XG4gIHJldHVybiAoaG9zdDogVHJlZSkgPT4ge1xuICAgIGNvbnN0IG1vZHVsZVBhdGggPSBvcHRpb25zLm1vZHVsZTtcblxuICAgIGlmICghbW9kdWxlUGF0aCkge1xuICAgICAgcmV0dXJuIGhvc3Q7XG4gICAgfVxuXG4gICAgaWYgKCFob3N0LmV4aXN0cyhtb2R1bGVQYXRoKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdTcGVjaWZpZWQgbW9kdWxlIGRvZXMgbm90IGV4aXN0Jyk7XG4gICAgfVxuXG4gICAgY29uc3QgdGV4dCA9IGhvc3QucmVhZChtb2R1bGVQYXRoKTtcbiAgICBpZiAodGV4dCA9PT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IFNjaGVtYXRpY3NFeGNlcHRpb24oYEZpbGUgJHttb2R1bGVQYXRofSBkb2VzIG5vdCBleGlzdC5gKTtcbiAgICB9XG4gICAgY29uc3Qgc291cmNlVGV4dCA9IHRleHQudG9TdHJpbmcoJ3V0Zi04Jyk7XG5cbiAgICBjb25zdCBzb3VyY2UgPSB0cy5jcmVhdGVTb3VyY2VGaWxlKFxuICAgICAgbW9kdWxlUGF0aCxcbiAgICAgIHNvdXJjZVRleHQsXG4gICAgICB0cy5TY3JpcHRUYXJnZXQuTGF0ZXN0LFxuICAgICAgdHJ1ZVxuICAgICk7XG5cbiAgICBjb25zdCBzdGF0ZVBhdGggPSBgJHtvcHRpb25zLnBhdGh9LyR7b3B0aW9ucy5zdGF0ZVBhdGh9YDtcbiAgICBjb25zdCByZWxhdGl2ZVBhdGggPSBidWlsZFJlbGF0aXZlUGF0aChtb2R1bGVQYXRoLCBzdGF0ZVBhdGgpO1xuICAgIGNvbnN0IGVudmlyb25tZW50c1BhdGggPSBidWlsZFJlbGF0aXZlUGF0aChcbiAgICAgIHN0YXRlUGF0aCxcbiAgICAgIGAvJHtvcHRpb25zLnBhdGh9L2Vudmlyb25tZW50cy9lbnZpcm9ubWVudGBcbiAgICApO1xuXG4gICAgY29uc3Qgc3RvcmVOZ01vZHVsZUltcG9ydCA9IGFkZEltcG9ydFRvTW9kdWxlKFxuICAgICAgc291cmNlLFxuICAgICAgbW9kdWxlUGF0aCxcbiAgICAgIG9wdGlvbnMucm9vdFxuICAgICAgICA/IGBTdG9yZU1vZHVsZS5mb3JSb290KHJlZHVjZXJzLCB7IG1ldGFSZWR1Y2VycyB9KWBcbiAgICAgICAgOiBgU3RvcmVNb2R1bGUuZm9yRmVhdHVyZSgnJHtzdHJpbmdVdGlscy5jYW1lbGl6ZShcbiAgICAgICAgICAgIG9wdGlvbnMubmFtZVxuICAgICAgICAgICl9JywgZnJvbSR7c3RyaW5nVXRpbHMuY2xhc3NpZnkoXG4gICAgICAgICAgICBvcHRpb25zLm5hbWVcbiAgICAgICAgICApfS5yZWR1Y2VycywgeyBtZXRhUmVkdWNlcnM6IGZyb20ke3N0cmluZ1V0aWxzLmNsYXNzaWZ5KFxuICAgICAgICAgICAgb3B0aW9ucy5uYW1lXG4gICAgICAgICAgKX0ubWV0YVJlZHVjZXJzIH0pYCxcbiAgICAgIHJlbGF0aXZlUGF0aFxuICAgICkuc2hpZnQoKTtcblxuICAgIGxldCBjb21tb25JbXBvcnRzID0gW1xuICAgICAgaW5zZXJ0SW1wb3J0KHNvdXJjZSwgbW9kdWxlUGF0aCwgJ1N0b3JlTW9kdWxlJywgJ0BuZ3J4L3N0b3JlJyksXG4gICAgICBvcHRpb25zLnJvb3RcbiAgICAgICAgPyBpbnNlcnRJbXBvcnQoXG4gICAgICAgICAgICBzb3VyY2UsXG4gICAgICAgICAgICBtb2R1bGVQYXRoLFxuICAgICAgICAgICAgJ3JlZHVjZXJzLCBtZXRhUmVkdWNlcnMnLFxuICAgICAgICAgICAgcmVsYXRpdmVQYXRoXG4gICAgICAgICAgKVxuICAgICAgICA6IGluc2VydEltcG9ydChcbiAgICAgICAgICAgIHNvdXJjZSxcbiAgICAgICAgICAgIG1vZHVsZVBhdGgsXG4gICAgICAgICAgICBgKiBhcyBmcm9tJHtzdHJpbmdVdGlscy5jbGFzc2lmeShvcHRpb25zLm5hbWUpfWAsXG4gICAgICAgICAgICByZWxhdGl2ZVBhdGgsXG4gICAgICAgICAgICB0cnVlXG4gICAgICAgICAgKSxcbiAgICAgIHN0b3JlTmdNb2R1bGVJbXBvcnQsXG4gICAgXTtcbiAgICBsZXQgcm9vdEltcG9ydHM6IChDaGFuZ2UgfCB1bmRlZmluZWQpW10gPSBbXTtcblxuICAgIGlmIChvcHRpb25zLnJvb3QpIHtcbiAgICAgIGNvbnN0IHN0b3JlRGV2dG9vbHNOZ01vZHVsZUltcG9ydCA9IGFkZEltcG9ydFRvTW9kdWxlKFxuICAgICAgICBzb3VyY2UsXG4gICAgICAgIG1vZHVsZVBhdGgsXG4gICAgICAgIGAhZW52aXJvbm1lbnQucHJvZHVjdGlvbiA/IFN0b3JlRGV2dG9vbHNNb2R1bGUuaW5zdHJ1bWVudCgpIDogW11gLFxuICAgICAgICByZWxhdGl2ZVBhdGhcbiAgICAgICkuc2hpZnQoKTtcblxuICAgICAgcm9vdEltcG9ydHMgPSByb290SW1wb3J0cy5jb25jYXQoW1xuICAgICAgICBpbnNlcnRJbXBvcnQoXG4gICAgICAgICAgc291cmNlLFxuICAgICAgICAgIG1vZHVsZVBhdGgsXG4gICAgICAgICAgJ1N0b3JlRGV2dG9vbHNNb2R1bGUnLFxuICAgICAgICAgICdAbmdyeC9zdG9yZS1kZXZ0b29scydcbiAgICAgICAgKSxcbiAgICAgICAgaW5zZXJ0SW1wb3J0KHNvdXJjZSwgbW9kdWxlUGF0aCwgJ2Vudmlyb25tZW50JywgZW52aXJvbm1lbnRzUGF0aCksXG4gICAgICAgIHN0b3JlRGV2dG9vbHNOZ01vZHVsZUltcG9ydCxcbiAgICAgIF0pO1xuICAgIH1cblxuICAgIGNvbnN0IGNoYW5nZXMgPSBbLi4uY29tbW9uSW1wb3J0cywgLi4ucm9vdEltcG9ydHNdO1xuICAgIGNvbnN0IHJlY29yZGVyID0gaG9zdC5iZWdpblVwZGF0ZShtb2R1bGVQYXRoKTtcbiAgICBmb3IgKGNvbnN0IGNoYW5nZSBvZiBjaGFuZ2VzKSB7XG4gICAgICBpZiAoY2hhbmdlIGluc3RhbmNlb2YgSW5zZXJ0Q2hhbmdlKSB7XG4gICAgICAgIHJlY29yZGVyLmluc2VydExlZnQoY2hhbmdlLnBvcywgY2hhbmdlLnRvQWRkKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaG9zdC5jb21taXRVcGRhdGUocmVjb3JkZXIpO1xuXG4gICAgcmV0dXJuIGhvc3Q7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG9wdGlvbnM6IFN0b3JlT3B0aW9ucyk6IFJ1bGUge1xuICByZXR1cm4gKGhvc3Q6IFRyZWUsIGNvbnRleHQ6IFNjaGVtYXRpY0NvbnRleHQpID0+IHtcbiAgICBvcHRpb25zLnBhdGggPSBnZXRQcm9qZWN0UGF0aChob3N0LCBvcHRpb25zKTtcblxuICAgIGNvbnN0IHBhcnNlZFBhdGggPSBwYXJzZU5hbWUob3B0aW9ucy5wYXRoLCBvcHRpb25zLm5hbWUpO1xuICAgIG9wdGlvbnMubmFtZSA9IHBhcnNlZFBhdGgubmFtZTtcbiAgICBvcHRpb25zLnBhdGggPSBwYXJzZWRQYXRoLnBhdGg7XG5cbiAgICBjb25zdCBzdGF0ZVBhdGggPSBgLyR7b3B0aW9ucy5wYXRofS8ke29wdGlvbnMuc3RhdGVQYXRofS9pbmRleC50c2A7XG4gICAgY29uc3QgZW52aXJvbm1lbnRzUGF0aCA9IGJ1aWxkUmVsYXRpdmVQYXRoKFxuICAgICAgc3RhdGVQYXRoLFxuICAgICAgYC8ke29wdGlvbnMucGF0aH0vZW52aXJvbm1lbnRzL2Vudmlyb25tZW50YFxuICAgICk7XG5cbiAgICBpZiAob3B0aW9ucy5tb2R1bGUpIHtcbiAgICAgIG9wdGlvbnMubW9kdWxlID0gZmluZE1vZHVsZUZyb21PcHRpb25zKGhvc3QsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIGlmIChcbiAgICAgIG9wdGlvbnMucm9vdCAmJlxuICAgICAgb3B0aW9ucy5zdGF0ZUludGVyZmFjZSAmJlxuICAgICAgb3B0aW9ucy5zdGF0ZUludGVyZmFjZSAhPT0gJ1N0YXRlJ1xuICAgICkge1xuICAgICAgb3B0aW9ucy5zdGF0ZUludGVyZmFjZSA9IHN0cmluZ1V0aWxzLmNsYXNzaWZ5KG9wdGlvbnMuc3RhdGVJbnRlcmZhY2UpO1xuICAgIH1cblxuICAgIGNvbnN0IHRlbXBsYXRlU291cmNlID0gYXBwbHkodXJsKCcuL2ZpbGVzJyksIFtcbiAgICAgIHRlbXBsYXRlKHtcbiAgICAgICAgLi4uc3RyaW5nVXRpbHMsXG4gICAgICAgIC4uLihvcHRpb25zIGFzIG9iamVjdCksXG4gICAgICAgIGVudmlyb25tZW50c1BhdGgsXG4gICAgICB9IGFzIGFueSksXG4gICAgICBtb3ZlKHBhcnNlZFBhdGgucGF0aCksXG4gICAgXSk7XG5cbiAgICByZXR1cm4gY2hhaW4oW1xuICAgICAgYnJhbmNoQW5kTWVyZ2UoXG4gICAgICAgIGNoYWluKFtcbiAgICAgICAgICBmaWx0ZXIoXG4gICAgICAgICAgICBwYXRoID0+XG4gICAgICAgICAgICAgIHBhdGguZW5kc1dpdGgoJy5tb2R1bGUudHMnKSAmJlxuICAgICAgICAgICAgICAhcGF0aC5lbmRzV2l0aCgnLXJvdXRpbmcubW9kdWxlLnRzJylcbiAgICAgICAgICApLFxuICAgICAgICAgIGFkZEltcG9ydFRvTmdNb2R1bGUob3B0aW9ucyksXG4gICAgICAgICAgbWVyZ2VXaXRoKHRlbXBsYXRlU291cmNlKSxcbiAgICAgICAgXSlcbiAgICAgICksXG4gICAgXSkoaG9zdCwgY29udGV4dCk7XG4gIH07XG59XG4iXX0=