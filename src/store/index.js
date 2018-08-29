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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3NjaGVtYXRpY3Mvc3JjL3N0b3JlL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFBQSx5REFZb0M7SUFDcEMsNkNBQXFEO0lBQ3JELCtCQUFpQztJQUNqQyxvRUFXMEM7SUFHMUMsNkJBQTZCLE9BQXFCO1FBQ2hELE9BQU8sVUFBQyxJQUFVO1lBQ2hCLElBQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7WUFFbEMsSUFBSSxDQUFDLFVBQVUsRUFBRTtnQkFDZixPQUFPLElBQUksQ0FBQzthQUNiO1lBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUU7Z0JBQzVCLE1BQU0sSUFBSSxLQUFLLENBQUMsMkJBQXlCLFVBQVUsb0JBQWlCLENBQUMsQ0FBQzthQUN2RTtZQUVELElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDbkMsSUFBSSxJQUFJLEtBQUssSUFBSSxFQUFFO2dCQUNqQixNQUFNLElBQUksZ0NBQW1CLENBQUMsVUFBUSxVQUFVLHFCQUFrQixDQUFDLENBQUM7YUFDckU7WUFDRCxJQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBRTFDLElBQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FDaEMsVUFBVSxFQUNWLFVBQVUsRUFDVixFQUFFLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFDdEIsSUFBSSxDQUNMLENBQUM7WUFFRixJQUFNLFNBQVMsR0FBTSxPQUFPLENBQUMsSUFBSSxTQUFJLE9BQU8sQ0FBQyxTQUFXLENBQUM7WUFDekQsSUFBTSxZQUFZLEdBQUcsbUNBQWlCLENBQUMsVUFBVSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBRTlELElBQU0sZ0JBQWdCLEdBQUcsbUNBQWlCLENBQ3hDLFNBQVMsRUFDTixPQUFPLENBQUMsSUFBSSw4QkFBMkIsQ0FDM0MsQ0FBQztZQUVGLElBQU0sbUJBQW1CLEdBQUcsbUNBQWlCLENBQzNDLE1BQU0sRUFDTixVQUFVLEVBQ1YsT0FBTyxDQUFDLElBQUk7Z0JBQ1YsQ0FBQyxDQUFDLGlEQUFpRDtnQkFDbkQsQ0FBQyxDQUFDLDZCQUEyQiw2QkFBVyxDQUFDLFFBQVEsQ0FDN0MsT0FBTyxDQUFDLElBQUksQ0FDYixlQUFVLDZCQUFXLENBQUMsUUFBUSxDQUM3QixPQUFPLENBQUMsSUFBSSxDQUNiLHVDQUFrQyw2QkFBVyxDQUFDLFFBQVEsQ0FDckQsT0FBTyxDQUFDLElBQUksQ0FDYixxQkFBa0IsRUFDdkIsWUFBWSxDQUNiLENBQUMsS0FBSyxFQUFFLENBQUM7WUFFVixJQUFJLGFBQWEsR0FBRztnQkFDbEIsOEJBQVksQ0FBQyxNQUFNLEVBQUUsVUFBVSxFQUFFLGFBQWEsRUFBRSxhQUFhLENBQUM7Z0JBQzlELE9BQU8sQ0FBQyxJQUFJO29CQUNWLENBQUMsQ0FBQyw4QkFBWSxDQUNWLE1BQU0sRUFDTixVQUFVLEVBQ1Ysd0JBQXdCLEVBQ3hCLFlBQVksQ0FDYjtvQkFDSCxDQUFDLENBQUMsOEJBQVksQ0FDVixNQUFNLEVBQ04sVUFBVSxFQUNWLGNBQVksNkJBQVcsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBRyxFQUNoRCxZQUFZLEVBQ1osSUFBSSxDQUNMO2dCQUNMLG1CQUFtQjthQUNwQixDQUFDO1lBQ0YsSUFBSSxXQUFXLEdBQTJCLEVBQUUsQ0FBQztZQUU3QyxJQUFJLE9BQU8sQ0FBQyxJQUFJLEVBQUU7Z0JBQ2hCLElBQU0sMkJBQTJCLEdBQUcsbUNBQWlCLENBQ25ELE1BQU0sRUFDTixVQUFVLEVBQ1YsaUVBQWlFLEVBQ2pFLFlBQVksQ0FDYixDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUVWLFdBQVcsR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDO29CQUMvQiw4QkFBWSxDQUNWLE1BQU0sRUFDTixVQUFVLEVBQ1YscUJBQXFCLEVBQ3JCLHNCQUFzQixDQUN2QjtvQkFDRCw4QkFBWSxDQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUUsYUFBYSxFQUFFLGdCQUFnQixDQUFDO29CQUNqRSwyQkFBMkI7aUJBQzVCLENBQUMsQ0FBQzthQUNKO1lBRUQsSUFBTSxPQUFPLFlBQU8sYUFBYSxFQUFLLFdBQVcsQ0FBQyxDQUFDO1lBQ25ELElBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7O2dCQUM5QyxLQUFxQixJQUFBLFlBQUEsU0FBQSxPQUFPLENBQUEsZ0NBQUE7b0JBQXZCLElBQU0sTUFBTSxvQkFBQTtvQkFDZixJQUFJLE1BQU0sWUFBWSw4QkFBWSxFQUFFO3dCQUNsQyxRQUFRLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO3FCQUMvQztpQkFDRjs7Ozs7Ozs7O1lBQ0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUU1QixPQUFPLElBQUksQ0FBQzs7UUFDZCxDQUFDLENBQUM7SUFDSixDQUFDO0lBRUQsbUJBQXdCLE9BQXFCO1FBQzNDLE9BQU8sVUFBQyxJQUFVLEVBQUUsT0FBeUI7WUFDM0MsT0FBTyxDQUFDLElBQUksR0FBRyxnQ0FBYyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztZQUU3QyxJQUFNLFVBQVUsR0FBRywyQkFBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3pELE9BQU8sQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQztZQUMvQixPQUFPLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUM7WUFFL0IsSUFBTSxTQUFTLEdBQUcsTUFBSSxPQUFPLENBQUMsSUFBSSxTQUFJLE9BQU8sQ0FBQyxTQUFTLGNBQVcsQ0FBQztZQUNuRSxJQUFNLE9BQU8sR0FBRyxjQUFPLENBQUMsT0FBTyxDQUFDLElBQVksQ0FBQyxDQUFDO1lBQzlDLElBQU0sZ0JBQWdCLEdBQUcsbUNBQWlCLENBQ3hDLFNBQVMsRUFDTixPQUFPLDhCQUEyQixDQUN0QyxDQUFDO1lBRUYsSUFBSSxPQUFPLENBQUMsTUFBTSxFQUFFO2dCQUNsQixPQUFPLENBQUMsTUFBTSxHQUFHLHVDQUFxQixDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQzthQUN2RDtZQUVELElBQ0UsT0FBTyxDQUFDLElBQUk7Z0JBQ1osT0FBTyxDQUFDLGNBQWM7Z0JBQ3RCLE9BQU8sQ0FBQyxjQUFjLEtBQUssT0FBTyxFQUNsQztnQkFDQSxPQUFPLENBQUMsY0FBYyxHQUFHLDZCQUFXLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQzthQUN2RTtZQUVELElBQU0sY0FBYyxHQUFHLGtCQUFLLENBQUMsZ0JBQUcsQ0FBQyxTQUFTLENBQUMsRUFBRTtnQkFDM0MscUJBQVEsQ0FBQyxhQUNKLDZCQUFXLEVBQ1YsT0FBa0IsSUFDdEIsS0FBSyxFQUFFLHVCQUFLLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxFQUMzQixnQkFBZ0Isa0JBQUEsR0FDVixDQUFDO2dCQUNULGlCQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQzthQUN0QixDQUFDLENBQUM7WUFFSCxPQUFPLGtCQUFLLENBQUM7Z0JBQ1gsMkJBQWMsQ0FDWixrQkFBSyxDQUFDLENBQUMsbUJBQW1CLENBQUMsT0FBTyxDQUFDLEVBQUUsc0JBQVMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQ2pFO2FBQ0YsQ0FBQyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNwQixDQUFDLENBQUM7SUFDSixDQUFDO0lBM0NELDRCQTJDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIFJ1bGUsXG4gIFNjaGVtYXRpY0NvbnRleHQsXG4gIFNjaGVtYXRpY3NFeGNlcHRpb24sXG4gIFRyZWUsXG4gIGFwcGx5LFxuICBicmFuY2hBbmRNZXJnZSxcbiAgY2hhaW4sXG4gIG1lcmdlV2l0aCxcbiAgdGVtcGxhdGUsXG4gIHVybCxcbiAgbW92ZSxcbn0gZnJvbSAnQGFuZ3VsYXItZGV2a2l0L3NjaGVtYXRpY3MnO1xuaW1wb3J0IHsgUGF0aCwgZGlybmFtZSB9IGZyb20gJ0Bhbmd1bGFyLWRldmtpdC9jb3JlJztcbmltcG9ydCAqIGFzIHRzIGZyb20gJ3R5cGVzY3JpcHQnO1xuaW1wb3J0IHtcbiAgc3RyaW5nVXRpbHMsXG4gIGJ1aWxkUmVsYXRpdmVQYXRoLFxuICBpbnNlcnRJbXBvcnQsXG4gIENoYW5nZSxcbiAgSW5zZXJ0Q2hhbmdlLFxuICBnZXRQcm9qZWN0UGF0aCxcbiAgaXNMaWIsXG4gIGZpbmRNb2R1bGVGcm9tT3B0aW9ucyxcbiAgYWRkSW1wb3J0VG9Nb2R1bGUsXG4gIHBhcnNlTmFtZSxcbn0gZnJvbSAnQG5ncngvc2NoZW1hdGljcy9zY2hlbWF0aWNzLWNvcmUnO1xuaW1wb3J0IHsgU2NoZW1hIGFzIFN0b3JlT3B0aW9ucyB9IGZyb20gJy4vc2NoZW1hJztcblxuZnVuY3Rpb24gYWRkSW1wb3J0VG9OZ01vZHVsZShvcHRpb25zOiBTdG9yZU9wdGlvbnMpOiBSdWxlIHtcbiAgcmV0dXJuIChob3N0OiBUcmVlKSA9PiB7XG4gICAgY29uc3QgbW9kdWxlUGF0aCA9IG9wdGlvbnMubW9kdWxlO1xuXG4gICAgaWYgKCFtb2R1bGVQYXRoKSB7XG4gICAgICByZXR1cm4gaG9zdDtcbiAgICB9XG5cbiAgICBpZiAoIWhvc3QuZXhpc3RzKG1vZHVsZVBhdGgpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFNwZWNpZmllZCBtb2R1bGUgcGF0aCAke21vZHVsZVBhdGh9IGRvZXMgbm90IGV4aXN0YCk7XG4gICAgfVxuXG4gICAgY29uc3QgdGV4dCA9IGhvc3QucmVhZChtb2R1bGVQYXRoKTtcbiAgICBpZiAodGV4dCA9PT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IFNjaGVtYXRpY3NFeGNlcHRpb24oYEZpbGUgJHttb2R1bGVQYXRofSBkb2VzIG5vdCBleGlzdC5gKTtcbiAgICB9XG4gICAgY29uc3Qgc291cmNlVGV4dCA9IHRleHQudG9TdHJpbmcoJ3V0Zi04Jyk7XG5cbiAgICBjb25zdCBzb3VyY2UgPSB0cy5jcmVhdGVTb3VyY2VGaWxlKFxuICAgICAgbW9kdWxlUGF0aCxcbiAgICAgIHNvdXJjZVRleHQsXG4gICAgICB0cy5TY3JpcHRUYXJnZXQuTGF0ZXN0LFxuICAgICAgdHJ1ZVxuICAgICk7XG5cbiAgICBjb25zdCBzdGF0ZVBhdGggPSBgJHtvcHRpb25zLnBhdGh9LyR7b3B0aW9ucy5zdGF0ZVBhdGh9YDtcbiAgICBjb25zdCByZWxhdGl2ZVBhdGggPSBidWlsZFJlbGF0aXZlUGF0aChtb2R1bGVQYXRoLCBzdGF0ZVBhdGgpO1xuXG4gICAgY29uc3QgZW52aXJvbm1lbnRzUGF0aCA9IGJ1aWxkUmVsYXRpdmVQYXRoKFxuICAgICAgc3RhdGVQYXRoLFxuICAgICAgYCR7b3B0aW9ucy5wYXRofS9lbnZpcm9ubWVudHMvZW52aXJvbm1lbnRgXG4gICAgKTtcblxuICAgIGNvbnN0IHN0b3JlTmdNb2R1bGVJbXBvcnQgPSBhZGRJbXBvcnRUb01vZHVsZShcbiAgICAgIHNvdXJjZSxcbiAgICAgIG1vZHVsZVBhdGgsXG4gICAgICBvcHRpb25zLnJvb3RcbiAgICAgICAgPyBgU3RvcmVNb2R1bGUuZm9yUm9vdChyZWR1Y2VycywgeyBtZXRhUmVkdWNlcnMgfSlgXG4gICAgICAgIDogYFN0b3JlTW9kdWxlLmZvckZlYXR1cmUoJyR7c3RyaW5nVXRpbHMuY2FtZWxpemUoXG4gICAgICAgICAgICBvcHRpb25zLm5hbWVcbiAgICAgICAgICApfScsIGZyb20ke3N0cmluZ1V0aWxzLmNsYXNzaWZ5KFxuICAgICAgICAgICAgb3B0aW9ucy5uYW1lXG4gICAgICAgICAgKX0ucmVkdWNlcnMsIHsgbWV0YVJlZHVjZXJzOiBmcm9tJHtzdHJpbmdVdGlscy5jbGFzc2lmeShcbiAgICAgICAgICAgIG9wdGlvbnMubmFtZVxuICAgICAgICAgICl9Lm1ldGFSZWR1Y2VycyB9KWAsXG4gICAgICByZWxhdGl2ZVBhdGhcbiAgICApLnNoaWZ0KCk7XG5cbiAgICBsZXQgY29tbW9uSW1wb3J0cyA9IFtcbiAgICAgIGluc2VydEltcG9ydChzb3VyY2UsIG1vZHVsZVBhdGgsICdTdG9yZU1vZHVsZScsICdAbmdyeC9zdG9yZScpLFxuICAgICAgb3B0aW9ucy5yb290XG4gICAgICAgID8gaW5zZXJ0SW1wb3J0KFxuICAgICAgICAgICAgc291cmNlLFxuICAgICAgICAgICAgbW9kdWxlUGF0aCxcbiAgICAgICAgICAgICdyZWR1Y2VycywgbWV0YVJlZHVjZXJzJyxcbiAgICAgICAgICAgIHJlbGF0aXZlUGF0aFxuICAgICAgICAgIClcbiAgICAgICAgOiBpbnNlcnRJbXBvcnQoXG4gICAgICAgICAgICBzb3VyY2UsXG4gICAgICAgICAgICBtb2R1bGVQYXRoLFxuICAgICAgICAgICAgYCogYXMgZnJvbSR7c3RyaW5nVXRpbHMuY2xhc3NpZnkob3B0aW9ucy5uYW1lKX1gLFxuICAgICAgICAgICAgcmVsYXRpdmVQYXRoLFxuICAgICAgICAgICAgdHJ1ZVxuICAgICAgICAgICksXG4gICAgICBzdG9yZU5nTW9kdWxlSW1wb3J0LFxuICAgIF07XG4gICAgbGV0IHJvb3RJbXBvcnRzOiAoQ2hhbmdlIHwgdW5kZWZpbmVkKVtdID0gW107XG5cbiAgICBpZiAob3B0aW9ucy5yb290KSB7XG4gICAgICBjb25zdCBzdG9yZURldnRvb2xzTmdNb2R1bGVJbXBvcnQgPSBhZGRJbXBvcnRUb01vZHVsZShcbiAgICAgICAgc291cmNlLFxuICAgICAgICBtb2R1bGVQYXRoLFxuICAgICAgICBgIWVudmlyb25tZW50LnByb2R1Y3Rpb24gPyBTdG9yZURldnRvb2xzTW9kdWxlLmluc3RydW1lbnQoKSA6IFtdYCxcbiAgICAgICAgcmVsYXRpdmVQYXRoXG4gICAgICApLnNoaWZ0KCk7XG5cbiAgICAgIHJvb3RJbXBvcnRzID0gcm9vdEltcG9ydHMuY29uY2F0KFtcbiAgICAgICAgaW5zZXJ0SW1wb3J0KFxuICAgICAgICAgIHNvdXJjZSxcbiAgICAgICAgICBtb2R1bGVQYXRoLFxuICAgICAgICAgICdTdG9yZURldnRvb2xzTW9kdWxlJyxcbiAgICAgICAgICAnQG5ncngvc3RvcmUtZGV2dG9vbHMnXG4gICAgICAgICksXG4gICAgICAgIGluc2VydEltcG9ydChzb3VyY2UsIG1vZHVsZVBhdGgsICdlbnZpcm9ubWVudCcsIGVudmlyb25tZW50c1BhdGgpLFxuICAgICAgICBzdG9yZURldnRvb2xzTmdNb2R1bGVJbXBvcnQsXG4gICAgICBdKTtcbiAgICB9XG5cbiAgICBjb25zdCBjaGFuZ2VzID0gWy4uLmNvbW1vbkltcG9ydHMsIC4uLnJvb3RJbXBvcnRzXTtcbiAgICBjb25zdCByZWNvcmRlciA9IGhvc3QuYmVnaW5VcGRhdGUobW9kdWxlUGF0aCk7XG4gICAgZm9yIChjb25zdCBjaGFuZ2Ugb2YgY2hhbmdlcykge1xuICAgICAgaWYgKGNoYW5nZSBpbnN0YW5jZW9mIEluc2VydENoYW5nZSkge1xuICAgICAgICByZWNvcmRlci5pbnNlcnRMZWZ0KGNoYW5nZS5wb3MsIGNoYW5nZS50b0FkZCk7XG4gICAgICB9XG4gICAgfVxuICAgIGhvc3QuY29tbWl0VXBkYXRlKHJlY29yZGVyKTtcblxuICAgIHJldHVybiBob3N0O1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihvcHRpb25zOiBTdG9yZU9wdGlvbnMpOiBSdWxlIHtcbiAgcmV0dXJuIChob3N0OiBUcmVlLCBjb250ZXh0OiBTY2hlbWF0aWNDb250ZXh0KSA9PiB7XG4gICAgb3B0aW9ucy5wYXRoID0gZ2V0UHJvamVjdFBhdGgoaG9zdCwgb3B0aW9ucyk7XG5cbiAgICBjb25zdCBwYXJzZWRQYXRoID0gcGFyc2VOYW1lKG9wdGlvbnMucGF0aCwgb3B0aW9ucy5uYW1lKTtcbiAgICBvcHRpb25zLm5hbWUgPSBwYXJzZWRQYXRoLm5hbWU7XG4gICAgb3B0aW9ucy5wYXRoID0gcGFyc2VkUGF0aC5wYXRoO1xuXG4gICAgY29uc3Qgc3RhdGVQYXRoID0gYC8ke29wdGlvbnMucGF0aH0vJHtvcHRpb25zLnN0YXRlUGF0aH0vaW5kZXgudHNgO1xuICAgIGNvbnN0IHNyY1BhdGggPSBkaXJuYW1lKG9wdGlvbnMucGF0aCBhcyBQYXRoKTtcbiAgICBjb25zdCBlbnZpcm9ubWVudHNQYXRoID0gYnVpbGRSZWxhdGl2ZVBhdGgoXG4gICAgICBzdGF0ZVBhdGgsXG4gICAgICBgJHtzcmNQYXRofS9lbnZpcm9ubWVudHMvZW52aXJvbm1lbnRgXG4gICAgKTtcblxuICAgIGlmIChvcHRpb25zLm1vZHVsZSkge1xuICAgICAgb3B0aW9ucy5tb2R1bGUgPSBmaW5kTW9kdWxlRnJvbU9wdGlvbnMoaG9zdCwgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgb3B0aW9ucy5yb290ICYmXG4gICAgICBvcHRpb25zLnN0YXRlSW50ZXJmYWNlICYmXG4gICAgICBvcHRpb25zLnN0YXRlSW50ZXJmYWNlICE9PSAnU3RhdGUnXG4gICAgKSB7XG4gICAgICBvcHRpb25zLnN0YXRlSW50ZXJmYWNlID0gc3RyaW5nVXRpbHMuY2xhc3NpZnkob3B0aW9ucy5zdGF0ZUludGVyZmFjZSk7XG4gICAgfVxuXG4gICAgY29uc3QgdGVtcGxhdGVTb3VyY2UgPSBhcHBseSh1cmwoJy4vZmlsZXMnKSwgW1xuICAgICAgdGVtcGxhdGUoe1xuICAgICAgICAuLi5zdHJpbmdVdGlscyxcbiAgICAgICAgLi4uKG9wdGlvbnMgYXMgb2JqZWN0KSxcbiAgICAgICAgaXNMaWI6IGlzTGliKGhvc3QsIG9wdGlvbnMpLFxuICAgICAgICBlbnZpcm9ubWVudHNQYXRoLFxuICAgICAgfSBhcyBhbnkpLFxuICAgICAgbW92ZShwYXJzZWRQYXRoLnBhdGgpLFxuICAgIF0pO1xuXG4gICAgcmV0dXJuIGNoYWluKFtcbiAgICAgIGJyYW5jaEFuZE1lcmdlKFxuICAgICAgICBjaGFpbihbYWRkSW1wb3J0VG9OZ01vZHVsZShvcHRpb25zKSwgbWVyZ2VXaXRoKHRlbXBsYXRlU291cmNlKV0pXG4gICAgICApLFxuICAgIF0pKGhvc3QsIGNvbnRleHQpO1xuICB9O1xufVxuIl19