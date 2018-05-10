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
        define("@ngrx/schematics/src/store/index", ["require", "exports", "@angular-devkit/schematics", "typescript", "@ngrx/schematics/src/schematics-core/index"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var schematics_1 = require("@angular-devkit/schematics");
    var ts = require("typescript");
    var schematics_core_1 = require("@ngrx/schematics/src/schematics-core/index");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3NjaGVtYXRpY3Mvc3JjL3N0b3JlL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFBQSx5REFhb0M7SUFDcEMsK0JBQWlDO0lBQ2pDLDhFQVM0QjtJQUc1Qiw2QkFBNkIsT0FBcUI7UUFDaEQsTUFBTSxDQUFDLFVBQUMsSUFBVTtZQUNoQixJQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDO1lBRWxDLEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztnQkFDaEIsTUFBTSxDQUFDLElBQUksQ0FBQztZQUNkLENBQUM7WUFFRCxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM3QixNQUFNLElBQUksS0FBSyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7WUFDckQsQ0FBQztZQUVELElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDbkMsRUFBRSxDQUFDLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ2xCLE1BQU0sSUFBSSxnQ0FBbUIsQ0FBQyxVQUFRLFVBQVUscUJBQWtCLENBQUMsQ0FBQztZQUN0RSxDQUFDO1lBQ0QsSUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUUxQyxJQUFNLE1BQU0sR0FBRyxFQUFFLENBQUMsZ0JBQWdCLENBQ2hDLFVBQVUsRUFDVixVQUFVLEVBQ1YsRUFBRSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQ3RCLElBQUksQ0FDTCxDQUFDO1lBRUYsSUFBTSxTQUFTLEdBQU0sT0FBTyxDQUFDLElBQUksU0FB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ICBTY2hlbWF0aWNzRXhjZXB0aW9uLFxuICBUcmVlLFxuICBhcHBseSxcbiAgYnJhbmNoQW5kTWVyZ2UsXG4gIGNoYWluLFxuICBmaWx0ZXIsXG4gIG1lcmdlV2l0aCxcbiAgbW92ZSxcbiAgdGVtcGxhdGUsXG4gIHVybCxcbn0gZnJvbSAnQGFuZ3VsYXItZGV2a2l0L3NjaGVtYXRpY3MnO1xuaW1wb3J0ICogYXMgdHMgZnJvbSAndHlwZXNjcmlwdCc7XG5pbXBvcnQge1xuICBzdHJpbmdVdGlscyxcbiAgYnVpbGRSZWxhdGl2ZVBhdGgsXG4gIGluc2VydEltcG9ydCxcbiAgQ2hhbmdlLFxuICBJbnNlcnRDaGFuZ2UsXG4gIGdldFByb2plY3RQYXRoLFxuICBmaW5kTW9kdWxlRnJvbU9wdGlvbnMsXG4gIGFkZEltcG9ydFRvTW9kdWxlLFxufSBmcm9tICcuLi9zY2hlbWF0aWNzLWNvcmUnO1xuaW1wb3J0IHsgU2NoZW1hIGFzIFN0b3JlT3B0aW9ucyB9IGZyb20gJy4vc2NoZW1hJztcblxuZnVuY3Rpb24gYWRkSW1wb3J0VG9OZ01vZHVsZShvcHRpb25zOiBTdG9yZU9wdGlvbnMpOiBSdWxlIHtcbiAgcmV0dXJuIChob3N0OiBUcmVlKSA9PiB7XG4gICAgY29uc3QgbW9kdWxlUGF0aCA9IG9wdGlvbnMubW9kdWxlO1xuXG4gICAgaWYgKCFtb2R1bGVQYXRoKSB7XG4gICAgICByZXR1cm4gaG9zdDtcbiAgICB9XG5cbiAgICBpZiAoIWhvc3QuZXhpc3RzKG1vZHVsZVBhdGgpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NwZWNpZmllZCBtb2R1bGUgZG9lcyBub3QgZXhpc3QnKTtcbiAgICB9XG5cbiAgICBjb25zdCB0ZXh0ID0gaG9zdC5yZWFkKG1vZHVsZVBhdGgpO1xuICAgIGlmICh0ZXh0ID09PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgU2NoZW1hdGljc0V4Y2VwdGlvbihgRmlsZSAke21vZHVsZVBhdGh9IGRvZXMgbm90IGV4aXN0LmApO1xuICAgIH1cbiAgICBjb25zdCBzb3VyY2VUZXh0ID0gdGV4dC50b1N0cmluZygndXRmLTgnKTtcblxuICAgIGNvbnN0IHNvdXJjZSA9IHRzLmNyZWF0ZVNvdXJjZUZpbGUoXG4gICAgICBtb2R1bGVQYXRoLFxuICAgICAgc291cmNlVGV4dCxcbiAgICAgIHRzLlNjcmlwdFRhcmdldC5MYXRlc3QsXG4gICAgICB0cnVlXG4gICAgKTtcblxuICAgIGNvbnN0IHN0YXRlUGF0aCA9IGAke29wdGlvbnMucGF0aH0vJHtvcHRpb25zLnN0YXRlUGF0aH1gO1xuICAgIGNvbnN0IHJlbGF0aXZlUGF0aCA9IGJ1aWxkUmVsYXRpdmVQYXRoKG1vZHVsZVBhdGgsIHN0YXRlUGF0aCk7XG4gICAgY29uc3QgZW52aXJvbm1lbnRzUGF0aCA9IGJ1aWxkUmVsYXRpdmVQYXRoKFxuICAgICAgc3RhdGVQYXRoLFxuICAgICAgYC8ke29wdGlvbnMucGF0aH0vZW52aXJvbm1lbnRzL2Vudmlyb25tZW50YFxuICAgICk7XG5cbiAgICBjb25zdCBzdG9yZU5nTW9kdWxlSW1wb3J0ID0gYWRkSW1wb3J0VG9Nb2R1bGUoXG4gICAgICBzb3VyY2UsXG4gICAgICBtb2R1bGVQYXRoLFxuICAgICAgb3B0aW9ucy5yb290XG4gICAgICAgID8gYFN0b3JlTW9kdWxlLmZvclJvb3QocmVkdWNlcnMsIHsgbWV0YVJlZHVjZXJzIH0pYFxuICAgICAgICA6IGBTdG9yZU1vZHVsZS5mb3JGZWF0dXJlKCcke3N0cmluZ1V0aWxzLmNhbWVsaXplKFxuICAgICAgICAgICAgb3B0aW9ucy5uYW1lXG4gICAgICAgICAgKX0nLCBmcm9tJHtzdHJpbmdVdGlscy5jbGFzc2lmeShcbiAgICAgICAgICAgIG9wdGlvbnMubmFtZVxuICAgICAgICAgICl9LnJlZHVjZXJzLCB7IG1ldGFSZWR1Y2VyczogZnJvbSR7c3RyaW5nVXRpbHMuY2xhc3NpZnkoXG4gICAgICAgICAgICBvcHRpb25zLm5hbWVcbiAgICAgICAgICApfS5tZXRhUmVkdWNlcnMgfSlgLFxuICAgICAgcmVsYXRpdmVQYXRoXG4gICAgKS5zaGlmdCgpO1xuXG4gICAgbGV0IGNvbW1vbkltcG9ydHMgPSBbXG4gICAgICBpbnNlcnRJbXBvcnQoc291cmNlLCBtb2R1bGVQYXRoLCAnU3RvcmVNb2R1bGUnLCAnQG5ncngvc3RvcmUnKSxcbiAgICAgIG9wdGlvbnMucm9vdFxuICAgICAgICA/IGluc2VydEltcG9ydChcbiAgICAgICAgICAgIHNvdXJjZSxcbiAgICAgICAgICAgIG1vZHVsZVBhdGgsXG4gICAgICAgICAgICAncmVkdWNlcnMsIG1ldGFSZWR1Y2VycycsXG4gICAgICAgICAgICByZWxhdGl2ZVBhdGhcbiAgICAgICAgICApXG4gICAgICAgIDogaW5zZXJ0SW1wb3J0KFxuICAgICAgICAgICAgc291cmNlLFxuICAgICAgICAgICAgbW9kdWxlUGF0aCxcbiAgICAgICAgICAgIGAqIGFzIGZyb20ke3N0cmluZ1V0aWxzLmNsYXNzaWZ5KG9wdGlvbnMubmFtZSl9YCxcbiAgICAgICAgICAgIHJlbGF0aXZlUGF0aCxcbiAgICAgICAgICAgIHRydWVcbiAgICAgICAgICApLFxuICAgICAgc3RvcmVOZ01vZHVsZUltcG9ydCxcbiAgICBdO1xuICAgIGxldCByb290SW1wb3J0czogKENoYW5nZSB8IHVuZGVmaW5lZClbXSA9IFtdO1xuXG4gICAgaWYgKG9wdGlvbnMucm9vdCkge1xuICAgICAgY29uc3Qgc3RvcmVEZXZ0b29sc05nTW9kdWxlSW1wb3J0ID0gYWRkSW1wb3J0VG9Nb2R1bGUoXG4gICAgICAgIHNvdXJjZSxcbiAgICAgICAgbW9kdWxlUGF0aCxcbiAgICAgICAgYCFlbnZpcm9ubWVudC5wcm9kdWN0aW9uID8gU3RvcmVEZXZ0b29sc01vZHVsZS5pbnN0cnVtZW50KCkgOiBbXWAsXG4gICAgICAgIHJlbGF0aXZlUGF0aFxuICAgICAgKS5zaGlmdCgpO1xuXG4gICAgICByb290SW1wb3J0cyA9IHJvb3RJbXBvcnRzLmNvbmNhdChbXG4gICAgICAgIGluc2VydEltcG9ydChcbiAgICAgICAgICBzb3VyY2UsXG4gICAgICAgICAgbW9kdWxlUGF0aCxcbiAgICAgICAgICAnU3RvcmVEZXZ0b29sc01vZHVsZScsXG4gICAgICAgICAgJ0BuZ3J4L3N0b3JlLWRldnRvb2xzJ1xuICAgICAgICApLFxuICAgICAgICBpbnNlcnRJbXBvcnQoc291cmNlLCBtb2R1bGVQYXRoLCAnZW52aXJvbm1lbnQnLCBlbnZpcm9ubWVudHNQYXRoKSxcbiAgICAgICAgc3RvcmVEZXZ0b29sc05nTW9kdWxlSW1wb3J0LFxuICAgICAgXSk7XG4gICAgfVxuXG4gICAgY29uc3QgY2hhbmdlcyA9IFsuLi5jb21tb25JbXBvcnRzLCAuLi5yb290SW1wb3J0c107XG4gICAgY29uc3QgcmVjb3JkZXIgPSBob3N0LmJlZ2luVXBkYXRlKG1vZHVsZVBhdGgpO1xuICAgIGZvciAoY29uc3QgY2hhbmdlIG9mIGNoYW5nZXMpIHtcbiAgICAgIGlmIChjaGFuZ2UgaW5zdGFuY2VvZiBJbnNlcnRDaGFuZ2UpIHtcbiAgICAgICAgcmVjb3JkZXIuaW5zZXJ0TGVmdChjaGFuZ2UucG9zLCBjaGFuZ2UudG9BZGQpO1xuICAgICAgfVxuICAgIH1cbiAgICBob3N0LmNvbW1pdFVwZGF0ZShyZWNvcmRlcik7XG5cbiAgICByZXR1cm4gaG9zdDtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24ob3B0aW9uczogU3RvcmVPcHRpb25zKTogUnVsZSB7XG4gIHJldHVybiAoaG9zdDogVHJlZSwgY29udGV4dDogU2NoZW1hdGljQ29udGV4dCkgPT4ge1xuICAgIG9wdGlvbnMucGF0aCA9IGdldFByb2plY3RQYXRoKGhvc3QsIG9wdGlvbnMpO1xuXG4gICAgY29uc3Qgc3RhdGVQYXRoID0gYC8ke29wdGlvbnMucGF0aH0vJHtvcHRpb25zLnN0YXRlUGF0aH0vaW5kZXgudHNgO1xuICAgIGNvbnN0IGVudmlyb25tZW50c1BhdGggPSBidWlsZFJlbGF0aXZlUGF0aChcbiAgICAgIHN0YXRlUGF0aCxcbiAgICAgIGAvJHtvcHRpb25zLnBhdGh9L2Vudmlyb25tZW50cy9lbnZpcm9ubWVudGBcbiAgICApO1xuXG4gICAgaWYgKG9wdGlvbnMubW9kdWxlKSB7XG4gICAgICBvcHRpb25zLm1vZHVsZSA9IGZpbmRNb2R1bGVGcm9tT3B0aW9ucyhob3N0LCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICBpZiAoXG4gICAgICBvcHRpb25zLnJvb3QgJiZcbiAgICAgIG9wdGlvbnMuc3RhdGVJbnRlcmZhY2UgJiZcbiAgICAgIG9wdGlvbnMuc3RhdGVJbnRlcmZhY2UgIT09ICdTdGF0ZSdcbiAgICApIHtcbiAgICAgIG9wdGlvbnMuc3RhdGVJbnRlcmZhY2UgPSBzdHJpbmdVdGlscy5jbGFzc2lmeShvcHRpb25zLnN0YXRlSW50ZXJmYWNlKTtcbiAgICB9XG5cbiAgICBjb25zdCB0ZW1wbGF0ZVNvdXJjZSA9IGFwcGx5KHVybCgnLi9maWxlcycpLCBbXG4gICAgICB0ZW1wbGF0ZSh7XG4gICAgICAgIC4uLnN0cmluZ1V0aWxzLFxuICAgICAgICAuLi4ob3B0aW9ucyBhcyBvYmplY3QpLFxuICAgICAgICBlbnZpcm9ubWVudHNQYXRoLFxuICAgICAgfSBhcyBhbnkpLFxuICAgIF0pO1xuXG4gICAgcmV0dXJuIGNoYWluKFtcbiAgICAgIGJyYW5jaEFuZE1lcmdlKFxuICAgICAgICBjaGFpbihbXG4gICAgICAgICAgZmlsdGVyKFxuICAgICAgICAgICAgcGF0aCA9PlxuICAgICAgICAgICAgICBwYXRoLmVuZHNXaXRoKCcubW9kdWxlLnRzJykgJiZcbiAgICAgICAgICAgICAgIXBhdGguZW5kc1dpdGgoJy1yb3V0aW5nLm1vZHVsZS50cycpXG4gICAgICAgICAgKSxcbiAgICAgICAgICBhZGRJbXBvcnRUb05nTW9kdWxlKG9wdGlvbnMpLFxuICAgICAgICAgIG1lcmdlV2l0aCh0ZW1wbGF0ZVNvdXJjZSksXG4gICAgICAgIF0pXG4gICAgICApLFxuICAgIF0pKGhvc3QsIGNvbnRleHQpO1xuICB9O1xufVxuIl19