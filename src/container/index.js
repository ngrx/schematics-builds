(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@ngrx/schematics/src/container/index", ["require", "exports", "@angular-devkit/schematics", "typescript", "@ngrx/schematics/schematics-core"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const schematics_1 = require("@angular-devkit/schematics");
    const ts = require("typescript");
    const schematics_core_1 = require("@ngrx/schematics/schematics-core");
    function addStateToComponent(options) {
        return (host) => {
            if (!options.state && !options.stateInterface) {
                return host;
            }
            const statePath = `/${options.path}/${options.state}`;
            if (options.state) {
                if (!host.exists(statePath)) {
                    throw new Error(`The Specified state path ${statePath} does not exist`);
                }
            }
            const componentPath = `/${options.path}/` +
                (options.flat ? '' : schematics_core_1.stringUtils.dasherize(options.name) + '/') +
                schematics_core_1.stringUtils.dasherize(options.name) +
                '.component.ts';
            const text = host.read(componentPath);
            if (text === null) {
                throw new schematics_1.SchematicsException(`File ${componentPath} does not exist.`);
            }
            const sourceText = text.toString('utf-8');
            const source = ts.createSourceFile(componentPath, sourceText, ts.ScriptTarget.Latest, true);
            const stateImportPath = schematics_core_1.buildRelativePath(componentPath, statePath);
            const storeImport = schematics_core_1.insertImport(source, componentPath, 'Store', '@ngrx/store');
            const stateImport = options.state
                ? schematics_core_1.insertImport(source, componentPath, `* as fromStore`, stateImportPath, true)
                : new schematics_core_1.NoopChange();
            const componentClass = source.statements.find(stm => stm.kind === ts.SyntaxKind.ClassDeclaration);
            const component = componentClass;
            const componentConstructor = component.members.find(member => member.kind === ts.SyntaxKind.Constructor);
            const cmpCtr = componentConstructor;
            const { pos } = cmpCtr;
            const stateType = options.state
                ? `fromStore.${options.stateInterface}`
                : 'any';
            const constructorText = cmpCtr.getText();
            const [start, end] = constructorText.split('()');
            const storeText = `private store: Store<${stateType}>`;
            const storeConstructor = [start, `(${storeText})`, end].join('');
            const constructorUpdate = new schematics_core_1.ReplaceChange(componentPath, pos, `  ${constructorText}\n\n`, `\n\n  ${storeConstructor}`);
            const changes = [storeImport, stateImport, constructorUpdate];
            const recorder = host.beginUpdate(componentPath);
            for (const change of changes) {
                if (change instanceof schematics_core_1.InsertChange) {
                    recorder.insertLeft(change.pos, change.toAdd);
                }
                else if (change instanceof schematics_core_1.ReplaceChange) {
                    recorder.remove(pos, change.oldText.length);
                    recorder.insertLeft(change.order, change.newText);
                }
            }
            host.commitUpdate(recorder);
            return host;
        };
    }
    function default_1(options) {
        return (host, context) => {
            options.path = schematics_core_1.getProjectPath(host, options);
            const parsedPath = schematics_core_1.parseName(options.path, options.name);
            options.name = parsedPath.name;
            options.path = parsedPath.path;
            const opts = ['state', 'stateInterface'].reduce((current, key) => {
                return schematics_core_1.omit(current, key);
            }, options);
            const templateSource = schematics_1.apply(schematics_1.url(options.testDepth === 'unit' ? './files' : './integration-files'), [
                options.skipTest
                    ? schematics_1.filter(path => !path.endsWith('.spec.ts.template'))
                    : schematics_1.noop(),
                schematics_1.applyTemplates(Object.assign(Object.assign({ 'if-flat': (s) => (options.flat ? '' : s) }, schematics_core_1.stringUtils), options)),
                schematics_1.move(parsedPath.path),
            ]);
            // Remove all undefined values to use the schematic defaults (in angular.json or the Angular schema)
            Object.keys(opts).forEach(key => (opts[key] === undefined ? delete opts[key] : {}));
            return schematics_1.chain([
                schematics_1.externalSchematic('@schematics/angular', 'component', Object.assign(Object.assign({}, opts), { skipTests: true })),
                addStateToComponent(options),
                schematics_1.mergeWith(templateSource),
            ])(host, context);
        };
    }
    exports.default = default_1;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3NjaGVtYXRpY3Mvc3JjL2NvbnRhaW5lci9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztJQUFBLDJEQWdCb0M7SUFDcEMsaUNBQWlDO0lBQ2pDLHNFQVUwQztJQUcxQyxTQUFTLG1CQUFtQixDQUFDLE9BQWtDO1FBQzdELE9BQU8sQ0FBQyxJQUFVLEVBQUUsRUFBRTtZQUNwQixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLEVBQUU7Z0JBQzdDLE9BQU8sSUFBSSxDQUFDO2FBQ2I7WUFFRCxNQUFNLFNBQVMsR0FBRyxJQUFJLE9BQU8sQ0FBQyxJQUFJLElBQUksT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBRXRELElBQUksT0FBTyxDQUFDLEtBQUssRUFBRTtnQkFDakIsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEVBQUU7b0JBQzNCLE1BQU0sSUFBSSxLQUFLLENBQUMsNEJBQTRCLFNBQVMsaUJBQWlCLENBQUMsQ0FBQztpQkFDekU7YUFDRjtZQUVELE1BQU0sYUFBYSxHQUNqQixJQUFJLE9BQU8sQ0FBQyxJQUFJLEdBQUc7Z0JBQ25CLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyw2QkFBVyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDO2dCQUMvRCw2QkFBVyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO2dCQUNuQyxlQUFlLENBQUM7WUFFbEIsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUV0QyxJQUFJLElBQUksS0FBSyxJQUFJLEVBQUU7Z0JBQ2pCLE1BQU0sSUFBSSxnQ0FBbUIsQ0FBQyxRQUFRLGFBQWEsa0JBQWtCLENBQUMsQ0FBQzthQUN4RTtZQUVELE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7WUFFMUMsTUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDLGdCQUFnQixDQUNoQyxhQUFhLEVBQ2IsVUFBVSxFQUNWLEVBQUUsQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUN0QixJQUFJLENBQ0wsQ0FBQztZQUVGLE1BQU0sZUFBZSxHQUFHLG1DQUFpQixDQUFDLGFBQWEsRUFBRSxTQUFTLENBQUMsQ0FBQztZQUNwRSxNQUFNLFdBQVcsR0FBRyw4QkFBWSxDQUM5QixNQUFNLEVBQ04sYUFBYSxFQUNiLE9BQU8sRUFDUCxhQUFhLENBQ2QsQ0FBQztZQUNGLE1BQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxLQUFLO2dCQUMvQixDQUFDLENBQUMsOEJBQVksQ0FDVixNQUFNLEVBQ04sYUFBYSxFQUNiLGdCQUFnQixFQUNoQixlQUFlLEVBQ2YsSUFBSSxDQUNMO2dCQUNILENBQUMsQ0FBQyxJQUFJLDRCQUFVLEVBQUUsQ0FBQztZQUVyQixNQUFNLGNBQWMsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FDM0MsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxLQUFLLEVBQUUsQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQ25ELENBQUM7WUFDRixNQUFNLFNBQVMsR0FBRyxjQUFxQyxDQUFDO1lBQ3hELE1BQU0sb0JBQW9CLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQ2pELE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxFQUFFLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FDcEQsQ0FBQztZQUNGLE1BQU0sTUFBTSxHQUFHLG9CQUFpRCxDQUFDO1lBQ2pFLE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxNQUFNLENBQUM7WUFDdkIsTUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLEtBQUs7Z0JBQzdCLENBQUMsQ0FBQyxhQUFhLE9BQU8sQ0FBQyxjQUFjLEVBQUU7Z0JBQ3ZDLENBQUMsQ0FBQyxLQUFLLENBQUM7WUFDVixNQUFNLGVBQWUsR0FBRyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDekMsTUFBTSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsR0FBRyxlQUFlLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2pELE1BQU0sU0FBUyxHQUFHLHdCQUF3QixTQUFTLEdBQUcsQ0FBQztZQUN2RCxNQUFNLGdCQUFnQixHQUFHLENBQUMsS0FBSyxFQUFFLElBQUksU0FBUyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ2pFLE1BQU0saUJBQWlCLEdBQUcsSUFBSSwrQkFBYSxDQUN6QyxhQUFhLEVBQ2IsR0FBRyxFQUNILEtBQUssZUFBZSxNQUFNLEVBQzFCLFNBQVMsZ0JBQWdCLEVBQUUsQ0FDNUIsQ0FBQztZQUVGLE1BQU0sT0FBTyxHQUFHLENBQUMsV0FBVyxFQUFFLFdBQVcsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO1lBQzlELE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLENBQUM7WUFFakQsS0FBSyxNQUFNLE1BQU0sSUFBSSxPQUFPLEVBQUU7Z0JBQzVCLElBQUksTUFBTSxZQUFZLDhCQUFZLEVBQUU7b0JBQ2xDLFFBQVEsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQy9DO3FCQUFNLElBQUksTUFBTSxZQUFZLCtCQUFhLEVBQUU7b0JBQzFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQzVDLFFBQVEsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7aUJBQ25EO2FBQ0Y7WUFFRCxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBRTVCLE9BQU8sSUFBSSxDQUFDO1FBQ2QsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVELG1CQUF3QixPQUF5QjtRQUMvQyxPQUFPLENBQUMsSUFBVSxFQUFFLE9BQXlCLEVBQUUsRUFBRTtZQUMvQyxPQUFPLENBQUMsSUFBSSxHQUFHLGdDQUFjLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBRTdDLE1BQU0sVUFBVSxHQUFHLDJCQUFTLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDekQsT0FBTyxDQUFDLElBQUksR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDO1lBQy9CLE9BQU8sQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQztZQUUvQixNQUFNLElBQUksR0FBRyxDQUFDLE9BQU8sRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDLE1BQU0sQ0FDN0MsQ0FBQyxPQUFrQyxFQUFFLEdBQUcsRUFBRSxFQUFFO2dCQUMxQyxPQUFPLHNCQUFJLENBQUMsT0FBTyxFQUFFLEdBQVUsQ0FBQyxDQUFDO1lBQ25DLENBQUMsRUFDRCxPQUFPLENBQ1IsQ0FBQztZQUVGLE1BQU0sY0FBYyxHQUFHLGtCQUFLLENBQzFCLGdCQUFHLENBQUMsT0FBTyxDQUFDLFNBQVMsS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMscUJBQXFCLENBQUMsRUFDckU7Z0JBQ0UsT0FBTyxDQUFDLFFBQVE7b0JBQ2QsQ0FBQyxDQUFDLG1CQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUMsQ0FBQztvQkFDckQsQ0FBQyxDQUFDLGlCQUFJLEVBQUU7Z0JBQ1YsMkJBQWMsQ0FBQyw4QkFDYixTQUFTLEVBQUUsQ0FBQyxDQUFTLEVBQUUsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFDOUMsNkJBQVcsR0FDVixPQUFrQixDQUNoQixDQUFDO2dCQUNULGlCQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQzthQUN0QixDQUNGLENBQUM7WUFFRixvR0FBb0c7WUFDbkcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQWdDLENBQUMsT0FBTyxDQUN2RCxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUN6RCxDQUFDO1lBRUYsT0FBTyxrQkFBSyxDQUFDO2dCQUNYLDhCQUFpQixDQUFDLHFCQUFxQixFQUFFLFdBQVcsa0NBQy9DLElBQUksS0FDUCxTQUFTLEVBQUUsSUFBSSxJQUNmO2dCQUNGLG1CQUFtQixDQUFDLE9BQU8sQ0FBQztnQkFDNUIsc0JBQVMsQ0FBQyxjQUFjLENBQUM7YUFDMUIsQ0FBQyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNwQixDQUFDLENBQUM7SUFDSixDQUFDO0lBNUNELDRCQTRDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIFJ1bGUsXG4gIFNjaGVtYXRpY0NvbnRleHQsXG4gIFNjaGVtYXRpY3NFeGNlcHRpb24sXG4gIFRyZWUsXG4gIGNoYWluLFxuICBleHRlcm5hbFNjaGVtYXRpYyxcbiAgYXBwbHksXG4gIGFwcGx5VGVtcGxhdGVzLFxuICB1cmwsXG4gIG5vb3AsXG4gIGZpbHRlcixcbiAgdGVtcGxhdGUsXG4gIG1vdmUsXG4gIG1lcmdlV2l0aCxcbiAgTWVyZ2VTdHJhdGVneSxcbn0gZnJvbSAnQGFuZ3VsYXItZGV2a2l0L3NjaGVtYXRpY3MnO1xuaW1wb3J0ICogYXMgdHMgZnJvbSAndHlwZXNjcmlwdCc7XG5pbXBvcnQge1xuICBzdHJpbmdVdGlscyxcbiAgYnVpbGRSZWxhdGl2ZVBhdGgsXG4gIGluc2VydEltcG9ydCxcbiAgTm9vcENoYW5nZSxcbiAgUmVwbGFjZUNoYW5nZSxcbiAgSW5zZXJ0Q2hhbmdlLFxuICBnZXRQcm9qZWN0UGF0aCxcbiAgb21pdCxcbiAgcGFyc2VOYW1lLFxufSBmcm9tICdAbmdyeC9zY2hlbWF0aWNzL3NjaGVtYXRpY3MtY29yZSc7XG5pbXBvcnQgeyBTY2hlbWEgYXMgQ29udGFpbmVyT3B0aW9ucyB9IGZyb20gJy4vc2NoZW1hJztcblxuZnVuY3Rpb24gYWRkU3RhdGVUb0NvbXBvbmVudChvcHRpb25zOiBQYXJ0aWFsPENvbnRhaW5lck9wdGlvbnM+KSB7XG4gIHJldHVybiAoaG9zdDogVHJlZSkgPT4ge1xuICAgIGlmICghb3B0aW9ucy5zdGF0ZSAmJiAhb3B0aW9ucy5zdGF0ZUludGVyZmFjZSkge1xuICAgICAgcmV0dXJuIGhvc3Q7XG4gICAgfVxuXG4gICAgY29uc3Qgc3RhdGVQYXRoID0gYC8ke29wdGlvbnMucGF0aH0vJHtvcHRpb25zLnN0YXRlfWA7XG5cbiAgICBpZiAob3B0aW9ucy5zdGF0ZSkge1xuICAgICAgaWYgKCFob3N0LmV4aXN0cyhzdGF0ZVBhdGgpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgVGhlIFNwZWNpZmllZCBzdGF0ZSBwYXRoICR7c3RhdGVQYXRofSBkb2VzIG5vdCBleGlzdGApO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGNvbXBvbmVudFBhdGggPVxuICAgICAgYC8ke29wdGlvbnMucGF0aH0vYCArXG4gICAgICAob3B0aW9ucy5mbGF0ID8gJycgOiBzdHJpbmdVdGlscy5kYXNoZXJpemUob3B0aW9ucy5uYW1lKSArICcvJykgK1xuICAgICAgc3RyaW5nVXRpbHMuZGFzaGVyaXplKG9wdGlvbnMubmFtZSkgK1xuICAgICAgJy5jb21wb25lbnQudHMnO1xuXG4gICAgY29uc3QgdGV4dCA9IGhvc3QucmVhZChjb21wb25lbnRQYXRoKTtcblxuICAgIGlmICh0ZXh0ID09PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgU2NoZW1hdGljc0V4Y2VwdGlvbihgRmlsZSAke2NvbXBvbmVudFBhdGh9IGRvZXMgbm90IGV4aXN0LmApO1xuICAgIH1cblxuICAgIGNvbnN0IHNvdXJjZVRleHQgPSB0ZXh0LnRvU3RyaW5nKCd1dGYtOCcpO1xuXG4gICAgY29uc3Qgc291cmNlID0gdHMuY3JlYXRlU291cmNlRmlsZShcbiAgICAgIGNvbXBvbmVudFBhdGgsXG4gICAgICBzb3VyY2VUZXh0LFxuICAgICAgdHMuU2NyaXB0VGFyZ2V0LkxhdGVzdCxcbiAgICAgIHRydWVcbiAgICApO1xuXG4gICAgY29uc3Qgc3RhdGVJbXBvcnRQYXRoID0gYnVpbGRSZWxhdGl2ZVBhdGgoY29tcG9uZW50UGF0aCwgc3RhdGVQYXRoKTtcbiAgICBjb25zdCBzdG9yZUltcG9ydCA9IGluc2VydEltcG9ydChcbiAgICAgIHNvdXJjZSxcbiAgICAgIGNvbXBvbmVudFBhdGgsXG4gICAgICAnU3RvcmUnLFxuICAgICAgJ0BuZ3J4L3N0b3JlJ1xuICAgICk7XG4gICAgY29uc3Qgc3RhdGVJbXBvcnQgPSBvcHRpb25zLnN0YXRlXG4gICAgICA/IGluc2VydEltcG9ydChcbiAgICAgICAgICBzb3VyY2UsXG4gICAgICAgICAgY29tcG9uZW50UGF0aCxcbiAgICAgICAgICBgKiBhcyBmcm9tU3RvcmVgLFxuICAgICAgICAgIHN0YXRlSW1wb3J0UGF0aCxcbiAgICAgICAgICB0cnVlXG4gICAgICAgIClcbiAgICAgIDogbmV3IE5vb3BDaGFuZ2UoKTtcblxuICAgIGNvbnN0IGNvbXBvbmVudENsYXNzID0gc291cmNlLnN0YXRlbWVudHMuZmluZChcbiAgICAgIHN0bSA9PiBzdG0ua2luZCA9PT0gdHMuU3ludGF4S2luZC5DbGFzc0RlY2xhcmF0aW9uXG4gICAgKTtcbiAgICBjb25zdCBjb21wb25lbnQgPSBjb21wb25lbnRDbGFzcyBhcyB0cy5DbGFzc0RlY2xhcmF0aW9uO1xuICAgIGNvbnN0IGNvbXBvbmVudENvbnN0cnVjdG9yID0gY29tcG9uZW50Lm1lbWJlcnMuZmluZChcbiAgICAgIG1lbWJlciA9PiBtZW1iZXIua2luZCA9PT0gdHMuU3ludGF4S2luZC5Db25zdHJ1Y3RvclxuICAgICk7XG4gICAgY29uc3QgY21wQ3RyID0gY29tcG9uZW50Q29uc3RydWN0b3IgYXMgdHMuQ29uc3RydWN0b3JEZWNsYXJhdGlvbjtcbiAgICBjb25zdCB7IHBvcyB9ID0gY21wQ3RyO1xuICAgIGNvbnN0IHN0YXRlVHlwZSA9IG9wdGlvbnMuc3RhdGVcbiAgICAgID8gYGZyb21TdG9yZS4ke29wdGlvbnMuc3RhdGVJbnRlcmZhY2V9YFxuICAgICAgOiAnYW55JztcbiAgICBjb25zdCBjb25zdHJ1Y3RvclRleHQgPSBjbXBDdHIuZ2V0VGV4dCgpO1xuICAgIGNvbnN0IFtzdGFydCwgZW5kXSA9IGNvbnN0cnVjdG9yVGV4dC5zcGxpdCgnKCknKTtcbiAgICBjb25zdCBzdG9yZVRleHQgPSBgcHJpdmF0ZSBzdG9yZTogU3RvcmU8JHtzdGF0ZVR5cGV9PmA7XG4gICAgY29uc3Qgc3RvcmVDb25zdHJ1Y3RvciA9IFtzdGFydCwgYCgke3N0b3JlVGV4dH0pYCwgZW5kXS5qb2luKCcnKTtcbiAgICBjb25zdCBjb25zdHJ1Y3RvclVwZGF0ZSA9IG5ldyBSZXBsYWNlQ2hhbmdlKFxuICAgICAgY29tcG9uZW50UGF0aCxcbiAgICAgIHBvcyxcbiAgICAgIGAgICR7Y29uc3RydWN0b3JUZXh0fVxcblxcbmAsXG4gICAgICBgXFxuXFxuICAke3N0b3JlQ29uc3RydWN0b3J9YFxuICAgICk7XG5cbiAgICBjb25zdCBjaGFuZ2VzID0gW3N0b3JlSW1wb3J0LCBzdGF0ZUltcG9ydCwgY29uc3RydWN0b3JVcGRhdGVdO1xuICAgIGNvbnN0IHJlY29yZGVyID0gaG9zdC5iZWdpblVwZGF0ZShjb21wb25lbnRQYXRoKTtcblxuICAgIGZvciAoY29uc3QgY2hhbmdlIG9mIGNoYW5nZXMpIHtcbiAgICAgIGlmIChjaGFuZ2UgaW5zdGFuY2VvZiBJbnNlcnRDaGFuZ2UpIHtcbiAgICAgICAgcmVjb3JkZXIuaW5zZXJ0TGVmdChjaGFuZ2UucG9zLCBjaGFuZ2UudG9BZGQpO1xuICAgICAgfSBlbHNlIGlmIChjaGFuZ2UgaW5zdGFuY2VvZiBSZXBsYWNlQ2hhbmdlKSB7XG4gICAgICAgIHJlY29yZGVyLnJlbW92ZShwb3MsIGNoYW5nZS5vbGRUZXh0Lmxlbmd0aCk7XG4gICAgICAgIHJlY29yZGVyLmluc2VydExlZnQoY2hhbmdlLm9yZGVyLCBjaGFuZ2UubmV3VGV4dCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaG9zdC5jb21taXRVcGRhdGUocmVjb3JkZXIpO1xuXG4gICAgcmV0dXJuIGhvc3Q7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG9wdGlvbnM6IENvbnRhaW5lck9wdGlvbnMpOiBSdWxlIHtcbiAgcmV0dXJuIChob3N0OiBUcmVlLCBjb250ZXh0OiBTY2hlbWF0aWNDb250ZXh0KSA9PiB7XG4gICAgb3B0aW9ucy5wYXRoID0gZ2V0UHJvamVjdFBhdGgoaG9zdCwgb3B0aW9ucyk7XG5cbiAgICBjb25zdCBwYXJzZWRQYXRoID0gcGFyc2VOYW1lKG9wdGlvbnMucGF0aCwgb3B0aW9ucy5uYW1lKTtcbiAgICBvcHRpb25zLm5hbWUgPSBwYXJzZWRQYXRoLm5hbWU7XG4gICAgb3B0aW9ucy5wYXRoID0gcGFyc2VkUGF0aC5wYXRoO1xuXG4gICAgY29uc3Qgb3B0cyA9IFsnc3RhdGUnLCAnc3RhdGVJbnRlcmZhY2UnXS5yZWR1Y2UoXG4gICAgICAoY3VycmVudDogUGFydGlhbDxDb250YWluZXJPcHRpb25zPiwga2V5KSA9PiB7XG4gICAgICAgIHJldHVybiBvbWl0KGN1cnJlbnQsIGtleSBhcyBhbnkpO1xuICAgICAgfSxcbiAgICAgIG9wdGlvbnNcbiAgICApO1xuXG4gICAgY29uc3QgdGVtcGxhdGVTb3VyY2UgPSBhcHBseShcbiAgICAgIHVybChvcHRpb25zLnRlc3REZXB0aCA9PT0gJ3VuaXQnID8gJy4vZmlsZXMnIDogJy4vaW50ZWdyYXRpb24tZmlsZXMnKSxcbiAgICAgIFtcbiAgICAgICAgb3B0aW9ucy5za2lwVGVzdFxuICAgICAgICAgID8gZmlsdGVyKHBhdGggPT4gIXBhdGguZW5kc1dpdGgoJy5zcGVjLnRzLnRlbXBsYXRlJykpXG4gICAgICAgICAgOiBub29wKCksXG4gICAgICAgIGFwcGx5VGVtcGxhdGVzKHtcbiAgICAgICAgICAnaWYtZmxhdCc6IChzOiBzdHJpbmcpID0+IChvcHRpb25zLmZsYXQgPyAnJyA6IHMpLFxuICAgICAgICAgIC4uLnN0cmluZ1V0aWxzLFxuICAgICAgICAgIC4uLihvcHRpb25zIGFzIG9iamVjdCksXG4gICAgICAgIH0gYXMgYW55KSxcbiAgICAgICAgbW92ZShwYXJzZWRQYXRoLnBhdGgpLFxuICAgICAgXVxuICAgICk7XG5cbiAgICAvLyBSZW1vdmUgYWxsIHVuZGVmaW5lZCB2YWx1ZXMgdG8gdXNlIHRoZSBzY2hlbWF0aWMgZGVmYXVsdHMgKGluIGFuZ3VsYXIuanNvbiBvciB0aGUgQW5ndWxhciBzY2hlbWEpXG4gICAgKE9iamVjdC5rZXlzKG9wdHMpIGFzIChrZXlvZiBDb250YWluZXJPcHRpb25zKVtdKS5mb3JFYWNoKFxuICAgICAga2V5ID0+IChvcHRzW2tleV0gPT09IHVuZGVmaW5lZCA/IGRlbGV0ZSBvcHRzW2tleV0gOiB7fSlcbiAgICApO1xuXG4gICAgcmV0dXJuIGNoYWluKFtcbiAgICAgIGV4dGVybmFsU2NoZW1hdGljKCdAc2NoZW1hdGljcy9hbmd1bGFyJywgJ2NvbXBvbmVudCcsIHtcbiAgICAgICAgLi4ub3B0cyxcbiAgICAgICAgc2tpcFRlc3RzOiB0cnVlLFxuICAgICAgfSksXG4gICAgICBhZGRTdGF0ZVRvQ29tcG9uZW50KG9wdGlvbnMpLFxuICAgICAgbWVyZ2VXaXRoKHRlbXBsYXRlU291cmNlKSxcbiAgICBdKShob3N0LCBjb250ZXh0KTtcbiAgfTtcbn1cbiJdfQ==