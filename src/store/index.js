var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
        define("@ngrx/schematics/src/store/index", ["require", "exports", "@angular-devkit/schematics", "@angular-devkit/core", "typescript", "@ngrx/schematics/schematics-core"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var schematics_1 = require("@angular-devkit/schematics");
    var core_1 = require("@angular-devkit/core");
    var ts = require("typescript");
    var schematics_core_1 = require("@ngrx/schematics/schematics-core");
    function addImportToNgModule(options) {
        return function (host) {
            var e_1, _a;
            var modulePath = options.module;
            if (!modulePath) {
                return host;
            }
            if (!host.exists(modulePath)) {
                throw new Error("Specified module path " + modulePath + " does not exist");
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
                schematics_1.template(__assign({}, schematics_core_1.stringUtils, options, { isLib: schematics_core_1.isLib(host, options), environmentsPath: environmentsPath })),
                schematics_1.move(parsedPath.path),
            ]);
            return schematics_1.chain([
                schematics_1.branchAndMerge(schematics_1.chain([addImportToNgModule(options), schematics_1.mergeWith(templateSource)])),
            ])(host, context);
        };
    }
    exports.default = default_1;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3NjaGVtYXRpY3Mvc3JjL3N0b3JlL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFBQSx5REFZb0M7SUFDcEMsNkNBQXFEO0lBQ3JELCtCQUFpQztJQUNqQyxvRUFXMEM7SUFHMUMsU0FBUyxtQkFBbUIsQ0FBQyxPQUFxQjtRQUNoRCxPQUFPLFVBQUMsSUFBVTs7WUFDaEIsSUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztZQUVsQyxJQUFJLENBQUMsVUFBVSxFQUFFO2dCQUNmLE9BQU8sSUFBSSxDQUFDO2FBQ2I7WUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsRUFBRTtnQkFDNUIsTUFBTSxJQUFJLEtBQUssQ0FBQywyQkFBeUIsVUFBVSxvQkFBaUIsQ0FBQyxDQUFDO2FBQ3ZFO1lBRUQsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNuQyxJQUFJLElBQUksS0FBSyxJQUFJLEVBQUU7Z0JBQ2pCLE1BQU0sSUFBSSxnQ0FBbUIsQ0FBQyxVQUFRLFVBQVUscUJBQWtCLENBQUMsQ0FBQzthQUNyRTtZQUNELElBQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7WUFFMUMsSUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDLGdCQUFnQixDQUNoQyxVQUFVLEVBQ1YsVUFBVSxFQUNWLEVBQUUsQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUN0QixJQUFJLENBQ0wsQ0FBQztZQUVGLElBQU0sU0FBUyxHQUFNLE9BQU8sQ0FBQyxJQUFJLFNBQUksT0FBTyxDQUFDLFNBQVcsQ0FBQztZQUN6RCxJQUFNLFlBQVksR0FBRyxtQ0FB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QUMsU0FBUyxjQUFXLENBQUM7WUFDbkUsSUFBTSxPQUFPLEdBQUcsY0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFZLENBQUMsQ0FBQztZQUM5QyxJQUFNLGdCQUFnQixHQUFHLG1DQUFpQixDQUN4QyxTQUFTLEVBQ04sT0FBTyw4QkFBMkIsQ0FDdEMsQ0FBQztZQUVGLElBQUksT0FBTyxDQUFDLE1BQU0sRUFBRTtnQkFDbEIsT0FBTyxDQUFDLE1BQU0sR0FBRyx1Q0FBcUIsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7YUFDdkQ7WUFFRCxJQUNFLE9BQU8sQ0FBQyxJQUFJO2dCQUNaLE9BQU8sQ0FBQyxjQUFjO2dCQUN0QixPQUFPLENBQUMsY0FBYyxLQUFLLE9BQU8sRUFDbEM7Z0JBQ0EsT0FBTyxDQUFDLGNBQWMsR0FBRyw2QkFBVyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7YUFDdkU7WUFFRCxJQUFNLGNBQWMsR0FBRyxrQkFBSyxDQUFDLGdCQUFHLENBQUMsU0FBUyxDQUFDLEVBQUU7Z0JBQzNDLHFCQUFRLENBQUMsYUFDSiw2QkFBVyxFQUNWLE9BQWtCLElBQ3RCLEtBQUssRUFBRSx1QkFBSyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsRUFDM0IsZ0JBQWdCLGtCQUFBLEdBQ1YsQ0FBQztnQkFDVCxpQkFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUM7YUFDdEIsQ0FBQyxDQUFDO1lBRUgsT0FBTyxrQkFBSyxDQUFDO2dCQUNYLDJCQUFjLENBQ1osa0JBQUssQ0FBQyxDQUFDLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxFQUFFLHNCQUFTLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUNqRTthQUNGLENBQUMsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDcEIsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQTNDRCw0QkEyQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBSdWxlLFxuICBTY2hlbWF0aWNDb250ZXh0LFxuICBTY2hlbWF0aWNzRXhjZXB0aW9uLFxuICBUcmVlLFxuICBhcHBseSxcbiAgYnJhbmNoQW5kTWVyZ2UsXG4gIGNoYWluLFxuICBtZXJnZVdpdGgsXG4gIHRlbXBsYXRlLFxuICB1cmwsXG4gIG1vdmUsXG59IGZyb20gJ0Bhbmd1bGFyLWRldmtpdC9zY2hlbWF0aWNzJztcbmltcG9ydCB7IFBhdGgsIGRpcm5hbWUgfSBmcm9tICdAYW5ndWxhci1kZXZraXQvY29yZSc7XG5pbXBvcnQgKiBhcyB0cyBmcm9tICd0eXBlc2NyaXB0JztcbmltcG9ydCB7XG4gIHN0cmluZ1V0aWxzLFxuICBidWlsZFJlbGF0aXZlUGF0aCxcbiAgaW5zZXJ0SW1wb3J0LFxuICBDaGFuZ2UsXG4gIEluc2VydENoYW5nZSxcbiAgZ2V0UHJvamVjdFBhdGgsXG4gIGlzTGliLFxuICBmaW5kTW9kdWxlRnJvbU9wdGlvbnMsXG4gIGFkZEltcG9ydFRvTW9kdWxlLFxuICBwYXJzZU5hbWUsXG59IGZyb20gJ0BuZ3J4L3NjaGVtYXRpY3Mvc2NoZW1hdGljcy1jb3JlJztcbmltcG9ydCB7IFNjaGVtYSBhcyBTdG9yZU9wdGlvbnMgfSBmcm9tICcuL3NjaGVtYSc7XG5cbmZ1bmN0aW9uIGFkZEltcG9ydFRvTmdNb2R1bGUob3B0aW9uczogU3RvcmVPcHRpb25zKTogUnVsZSB7XG4gIHJldHVybiAoaG9zdDogVHJlZSkgPT4ge1xuICAgIGNvbnN0IG1vZHVsZVBhdGggPSBvcHRpb25zLm1vZHVsZTtcblxuICAgIGlmICghbW9kdWxlUGF0aCkge1xuICAgICAgcmV0dXJuIGhvc3Q7XG4gICAgfVxuXG4gICAgaWYgKCFob3N0LmV4aXN0cyhtb2R1bGVQYXRoKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBTcGVjaWZpZWQgbW9kdWxlIHBhdGggJHttb2R1bGVQYXRofSBkb2VzIG5vdCBleGlzdGApO1xuICAgIH1cblxuICAgIGNvbnN0IHRleHQgPSBob3N0LnJlYWQobW9kdWxlUGF0aCk7XG4gICAgaWYgKHRleHQgPT09IG51bGwpIHtcbiAgICAgIHRocm93IG5ldyBTY2hlbWF0aWNzRXhjZXB0aW9uKGBGaWxlICR7bW9kdWxlUGF0aH0gZG9lcyBub3QgZXhpc3QuYCk7XG4gICAgfVxuICAgIGNvbnN0IHNvdXJjZVRleHQgPSB0ZXh0LnRvU3RyaW5nKCd1dGYtOCcpO1xuXG4gICAgY29uc3Qgc291cmNlID0gdHMuY3JlYXRlU291cmNlRmlsZShcbiAgICAgIG1vZHVsZVBhdGgsXG4gICAgICBzb3VyY2VUZXh0LFxuICAgICAgdHMuU2NyaXB0VGFyZ2V0LkxhdGVzdCxcbiAgICAgIHRydWVcbiAgICApO1xuXG4gICAgY29uc3Qgc3RhdGVQYXRoID0gYCR7b3B0aW9ucy5wYXRofS8ke29wdGlvbnMuc3RhdGVQYXRofWA7XG4gICAgY29uc3QgcmVsYXRpdmVQYXRoID0gYnVpbGRSZWxhdGl2ZVBhdGgobW9kdWxlUGF0aCwgc3RhdGVQYXRoKTtcblxuICAgIGNvbnN0IGVudmlyb25tZW50c1BhdGggPSBidWlsZFJlbGF0aXZlUGF0aChcbiAgICAgIHN0YXRlUGF0aCxcbiAgICAgIGAke29wdGlvbnMucGF0aH0vZW52aXJvbm1lbnRzL2Vudmlyb25tZW50YFxuICAgICk7XG5cbiAgICBjb25zdCBzdG9yZU5nTW9kdWxlSW1wb3J0ID0gYWRkSW1wb3J0VG9Nb2R1bGUoXG4gICAgICBzb3VyY2UsXG4gICAgICBtb2R1bGVQYXRoLFxuICAgICAgb3B0aW9ucy5yb290XG4gICAgICAgID8gYFN0b3JlTW9kdWxlLmZvclJvb3QocmVkdWNlcnMsIHsgbWV0YVJlZHVjZXJzIH0pYFxuICAgICAgICA6IGBTdG9yZU1vZHVsZS5mb3JGZWF0dXJlKCcke3N0cmluZ1V0aWxzLmNhbWVsaXplKFxuICAgICAgICAgICAgb3B0aW9ucy5uYW1lXG4gICAgICAgICAgKX0nLCBmcm9tJHtzdHJpbmdVdGlscy5jbGFzc2lmeShcbiAgICAgICAgICAgIG9wdGlvbnMubmFtZVxuICAgICAgICAgICl9LnJlZHVjZXJzLCB7IG1ldGFSZWR1Y2VyczogZnJvbSR7c3RyaW5nVXRpbHMuY2xhc3NpZnkoXG4gICAgICAgICAgICBvcHRpb25zLm5hbWVcbiAgICAgICAgICApfS5tZXRhUmVkdWNlcnMgfSlgLFxuICAgICAgcmVsYXRpdmVQYXRoXG4gICAgKS5zaGlmdCgpO1xuXG4gICAgbGV0IGNvbW1vbkltcG9ydHMgPSBbXG4gICAgICBpbnNlcnRJbXBvcnQoc291cmNlLCBtb2R1bGVQYXRoLCAnU3RvcmVNb2R1bGUnLCAnQG5ncngvc3RvcmUnKSxcbiAgICAgIG9wdGlvbnMucm9vdFxuICAgICAgICA/IGluc2VydEltcG9ydChcbiAgICAgICAgICAgIHNvdXJjZSxcbiAgICAgICAgICAgIG1vZHVsZVBhdGgsXG4gICAgICAgICAgICAncmVkdWNlcnMsIG1ldGFSZWR1Y2VycycsXG4gICAgICAgICAgICByZWxhdGl2ZVBhdGhcbiAgICAgICAgICApXG4gICAgICAgIDogaW5zZXJ0SW1wb3J0KFxuICAgICAgICAgICAgc291cmNlLFxuICAgICAgICAgICAgbW9kdWxlUGF0aCxcbiAgICAgICAgICAgIGAqIGFzIGZyb20ke3N0cmluZ1V0aWxzLmNsYXNzaWZ5KG9wdGlvbnMubmFtZSl9YCxcbiAgICAgICAgICAgIHJlbGF0aXZlUGF0aCxcbiAgICAgICAgICAgIHRydWVcbiAgICAgICAgICApLFxuICAgICAgc3RvcmVOZ01vZHVsZUltcG9ydCxcbiAgICBdO1xuICAgIGxldCByb290SW1wb3J0czogKENoYW5nZSB8IHVuZGVmaW5lZClbXSA9IFtdO1xuXG4gICAgaWYgKG9wdGlvbnMucm9vdCkge1xuICAgICAgY29uc3Qgc3RvcmVEZXZ0b29sc05nTW9kdWxlSW1wb3J0ID0gYWRkSW1wb3J0VG9Nb2R1bGUoXG4gICAgICAgIHNvdXJjZSxcbiAgICAgICAgbW9kdWxlUGF0aCxcbiAgICAgICAgYCFlbnZpcm9ubWVudC5wcm9kdWN0aW9uID8gU3RvcmVEZXZ0b29sc01vZHVsZS5pbnN0cnVtZW50KCkgOiBbXWAsXG4gICAgICAgIHJlbGF0aXZlUGF0aFxuICAgICAgKS5zaGlmdCgpO1xuXG4gICAgICByb290SW1wb3J0cyA9IHJvb3RJbXBvcnRzLmNvbmNhdChbXG4gICAgICAgIGluc2VydEltcG9ydChcbiAgICAgICAgICBzb3VyY2UsXG4gICAgICAgICAgbW9kdWxlUGF0aCxcbiAgICAgICAgICAnU3RvcmVEZXZ0b29sc01vZHVsZScsXG4gICAgICAgICAgJ0BuZ3J4L3N0b3JlLWRldnRvb2xzJ1xuICAgICAgICApLFxuICAgICAgICBpbnNlcnRJbXBvcnQoc291cmNlLCBtb2R1bGVQYXRoLCAnZW52aXJvbm1lbnQnLCBlbnZpcm9ubWVudHNQYXRoKSxcbiAgICAgICAgc3RvcmVEZXZ0b29sc05nTW9kdWxlSW1wb3J0LFxuICAgICAgXSk7XG4gICAgfVxuXG4gICAgY29uc3QgY2hhbmdlcyA9IFsuLi5jb21tb25JbXBvcnRzLCAuLi5yb290SW1wb3J0c107XG4gICAgY29uc3QgcmVjb3JkZXIgPSBob3N0LmJlZ2luVXBkYXRlKG1vZHVsZVBhdGgpO1xuICAgIGZvciAoY29uc3QgY2hhbmdlIG9mIGNoYW5nZXMpIHtcbiAgICAgIGlmIChjaGFuZ2UgaW5zdGFuY2VvZiBJbnNlcnRDaGFuZ2UpIHtcbiAgICAgICAgcmVjb3JkZXIuaW5zZXJ0TGVmdChjaGFuZ2UucG9zLCBjaGFuZ2UudG9BZGQpO1xuICAgICAgfVxuICAgIH1cbiAgICBob3N0LmNvbW1pdFVwZGF0ZShyZWNvcmRlcik7XG5cbiAgICByZXR1cm4gaG9zdDtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24ob3B0aW9uczogU3RvcmVPcHRpb25zKTogUnVsZSB7XG4gIHJldHVybiAoaG9zdDogVHJlZSwgY29udGV4dDogU2NoZW1hdGljQ29udGV4dCkgPT4ge1xuICAgIG9wdGlvbnMucGF0aCA9IGdldFByb2plY3RQYXRoKGhvc3QsIG9wdGlvbnMpO1xuXG4gICAgY29uc3QgcGFyc2VkUGF0aCA9IHBhcnNlTmFtZShvcHRpb25zLnBhdGgsIG9wdGlvbnMubmFtZSk7XG4gICAgb3B0aW9ucy5uYW1lID0gcGFyc2VkUGF0aC5uYW1lO1xuICAgIG9wdGlvbnMucGF0aCA9IHBhcnNlZFBhdGgucGF0aDtcblxuICAgIGNvbnN0IHN0YXRlUGF0aCA9IGAvJHtvcHRpb25zLnBhdGh9LyR7b3B0aW9ucy5zdGF0ZVBhdGh9L2luZGV4LnRzYDtcbiAgICBjb25zdCBzcmNQYXRoID0gZGlybmFtZShvcHRpb25zLnBhdGggYXMgUGF0aCk7XG4gICAgY29uc3QgZW52aXJvbm1lbnRzUGF0aCA9IGJ1aWxkUmVsYXRpdmVQYXRoKFxuICAgICAgc3RhdGVQYXRoLFxuICAgICAgYCR7c3JjUGF0aH0vZW52aXJvbm1lbnRzL2Vudmlyb25tZW50YFxuICAgICk7XG5cbiAgICBpZiAob3B0aW9ucy5tb2R1bGUpIHtcbiAgICAgIG9wdGlvbnMubW9kdWxlID0gZmluZE1vZHVsZUZyb21PcHRpb25zKGhvc3QsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIGlmIChcbiAgICAgIG9wdGlvbnMucm9vdCAmJlxuICAgICAgb3B0aW9ucy5zdGF0ZUludGVyZmFjZSAmJlxuICAgICAgb3B0aW9ucy5zdGF0ZUludGVyZmFjZSAhPT0gJ1N0YXRlJ1xuICAgICkge1xuICAgICAgb3B0aW9ucy5zdGF0ZUludGVyZmFjZSA9IHN0cmluZ1V0aWxzLmNsYXNzaWZ5KG9wdGlvbnMuc3RhdGVJbnRlcmZhY2UpO1xuICAgIH1cblxuICAgIGNvbnN0IHRlbXBsYXRlU291cmNlID0gYXBwbHkodXJsKCcuL2ZpbGVzJyksIFtcbiAgICAgIHRlbXBsYXRlKHtcbiAgICAgICAgLi4uc3RyaW5nVXRpbHMsXG4gICAgICAgIC4uLihvcHRpb25zIGFzIG9iamVjdCksXG4gICAgICAgIGlzTGliOiBpc0xpYihob3N0LCBvcHRpb25zKSxcbiAgICAgICAgZW52aXJvbm1lbnRzUGF0aCxcbiAgICAgIH0gYXMgYW55KSxcbiAgICAgIG1vdmUocGFyc2VkUGF0aC5wYXRoKSxcbiAgICBdKTtcblxuICAgIHJldHVybiBjaGFpbihbXG4gICAgICBicmFuY2hBbmRNZXJnZShcbiAgICAgICAgY2hhaW4oW2FkZEltcG9ydFRvTmdNb2R1bGUob3B0aW9ucyksIG1lcmdlV2l0aCh0ZW1wbGF0ZVNvdXJjZSldKVxuICAgICAgKSxcbiAgICBdKShob3N0LCBjb250ZXh0KTtcbiAgfTtcbn1cbiJdfQ==