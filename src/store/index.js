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
    const schematics_1 = require("@angular-devkit/schematics");
    const core_1 = require("@angular-devkit/core");
    const ts = require("typescript");
    const schematics_core_1 = require("@ngrx/schematics/schematics-core");
    function addImportToNgModule(options) {
        return (host) => {
            const modulePath = options.module;
            if (!modulePath) {
                return host;
            }
            if (!host.exists(modulePath)) {
                throw new Error(`Specified module path ${modulePath} does not exist`);
            }
            const text = host.read(modulePath);
            if (text === null) {
                throw new schematics_1.SchematicsException(`File ${modulePath} does not exist.`);
            }
            const sourceText = text.toString('utf-8');
            const source = ts.createSourceFile(modulePath, sourceText, ts.ScriptTarget.Latest, true);
            const statePath = `${options.path}/${options.statePath}`;
            const relativePath = schematics_core_1.buildRelativePath(modulePath, statePath);
            const environmentsPath = schematics_core_1.buildRelativePath(statePath, `${options.path}/environments/environment`);
            const runtimeChecks = `
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      }
   `;
            const rootStoreReducers = options.minimal ? `{}` : `reducers`;
            const rootStoreConfig = options.minimal
                ? `{ ${runtimeChecks} }`
                : `{
      metaReducers, ${runtimeChecks} }`;
            const storeNgModuleImport = schematics_core_1.addImportToModule(source, modulePath, options.root
                ? `StoreModule.forRoot(${rootStoreReducers}, ${rootStoreConfig})`
                : `StoreModule.forFeature(from${schematics_core_1.stringUtils.classify(options.name)}.${schematics_core_1.stringUtils.camelize(options.name)}FeatureKey, from${schematics_core_1.stringUtils.classify(options.name)}.reducers, { metaReducers: from${schematics_core_1.stringUtils.classify(options.name)}.metaReducers })`, relativePath).shift();
            let commonImports = [
                schematics_core_1.insertImport(source, modulePath, 'StoreModule', '@ngrx/store'),
                storeNgModuleImport,
            ];
            if (options.root && !options.minimal) {
                commonImports = commonImports.concat([
                    schematics_core_1.insertImport(source, modulePath, 'reducers, metaReducers', relativePath),
                ]);
            }
            else if (!options.root) {
                commonImports = commonImports.concat([
                    schematics_core_1.insertImport(source, modulePath, `* as from${schematics_core_1.stringUtils.classify(options.name)}`, relativePath, true),
                ]);
            }
            let rootImports = [];
            if (options.root) {
                const storeDevtoolsNgModuleImport = schematics_core_1.addImportToModule(source, modulePath, `!environment.production ? StoreDevtoolsModule.instrument() : []`, relativePath).shift();
                rootImports = rootImports.concat([
                    schematics_core_1.insertImport(source, modulePath, 'StoreDevtoolsModule', '@ngrx/store-devtools'),
                    schematics_core_1.insertImport(source, modulePath, 'environment', environmentsPath),
                    storeDevtoolsNgModuleImport,
                ]);
            }
            const changes = [...commonImports, ...rootImports];
            const recorder = host.beginUpdate(modulePath);
            for (const change of changes) {
                if (change instanceof schematics_core_1.InsertChange) {
                    recorder.insertLeft(change.pos, change.toAdd);
                }
            }
            host.commitUpdate(recorder);
            return host;
        };
    }
    function default_1(options) {
        return (host, context) => {
            if (!options.name && !options.root) {
                throw new Error(`Please provide a name for the feature state`);
            }
            options.path = schematics_core_1.getProjectPath(host, options);
            const parsedPath = schematics_core_1.parseName(options.path, options.name || '');
            options.name = parsedPath.name;
            options.path = parsedPath.path;
            const statePath = `/${options.path}/${options.statePath}/index.ts`;
            const srcPath = core_1.dirname(options.path);
            const environmentsPath = schematics_core_1.buildRelativePath(statePath, `${srcPath}/environments/environment`);
            if (options.module) {
                options.module = schematics_core_1.findModuleFromOptions(host, options);
            }
            if (options.root &&
                options.stateInterface &&
                options.stateInterface !== 'State') {
                options.stateInterface = schematics_core_1.stringUtils.classify(options.stateInterface);
            }
            const templateSource = schematics_1.apply(schematics_1.url('./files'), [
                options.root && options.minimal ? schematics_1.filter(_ => false) : schematics_1.noop(),
                schematics_1.applyTemplates(Object.assign({}, schematics_core_1.stringUtils, options, { isLib: schematics_core_1.isLib(host, options), environmentsPath })),
                schematics_1.move(parsedPath.path),
            ]);
            return schematics_1.chain([
                schematics_1.branchAndMerge(schematics_1.chain([addImportToNgModule(options), schematics_1.mergeWith(templateSource)])),
            ])(host, context);
        };
    }
    exports.default = default_1;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3NjaGVtYXRpY3Mvc3JjL3N0b3JlL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0lBQUEsMkRBZW9DO0lBQ3BDLCtDQUFxRDtJQUNyRCxpQ0FBaUM7SUFDakMsc0VBVzBDO0lBRzFDLFNBQVMsbUJBQW1CLENBQUMsT0FBcUI7UUFDaEQsT0FBTyxDQUFDLElBQVUsRUFBRSxFQUFFO1lBQ3BCLE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7WUFFbEMsSUFBSSxDQUFDLFVBQVUsRUFBRTtnQkFDZixPQUFPLElBQUksQ0FBQzthQUNiO1lBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUU7Z0JBQzVCLE1BQU0sSUFBSSxLQUFLLENBQUMseUJBQXlCLFVBQVUsaUJBQWlCLENBQUMsQ0FBQzthQUN2RTtZQUVELE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDbkMsSUFBSSxJQUFJLEtBQUssSUFBSSxFQUFFO2dCQUNqQixNQUFNLElBQUksZ0NBQW1CLENBQUMsUUFBUSxVQUFVLGtCQUFrQixDQUFDLENBQUM7YUFDckU7WUFDRCxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBRTFDLE1BQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FDaEMsVUFBVSxFQUNWLFVBQVUsRUFDVixFQUFFLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFDdEIsSUFBSSxDQUNMLENBQUM7WUFFRixNQUFNLFNBQVMsR0FBRyxHQUFHLE9BQU8sQ0FBQyxJQUFJLElBQUksT0FBTyxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ3pELE1BQU0sWUFBWSxHQUFHLG1DQUFpQixDQUFDLFVBQVUsRUFBRSxTQUFT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QWMsR0FBRyw2QkFBVyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7YUFDdkU7WUFFRCxNQUFNLGNBQWMsR0FBRyxrQkFBSyxDQUFDLGdCQUFHLENBQUMsU0FBUyxDQUFDLEVBQUU7Z0JBQzNDLE9BQU8sQ0FBQyxJQUFJLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsbUJBQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxpQkFBSSxFQUFFO2dCQUM3RCwyQkFBYyxtQkFDVCw2QkFBVyxFQUNWLE9BQWtCLElBQ3RCLEtBQUssRUFBRSx1QkFBSyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsRUFDM0IsZ0JBQWdCLElBQ2hCO2dCQUNGLGlCQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQzthQUN0QixDQUFDLENBQUM7WUFFSCxPQUFPLGtCQUFLLENBQUM7Z0JBQ1gsMkJBQWMsQ0FDWixrQkFBSyxDQUFDLENBQUMsbUJBQW1CLENBQUMsT0FBTyxDQUFDLEVBQUUsc0JBQVMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQ2pFO2FBQ0YsQ0FBQyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNwQixDQUFDLENBQUM7SUFDSixDQUFDO0lBaERELDRCQWdEQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIFJ1bGUsXG4gIFNjaGVtYXRpY0NvbnRleHQsXG4gIFNjaGVtYXRpY3NFeGNlcHRpb24sXG4gIFRyZWUsXG4gIGFwcGx5LFxuICBhcHBseVRlbXBsYXRlcyxcbiAgYnJhbmNoQW5kTWVyZ2UsXG4gIGNoYWluLFxuICBtZXJnZVdpdGgsXG4gIHRlbXBsYXRlLFxuICB1cmwsXG4gIG1vdmUsXG4gIGZpbHRlcixcbiAgbm9vcCxcbn0gZnJvbSAnQGFuZ3VsYXItZGV2a2l0L3NjaGVtYXRpY3MnO1xuaW1wb3J0IHsgUGF0aCwgZGlybmFtZSB9IGZyb20gJ0Bhbmd1bGFyLWRldmtpdC9jb3JlJztcbmltcG9ydCAqIGFzIHRzIGZyb20gJ3R5cGVzY3JpcHQnO1xuaW1wb3J0IHtcbiAgc3RyaW5nVXRpbHMsXG4gIGJ1aWxkUmVsYXRpdmVQYXRoLFxuICBpbnNlcnRJbXBvcnQsXG4gIENoYW5nZSxcbiAgSW5zZXJ0Q2hhbmdlLFxuICBnZXRQcm9qZWN0UGF0aCxcbiAgaXNMaWIsXG4gIGZpbmRNb2R1bGVGcm9tT3B0aW9ucyxcbiAgYWRkSW1wb3J0VG9Nb2R1bGUsXG4gIHBhcnNlTmFtZSxcbn0gZnJvbSAnQG5ncngvc2NoZW1hdGljcy9zY2hlbWF0aWNzLWNvcmUnO1xuaW1wb3J0IHsgU2NoZW1hIGFzIFN0b3JlT3B0aW9ucyB9IGZyb20gJy4vc2NoZW1hJztcblxuZnVuY3Rpb24gYWRkSW1wb3J0VG9OZ01vZHVsZShvcHRpb25zOiBTdG9yZU9wdGlvbnMpOiBSdWxlIHtcbiAgcmV0dXJuIChob3N0OiBUcmVlKSA9PiB7XG4gICAgY29uc3QgbW9kdWxlUGF0aCA9IG9wdGlvbnMubW9kdWxlO1xuXG4gICAgaWYgKCFtb2R1bGVQYXRoKSB7XG4gICAgICByZXR1cm4gaG9zdDtcbiAgICB9XG5cbiAgICBpZiAoIWhvc3QuZXhpc3RzKG1vZHVsZVBhdGgpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFNwZWNpZmllZCBtb2R1bGUgcGF0aCAke21vZHVsZVBhdGh9IGRvZXMgbm90IGV4aXN0YCk7XG4gICAgfVxuXG4gICAgY29uc3QgdGV4dCA9IGhvc3QucmVhZChtb2R1bGVQYXRoKTtcbiAgICBpZiAodGV4dCA9PT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IFNjaGVtYXRpY3NFeGNlcHRpb24oYEZpbGUgJHttb2R1bGVQYXRofSBkb2VzIG5vdCBleGlzdC5gKTtcbiAgICB9XG4gICAgY29uc3Qgc291cmNlVGV4dCA9IHRleHQudG9TdHJpbmcoJ3V0Zi04Jyk7XG5cbiAgICBjb25zdCBzb3VyY2UgPSB0cy5jcmVhdGVTb3VyY2VGaWxlKFxuICAgICAgbW9kdWxlUGF0aCxcbiAgICAgIHNvdXJjZVRleHQsXG4gICAgICB0cy5TY3JpcHRUYXJnZXQuTGF0ZXN0LFxuICAgICAgdHJ1ZVxuICAgICk7XG5cbiAgICBjb25zdCBzdGF0ZVBhdGggPSBgJHtvcHRpb25zLnBhdGh9LyR7b3B0aW9ucy5zdGF0ZVBhdGh9YDtcbiAgICBjb25zdCByZWxhdGl2ZVBhdGggPSBidWlsZFJlbGF0aXZlUGF0aChtb2R1bGVQYXRoLCBzdGF0ZVBhdGgpO1xuXG4gICAgY29uc3QgZW52aXJvbm1lbnRzUGF0aCA9IGJ1aWxkUmVsYXRpdmVQYXRoKFxuICAgICAgc3RhdGVQYXRoLFxuICAgICAgYCR7b3B0aW9ucy5wYXRofS9lbnZpcm9ubWVudHMvZW52aXJvbm1lbnRgXG4gICAgKTtcblxuICAgIGNvbnN0IHJ1bnRpbWVDaGVja3MgPSBgXG4gICAgICBydW50aW1lQ2hlY2tzOiB7XG4gICAgICAgIHN0cmljdFN0YXRlSW1tdXRhYmlsaXR5OiB0cnVlLFxuICAgICAgICBzdHJpY3RBY3Rpb25JbW11dGFiaWxpdHk6IHRydWUsXG4gICAgICB9XG4gICBgO1xuXG4gICAgY29uc3Qgcm9vdFN0b3JlUmVkdWNlcnMgPSBvcHRpb25zLm1pbmltYWwgPyBge31gIDogYHJlZHVjZXJzYDtcblxuICAgIGNvbnN0IHJvb3RTdG9yZUNvbmZpZyA9IG9wdGlvbnMubWluaW1hbFxuICAgICAgPyBgeyAke3J1bnRpbWVDaGVja3N9IH1gXG4gICAgICA6IGB7XG4gICAgICBtZXRhUmVkdWNlcnMsICR7cnVudGltZUNoZWNrc30gfWA7XG5cbiAgICBjb25zdCBzdG9yZU5nTW9kdWxlSW1wb3J0ID0gYWRkSW1wb3J0VG9Nb2R1bGUoXG4gICAgICBzb3VyY2UsXG4gICAgICBtb2R1bGVQYXRoLFxuICAgICAgb3B0aW9ucy5yb290XG4gICAgICAgID8gYFN0b3JlTW9kdWxlLmZvclJvb3QoJHtyb290U3RvcmVSZWR1Y2Vyc30sICR7cm9vdFN0b3JlQ29uZmlnfSlgXG4gICAgICAgIDogYFN0b3JlTW9kdWxlLmZvckZlYXR1cmUoZnJvbSR7c3RyaW5nVXRpbHMuY2xhc3NpZnkoXG4gICAgICAgICAgICBvcHRpb25zLm5hbWVcbiAgICAgICAgICApfS4ke3N0cmluZ1V0aWxzLmNhbWVsaXplKFxuICAgICAgICAgICAgb3B0aW9ucy5uYW1lXG4gICAgICAgICAgKX1GZWF0dXJlS2V5LCBmcm9tJHtzdHJpbmdVdGlscy5jbGFzc2lmeShcbiAgICAgICAgICAgIG9wdGlvbnMubmFtZVxuICAgICAgICAgICl9LnJlZHVjZXJzLCB7IG1ldGFSZWR1Y2VyczogZnJvbSR7c3RyaW5nVXRpbHMuY2xhc3NpZnkoXG4gICAgICAgICAgICBvcHRpb25zLm5hbWVcbiAgICAgICAgICApfS5tZXRhUmVkdWNlcnMgfSlgLFxuICAgICAgcmVsYXRpdmVQYXRoXG4gICAgKS5zaGlmdCgpO1xuXG4gICAgbGV0IGNvbW1vbkltcG9ydHMgPSBbXG4gICAgICBpbnNlcnRJbXBvcnQoc291cmNlLCBtb2R1bGVQYXRoLCAnU3RvcmVNb2R1bGUnLCAnQG5ncngvc3RvcmUnKSxcbiAgICAgIHN0b3JlTmdNb2R1bGVJbXBvcnQsXG4gICAgXTtcblxuICAgIGlmIChvcHRpb25zLnJvb3QgJiYgIW9wdGlvbnMubWluaW1hbCkge1xuICAgICAgY29tbW9uSW1wb3J0cyA9IGNvbW1vbkltcG9ydHMuY29uY2F0KFtcbiAgICAgICAgaW5zZXJ0SW1wb3J0KFxuICAgICAgICAgIHNvdXJjZSxcbiAgICAgICAgICBtb2R1bGVQYXRoLFxuICAgICAgICAgICdyZWR1Y2VycywgbWV0YVJlZHVjZXJzJyxcbiAgICAgICAgICByZWxhdGl2ZVBhdGhcbiAgICAgICAgKSxcbiAgICAgIF0pO1xuICAgIH0gZWxzZSBpZiAoIW9wdGlvbnMucm9vdCkge1xuICAgICAgY29tbW9uSW1wb3J0cyA9IGNvbW1vbkltcG9ydHMuY29uY2F0KFtcbiAgICAgICAgaW5zZXJ0SW1wb3J0KFxuICAgICAgICAgIHNvdXJjZSxcbiAgICAgICAgICBtb2R1bGVQYXRoLFxuICAgICAgICAgIGAqIGFzIGZyb20ke3N0cmluZ1V0aWxzLmNsYXNzaWZ5KG9wdGlvbnMubmFtZSl9YCxcbiAgICAgICAgICByZWxhdGl2ZVBhdGgsXG4gICAgICAgICAgdHJ1ZVxuICAgICAgICApLFxuICAgICAgXSk7XG4gICAgfVxuXG4gICAgbGV0IHJvb3RJbXBvcnRzOiAoQ2hhbmdlIHwgdW5kZWZpbmVkKVtdID0gW107XG5cbiAgICBpZiAob3B0aW9ucy5yb290KSB7XG4gICAgICBjb25zdCBzdG9yZURldnRvb2xzTmdNb2R1bGVJbXBvcnQgPSBhZGRJbXBvcnRUb01vZHVsZShcbiAgICAgICAgc291cmNlLFxuICAgICAgICBtb2R1bGVQYXRoLFxuICAgICAgICBgIWVudmlyb25tZW50LnByb2R1Y3Rpb24gPyBTdG9yZURldnRvb2xzTW9kdWxlLmluc3RydW1lbnQoKSA6IFtdYCxcbiAgICAgICAgcmVsYXRpdmVQYXRoXG4gICAgICApLnNoaWZ0KCk7XG5cbiAgICAgIHJvb3RJbXBvcnRzID0gcm9vdEltcG9ydHMuY29uY2F0KFtcbiAgICAgICAgaW5zZXJ0SW1wb3J0KFxuICAgICAgICAgIHNvdXJjZSxcbiAgICAgICAgICBtb2R1bGVQYXRoLFxuICAgICAgICAgICdTdG9yZURldnRvb2xzTW9kdWxlJyxcbiAgICAgICAgICAnQG5ncngvc3RvcmUtZGV2dG9vbHMnXG4gICAgICAgICksXG4gICAgICAgIGluc2VydEltcG9ydChzb3VyY2UsIG1vZHVsZVBhdGgsICdlbnZpcm9ubWVudCcsIGVudmlyb25tZW50c1BhdGgpLFxuICAgICAgICBzdG9yZURldnRvb2xzTmdNb2R1bGVJbXBvcnQsXG4gICAgICBdKTtcbiAgICB9XG5cbiAgICBjb25zdCBjaGFuZ2VzID0gWy4uLmNvbW1vbkltcG9ydHMsIC4uLnJvb3RJbXBvcnRzXTtcbiAgICBjb25zdCByZWNvcmRlciA9IGhvc3QuYmVnaW5VcGRhdGUobW9kdWxlUGF0aCk7XG4gICAgZm9yIChjb25zdCBjaGFuZ2Ugb2YgY2hhbmdlcykge1xuICAgICAgaWYgKGNoYW5nZSBpbnN0YW5jZW9mIEluc2VydENoYW5nZSkge1xuICAgICAgICByZWNvcmRlci5pbnNlcnRMZWZ0KGNoYW5nZS5wb3MsIGNoYW5nZS50b0FkZCk7XG4gICAgICB9XG4gICAgfVxuICAgIGhvc3QuY29tbWl0VXBkYXRlKHJlY29yZGVyKTtcblxuICAgIHJldHVybiBob3N0O1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihvcHRpb25zOiBTdG9yZU9wdGlvbnMpOiBSdWxlIHtcbiAgcmV0dXJuIChob3N0OiBUcmVlLCBjb250ZXh0OiBTY2hlbWF0aWNDb250ZXh0KSA9PiB7XG4gICAgaWYgKCFvcHRpb25zLm5hbWUgJiYgIW9wdGlvbnMucm9vdCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBQbGVhc2UgcHJvdmlkZSBhIG5hbWUgZm9yIHRoZSBmZWF0dXJlIHN0YXRlYCk7XG4gICAgfVxuXG4gICAgb3B0aW9ucy5wYXRoID0gZ2V0UHJvamVjdFBhdGgoaG9zdCwgb3B0aW9ucyk7XG5cbiAgICBjb25zdCBwYXJzZWRQYXRoID0gcGFyc2VOYW1lKG9wdGlvbnMucGF0aCwgb3B0aW9ucy5uYW1lIHx8ICcnKTtcbiAgICBvcHRpb25zLm5hbWUgPSBwYXJzZWRQYXRoLm5hbWU7XG4gICAgb3B0aW9ucy5wYXRoID0gcGFyc2VkUGF0aC5wYXRoO1xuXG4gICAgY29uc3Qgc3RhdGVQYXRoID0gYC8ke29wdGlvbnMucGF0aH0vJHtvcHRpb25zLnN0YXRlUGF0aH0vaW5kZXgudHNgO1xuICAgIGNvbnN0IHNyY1BhdGggPSBkaXJuYW1lKG9wdGlvbnMucGF0aCBhcyBQYXRoKTtcbiAgICBjb25zdCBlbnZpcm9ubWVudHNQYXRoID0gYnVpbGRSZWxhdGl2ZVBhdGgoXG4gICAgICBzdGF0ZVBhdGgsXG4gICAgICBgJHtzcmNQYXRofS9lbnZpcm9ubWVudHMvZW52aXJvbm1lbnRgXG4gICAgKTtcblxuICAgIGlmIChvcHRpb25zLm1vZHVsZSkge1xuICAgICAgb3B0aW9ucy5tb2R1bGUgPSBmaW5kTW9kdWxlRnJvbU9wdGlvbnMoaG9zdCwgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgb3B0aW9ucy5yb290ICYmXG4gICAgICBvcHRpb25zLnN0YXRlSW50ZXJmYWNlICYmXG4gICAgICBvcHRpb25zLnN0YXRlSW50ZXJmYWNlICE9PSAnU3RhdGUnXG4gICAgKSB7XG4gICAgICBvcHRpb25zLnN0YXRlSW50ZXJmYWNlID0gc3RyaW5nVXRpbHMuY2xhc3NpZnkob3B0aW9ucy5zdGF0ZUludGVyZmFjZSk7XG4gICAgfVxuXG4gICAgY29uc3QgdGVtcGxhdGVTb3VyY2UgPSBhcHBseSh1cmwoJy4vZmlsZXMnKSwgW1xuICAgICAgb3B0aW9ucy5yb290ICYmIG9wdGlvbnMubWluaW1hbCA/IGZpbHRlcihfID0+IGZhbHNlKSA6IG5vb3AoKSxcbiAgICAgIGFwcGx5VGVtcGxhdGVzKHtcbiAgICAgICAgLi4uc3RyaW5nVXRpbHMsXG4gICAgICAgIC4uLihvcHRpb25zIGFzIG9iamVjdCksXG4gICAgICAgIGlzTGliOiBpc0xpYihob3N0LCBvcHRpb25zKSxcbiAgICAgICAgZW52aXJvbm1lbnRzUGF0aCxcbiAgICAgIH0pLFxuICAgICAgbW92ZShwYXJzZWRQYXRoLnBhdGgpLFxuICAgIF0pO1xuXG4gICAgcmV0dXJuIGNoYWluKFtcbiAgICAgIGJyYW5jaEFuZE1lcmdlKFxuICAgICAgICBjaGFpbihbYWRkSW1wb3J0VG9OZ01vZHVsZShvcHRpb25zKSwgbWVyZ2VXaXRoKHRlbXBsYXRlU291cmNlKV0pXG4gICAgICApLFxuICAgIF0pKGhvc3QsIGNvbnRleHQpO1xuICB9O1xufVxuIl19