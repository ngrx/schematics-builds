(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@ngrx/schematics/src/effect/index", ["require", "exports", "@angular-devkit/schematics", "@ngrx/schematics/schematics-core", "typescript"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const schematics_1 = require("@angular-devkit/schematics");
    const schematics_core_1 = require("@ngrx/schematics/schematics-core");
    const ts = require("typescript");
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
            const effectsName = `${schematics_core_1.stringUtils.classify(`${options.name}Effects`)}`;
            const effectsModuleImport = schematics_core_1.insertImport(source, modulePath, 'EffectsModule', '@ngrx/effects');
            const effectsPath = `/${options.path}/` +
                (options.flat ? '' : schematics_core_1.stringUtils.dasherize(options.name) + '/') +
                (options.group ? 'effects/' : '') +
                schematics_core_1.stringUtils.dasherize(options.name) +
                '.effects';
            const relativePath = schematics_core_1.buildRelativePath(modulePath, effectsPath);
            const effectsImport = schematics_core_1.insertImport(source, modulePath, effectsName, relativePath);
            const [effectsNgModuleImport] = schematics_core_1.addImportToModule(source, modulePath, `EffectsModule.for${options.root ? 'Root' : 'Feature'}([${effectsName}])`, relativePath);
            const changes = [effectsModuleImport, effectsImport, effectsNgModuleImport];
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
    function getEffectMethod(effectCreators) {
        return effectCreators ? 'createEffect' : 'Effect';
    }
    function getEffectStart(name, effectCreators) {
        const effectName = schematics_core_1.stringUtils.classify(name);
        return effectCreators
            ? `load${effectName}s$ = createEffect(() => this.actions$.pipe(`
            : '@Effect()\n' + `  load${effectName}s$ = this.actions$.pipe(`;
    }
    function getEffectEnd(effectCreators) {
        return effectCreators ? '));' : ');';
    }
    function default_1(options) {
        return (host, context) => {
            options.path = schematics_core_1.getProjectPath(host, options);
            if (options.module) {
                options.module = schematics_core_1.findModuleFromOptions(host, options);
            }
            const parsedPath = schematics_core_1.parseName(options.path, options.name);
            options.name = parsedPath.name;
            options.path = parsedPath.path;
            const templateSource = schematics_1.apply(schematics_1.url('./files'), [
                options.spec
                    ? schematics_1.noop()
                    : schematics_1.filter(path => !path.endsWith('.spec.ts.template')),
                schematics_1.applyTemplates(Object.assign({}, schematics_core_1.stringUtils, { 'if-flat': (s) => schematics_core_1.stringUtils.group(options.flat ? '' : s, options.group ? 'effects' : ''), effectMethod: getEffectMethod(options.effectCreators), effectStart: getEffectStart(options.name, options.effectCreators), effectEnd: getEffectEnd(options.effectCreators) }, options)),
                schematics_1.move(parsedPath.path),
            ]);
            return schematics_1.chain([
                schematics_1.branchAndMerge(schematics_1.chain([addImportToNgModule(options), schematics_1.mergeWith(templateSource)])),
            ])(host, context);
        };
    }
    exports.default = default_1;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3NjaGVtYXRpY3Mvc3JjL2VmZmVjdC9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztJQUFBLDJEQWVvQztJQUNwQyxzRUFTMEM7SUFDMUMsaUNBQWlDO0lBR2pDLFNBQVMsbUJBQW1CLENBQUMsT0FBc0I7UUFDakQsT0FBTyxDQUFDLElBQVUsRUFBRSxFQUFFO1lBQ3BCLE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7WUFFbEMsSUFBSSxDQUFDLFVBQVUsRUFBRTtnQkFDZixPQUFPLElBQUksQ0FBQzthQUNiO1lBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUU7Z0JBQzVCLE1BQU0sSUFBSSxLQUFLLENBQUMseUJBQXlCLFVBQVUsaUJBQWlCLENBQUMsQ0FBQzthQUN2RTtZQUVELE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDbkMsSUFBSSxJQUFJLEtBQUssSUFBSSxFQUFFO2dCQUNqQixNQUFNLElBQUksZ0NBQW1CLENBQUMsUUFBUSxVQUFVLGtCQUFrQixDQUFDLENBQUM7YUFDckU7WUFDRCxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBRTFDLE1BQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FDaEMsVUFBVSxFQUNWLFVBQVUsRUFDVixFQUFFLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFDdEIsSUFBSSxDQUNMLENBQUM7WUFFRixNQUFNLFdBQVcsR0FBRyxHQUFHLDZCQUFXLENBQUMsUUFBUSxDQUFDLEdBQUcsT0FBTyxDQUFDLElBQUksU0FBUyxDQUFDLEVBQUUsQ0FBQztZQUV4RSxNQUFNLG1CQUFtQixHQUFHLDhCQUFZLENBQ3RDLE1BQU0sRUFDTixVQUFVLEVBQ1YsZUFBZSxFQUNmLGVBQWUsQ0FDaEIsQ0FBQztZQUVGLE1BQU0sV0FBVyxHQUNmLElBQUksT0FBTyxDQUFDLElBQUksR0FBRztnQkFDbkIsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLDZCQUFXLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUM7Z0JBQy9ELENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7Z0JBQ2pDLDZCQUFXLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7Z0JBQ25DLFVBQVUsQ0FBQztZQUNiLE1BQU0sWUFBWSxHQUFHLG1DQUFpQixDQUFDLFVBQVUsRUFBRSxXQUFXLENBQUMsQ0FBQztZQUNoRSxNQUFNLGFBQWEsR0FBRyw4QkFBWSxDQUNoQyxNQUFNLEVBQ04sVUFBVSxFQUNWLFdBQVcsRUFDWCxZQUFZLENBQ2IsQ0FBQztZQUNGLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxHQUFHLG1DQUFpQixDQUMvQyxNQUFNLEVBQ04sVUFBVSxFQUNWLG9CQUFvQixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFNBQVMsS0FBSyxXQUFXLElBQUksRUFDekUsWUFBWSxDQUNiLENBQUM7WUFDRixNQUFNLE9BQU8sR0FBRyxDQUFDLG1CQUFtQixFQUFFLGFBQWEsRUFBRSxxQkFBcUIsQ0FBQyxDQUFDO1lBQzVFLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDOUMsS0FBSyxNQUFNLE1BQU0sSUFBSSxPQUFPLEVBQUU7Z0JBQzVCLElBQUksTUFBTSxZQUFZLDhCQUFZLEVBQUU7b0JBQ2xDLFFBQVEsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQy9DO2FBQ0Y7WUFDRCxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBRTVCLE9BQU8sSUFBSSxDQUFDO1FBQ2QsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVELFNBQVMsZUFBZSxDQUFDLGNBQXdCO1FBQy9DLE9BQU8sY0FBYyxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQztJQUNwRCxDQUFDO0lBRUQsU0FBUyxjQUFjLENBQUMsSUFBWSxFQUFFLGNBQXdCO1FBQzVELE1BQU0sVUFBVSxHQUFHLDZCQUFXLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzlDLE9BQU8sY0FBYztZQUNuQixDQUFDLENBQUMsT0FBTyxVQUFVLDZDQUE2QztZQUNoRSxDQUFDLENBQUMsYUFBYSxHQUFHLFNBQVMsVUFBVSwwQkFBMEIsQ0FBQztJQUNwRSxDQUFDO0lBRUQsU0FBUyxZQUFZLENBQUMsY0FBd0I7UUFDNUMsT0FBTyxjQUFjLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQ3ZDLENBQUM7SUFFRCxtQkFBd0IsT0FBc0I7UUFDNUMsT0FBTyxDQUFDLElBQVUsRUFBRSxPQUF5QixFQUFFLEVBQUU7WUFDL0MsT0FBTyxDQUFDLElBQUksR0FBRyxnQ0FBYyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztZQUU3QyxJQUFJLE9BQU8sQ0FBQyxNQUFNLEVBQUU7Z0JBQ2xCLE9BQU8sQ0FBQyxNQUFNLEdBQUcsdUNBQXFCLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO2FBQ3ZEO1lBRUQsTUFBTSxVQUFVLEdBQUcsMkJBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN6RCxPQUFPLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUM7WUFDL0IsT0FBTyxDQUFDLElBQUksR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDO1lBRS9CLE1BQU0sY0FBYyxHQUFHLGtCQUFLLENBQUMsZ0JBQUcsQ0FBQyxTQUFTLENBQUMsRUFBRTtnQkFDM0MsT0FBTyxDQUFDLElBQUk7b0JBQ1YsQ0FBQyxDQUFDLGlCQUFJLEVBQUU7b0JBQ1IsQ0FBQyxDQUFDLG1CQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUMsQ0FBQztnQkFDdkQsMkJBQWMsQ0FBQyxrQkFDViw2QkFBVyxJQUNkLFNBQVMsRUFBRSxDQUFDLENBQVMsRUFBRSxFQUFFLENBQ3ZCLDZCQUFXLENBQUMsS0FBSyxDQUNmLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUNyQixPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FDL0IsRUFDSCxZQUFZLEVBQUUsZUFBZSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsRUFDckQsV0FBVyxFQUFFLGNBQWMsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxjQUFjLENBQUMsRUFDakUsU0FBUyxFQUFFLFlBQVksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLElBQzNDLE9BQWtCLENBQ2hCLENBQUM7Z0JBQ1QsaUJBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDO2FBQ3RCLENBQUMsQ0FBQztZQUVILE9BQU8sa0JBQUssQ0FBQztnQkFDWCwyQkFBYyxDQUNaLGtCQUFLLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsRUFBRSxzQkFBUyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FDakU7YUFDRixDQUFDLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3BCLENBQUMsQ0FBQztJQUNKLENBQUM7SUFyQ0QsNEJBcUNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgUnVsZSxcbiAgU2NoZW1hdGljQ29udGV4dCxcbiAgU2NoZW1hdGljc0V4Y2VwdGlvbixcbiAgVHJlZSxcbiAgYXBwbHksXG4gIGFwcGx5VGVtcGxhdGVzLFxuICBicmFuY2hBbmRNZXJnZSxcbiAgY2hhaW4sXG4gIGZpbHRlcixcbiAgbWVyZ2VXaXRoLFxuICBtb3ZlLFxuICBub29wLFxuICB0ZW1wbGF0ZSxcbiAgdXJsLFxufSBmcm9tICdAYW5ndWxhci1kZXZraXQvc2NoZW1hdGljcyc7XG5pbXBvcnQge1xuICBJbnNlcnRDaGFuZ2UsXG4gIGFkZEltcG9ydFRvTW9kdWxlLFxuICBidWlsZFJlbGF0aXZlUGF0aCxcbiAgZmluZE1vZHVsZUZyb21PcHRpb25zLFxuICBnZXRQcm9qZWN0UGF0aCxcbiAgaW5zZXJ0SW1wb3J0LFxuICBwYXJzZU5hbWUsXG4gIHN0cmluZ1V0aWxzLFxufSBmcm9tICdAbmdyeC9zY2hlbWF0aWNzL3NjaGVtYXRpY3MtY29yZSc7XG5pbXBvcnQgKiBhcyB0cyBmcm9tICd0eXBlc2NyaXB0JztcbmltcG9ydCB7IFNjaGVtYSBhcyBFZmZlY3RPcHRpb25zIH0gZnJvbSAnLi9zY2hlbWEnO1xuXG5mdW5jdGlvbiBhZGRJbXBvcnRUb05nTW9kdWxlKG9wdGlvbnM6IEVmZmVjdE9wdGlvbnMpOiBSdWxlIHtcbiAgcmV0dXJuIChob3N0OiBUcmVlKSA9PiB7XG4gICAgY29uc3QgbW9kdWxlUGF0aCA9IG9wdGlvbnMubW9kdWxlO1xuXG4gICAgaWYgKCFtb2R1bGVQYXRoKSB7XG4gICAgICByZXR1cm4gaG9zdDtcbiAgICB9XG5cbiAgICBpZiAoIWhvc3QuZXhpc3RzKG1vZHVsZVBhdGgpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFNwZWNpZmllZCBtb2R1bGUgcGF0aCAke21vZHVsZVBhdGh9IGRvZXMgbm90IGV4aXN0YCk7XG4gICAgfVxuXG4gICAgY29uc3QgdGV4dCA9IGhvc3QucmVhZChtb2R1bGVQYXRoKTtcbiAgICBpZiAodGV4dCA9PT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IFNjaGVtYXRpY3NFeGNlcHRpb24oYEZpbGUgJHttb2R1bGVQYXRofSBkb2VzIG5vdCBleGlzdC5gKTtcbiAgICB9XG4gICAgY29uc3Qgc291cmNlVGV4dCA9IHRleHQudG9TdHJpbmcoJ3V0Zi04Jyk7XG5cbiAgICBjb25zdCBzb3VyY2UgPSB0cy5jcmVhdGVTb3VyY2VGaWxlKFxuICAgICAgbW9kdWxlUGF0aCxcbiAgICAgIHNvdXJjZVRleHQsXG4gICAgICB0cy5TY3JpcHRUYXJnZXQuTGF0ZXN0LFxuICAgICAgdHJ1ZVxuICAgICk7XG5cbiAgICBjb25zdCBlZmZlY3RzTmFtZSA9IGAke3N0cmluZ1V0aWxzLmNsYXNzaWZ5KGAke29wdGlvbnMubmFtZX1FZmZlY3RzYCl9YDtcblxuICAgIGNvbnN0IGVmZmVjdHNNb2R1bGVJbXBvcnQgPSBpbnNlcnRJbXBvcnQoXG4gICAgICBzb3VyY2UsXG4gICAgICBtb2R1bGVQYXRoLFxuICAgICAgJ0VmZmVjdHNNb2R1bGUnLFxuICAgICAgJ0BuZ3J4L2VmZmVjdHMnXG4gICAgKTtcblxuICAgIGNvbnN0IGVmZmVjdHNQYXRoID1cbiAgICAgIGAvJHtvcHRpb25zLnBhdGh9L2AgK1xuICAgICAgKG9wdGlvbnMuZmxhdCA/ICcnIDogc3RyaW5nVXRpbHMuZGFzaGVyaXplKG9wdGlvbnMubmFtZSkgKyAnLycpICtcbiAgICAgIChvcHRpb25zLmdyb3VwID8gJ2VmZmVjdHMvJyA6ICcnKSArXG4gICAgICBzdHJpbmdVdGlscy5kYXNoZXJpemUob3B0aW9ucy5uYW1lKSArXG4gICAgICAnLmVmZmVjdHMnO1xuICAgIGNvbnN0IHJlbGF0aXZlUGF0aCA9IGJ1aWxkUmVsYXRpdmVQYXRoKG1vZHVsZVBhdGgsIGVmZmVjdHNQYXRoKTtcbiAgICBjb25zdCBlZmZlY3RzSW1wb3J0ID0gaW5zZXJ0SW1wb3J0KFxuICAgICAgc291cmNlLFxuICAgICAgbW9kdWxlUGF0aCxcbiAgICAgIGVmZmVjdHNOYW1lLFxuICAgICAgcmVsYXRpdmVQYXRoXG4gICAgKTtcbiAgICBjb25zdCBbZWZmZWN0c05nTW9kdWxlSW1wb3J0XSA9IGFkZEltcG9ydFRvTW9kdWxlKFxuICAgICAgc291cmNlLFxuICAgICAgbW9kdWxlUGF0aCxcbiAgICAgIGBFZmZlY3RzTW9kdWxlLmZvciR7b3B0aW9ucy5yb290ID8gJ1Jvb3QnIDogJ0ZlYXR1cmUnfShbJHtlZmZlY3RzTmFtZX1dKWAsXG4gICAgICByZWxhdGl2ZVBhdGhcbiAgICApO1xuICAgIGNvbnN0IGNoYW5nZXMgPSBbZWZmZWN0c01vZHVsZUltcG9ydCwgZWZmZWN0c0ltcG9ydCwgZWZmZWN0c05nTW9kdWxlSW1wb3J0XTtcbiAgICBjb25zdCByZWNvcmRlciA9IGhvc3QuYmVnaW5VcGRhdGUobW9kdWxlUGF0aCk7XG4gICAgZm9yIChjb25zdCBjaGFuZ2Ugb2YgY2hhbmdlcykge1xuICAgICAgaWYgKGNoYW5nZSBpbnN0YW5jZW9mIEluc2VydENoYW5nZSkge1xuICAgICAgICByZWNvcmRlci5pbnNlcnRMZWZ0KGNoYW5nZS5wb3MsIGNoYW5nZS50b0FkZCk7XG4gICAgICB9XG4gICAgfVxuICAgIGhvc3QuY29tbWl0VXBkYXRlKHJlY29yZGVyKTtcblxuICAgIHJldHVybiBob3N0O1xuICB9O1xufVxuXG5mdW5jdGlvbiBnZXRFZmZlY3RNZXRob2QoZWZmZWN0Q3JlYXRvcnM/OiBib29sZWFuKSB7XG4gIHJldHVybiBlZmZlY3RDcmVhdG9ycyA/ICdjcmVhdGVFZmZlY3QnIDogJ0VmZmVjdCc7XG59XG5cbmZ1bmN0aW9uIGdldEVmZmVjdFN0YXJ0KG5hbWU6IHN0cmluZywgZWZmZWN0Q3JlYXRvcnM/OiBib29sZWFuKTogc3RyaW5nIHtcbiAgY29uc3QgZWZmZWN0TmFtZSA9IHN0cmluZ1V0aWxzLmNsYXNzaWZ5KG5hbWUpO1xuICByZXR1cm4gZWZmZWN0Q3JlYXRvcnNcbiAgICA/IGBsb2FkJHtlZmZlY3ROYW1lfXMkID0gY3JlYXRlRWZmZWN0KCgpID0+IHRoaXMuYWN0aW9ucyQucGlwZShgXG4gICAgOiAnQEVmZmVjdCgpXFxuJyArIGAgIGxvYWQke2VmZmVjdE5hbWV9cyQgPSB0aGlzLmFjdGlvbnMkLnBpcGUoYDtcbn1cblxuZnVuY3Rpb24gZ2V0RWZmZWN0RW5kKGVmZmVjdENyZWF0b3JzPzogYm9vbGVhbikge1xuICByZXR1cm4gZWZmZWN0Q3JlYXRvcnMgPyAnKSk7JyA6ICcpOyc7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG9wdGlvbnM6IEVmZmVjdE9wdGlvbnMpOiBSdWxlIHtcbiAgcmV0dXJuIChob3N0OiBUcmVlLCBjb250ZXh0OiBTY2hlbWF0aWNDb250ZXh0KSA9PiB7XG4gICAgb3B0aW9ucy5wYXRoID0gZ2V0UHJvamVjdFBhdGgoaG9zdCwgb3B0aW9ucyk7XG5cbiAgICBpZiAob3B0aW9ucy5tb2R1bGUpIHtcbiAgICAgIG9wdGlvbnMubW9kdWxlID0gZmluZE1vZHVsZUZyb21PcHRpb25zKGhvc3QsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIGNvbnN0IHBhcnNlZFBhdGggPSBwYXJzZU5hbWUob3B0aW9ucy5wYXRoLCBvcHRpb25zLm5hbWUpO1xuICAgIG9wdGlvbnMubmFtZSA9IHBhcnNlZFBhdGgubmFtZTtcbiAgICBvcHRpb25zLnBhdGggPSBwYXJzZWRQYXRoLnBhdGg7XG5cbiAgICBjb25zdCB0ZW1wbGF0ZVNvdXJjZSA9IGFwcGx5KHVybCgnLi9maWxlcycpLCBbXG4gICAgICBvcHRpb25zLnNwZWNcbiAgICAgICAgPyBub29wKClcbiAgICAgICAgOiBmaWx0ZXIocGF0aCA9PiAhcGF0aC5lbmRzV2l0aCgnLnNwZWMudHMudGVtcGxhdGUnKSksXG4gICAgICBhcHBseVRlbXBsYXRlcyh7XG4gICAgICAgIC4uLnN0cmluZ1V0aWxzLFxuICAgICAgICAnaWYtZmxhdCc6IChzOiBzdHJpbmcpID0+XG4gICAgICAgICAgc3RyaW5nVXRpbHMuZ3JvdXAoXG4gICAgICAgICAgICBvcHRpb25zLmZsYXQgPyAnJyA6IHMsXG4gICAgICAgICAgICBvcHRpb25zLmdyb3VwID8gJ2VmZmVjdHMnIDogJydcbiAgICAgICAgICApLFxuICAgICAgICBlZmZlY3RNZXRob2Q6IGdldEVmZmVjdE1ldGhvZChvcHRpb25zLmVmZmVjdENyZWF0b3JzKSxcbiAgICAgICAgZWZmZWN0U3RhcnQ6IGdldEVmZmVjdFN0YXJ0KG9wdGlvbnMubmFtZSwgb3B0aW9ucy5lZmZlY3RDcmVhdG9ycyksXG4gICAgICAgIGVmZmVjdEVuZDogZ2V0RWZmZWN0RW5kKG9wdGlvbnMuZWZmZWN0Q3JlYXRvcnMpLFxuICAgICAgICAuLi4ob3B0aW9ucyBhcyBvYmplY3QpLFxuICAgICAgfSBhcyBhbnkpLFxuICAgICAgbW92ZShwYXJzZWRQYXRoLnBhdGgpLFxuICAgIF0pO1xuXG4gICAgcmV0dXJuIGNoYWluKFtcbiAgICAgIGJyYW5jaEFuZE1lcmdlKFxuICAgICAgICBjaGFpbihbYWRkSW1wb3J0VG9OZ01vZHVsZShvcHRpb25zKSwgbWVyZ2VXaXRoKHRlbXBsYXRlU291cmNlKV0pXG4gICAgICApLFxuICAgIF0pKGhvc3QsIGNvbnRleHQpO1xuICB9O1xufVxuIl19