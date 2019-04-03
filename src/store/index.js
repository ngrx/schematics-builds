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
            const storeNgModuleImport = schematics_core_1.addImportToModule(source, modulePath, options.root
                ? `StoreModule.forRoot(reducers, { metaReducers })`
                : `StoreModule.forFeature('${schematics_core_1.stringUtils.camelize(options.name)}', from${schematics_core_1.stringUtils.classify(options.name)}.reducers, { metaReducers: from${schematics_core_1.stringUtils.classify(options.name)}.metaReducers })`, relativePath).shift();
            let commonImports = [
                schematics_core_1.insertImport(source, modulePath, 'StoreModule', '@ngrx/store'),
                options.root
                    ? schematics_core_1.insertImport(source, modulePath, 'reducers, metaReducers', relativePath)
                    : schematics_core_1.insertImport(source, modulePath, `* as from${schematics_core_1.stringUtils.classify(options.name)}`, relativePath, true),
                storeNgModuleImport,
            ];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3NjaGVtYXRpY3Mvc3JjL3N0b3JlL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0lBQUEsMkRBYW9DO0lBQ3BDLCtDQUFxRDtJQUNyRCxpQ0FBaUM7SUFDakMsc0VBVzBDO0lBRzFDLFNBQVMsbUJBQW1CLENBQUMsT0FBcUI7UUFDaEQsT0FBTyxDQUFDLElBQVUsRUFBRSxFQUFFO1lBQ3BCLE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7WUFFbEMsSUFBSSxDQUFDLFVBQVUsRUFBRTtnQkFDZixPQUFPLElBQUksQ0FBQzthQUNiO1lBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUU7Z0JBQzVCLE1BQU0sSUFBSSxLQUFLLENBQUMseUJBQXlCLFVBQVUsaUJBQWlCLENBQUMsQ0FBQzthQUN2RTtZQUVELE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDbkMsSUFBSSxJQUFJLEtBQUssSUFBSSxFQUFFO2dCQUNqQixNQUFNLElBQUksZ0NBQW1CLENBQUMsUUFBUSxVQUFVLGtCQUFrQixDQUFDLENBQUM7YUFDckU7WUFDRCxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBRTFDLE1BQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FDaEMsVUFBVSxFQUNWLFVBQVUsRUFDVixFQUFFLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFDdEIsSUFBSSxDQUNMLENBQUM7WUFFRixNQUFNLFNBQVMsR0FBRyxHQUFHLE9BQU8sQ0FBQyxJQUFJLElBQUksT0FBTyxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ3pELE1BQU0sWUFBWSxHQUFHLG1DQUFpQixDQUFDLFVBQVUsRUFBRSxTQUFT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QkErQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBSdWxlLFxuICBTY2hlbWF0aWNDb250ZXh0LFxuICBTY2hlbWF0aWNzRXhjZXB0aW9uLFxuICBUcmVlLFxuICBhcHBseSxcbiAgYXBwbHlUZW1wbGF0ZXMsXG4gIGJyYW5jaEFuZE1lcmdlLFxuICBjaGFpbixcbiAgbWVyZ2VXaXRoLFxuICB0ZW1wbGF0ZSxcbiAgdXJsLFxuICBtb3ZlLFxufSBmcm9tICdAYW5ndWxhci1kZXZraXQvc2NoZW1hdGljcyc7XG5pbXBvcnQgeyBQYXRoLCBkaXJuYW1lIH0gZnJvbSAnQGFuZ3VsYXItZGV2a2l0L2NvcmUnO1xuaW1wb3J0ICogYXMgdHMgZnJvbSAndHlwZXNjcmlwdCc7XG5pbXBvcnQge1xuICBzdHJpbmdVdGlscyxcbiAgYnVpbGRSZWxhdGl2ZVBhdGgsXG4gIGluc2VydEltcG9ydCxcbiAgQ2hhbmdlLFxuICBJbnNlcnRDaGFuZ2UsXG4gIGdldFByb2plY3RQYXRoLFxuICBpc0xpYixcbiAgZmluZE1vZHVsZUZyb21PcHRpb25zLFxuICBhZGRJbXBvcnRUb01vZHVsZSxcbiAgcGFyc2VOYW1lLFxufSBmcm9tICdAbmdyeC9zY2hlbWF0aWNzL3NjaGVtYXRpY3MtY29yZSc7XG5pbXBvcnQgeyBTY2hlbWEgYXMgU3RvcmVPcHRpb25zIH0gZnJvbSAnLi9zY2hlbWEnO1xuXG5mdW5jdGlvbiBhZGRJbXBvcnRUb05nTW9kdWxlKG9wdGlvbnM6IFN0b3JlT3B0aW9ucyk6IFJ1bGUge1xuICByZXR1cm4gKGhvc3Q6IFRyZWUpID0+IHtcbiAgICBjb25zdCBtb2R1bGVQYXRoID0gb3B0aW9ucy5tb2R1bGU7XG5cbiAgICBpZiAoIW1vZHVsZVBhdGgpIHtcbiAgICAgIHJldHVybiBob3N0O1xuICAgIH1cblxuICAgIGlmICghaG9zdC5leGlzdHMobW9kdWxlUGF0aCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgU3BlY2lmaWVkIG1vZHVsZSBwYXRoICR7bW9kdWxlUGF0aH0gZG9lcyBub3QgZXhpc3RgKTtcbiAgICB9XG5cbiAgICBjb25zdCB0ZXh0ID0gaG9zdC5yZWFkKG1vZHVsZVBhdGgpO1xuICAgIGlmICh0ZXh0ID09PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgU2NoZW1hdGljc0V4Y2VwdGlvbihgRmlsZSAke21vZHVsZVBhdGh9IGRvZXMgbm90IGV4aXN0LmApO1xuICAgIH1cbiAgICBjb25zdCBzb3VyY2VUZXh0ID0gdGV4dC50b1N0cmluZygndXRmLTgnKTtcblxuICAgIGNvbnN0IHNvdXJjZSA9IHRzLmNyZWF0ZVNvdXJjZUZpbGUoXG4gICAgICBtb2R1bGVQYXRoLFxuICAgICAgc291cmNlVGV4dCxcbiAgICAgIHRzLlNjcmlwdFRhcmdldC5MYXRlc3QsXG4gICAgICB0cnVlXG4gICAgKTtcblxuICAgIGNvbnN0IHN0YXRlUGF0aCA9IGAke29wdGlvbnMucGF0aH0vJHtvcHRpb25zLnN0YXRlUGF0aH1gO1xuICAgIGNvbnN0IHJlbGF0aXZlUGF0aCA9IGJ1aWxkUmVsYXRpdmVQYXRoKG1vZHVsZVBhdGgsIHN0YXRlUGF0aCk7XG5cbiAgICBjb25zdCBlbnZpcm9ubWVudHNQYXRoID0gYnVpbGRSZWxhdGl2ZVBhdGgoXG4gICAgICBzdGF0ZVBhdGgsXG4gICAgICBgJHtvcHRpb25zLnBhdGh9L2Vudmlyb25tZW50cy9lbnZpcm9ubWVudGBcbiAgICApO1xuXG4gICAgY29uc3Qgc3RvcmVOZ01vZHVsZUltcG9ydCA9IGFkZEltcG9ydFRvTW9kdWxlKFxuICAgICAgc291cmNlLFxuICAgICAgbW9kdWxlUGF0aCxcbiAgICAgIG9wdGlvbnMucm9vdFxuICAgICAgICA/IGBTdG9yZU1vZHVsZS5mb3JSb290KHJlZHVjZXJzLCB7IG1ldGFSZWR1Y2VycyB9KWBcbiAgICAgICAgOiBgU3RvcmVNb2R1bGUuZm9yRmVhdHVyZSgnJHtzdHJpbmdVdGlscy5jYW1lbGl6ZShcbiAgICAgICAgICAgIG9wdGlvbnMubmFtZVxuICAgICAgICAgICl9JywgZnJvbSR7c3RyaW5nVXRpbHMuY2xhc3NpZnkoXG4gICAgICAgICAgICBvcHRpb25zLm5hbWVcbiAgICAgICAgICApfS5yZWR1Y2VycywgeyBtZXRhUmVkdWNlcnM6IGZyb20ke3N0cmluZ1V0aWxzLmNsYXNzaWZ5KFxuICAgICAgICAgICAgb3B0aW9ucy5uYW1lXG4gICAgICAgICAgKX0ubWV0YVJlZHVjZXJzIH0pYCxcbiAgICAgIHJlbGF0aXZlUGF0aFxuICAgICkuc2hpZnQoKTtcblxuICAgIGxldCBjb21tb25JbXBvcnRzID0gW1xuICAgICAgaW5zZXJ0SW1wb3J0KHNvdXJjZSwgbW9kdWxlUGF0aCwgJ1N0b3JlTW9kdWxlJywgJ0BuZ3J4L3N0b3JlJyksXG4gICAgICBvcHRpb25zLnJvb3RcbiAgICAgICAgPyBpbnNlcnRJbXBvcnQoXG4gICAgICAgICAgICBzb3VyY2UsXG4gICAgICAgICAgICBtb2R1bGVQYXRoLFxuICAgICAgICAgICAgJ3JlZHVjZXJzLCBtZXRhUmVkdWNlcnMnLFxuICAgICAgICAgICAgcmVsYXRpdmVQYXRoXG4gICAgICAgICAgKVxuICAgICAgICA6IGluc2VydEltcG9ydChcbiAgICAgICAgICAgIHNvdXJjZSxcbiAgICAgICAgICAgIG1vZHVsZVBhdGgsXG4gICAgICAgICAgICBgKiBhcyBmcm9tJHtzdHJpbmdVdGlscy5jbGFzc2lmeShvcHRpb25zLm5hbWUpfWAsXG4gICAgICAgICAgICByZWxhdGl2ZVBhdGgsXG4gICAgICAgICAgICB0cnVlXG4gICAgICAgICAgKSxcbiAgICAgIHN0b3JlTmdNb2R1bGVJbXBvcnQsXG4gICAgXTtcbiAgICBsZXQgcm9vdEltcG9ydHM6IChDaGFuZ2UgfCB1bmRlZmluZWQpW10gPSBbXTtcblxuICAgIGlmIChvcHRpb25zLnJvb3QpIHtcbiAgICAgIGNvbnN0IHN0b3JlRGV2dG9vbHNOZ01vZHVsZUltcG9ydCA9IGFkZEltcG9ydFRvTW9kdWxlKFxuICAgICAgICBzb3VyY2UsXG4gICAgICAgIG1vZHVsZVBhdGgsXG4gICAgICAgIGAhZW52aXJvbm1lbnQucHJvZHVjdGlvbiA/IFN0b3JlRGV2dG9vbHNNb2R1bGUuaW5zdHJ1bWVudCgpIDogW11gLFxuICAgICAgICByZWxhdGl2ZVBhdGhcbiAgICAgICkuc2hpZnQoKTtcblxuICAgICAgcm9vdEltcG9ydHMgPSByb290SW1wb3J0cy5jb25jYXQoW1xuICAgICAgICBpbnNlcnRJbXBvcnQoXG4gICAgICAgICAgc291cmNlLFxuICAgICAgICAgIG1vZHVsZVBhdGgsXG4gICAgICAgICAgJ1N0b3JlRGV2dG9vbHNNb2R1bGUnLFxuICAgICAgICAgICdAbmdyeC9zdG9yZS1kZXZ0b29scydcbiAgICAgICAgKSxcbiAgICAgICAgaW5zZXJ0SW1wb3J0KHNvdXJjZSwgbW9kdWxlUGF0aCwgJ2Vudmlyb25tZW50JywgZW52aXJvbm1lbnRzUGF0aCksXG4gICAgICAgIHN0b3JlRGV2dG9vbHNOZ01vZHVsZUltcG9ydCxcbiAgICAgIF0pO1xuICAgIH1cblxuICAgIGNvbnN0IGNoYW5nZXMgPSBbLi4uY29tbW9uSW1wb3J0cywgLi4ucm9vdEltcG9ydHNdO1xuICAgIGNvbnN0IHJlY29yZGVyID0gaG9zdC5iZWdpblVwZGF0ZShtb2R1bGVQYXRoKTtcbiAgICBmb3IgKGNvbnN0IGNoYW5nZSBvZiBjaGFuZ2VzKSB7XG4gICAgICBpZiAoY2hhbmdlIGluc3RhbmNlb2YgSW5zZXJ0Q2hhbmdlKSB7XG4gICAgICAgIHJlY29yZGVyLmluc2VydExlZnQoY2hhbmdlLnBvcywgY2hhbmdlLnRvQWRkKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaG9zdC5jb21taXRVcGRhdGUocmVjb3JkZXIpO1xuXG4gICAgcmV0dXJuIGhvc3Q7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG9wdGlvbnM6IFN0b3JlT3B0aW9ucyk6IFJ1bGUge1xuICByZXR1cm4gKGhvc3Q6IFRyZWUsIGNvbnRleHQ6IFNjaGVtYXRpY0NvbnRleHQpID0+IHtcbiAgICBpZiAoIW9wdGlvbnMubmFtZSAmJiAhb3B0aW9ucy5yb290KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFBsZWFzZSBwcm92aWRlIGEgbmFtZSBmb3IgdGhlIGZlYXR1cmUgc3RhdGVgKTtcbiAgICB9XG5cbiAgICBvcHRpb25zLnBhdGggPSBnZXRQcm9qZWN0UGF0aChob3N0LCBvcHRpb25zKTtcblxuICAgIGNvbnN0IHBhcnNlZFBhdGggPSBwYXJzZU5hbWUob3B0aW9ucy5wYXRoLCBvcHRpb25zLm5hbWUgfHwgJycpO1xuICAgIG9wdGlvbnMubmFtZSA9IHBhcnNlZFBhdGgubmFtZTtcbiAgICBvcHRpb25zLnBhdGggPSBwYXJzZWRQYXRoLnBhdGg7XG5cbiAgICBjb25zdCBzdGF0ZVBhdGggPSBgLyR7b3B0aW9ucy5wYXRofS8ke29wdGlvbnMuc3RhdGVQYXRofS9pbmRleC50c2A7XG4gICAgY29uc3Qgc3JjUGF0aCA9IGRpcm5hbWUob3B0aW9ucy5wYXRoIGFzIFBhdGgpO1xuICAgIGNvbnN0IGVudmlyb25tZW50c1BhdGggPSBidWlsZFJlbGF0aXZlUGF0aChcbiAgICAgIHN0YXRlUGF0aCxcbiAgICAgIGAke3NyY1BhdGh9L2Vudmlyb25tZW50cy9lbnZpcm9ubWVudGBcbiAgICApO1xuXG4gICAgaWYgKG9wdGlvbnMubW9kdWxlKSB7XG4gICAgICBvcHRpb25zLm1vZHVsZSA9IGZpbmRNb2R1bGVGcm9tT3B0aW9ucyhob3N0LCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICBpZiAoXG4gICAgICBvcHRpb25zLnJvb3QgJiZcbiAgICAgIG9wdGlvbnMuc3RhdGVJbnRlcmZhY2UgJiZcbiAgICAgIG9wdGlvbnMuc3RhdGVJbnRlcmZhY2UgIT09ICdTdGF0ZSdcbiAgICApIHtcbiAgICAgIG9wdGlvbnMuc3RhdGVJbnRlcmZhY2UgPSBzdHJpbmdVdGlscy5jbGFzc2lmeShvcHRpb25zLnN0YXRlSW50ZXJmYWNlKTtcbiAgICB9XG5cbiAgICBjb25zdCB0ZW1wbGF0ZVNvdXJjZSA9IGFwcGx5KHVybCgnLi9maWxlcycpLCBbXG4gICAgICBhcHBseVRlbXBsYXRlcyh7XG4gICAgICAgIC4uLnN0cmluZ1V0aWxzLFxuICAgICAgICAuLi4ob3B0aW9ucyBhcyBvYmplY3QpLFxuICAgICAgICBpc0xpYjogaXNMaWIoaG9zdCwgb3B0aW9ucyksXG4gICAgICAgIGVudmlyb25tZW50c1BhdGgsXG4gICAgICB9KSxcbiAgICAgIG1vdmUocGFyc2VkUGF0aC5wYXRoKSxcbiAgICBdKTtcblxuICAgIHJldHVybiBjaGFpbihbXG4gICAgICBicmFuY2hBbmRNZXJnZShcbiAgICAgICAgY2hhaW4oW2FkZEltcG9ydFRvTmdNb2R1bGUob3B0aW9ucyksIG1lcmdlV2l0aCh0ZW1wbGF0ZVNvdXJjZSldKVxuICAgICAgKSxcbiAgICBdKShob3N0LCBjb250ZXh0KTtcbiAgfTtcbn1cbiJdfQ==