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
                : `StoreModule.forFeature('${schematics_core_1.stringUtils.camelize(options.name)}', from${schematics_core_1.stringUtils.classify(options.name)}.reducers, { metaReducers: from${schematics_core_1.stringUtils.classify(options.name)}.metaReducers })`, relativePath).shift();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3NjaGVtYXRpY3Mvc3JjL3N0b3JlL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0lBQUEsMkRBZW9DO0lBQ3BDLCtDQUFxRDtJQUNyRCxpQ0FBaUM7SUFDakMsc0VBVzBDO0lBRzFDLFNBQVMsbUJBQW1CLENBQUMsT0FBcUI7UUFDaEQsT0FBTyxDQUFDLElBQVUsRUFBRSxFQUFFO1lBQ3BCLE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7WUFFbEMsSUFBSSxDQUFDLFVBQVUsRUFBRTtnQkFDZixPQUFPLElBQUksQ0FBQzthQUNiO1lBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUU7Z0JBQzVCLE1BQU0sSUFBSSxLQUFLLENBQUMseUJBQXlCLFVBQVUsaUJBQWlCLENBQUMsQ0FBQzthQUN2RTtZQUVELE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDbkMsSUFBSSxJQUFJLEtBQUssSUFBSSxFQUFFO2dCQUNqQixNQUFNLElBQUksZ0NBQW1CLENBQUMsUUFBUSxVQUFVLGtCQUFrQixDQUFDLENBQUM7YUFDckU7WUFDRCxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBRTFDLE1BQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FDaEMsVUFBVSxFQUNWLFVBQVUsRUFDVixFQUFFLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFDdEIsSUFBSSxDQUNMLENBQUM7WUFFRixNQUFNLFNBQVMsR0FBRyxHQUFHLE9BQU8sQ0FBQyxJQUFJLElBQUksT0FBTyxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ3pELE1BQU0sWUFBWSxHQUFHLG1DQUFpQixDQUFDLFVBQVUsRUFBRSxTQUFT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Q0FBQzthQUN2RTtZQUVELE1BQU0sY0FBYyxHQUFHLGtCQUFLLENBQUMsZ0JBQUcsQ0FBQyxTQUFTLENBQUMsRUFBRTtnQkFDM0MsT0FBTyxDQUFDLElBQUksSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxtQkFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLGlCQUFJLEVBQUU7Z0JBQzdELDJCQUFjLG1CQUNULDZCQUFXLEVBQ1YsT0FBa0IsSUFDdEIsS0FBSyxFQUFFLHVCQUFLLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxFQUMzQixnQkFBZ0IsSUFDaEI7Z0JBQ0YsaUJBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDO2FBQ3RCLENBQUMsQ0FBQztZQUVILE9BQU8sa0JBQUssQ0FBQztnQkFDWCwyQkFBYyxDQUNaLGtCQUFLLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsRUFBRSxzQkFBUyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FDakU7YUFDRixDQUFDLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3BCLENBQUMsQ0FBQztJQUNKLENBQUM7SUFoREQsNEJBZ0RDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgUnVsZSxcbiAgU2NoZW1hdGljQ29udGV4dCxcbiAgU2NoZW1hdGljc0V4Y2VwdGlvbixcbiAgVHJlZSxcbiAgYXBwbHksXG4gIGFwcGx5VGVtcGxhdGVzLFxuICBicmFuY2hBbmRNZXJnZSxcbiAgY2hhaW4sXG4gIG1lcmdlV2l0aCxcbiAgdGVtcGxhdGUsXG4gIHVybCxcbiAgbW92ZSxcbiAgZmlsdGVyLFxuICBub29wLFxufSBmcm9tICdAYW5ndWxhci1kZXZraXQvc2NoZW1hdGljcyc7XG5pbXBvcnQgeyBQYXRoLCBkaXJuYW1lIH0gZnJvbSAnQGFuZ3VsYXItZGV2a2l0L2NvcmUnO1xuaW1wb3J0ICogYXMgdHMgZnJvbSAndHlwZXNjcmlwdCc7XG5pbXBvcnQge1xuICBzdHJpbmdVdGlscyxcbiAgYnVpbGRSZWxhdGl2ZVBhdGgsXG4gIGluc2VydEltcG9ydCxcbiAgQ2hhbmdlLFxuICBJbnNlcnRDaGFuZ2UsXG4gIGdldFByb2plY3RQYXRoLFxuICBpc0xpYixcbiAgZmluZE1vZHVsZUZyb21PcHRpb25zLFxuICBhZGRJbXBvcnRUb01vZHVsZSxcbiAgcGFyc2VOYW1lLFxufSBmcm9tICdAbmdyeC9zY2hlbWF0aWNzL3NjaGVtYXRpY3MtY29yZSc7XG5pbXBvcnQgeyBTY2hlbWEgYXMgU3RvcmVPcHRpb25zIH0gZnJvbSAnLi9zY2hlbWEnO1xuXG5mdW5jdGlvbiBhZGRJbXBvcnRUb05nTW9kdWxlKG9wdGlvbnM6IFN0b3JlT3B0aW9ucyk6IFJ1bGUge1xuICByZXR1cm4gKGhvc3Q6IFRyZWUpID0+IHtcbiAgICBjb25zdCBtb2R1bGVQYXRoID0gb3B0aW9ucy5tb2R1bGU7XG5cbiAgICBpZiAoIW1vZHVsZVBhdGgpIHtcbiAgICAgIHJldHVybiBob3N0O1xuICAgIH1cblxuICAgIGlmICghaG9zdC5leGlzdHMobW9kdWxlUGF0aCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgU3BlY2lmaWVkIG1vZHVsZSBwYXRoICR7bW9kdWxlUGF0aH0gZG9lcyBub3QgZXhpc3RgKTtcbiAgICB9XG5cbiAgICBjb25zdCB0ZXh0ID0gaG9zdC5yZWFkKG1vZHVsZVBhdGgpO1xuICAgIGlmICh0ZXh0ID09PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgU2NoZW1hdGljc0V4Y2VwdGlvbihgRmlsZSAke21vZHVsZVBhdGh9IGRvZXMgbm90IGV4aXN0LmApO1xuICAgIH1cbiAgICBjb25zdCBzb3VyY2VUZXh0ID0gdGV4dC50b1N0cmluZygndXRmLTgnKTtcblxuICAgIGNvbnN0IHNvdXJjZSA9IHRzLmNyZWF0ZVNvdXJjZUZpbGUoXG4gICAgICBtb2R1bGVQYXRoLFxuICAgICAgc291cmNlVGV4dCxcbiAgICAgIHRzLlNjcmlwdFRhcmdldC5MYXRlc3QsXG4gICAgICB0cnVlXG4gICAgKTtcblxuICAgIGNvbnN0IHN0YXRlUGF0aCA9IGAke29wdGlvbnMucGF0aH0vJHtvcHRpb25zLnN0YXRlUGF0aH1gO1xuICAgIGNvbnN0IHJlbGF0aXZlUGF0aCA9IGJ1aWxkUmVsYXRpdmVQYXRoKG1vZHVsZVBhdGgsIHN0YXRlUGF0aCk7XG5cbiAgICBjb25zdCBlbnZpcm9ubWVudHNQYXRoID0gYnVpbGRSZWxhdGl2ZVBhdGgoXG4gICAgICBzdGF0ZVBhdGgsXG4gICAgICBgJHtvcHRpb25zLnBhdGh9L2Vudmlyb25tZW50cy9lbnZpcm9ubWVudGBcbiAgICApO1xuXG4gICAgY29uc3QgcnVudGltZUNoZWNrcyA9IGBcbiAgICAgIHJ1bnRpbWVDaGVja3M6IHtcbiAgICAgICAgc3RyaWN0U3RhdGVJbW11dGFiaWxpdHk6IHRydWUsXG4gICAgICAgIHN0cmljdEFjdGlvbkltbXV0YWJpbGl0eTogdHJ1ZSxcbiAgICAgIH1cbiAgIGA7XG5cbiAgICBjb25zdCByb290U3RvcmVSZWR1Y2VycyA9IG9wdGlvbnMubWluaW1hbCA/IGB7fWAgOiBgcmVkdWNlcnNgO1xuXG4gICAgY29uc3Qgcm9vdFN0b3JlQ29uZmlnID0gb3B0aW9ucy5taW5pbWFsXG4gICAgICA/IGB7ICR7cnVudGltZUNoZWNrc30gfWBcbiAgICAgIDogYHtcbiAgICAgIG1ldGFSZWR1Y2VycywgJHtydW50aW1lQ2hlY2tzfSB9YDtcblxuICAgIGNvbnN0IHN0b3JlTmdNb2R1bGVJbXBvcnQgPSBhZGRJbXBvcnRUb01vZHVsZShcbiAgICAgIHNvdXJjZSxcbiAgICAgIG1vZHVsZVBhdGgsXG4gICAgICBvcHRpb25zLnJvb3RcbiAgICAgICAgPyBgU3RvcmVNb2R1bGUuZm9yUm9vdCgke3Jvb3RTdG9yZVJlZHVjZXJzfSwgJHtyb290U3RvcmVDb25maWd9KWBcbiAgICAgICAgOiBgU3RvcmVNb2R1bGUuZm9yRmVhdHVyZSgnJHtzdHJpbmdVdGlscy5jYW1lbGl6ZShcbiAgICAgICAgICAgIG9wdGlvbnMubmFtZVxuICAgICAgICAgICl9JywgZnJvbSR7c3RyaW5nVXRpbHMuY2xhc3NpZnkoXG4gICAgICAgICAgICBvcHRpb25zLm5hbWVcbiAgICAgICAgICApfS5yZWR1Y2VycywgeyBtZXRhUmVkdWNlcnM6IGZyb20ke3N0cmluZ1V0aWxzLmNsYXNzaWZ5KFxuICAgICAgICAgICAgb3B0aW9ucy5uYW1lXG4gICAgICAgICAgKX0ubWV0YVJlZHVjZXJzIH0pYCxcbiAgICAgIHJlbGF0aXZlUGF0aFxuICAgICkuc2hpZnQoKTtcblxuICAgIGxldCBjb21tb25JbXBvcnRzID0gW1xuICAgICAgaW5zZXJ0SW1wb3J0KHNvdXJjZSwgbW9kdWxlUGF0aCwgJ1N0b3JlTW9kdWxlJywgJ0BuZ3J4L3N0b3JlJyksXG4gICAgICBzdG9yZU5nTW9kdWxlSW1wb3J0LFxuICAgIF07XG5cbiAgICBpZiAob3B0aW9ucy5yb290ICYmICFvcHRpb25zLm1pbmltYWwpIHtcbiAgICAgIGNvbW1vbkltcG9ydHMgPSBjb21tb25JbXBvcnRzLmNvbmNhdChbXG4gICAgICAgIGluc2VydEltcG9ydChcbiAgICAgICAgICBzb3VyY2UsXG4gICAgICAgICAgbW9kdWxlUGF0aCxcbiAgICAgICAgICAncmVkdWNlcnMsIG1ldGFSZWR1Y2VycycsXG4gICAgICAgICAgcmVsYXRpdmVQYXRoXG4gICAgICAgICksXG4gICAgICBdKTtcbiAgICB9IGVsc2UgaWYgKCFvcHRpb25zLnJvb3QpIHtcbiAgICAgIGNvbW1vbkltcG9ydHMgPSBjb21tb25JbXBvcnRzLmNvbmNhdChbXG4gICAgICAgIGluc2VydEltcG9ydChcbiAgICAgICAgICBzb3VyY2UsXG4gICAgICAgICAgbW9kdWxlUGF0aCxcbiAgICAgICAgICBgKiBhcyBmcm9tJHtzdHJpbmdVdGlscy5jbGFzc2lmeShvcHRpb25zLm5hbWUpfWAsXG4gICAgICAgICAgcmVsYXRpdmVQYXRoLFxuICAgICAgICAgIHRydWVcbiAgICAgICAgKSxcbiAgICAgIF0pO1xuICAgIH1cblxuICAgIGxldCByb290SW1wb3J0czogKENoYW5nZSB8IHVuZGVmaW5lZClbXSA9IFtdO1xuXG4gICAgaWYgKG9wdGlvbnMucm9vdCkge1xuICAgICAgY29uc3Qgc3RvcmVEZXZ0b29sc05nTW9kdWxlSW1wb3J0ID0gYWRkSW1wb3J0VG9Nb2R1bGUoXG4gICAgICAgIHNvdXJjZSxcbiAgICAgICAgbW9kdWxlUGF0aCxcbiAgICAgICAgYCFlbnZpcm9ubWVudC5wcm9kdWN0aW9uID8gU3RvcmVEZXZ0b29sc01vZHVsZS5pbnN0cnVtZW50KCkgOiBbXWAsXG4gICAgICAgIHJlbGF0aXZlUGF0aFxuICAgICAgKS5zaGlmdCgpO1xuXG4gICAgICByb290SW1wb3J0cyA9IHJvb3RJbXBvcnRzLmNvbmNhdChbXG4gICAgICAgIGluc2VydEltcG9ydChcbiAgICAgICAgICBzb3VyY2UsXG4gICAgICAgICAgbW9kdWxlUGF0aCxcbiAgICAgICAgICAnU3RvcmVEZXZ0b29sc01vZHVsZScsXG4gICAgICAgICAgJ0BuZ3J4L3N0b3JlLWRldnRvb2xzJ1xuICAgICAgICApLFxuICAgICAgICBpbnNlcnRJbXBvcnQoc291cmNlLCBtb2R1bGVQYXRoLCAnZW52aXJvbm1lbnQnLCBlbnZpcm9ubWVudHNQYXRoKSxcbiAgICAgICAgc3RvcmVEZXZ0b29sc05nTW9kdWxlSW1wb3J0LFxuICAgICAgXSk7XG4gICAgfVxuXG4gICAgY29uc3QgY2hhbmdlcyA9IFsuLi5jb21tb25JbXBvcnRzLCAuLi5yb290SW1wb3J0c107XG4gICAgY29uc3QgcmVjb3JkZXIgPSBob3N0LmJlZ2luVXBkYXRlKG1vZHVsZVBhdGgpO1xuICAgIGZvciAoY29uc3QgY2hhbmdlIG9mIGNoYW5nZXMpIHtcbiAgICAgIGlmIChjaGFuZ2UgaW5zdGFuY2VvZiBJbnNlcnRDaGFuZ2UpIHtcbiAgICAgICAgcmVjb3JkZXIuaW5zZXJ0TGVmdChjaGFuZ2UucG9zLCBjaGFuZ2UudG9BZGQpO1xuICAgICAgfVxuICAgIH1cbiAgICBob3N0LmNvbW1pdFVwZGF0ZShyZWNvcmRlcik7XG5cbiAgICByZXR1cm4gaG9zdDtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24ob3B0aW9uczogU3RvcmVPcHRpb25zKTogUnVsZSB7XG4gIHJldHVybiAoaG9zdDogVHJlZSwgY29udGV4dDogU2NoZW1hdGljQ29udGV4dCkgPT4ge1xuICAgIGlmICghb3B0aW9ucy5uYW1lICYmICFvcHRpb25zLnJvb3QpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgUGxlYXNlIHByb3ZpZGUgYSBuYW1lIGZvciB0aGUgZmVhdHVyZSBzdGF0ZWApO1xuICAgIH1cblxuICAgIG9wdGlvbnMucGF0aCA9IGdldFByb2plY3RQYXRoKGhvc3QsIG9wdGlvbnMpO1xuXG4gICAgY29uc3QgcGFyc2VkUGF0aCA9IHBhcnNlTmFtZShvcHRpb25zLnBhdGgsIG9wdGlvbnMubmFtZSB8fCAnJyk7XG4gICAgb3B0aW9ucy5uYW1lID0gcGFyc2VkUGF0aC5uYW1lO1xuICAgIG9wdGlvbnMucGF0aCA9IHBhcnNlZFBhdGgucGF0aDtcblxuICAgIGNvbnN0IHN0YXRlUGF0aCA9IGAvJHtvcHRpb25zLnBhdGh9LyR7b3B0aW9ucy5zdGF0ZVBhdGh9L2luZGV4LnRzYDtcbiAgICBjb25zdCBzcmNQYXRoID0gZGlybmFtZShvcHRpb25zLnBhdGggYXMgUGF0aCk7XG4gICAgY29uc3QgZW52aXJvbm1lbnRzUGF0aCA9IGJ1aWxkUmVsYXRpdmVQYXRoKFxuICAgICAgc3RhdGVQYXRoLFxuICAgICAgYCR7c3JjUGF0aH0vZW52aXJvbm1lbnRzL2Vudmlyb25tZW50YFxuICAgICk7XG5cbiAgICBpZiAob3B0aW9ucy5tb2R1bGUpIHtcbiAgICAgIG9wdGlvbnMubW9kdWxlID0gZmluZE1vZHVsZUZyb21PcHRpb25zKGhvc3QsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIGlmIChcbiAgICAgIG9wdGlvbnMucm9vdCAmJlxuICAgICAgb3B0aW9ucy5zdGF0ZUludGVyZmFjZSAmJlxuICAgICAgb3B0aW9ucy5zdGF0ZUludGVyZmFjZSAhPT0gJ1N0YXRlJ1xuICAgICkge1xuICAgICAgb3B0aW9ucy5zdGF0ZUludGVyZmFjZSA9IHN0cmluZ1V0aWxzLmNsYXNzaWZ5KG9wdGlvbnMuc3RhdGVJbnRlcmZhY2UpO1xuICAgIH1cblxuICAgIGNvbnN0IHRlbXBsYXRlU291cmNlID0gYXBwbHkodXJsKCcuL2ZpbGVzJyksIFtcbiAgICAgIG9wdGlvbnMucm9vdCAmJiBvcHRpb25zLm1pbmltYWwgPyBmaWx0ZXIoXyA9PiBmYWxzZSkgOiBub29wKCksXG4gICAgICBhcHBseVRlbXBsYXRlcyh7XG4gICAgICAgIC4uLnN0cmluZ1V0aWxzLFxuICAgICAgICAuLi4ob3B0aW9ucyBhcyBvYmplY3QpLFxuICAgICAgICBpc0xpYjogaXNMaWIoaG9zdCwgb3B0aW9ucyksXG4gICAgICAgIGVudmlyb25tZW50c1BhdGgsXG4gICAgICB9KSxcbiAgICAgIG1vdmUocGFyc2VkUGF0aC5wYXRoKSxcbiAgICBdKTtcblxuICAgIHJldHVybiBjaGFpbihbXG4gICAgICBicmFuY2hBbmRNZXJnZShcbiAgICAgICAgY2hhaW4oW2FkZEltcG9ydFRvTmdNb2R1bGUob3B0aW9ucyksIG1lcmdlV2l0aCh0ZW1wbGF0ZVNvdXJjZSldKVxuICAgICAgKSxcbiAgICBdKShob3N0LCBjb250ZXh0KTtcbiAgfTtcbn1cbiJdfQ==