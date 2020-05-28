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
            const constructorText = cmpCtr.getText();
            const [start, end] = constructorText.split('()');
            const storeConstructor = [start, `(private store: Store)`, end].join('');
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
            if (!options.skipTests && options.skipTest) {
                options.skipTests = options.skipTest;
            }
            const parsedPath = schematics_core_1.parseName(options.path, options.name);
            options.name = parsedPath.name;
            options.path = parsedPath.path;
            const opts = ['state', 'stateInterface'].reduce((current, key) => {
                return schematics_core_1.omit(current, key);
            }, options);
            const templateSource = schematics_1.apply(schematics_1.url(options.testDepth === 'unit' ? './files' : './integration-files'), [
                options.skipTests
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3NjaGVtYXRpY3Mvc3JjL2NvbnRhaW5lci9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztJQUFBLDJEQWdCb0M7SUFDcEMsaUNBQWlDO0lBQ2pDLHNFQVUwQztJQUcxQyxTQUFTLG1CQUFtQixDQUFDLE9BQWtDO1FBQzdELE9BQU8sQ0FBQyxJQUFVLEVBQUUsRUFBRTtZQUNwQixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLEVBQUU7Z0JBQzdDLE9BQU8sSUFBSSxDQUFDO2FBQ2I7WUFFRCxNQUFNLFNBQVMsR0FBRyxJQUFJLE9BQU8sQ0FBQyxJQUFJLElBQUksT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBRXRELElBQUksT0FBTyxDQUFDLEtBQUssRUFBRTtnQkFDakIsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEVBQUU7b0JBQzNCLE1BQU0sSUFBSSxLQUFLLENBQUMsNEJBQTRCLFNBQVMsaUJBQWlCLENBQUMsQ0FBQztpQkFDekU7YUFDRjtZQUVELE1BQU0sYUFBYSxHQUNqQixJQUFJLE9BQU8sQ0FBQyxJQUFJLEdBQUc7Z0JBQ25CLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyw2QkFBVyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDO2dCQUMvRCw2QkFBVyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO2dCQUNuQyxlQUFlLENBQUM7WUFFbEIsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUV0QyxJQUFJLElBQUksS0FBSyxJQUFJLEVBQUU7Z0JBQ2pCLE1BQU0sSUFBSSxn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Q0FDaEIsQ0FBQztnQkFDVCxpQkFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUM7YUFDdEIsQ0FDRixDQUFDO1lBRUYsb0dBQW9HO1lBQ25HLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFnQyxDQUFDLE9BQU8sQ0FDdkQsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FDekQsQ0FBQztZQUVGLE9BQU8sa0JBQUssQ0FBQztnQkFDWCw4QkFBaUIsQ0FBQyxxQkFBcUIsRUFBRSxXQUFXLGtDQUMvQyxJQUFJLEtBQ1AsU0FBUyxFQUFFLElBQUksSUFDZjtnQkFDRixtQkFBbUIsQ0FBQyxPQUFPLENBQUM7Z0JBQzVCLHNCQUFTLENBQUMsY0FBYyxDQUFDO2FBQzFCLENBQUMsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDcEIsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQWhERCw0QkFnREMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBSdWxlLFxuICBTY2hlbWF0aWNDb250ZXh0LFxuICBTY2hlbWF0aWNzRXhjZXB0aW9uLFxuICBUcmVlLFxuICBjaGFpbixcbiAgZXh0ZXJuYWxTY2hlbWF0aWMsXG4gIGFwcGx5LFxuICBhcHBseVRlbXBsYXRlcyxcbiAgdXJsLFxuICBub29wLFxuICBmaWx0ZXIsXG4gIHRlbXBsYXRlLFxuICBtb3ZlLFxuICBtZXJnZVdpdGgsXG4gIE1lcmdlU3RyYXRlZ3ksXG59IGZyb20gJ0Bhbmd1bGFyLWRldmtpdC9zY2hlbWF0aWNzJztcbmltcG9ydCAqIGFzIHRzIGZyb20gJ3R5cGVzY3JpcHQnO1xuaW1wb3J0IHtcbiAgc3RyaW5nVXRpbHMsXG4gIGJ1aWxkUmVsYXRpdmVQYXRoLFxuICBpbnNlcnRJbXBvcnQsXG4gIE5vb3BDaGFuZ2UsXG4gIFJlcGxhY2VDaGFuZ2UsXG4gIEluc2VydENoYW5nZSxcbiAgZ2V0UHJvamVjdFBhdGgsXG4gIG9taXQsXG4gIHBhcnNlTmFtZSxcbn0gZnJvbSAnQG5ncngvc2NoZW1hdGljcy9zY2hlbWF0aWNzLWNvcmUnO1xuaW1wb3J0IHsgU2NoZW1hIGFzIENvbnRhaW5lck9wdGlvbnMgfSBmcm9tICcuL3NjaGVtYSc7XG5cbmZ1bmN0aW9uIGFkZFN0YXRlVG9Db21wb25lbnQob3B0aW9uczogUGFydGlhbDxDb250YWluZXJPcHRpb25zPikge1xuICByZXR1cm4gKGhvc3Q6IFRyZWUpID0+IHtcbiAgICBpZiAoIW9wdGlvbnMuc3RhdGUgJiYgIW9wdGlvbnMuc3RhdGVJbnRlcmZhY2UpIHtcbiAgICAgIHJldHVybiBob3N0O1xuICAgIH1cblxuICAgIGNvbnN0IHN0YXRlUGF0aCA9IGAvJHtvcHRpb25zLnBhdGh9LyR7b3B0aW9ucy5zdGF0ZX1gO1xuXG4gICAgaWYgKG9wdGlvbnMuc3RhdGUpIHtcbiAgICAgIGlmICghaG9zdC5leGlzdHMoc3RhdGVQYXRoKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSBTcGVjaWZpZWQgc3RhdGUgcGF0aCAke3N0YXRlUGF0aH0gZG9lcyBub3QgZXhpc3RgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBjb21wb25lbnRQYXRoID1cbiAgICAgIGAvJHtvcHRpb25zLnBhdGh9L2AgK1xuICAgICAgKG9wdGlvbnMuZmxhdCA/ICcnIDogc3RyaW5nVXRpbHMuZGFzaGVyaXplKG9wdGlvbnMubmFtZSkgKyAnLycpICtcbiAgICAgIHN0cmluZ1V0aWxzLmRhc2hlcml6ZShvcHRpb25zLm5hbWUpICtcbiAgICAgICcuY29tcG9uZW50LnRzJztcblxuICAgIGNvbnN0IHRleHQgPSBob3N0LnJlYWQoY29tcG9uZW50UGF0aCk7XG5cbiAgICBpZiAodGV4dCA9PT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IFNjaGVtYXRpY3NFeGNlcHRpb24oYEZpbGUgJHtjb21wb25lbnRQYXRofSBkb2VzIG5vdCBleGlzdC5gKTtcbiAgICB9XG5cbiAgICBjb25zdCBzb3VyY2VUZXh0ID0gdGV4dC50b1N0cmluZygndXRmLTgnKTtcblxuICAgIGNvbnN0IHNvdXJjZSA9IHRzLmNyZWF0ZVNvdXJjZUZpbGUoXG4gICAgICBjb21wb25lbnRQYXRoLFxuICAgICAgc291cmNlVGV4dCxcbiAgICAgIHRzLlNjcmlwdFRhcmdldC5MYXRlc3QsXG4gICAgICB0cnVlXG4gICAgKTtcblxuICAgIGNvbnN0IHN0YXRlSW1wb3J0UGF0aCA9IGJ1aWxkUmVsYXRpdmVQYXRoKGNvbXBvbmVudFBhdGgsIHN0YXRlUGF0aCk7XG4gICAgY29uc3Qgc3RvcmVJbXBvcnQgPSBpbnNlcnRJbXBvcnQoXG4gICAgICBzb3VyY2UsXG4gICAgICBjb21wb25lbnRQYXRoLFxuICAgICAgJ1N0b3JlJyxcbiAgICAgICdAbmdyeC9zdG9yZSdcbiAgICApO1xuICAgIGNvbnN0IHN0YXRlSW1wb3J0ID0gb3B0aW9ucy5zdGF0ZVxuICAgICAgPyBpbnNlcnRJbXBvcnQoXG4gICAgICAgICAgc291cmNlLFxuICAgICAgICAgIGNvbXBvbmVudFBhdGgsXG4gICAgICAgICAgYCogYXMgZnJvbVN0b3JlYCxcbiAgICAgICAgICBzdGF0ZUltcG9ydFBhdGgsXG4gICAgICAgICAgdHJ1ZVxuICAgICAgICApXG4gICAgICA6IG5ldyBOb29wQ2hhbmdlKCk7XG5cbiAgICBjb25zdCBjb21wb25lbnRDbGFzcyA9IHNvdXJjZS5zdGF0ZW1lbnRzLmZpbmQoXG4gICAgICBzdG0gPT4gc3RtLmtpbmQgPT09IHRzLlN5bnRheEtpbmQuQ2xhc3NEZWNsYXJhdGlvblxuICAgICk7XG4gICAgY29uc3QgY29tcG9uZW50ID0gY29tcG9uZW50Q2xhc3MgYXMgdHMuQ2xhc3NEZWNsYXJhdGlvbjtcbiAgICBjb25zdCBjb21wb25lbnRDb25zdHJ1Y3RvciA9IGNvbXBvbmVudC5tZW1iZXJzLmZpbmQoXG4gICAgICBtZW1iZXIgPT4gbWVtYmVyLmtpbmQgPT09IHRzLlN5bnRheEtpbmQuQ29uc3RydWN0b3JcbiAgICApO1xuICAgIGNvbnN0IGNtcEN0ciA9IGNvbXBvbmVudENvbnN0cnVjdG9yIGFzIHRzLkNvbnN0cnVjdG9yRGVjbGFyYXRpb247XG4gICAgY29uc3QgeyBwb3MgfSA9IGNtcEN0cjtcbiAgICBjb25zdCBjb25zdHJ1Y3RvclRleHQgPSBjbXBDdHIuZ2V0VGV4dCgpO1xuICAgIGNvbnN0IFtzdGFydCwgZW5kXSA9IGNvbnN0cnVjdG9yVGV4dC5zcGxpdCgnKCknKTtcbiAgICBjb25zdCBzdG9yZUNvbnN0cnVjdG9yID0gW3N0YXJ0LCBgKHByaXZhdGUgc3RvcmU6IFN0b3JlKWAsIGVuZF0uam9pbignJyk7XG4gICAgY29uc3QgY29uc3RydWN0b3JVcGRhdGUgPSBuZXcgUmVwbGFjZUNoYW5nZShcbiAgICAgIGNvbXBvbmVudFBhdGgsXG4gICAgICBwb3MsXG4gICAgICBgICAke2NvbnN0cnVjdG9yVGV4dH1cXG5cXG5gLFxuICAgICAgYFxcblxcbiAgJHtzdG9yZUNvbnN0cnVjdG9yfWBcbiAgICApO1xuXG4gICAgY29uc3QgY2hhbmdlcyA9IFtzdG9yZUltcG9ydCwgc3RhdGVJbXBvcnQsIGNvbnN0cnVjdG9yVXBkYXRlXTtcbiAgICBjb25zdCByZWNvcmRlciA9IGhvc3QuYmVnaW5VcGRhdGUoY29tcG9uZW50UGF0aCk7XG5cbiAgICBmb3IgKGNvbnN0IGNoYW5nZSBvZiBjaGFuZ2VzKSB7XG4gICAgICBpZiAoY2hhbmdlIGluc3RhbmNlb2YgSW5zZXJ0Q2hhbmdlKSB7XG4gICAgICAgIHJlY29yZGVyLmluc2VydExlZnQoY2hhbmdlLnBvcywgY2hhbmdlLnRvQWRkKTtcbiAgICAgIH0gZWxzZSBpZiAoY2hhbmdlIGluc3RhbmNlb2YgUmVwbGFjZUNoYW5nZSkge1xuICAgICAgICByZWNvcmRlci5yZW1vdmUocG9zLCBjaGFuZ2Uub2xkVGV4dC5sZW5ndGgpO1xuICAgICAgICByZWNvcmRlci5pbnNlcnRMZWZ0KGNoYW5nZS5vcmRlciwgY2hhbmdlLm5ld1RleHQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGhvc3QuY29tbWl0VXBkYXRlKHJlY29yZGVyKTtcblxuICAgIHJldHVybiBob3N0O1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihvcHRpb25zOiBDb250YWluZXJPcHRpb25zKTogUnVsZSB7XG4gIHJldHVybiAoaG9zdDogVHJlZSwgY29udGV4dDogU2NoZW1hdGljQ29udGV4dCkgPT4ge1xuICAgIG9wdGlvbnMucGF0aCA9IGdldFByb2plY3RQYXRoKGhvc3QsIG9wdGlvbnMpO1xuXG4gICAgaWYgKCFvcHRpb25zLnNraXBUZXN0cyAmJiBvcHRpb25zLnNraXBUZXN0KSB7XG4gICAgICBvcHRpb25zLnNraXBUZXN0cyA9IG9wdGlvbnMuc2tpcFRlc3Q7XG4gICAgfVxuXG4gICAgY29uc3QgcGFyc2VkUGF0aCA9IHBhcnNlTmFtZShvcHRpb25zLnBhdGgsIG9wdGlvbnMubmFtZSk7XG4gICAgb3B0aW9ucy5uYW1lID0gcGFyc2VkUGF0aC5uYW1lO1xuICAgIG9wdGlvbnMucGF0aCA9IHBhcnNlZFBhdGgucGF0aDtcblxuICAgIGNvbnN0IG9wdHMgPSBbJ3N0YXRlJywgJ3N0YXRlSW50ZXJmYWNlJ10ucmVkdWNlKFxuICAgICAgKGN1cnJlbnQ6IFBhcnRpYWw8Q29udGFpbmVyT3B0aW9ucz4sIGtleSkgPT4ge1xuICAgICAgICByZXR1cm4gb21pdChjdXJyZW50LCBrZXkgYXMgYW55KTtcbiAgICAgIH0sXG4gICAgICBvcHRpb25zXG4gICAgKTtcblxuICAgIGNvbnN0IHRlbXBsYXRlU291cmNlID0gYXBwbHkoXG4gICAgICB1cmwob3B0aW9ucy50ZXN0RGVwdGggPT09ICd1bml0JyA/ICcuL2ZpbGVzJyA6ICcuL2ludGVncmF0aW9uLWZpbGVzJyksXG4gICAgICBbXG4gICAgICAgIG9wdGlvbnMuc2tpcFRlc3RzXG4gICAgICAgICAgPyBmaWx0ZXIocGF0aCA9PiAhcGF0aC5lbmRzV2l0aCgnLnNwZWMudHMudGVtcGxhdGUnKSlcbiAgICAgICAgICA6IG5vb3AoKSxcbiAgICAgICAgYXBwbHlUZW1wbGF0ZXMoe1xuICAgICAgICAgICdpZi1mbGF0JzogKHM6IHN0cmluZykgPT4gKG9wdGlvbnMuZmxhdCA/ICcnIDogcyksXG4gICAgICAgICAgLi4uc3RyaW5nVXRpbHMsXG4gICAgICAgICAgLi4uKG9wdGlvbnMgYXMgb2JqZWN0KSxcbiAgICAgICAgfSBhcyBhbnkpLFxuICAgICAgICBtb3ZlKHBhcnNlZFBhdGgucGF0aCksXG4gICAgICBdXG4gICAgKTtcblxuICAgIC8vIFJlbW92ZSBhbGwgdW5kZWZpbmVkIHZhbHVlcyB0byB1c2UgdGhlIHNjaGVtYXRpYyBkZWZhdWx0cyAoaW4gYW5ndWxhci5qc29uIG9yIHRoZSBBbmd1bGFyIHNjaGVtYSlcbiAgICAoT2JqZWN0LmtleXMob3B0cykgYXMgKGtleW9mIENvbnRhaW5lck9wdGlvbnMpW10pLmZvckVhY2goXG4gICAgICBrZXkgPT4gKG9wdHNba2V5XSA9PT0gdW5kZWZpbmVkID8gZGVsZXRlIG9wdHNba2V5XSA6IHt9KVxuICAgICk7XG5cbiAgICByZXR1cm4gY2hhaW4oW1xuICAgICAgZXh0ZXJuYWxTY2hlbWF0aWMoJ0BzY2hlbWF0aWNzL2FuZ3VsYXInLCAnY29tcG9uZW50Jywge1xuICAgICAgICAuLi5vcHRzLFxuICAgICAgICBza2lwVGVzdHM6IHRydWUsXG4gICAgICB9KSxcbiAgICAgIGFkZFN0YXRlVG9Db21wb25lbnQob3B0aW9ucyksXG4gICAgICBtZXJnZVdpdGgodGVtcGxhdGVTb3VyY2UpLFxuICAgIF0pKGhvc3QsIGNvbnRleHQpO1xuICB9O1xufVxuIl19