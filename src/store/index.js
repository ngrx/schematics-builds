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
            var environmentsPath = schematics_core_1.buildRelativePath(statePath, options.path + "/environments/environment");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3NjaGVtYXRpY3Mvc3JjL3N0b3JlL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFBQSx5REFhb0M7SUFDcEMsNkNBQXFEO0lBQ3JELCtCQUFpQztJQUNqQywwRUFVMEM7SUFHMUMsNkJBQTZCLE9BQXFCO1FBQ2hELE1BQU0sQ0FBQyxVQUFDLElBQVU7WUFDaEIsSUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztZQUVsQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hCLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDZCxDQUFDO1lBRUQsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDN0IsTUFBTSxJQUFJLEtBQUssQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO1lBQ3JELENBQUM7WUFFRCxJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ25DLEVBQUUsQ0FBQyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNsQixNQUFNLElBQUksZ0NBQW1CLENBQUMsVUFBUSxVQUFVLHFCQUFrQixDQUFDLENBQUM7WUFDdEUsQ0FBQztZQUNELElBQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7WUFFMUMsSUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDLGdCQUFnQixDQUNoQyxVQUFVLEVBQ1YsVUFBVSxFQUNWLEVBQUUsQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUN0QixJQUFJLENBQ0wsQ0FBQztZQUVGLElBQU0sU0FBUyxHQUFNLE9BQU8s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QUMsUUFBUSxDQUFDLG9CQUFvQixDQUFDO29CQURwQyxDQUNvQyxDQUN2QztvQkFDRCxtQkFBbUIsQ0FBQyxPQUFPLENBQUM7b0JBQzVCLHNCQUFTLENBQUMsY0FBYyxDQUFDO2lCQUMxQixDQUFDLENBQ0g7YUFDRixDQUFDLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3BCLENBQUMsQ0FBQztJQUNKLENBQUM7SUFsREQsNEJBa0RDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgUnVsZSxcbiAgU2NoZW1hdGljQ29udGV4dCxcbiAgU2NoZW1hdGljc0V4Y2VwdGlvbixcbiAgVHJlZSxcbiAgYXBwbHksXG4gIGJyYW5jaEFuZE1lcmdlLFxuICBjaGFpbixcbiAgZmlsdGVyLFxuICBtZXJnZVdpdGgsXG4gIHRlbXBsYXRlLFxuICB1cmwsXG4gIG1vdmUsXG59IGZyb20gJ0Bhbmd1bGFyLWRldmtpdC9zY2hlbWF0aWNzJztcbmltcG9ydCB7IFBhdGgsIGRpcm5hbWUgfSBmcm9tICdAYW5ndWxhci1kZXZraXQvY29yZSc7XG5pbXBvcnQgKiBhcyB0cyBmcm9tICd0eXBlc2NyaXB0JztcbmltcG9ydCB7XG4gIHN0cmluZ1V0aWxzLFxuICBidWlsZFJlbGF0aXZlUGF0aCxcbiAgaW5zZXJ0SW1wb3J0LFxuICBDaGFuZ2UsXG4gIEluc2VydENoYW5nZSxcbiAgZ2V0UHJvamVjdFBhdGgsXG4gIGZpbmRNb2R1bGVGcm9tT3B0aW9ucyxcbiAgYWRkSW1wb3J0VG9Nb2R1bGUsXG4gIHBhcnNlTmFtZSxcbn0gZnJvbSAnQG5ncngvc2NoZW1hdGljcy9zY2hlbWF0aWNzLWNvcmUnO1xuaW1wb3J0IHsgU2NoZW1hIGFzIFN0b3JlT3B0aW9ucyB9IGZyb20gJy4vc2NoZW1hJztcblxuZnVuY3Rpb24gYWRkSW1wb3J0VG9OZ01vZHVsZShvcHRpb25zOiBTdG9yZU9wdGlvbnMpOiBSdWxlIHtcbiAgcmV0dXJuIChob3N0OiBUcmVlKSA9PiB7XG4gICAgY29uc3QgbW9kdWxlUGF0aCA9IG9wdGlvbnMubW9kdWxlO1xuXG4gICAgaWYgKCFtb2R1bGVQYXRoKSB7XG4gICAgICByZXR1cm4gaG9zdDtcbiAgICB9XG5cbiAgICBpZiAoIWhvc3QuZXhpc3RzKG1vZHVsZVBhdGgpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NwZWNpZmllZCBtb2R1bGUgZG9lcyBub3QgZXhpc3QnKTtcbiAgICB9XG5cbiAgICBjb25zdCB0ZXh0ID0gaG9zdC5yZWFkKG1vZHVsZVBhdGgpO1xuICAgIGlmICh0ZXh0ID09PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgU2NoZW1hdGljc0V4Y2VwdGlvbihgRmlsZSAke21vZHVsZVBhdGh9IGRvZXMgbm90IGV4aXN0LmApO1xuICAgIH1cbiAgICBjb25zdCBzb3VyY2VUZXh0ID0gdGV4dC50b1N0cmluZygndXRmLTgnKTtcblxuICAgIGNvbnN0IHNvdXJjZSA9IHRzLmNyZWF0ZVNvdXJjZUZpbGUoXG4gICAgICBtb2R1bGVQYXRoLFxuICAgICAgc291cmNlVGV4dCxcbiAgICAgIHRzLlNjcmlwdFRhcmdldC5MYXRlc3QsXG4gICAgICB0cnVlXG4gICAgKTtcblxuICAgIGNvbnN0IHN0YXRlUGF0aCA9IGAke29wdGlvbnMucGF0aH0vJHtvcHRpb25zLnN0YXRlUGF0aH1gO1xuICAgIGNvbnN0IHJlbGF0aXZlUGF0aCA9IGJ1aWxkUmVsYXRpdmVQYXRoKG1vZHVsZVBhdGgsIHN0YXRlUGF0aCk7XG5cbiAgICBjb25zdCBlbnZpcm9ubWVudHNQYXRoID0gYnVpbGRSZWxhdGl2ZVBhdGgoXG4gICAgICBzdGF0ZVBhdGgsXG4gICAgICBgJHtvcHRpb25zLnBhdGh9L2Vudmlyb25tZW50cy9lbnZpcm9ubWVudGBcbiAgICApO1xuXG4gICAgY29uc3Qgc3RvcmVOZ01vZHVsZUltcG9ydCA9IGFkZEltcG9ydFRvTW9kdWxlKFxuICAgICAgc291cmNlLFxuICAgICAgbW9kdWxlUGF0aCxcbiAgICAgIG9wdGlvbnMucm9vdFxuICAgICAgICA/IGBTdG9yZU1vZHVsZS5mb3JSb290KHJlZHVjZXJzLCB7IG1ldGFSZWR1Y2VycyB9KWBcbiAgICAgICAgOiBgU3RvcmVNb2R1bGUuZm9yRmVhdHVyZSgnJHtzdHJpbmdVdGlscy5jYW1lbGl6ZShcbiAgICAgICAgICAgIG9wdGlvbnMubmFtZVxuICAgICAgICAgICl9JywgZnJvbSR7c3RyaW5nVXRpbHMuY2xhc3NpZnkoXG4gICAgICAgICAgICBvcHRpb25zLm5hbWVcbiAgICAgICAgICApfS5yZWR1Y2VycywgeyBtZXRhUmVkdWNlcnM6IGZyb20ke3N0cmluZ1V0aWxzLmNsYXNzaWZ5KFxuICAgICAgICAgICAgb3B0aW9ucy5uYW1lXG4gICAgICAgICAgKX0ubWV0YVJlZHVjZXJzIH0pYCxcbiAgICAgIHJlbGF0aXZlUGF0aFxuICAgICkuc2hpZnQoKTtcblxuICAgIGxldCBjb21tb25JbXBvcnRzID0gW1xuICAgICAgaW5zZXJ0SW1wb3J0KHNvdXJjZSwgbW9kdWxlUGF0aCwgJ1N0b3JlTW9kdWxlJywgJ0BuZ3J4L3N0b3JlJyksXG4gICAgICBvcHRpb25zLnJvb3RcbiAgICAgICAgPyBpbnNlcnRJbXBvcnQoXG4gICAgICAgICAgICBzb3VyY2UsXG4gICAgICAgICAgICBtb2R1bGVQYXRoLFxuICAgICAgICAgICAgJ3JlZHVjZXJzLCBtZXRhUmVkdWNlcnMnLFxuICAgICAgICAgICAgcmVsYXRpdmVQYXRoXG4gICAgICAgICAgKVxuICAgICAgICA6IGluc2VydEltcG9ydChcbiAgICAgICAgICAgIHNvdXJjZSxcbiAgICAgICAgICAgIG1vZHVsZVBhdGgsXG4gICAgICAgICAgICBgKiBhcyBmcm9tJHtzdHJpbmdVdGlscy5jbGFzc2lmeShvcHRpb25zLm5hbWUpfWAsXG4gICAgICAgICAgICByZWxhdGl2ZVBhdGgsXG4gICAgICAgICAgICB0cnVlXG4gICAgICAgICAgKSxcbiAgICAgIHN0b3JlTmdNb2R1bGVJbXBvcnQsXG4gICAgXTtcbiAgICBsZXQgcm9vdEltcG9ydHM6IChDaGFuZ2UgfCB1bmRlZmluZWQpW10gPSBbXTtcblxuICAgIGlmIChvcHRpb25zLnJvb3QpIHtcbiAgICAgIGNvbnN0IHN0b3JlRGV2dG9vbHNOZ01vZHVsZUltcG9ydCA9IGFkZEltcG9ydFRvTW9kdWxlKFxuICAgICAgICBzb3VyY2UsXG4gICAgICAgIG1vZHVsZVBhdGgsXG4gICAgICAgIGAhZW52aXJvbm1lbnQucHJvZHVjdGlvbiA/IFN0b3JlRGV2dG9vbHNNb2R1bGUuaW5zdHJ1bWVudCgpIDogW11gLFxuICAgICAgICByZWxhdGl2ZVBhdGhcbiAgICAgICkuc2hpZnQoKTtcblxuICAgICAgcm9vdEltcG9ydHMgPSByb290SW1wb3J0cy5jb25jYXQoW1xuICAgICAgICBpbnNlcnRJbXBvcnQoXG4gICAgICAgICAgc291cmNlLFxuICAgICAgICAgIG1vZHVsZVBhdGgsXG4gICAgICAgICAgJ1N0b3JlRGV2dG9vbHNNb2R1bGUnLFxuICAgICAgICAgICdAbmdyeC9zdG9yZS1kZXZ0b29scydcbiAgICAgICAgKSxcbiAgICAgICAgaW5zZXJ0SW1wb3J0KHNvdXJjZSwgbW9kdWxlUGF0aCwgJ2Vudmlyb25tZW50JywgZW52aXJvbm1lbnRzUGF0aCksXG4gICAgICAgIHN0b3JlRGV2dG9vbHNOZ01vZHVsZUltcG9ydCxcbiAgICAgIF0pO1xuICAgIH1cblxuICAgIGNvbnN0IGNoYW5nZXMgPSBbLi4uY29tbW9uSW1wb3J0cywgLi4ucm9vdEltcG9ydHNdO1xuICAgIGNvbnN0IHJlY29yZGVyID0gaG9zdC5iZWdpblVwZGF0ZShtb2R1bGVQYXRoKTtcbiAgICBmb3IgKGNvbnN0IGNoYW5nZSBvZiBjaGFuZ2VzKSB7XG4gICAgICBpZiAoY2hhbmdlIGluc3RhbmNlb2YgSW5zZXJ0Q2hhbmdlKSB7XG4gICAgICAgIHJlY29yZGVyLmluc2VydExlZnQoY2hhbmdlLnBvcywgY2hhbmdlLnRvQWRkKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaG9zdC5jb21taXRVcGRhdGUocmVjb3JkZXIpO1xuXG4gICAgcmV0dXJuIGhvc3Q7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG9wdGlvbnM6IFN0b3JlT3B0aW9ucyk6IFJ1bGUge1xuICByZXR1cm4gKGhvc3Q6IFRyZWUsIGNvbnRleHQ6IFNjaGVtYXRpY0NvbnRleHQpID0+IHtcbiAgICBvcHRpb25zLnBhdGggPSBnZXRQcm9qZWN0UGF0aChob3N0LCBvcHRpb25zKTtcblxuICAgIGNvbnN0IHBhcnNlZFBhdGggPSBwYXJzZU5hbWUob3B0aW9ucy5wYXRoLCBvcHRpb25zLm5hbWUpO1xuICAgIG9wdGlvbnMubmFtZSA9IHBhcnNlZFBhdGgubmFtZTtcbiAgICBvcHRpb25zLnBhdGggPSBwYXJzZWRQYXRoLnBhdGg7XG5cbiAgICBjb25zdCBzdGF0ZVBhdGggPSBgLyR7b3B0aW9ucy5wYXRofS8ke29wdGlvbnMuc3RhdGVQYXRofS9pbmRleC50c2A7XG4gICAgY29uc3Qgc3JjUGF0aCA9IGRpcm5hbWUob3B0aW9ucy5wYXRoIGFzIFBhdGgpO1xuICAgIGNvbnN0IGVudmlyb25tZW50c1BhdGggPSBidWlsZFJlbGF0aXZlUGF0aChcbiAgICAgIHN0YXRlUGF0aCxcbiAgICAgIGAke3NyY1BhdGh9L2Vudmlyb25tZW50cy9lbnZpcm9ubWVudGBcbiAgICApO1xuXG4gICAgaWYgKG9wdGlvbnMubW9kdWxlKSB7XG4gICAgICBvcHRpb25zLm1vZHVsZSA9IGZpbmRNb2R1bGVGcm9tT3B0aW9ucyhob3N0LCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICBpZiAoXG4gICAgICBvcHRpb25zLnJvb3QgJiZcbiAgICAgIG9wdGlvbnMuc3RhdGVJbnRlcmZhY2UgJiZcbiAgICAgIG9wdGlvbnMuc3RhdGVJbnRlcmZhY2UgIT09ICdTdGF0ZSdcbiAgICApIHtcbiAgICAgIG9wdGlvbnMuc3RhdGVJbnRlcmZhY2UgPSBzdHJpbmdVdGlscy5jbGFzc2lmeShvcHRpb25zLnN0YXRlSW50ZXJmYWNlKTtcbiAgICB9XG5cbiAgICBjb25zdCB0ZW1wbGF0ZVNvdXJjZSA9IGFwcGx5KHVybCgnLi9maWxlcycpLCBbXG4gICAgICB0ZW1wbGF0ZSh7XG4gICAgICAgIC4uLnN0cmluZ1V0aWxzLFxuICAgICAgICAuLi4ob3B0aW9ucyBhcyBvYmplY3QpLFxuICAgICAgICBlbnZpcm9ubWVudHNQYXRoLFxuICAgICAgfSBhcyBhbnkpLFxuICAgICAgbW92ZShwYXJzZWRQYXRoLnBhdGgpLFxuICAgIF0pO1xuXG4gICAgcmV0dXJuIGNoYWluKFtcbiAgICAgIGJyYW5jaEFuZE1lcmdlKFxuICAgICAgICBjaGFpbihbXG4gICAgICAgICAgZmlsdGVyKFxuICAgICAgICAgICAgcGF0aCA9PlxuICAgICAgICAgICAgICBwYXRoLmVuZHNXaXRoKCcubW9kdWxlLnRzJykgJiZcbiAgICAgICAgICAgICAgIXBhdGguZW5kc1dpdGgoJy1yb3V0aW5nLm1vZHVsZS50cycpXG4gICAgICAgICAgKSxcbiAgICAgICAgICBhZGRJbXBvcnRUb05nTW9kdWxlKG9wdGlvbnMpLFxuICAgICAgICAgIG1lcmdlV2l0aCh0ZW1wbGF0ZVNvdXJjZSksXG4gICAgICAgIF0pXG4gICAgICApLFxuICAgIF0pKGhvc3QsIGNvbnRleHQpO1xuICB9O1xufVxuIl19