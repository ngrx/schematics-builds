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
                options.spec
                    ? schematics_1.noop()
                    : schematics_1.filter(path => !path.endsWith('.spec.ts.template')),
                schematics_1.applyTemplates(Object.assign({ 'if-flat': (s) => (options.flat ? '' : s) }, schematics_core_1.stringUtils, options)),
                schematics_1.move(parsedPath.path),
            ]);
            return schematics_1.chain([
                schematics_1.externalSchematic('@schematics/angular', 'component', Object.assign({}, opts, { spec: false })),
                addStateToComponent(options),
                schematics_1.mergeWith(templateSource),
            ])(host, context);
        };
    }
    exports.default = default_1;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3NjaGVtYXRpY3Mvc3JjL2NvbnRhaW5lci9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztJQUFBLDJEQWVvQztJQUNwQyxpQ0FBaUM7SUFDakMsc0VBVTBDO0lBRzFDLFNBQVMsbUJBQW1CLENBQUMsT0FBeUI7UUFDcEQsT0FBTyxDQUFDLElBQVUsRUFBRSxFQUFFO1lBQ3BCLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFBRTtnQkFDN0MsT0FBTyxJQUFJLENBQUM7YUFDYjtZQUVELE1BQU0sU0FBUyxHQUFHLElBQUksT0FBTyxDQUFDLElBQUksSUFBSSxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUM7WUFFdEQsSUFBSSxPQUFPLENBQUMsS0FBSyxFQUFFO2dCQUNqQixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsRUFBRTtvQkFDM0IsTUFBTSxJQUFJLEtBQUssQ0FBQyw0QkFBNEIsU0FBUyxpQkFBaUIsQ0FBQyxDQUFDO2lCQUN6RTthQUNGO1lBRUQsTUFBTSxhQUFhLEdBQ2pCLElBQUksT0FBTyxDQUFDLElBQUksR0FBRztnQkFDbkIsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLDZCQUFXLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUM7Z0JBQy9ELDZCQUFXLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7Z0JBQ25DLGVBQWUsQ0FBQztZQUVsQixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBRXRDLElBQUksSUFBSSxLQUFLLElBQUksRUFBRTtnQkFDakIsTUFBTSxJQUFJLGdD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QUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUM5Qyw2QkFBVyxFQUNWLE9BQWtCLENBQ2hCLENBQUM7Z0JBQ1QsaUJBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDO2FBQ3RCLENBQ0YsQ0FBQztZQUVGLE9BQU8sa0JBQUssQ0FBQztnQkFDWCw4QkFBaUIsQ0FBQyxxQkFBcUIsRUFBRSxXQUFXLG9CQUMvQyxJQUFJLElBQ1AsSUFBSSxFQUFFLEtBQUssSUFDWDtnQkFDRixtQkFBbUIsQ0FBQyxPQUFPLENBQUM7Z0JBQzVCLHNCQUFTLENBQUMsY0FBYyxDQUFDO2FBQzFCLENBQUMsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDcEIsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQXZDRCw0QkF1Q0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBSdWxlLFxuICBTY2hlbWF0aWNDb250ZXh0LFxuICBTY2hlbWF0aWNzRXhjZXB0aW9uLFxuICBUcmVlLFxuICBjaGFpbixcbiAgZXh0ZXJuYWxTY2hlbWF0aWMsXG4gIGFwcGx5LFxuICBhcHBseVRlbXBsYXRlcyxcbiAgdXJsLFxuICBub29wLFxuICBmaWx0ZXIsXG4gIHRlbXBsYXRlLFxuICBtb3ZlLFxuICBtZXJnZVdpdGgsXG59IGZyb20gJ0Bhbmd1bGFyLWRldmtpdC9zY2hlbWF0aWNzJztcbmltcG9ydCAqIGFzIHRzIGZyb20gJ3R5cGVzY3JpcHQnO1xuaW1wb3J0IHtcbiAgc3RyaW5nVXRpbHMsXG4gIGJ1aWxkUmVsYXRpdmVQYXRoLFxuICBpbnNlcnRJbXBvcnQsXG4gIE5vb3BDaGFuZ2UsXG4gIFJlcGxhY2VDaGFuZ2UsXG4gIEluc2VydENoYW5nZSxcbiAgZ2V0UHJvamVjdFBhdGgsXG4gIG9taXQsXG4gIHBhcnNlTmFtZSxcbn0gZnJvbSAnQG5ncngvc2NoZW1hdGljcy9zY2hlbWF0aWNzLWNvcmUnO1xuaW1wb3J0IHsgU2NoZW1hIGFzIENvbnRhaW5lck9wdGlvbnMgfSBmcm9tICcuL3NjaGVtYSc7XG5cbmZ1bmN0aW9uIGFkZFN0YXRlVG9Db21wb25lbnQob3B0aW9uczogQ29udGFpbmVyT3B0aW9ucykge1xuICByZXR1cm4gKGhvc3Q6IFRyZWUpID0+IHtcbiAgICBpZiAoIW9wdGlvbnMuc3RhdGUgJiYgIW9wdGlvbnMuc3RhdGVJbnRlcmZhY2UpIHtcbiAgICAgIHJldHVybiBob3N0O1xuICAgIH1cblxuICAgIGNvbnN0IHN0YXRlUGF0aCA9IGAvJHtvcHRpb25zLnBhdGh9LyR7b3B0aW9ucy5zdGF0ZX1gO1xuXG4gICAgaWYgKG9wdGlvbnMuc3RhdGUpIHtcbiAgICAgIGlmICghaG9zdC5leGlzdHMoc3RhdGVQYXRoKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSBTcGVjaWZpZWQgc3RhdGUgcGF0aCAke3N0YXRlUGF0aH0gZG9lcyBub3QgZXhpc3RgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBjb21wb25lbnRQYXRoID1cbiAgICAgIGAvJHtvcHRpb25zLnBhdGh9L2AgK1xuICAgICAgKG9wdGlvbnMuZmxhdCA/ICcnIDogc3RyaW5nVXRpbHMuZGFzaGVyaXplKG9wdGlvbnMubmFtZSkgKyAnLycpICtcbiAgICAgIHN0cmluZ1V0aWxzLmRhc2hlcml6ZShvcHRpb25zLm5hbWUpICtcbiAgICAgICcuY29tcG9uZW50LnRzJztcblxuICAgIGNvbnN0IHRleHQgPSBob3N0LnJlYWQoY29tcG9uZW50UGF0aCk7XG5cbiAgICBpZiAodGV4dCA9PT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IFNjaGVtYXRpY3NFeGNlcHRpb24oYEZpbGUgJHtjb21wb25lbnRQYXRofSBkb2VzIG5vdCBleGlzdC5gKTtcbiAgICB9XG5cbiAgICBjb25zdCBzb3VyY2VUZXh0ID0gdGV4dC50b1N0cmluZygndXRmLTgnKTtcblxuICAgIGNvbnN0IHNvdXJjZSA9IHRzLmNyZWF0ZVNvdXJjZUZpbGUoXG4gICAgICBjb21wb25lbnRQYXRoLFxuICAgICAgc291cmNlVGV4dCxcbiAgICAgIHRzLlNjcmlwdFRhcmdldC5MYXRlc3QsXG4gICAgICB0cnVlXG4gICAgKTtcblxuICAgIGNvbnN0IHN0YXRlSW1wb3J0UGF0aCA9IGJ1aWxkUmVsYXRpdmVQYXRoKGNvbXBvbmVudFBhdGgsIHN0YXRlUGF0aCk7XG4gICAgY29uc3Qgc3RvcmVJbXBvcnQgPSBpbnNlcnRJbXBvcnQoXG4gICAgICBzb3VyY2UsXG4gICAgICBjb21wb25lbnRQYXRoLFxuICAgICAgJ1N0b3JlJyxcbiAgICAgICdAbmdyeC9zdG9yZSdcbiAgICApO1xuICAgIGNvbnN0IHN0YXRlSW1wb3J0ID0gb3B0aW9ucy5zdGF0ZVxuICAgICAgPyBpbnNlcnRJbXBvcnQoXG4gICAgICAgICAgc291cmNlLFxuICAgICAgICAgIGNvbXBvbmVudFBhdGgsXG4gICAgICAgICAgYCogYXMgZnJvbVN0b3JlYCxcbiAgICAgICAgICBzdGF0ZUltcG9ydFBhdGgsXG4gICAgICAgICAgdHJ1ZVxuICAgICAgICApXG4gICAgICA6IG5ldyBOb29wQ2hhbmdlKCk7XG5cbiAgICBjb25zdCBjb21wb25lbnRDbGFzcyA9IHNvdXJjZS5zdGF0ZW1lbnRzLmZpbmQoXG4gICAgICBzdG0gPT4gc3RtLmtpbmQgPT09IHRzLlN5bnRheEtpbmQuQ2xhc3NEZWNsYXJhdGlvblxuICAgICk7XG4gICAgY29uc3QgY29tcG9uZW50ID0gY29tcG9uZW50Q2xhc3MgYXMgdHMuQ2xhc3NEZWNsYXJhdGlvbjtcbiAgICBjb25zdCBjb21wb25lbnRDb25zdHJ1Y3RvciA9IGNvbXBvbmVudC5tZW1iZXJzLmZpbmQoXG4gICAgICBtZW1iZXIgPT4gbWVtYmVyLmtpbmQgPT09IHRzLlN5bnRheEtpbmQuQ29uc3RydWN0b3JcbiAgICApO1xuICAgIGNvbnN0IGNtcEN0ciA9IGNvbXBvbmVudENvbnN0cnVjdG9yIGFzIHRzLkNvbnN0cnVjdG9yRGVjbGFyYXRpb247XG4gICAgY29uc3QgeyBwb3MgfSA9IGNtcEN0cjtcbiAgICBjb25zdCBzdGF0ZVR5cGUgPSBvcHRpb25zLnN0YXRlXG4gICAgICA/IGBmcm9tU3RvcmUuJHtvcHRpb25zLnN0YXRlSW50ZXJmYWNlfWBcbiAgICAgIDogJ2FueSc7XG4gICAgY29uc3QgY29uc3RydWN0b3JUZXh0ID0gY21wQ3RyLmdldFRleHQoKTtcbiAgICBjb25zdCBbc3RhcnQsIGVuZF0gPSBjb25zdHJ1Y3RvclRleHQuc3BsaXQoJygpJyk7XG4gICAgY29uc3Qgc3RvcmVUZXh0ID0gYHByaXZhdGUgc3RvcmU6IFN0b3JlPCR7c3RhdGVUeXBlfT5gO1xuICAgIGNvbnN0IHN0b3JlQ29uc3RydWN0b3IgPSBbc3RhcnQsIGAoJHtzdG9yZVRleHR9KWAsIGVuZF0uam9pbignJyk7XG4gICAgY29uc3QgY29uc3RydWN0b3JVcGRhdGUgPSBuZXcgUmVwbGFjZUNoYW5nZShcbiAgICAgIGNvbXBvbmVudFBhdGgsXG4gICAgICBwb3MsXG4gICAgICBgICAke2NvbnN0cnVjdG9yVGV4dH1cXG5cXG5gLFxuICAgICAgYFxcblxcbiAgJHtzdG9yZUNvbnN0cnVjdG9yfWBcbiAgICApO1xuXG4gICAgY29uc3QgY2hhbmdlcyA9IFtzdG9yZUltcG9ydCwgc3RhdGVJbXBvcnQsIGNvbnN0cnVjdG9yVXBkYXRlXTtcbiAgICBjb25zdCByZWNvcmRlciA9IGhvc3QuYmVnaW5VcGRhdGUoY29tcG9uZW50UGF0aCk7XG5cbiAgICBmb3IgKGNvbnN0IGNoYW5nZSBvZiBjaGFuZ2VzKSB7XG4gICAgICBpZiAoY2hhbmdlIGluc3RhbmNlb2YgSW5zZXJ0Q2hhbmdlKSB7XG4gICAgICAgIHJlY29yZGVyLmluc2VydExlZnQoY2hhbmdlLnBvcywgY2hhbmdlLnRvQWRkKTtcbiAgICAgIH0gZWxzZSBpZiAoY2hhbmdlIGluc3RhbmNlb2YgUmVwbGFjZUNoYW5nZSkge1xuICAgICAgICByZWNvcmRlci5yZW1vdmUocG9zLCBjaGFuZ2Uub2xkVGV4dC5sZW5ndGgpO1xuICAgICAgICByZWNvcmRlci5pbnNlcnRMZWZ0KGNoYW5nZS5vcmRlciwgY2hhbmdlLm5ld1RleHQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGhvc3QuY29tbWl0VXBkYXRlKHJlY29yZGVyKTtcblxuICAgIHJldHVybiBob3N0O1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihvcHRpb25zOiBDb250YWluZXJPcHRpb25zKTogUnVsZSB7XG4gIHJldHVybiAoaG9zdDogVHJlZSwgY29udGV4dDogU2NoZW1hdGljQ29udGV4dCkgPT4ge1xuICAgIG9wdGlvbnMucGF0aCA9IGdldFByb2plY3RQYXRoKGhvc3QsIG9wdGlvbnMpO1xuXG4gICAgY29uc3QgcGFyc2VkUGF0aCA9IHBhcnNlTmFtZShvcHRpb25zLnBhdGgsIG9wdGlvbnMubmFtZSk7XG4gICAgb3B0aW9ucy5uYW1lID0gcGFyc2VkUGF0aC5uYW1lO1xuICAgIG9wdGlvbnMucGF0aCA9IHBhcnNlZFBhdGgucGF0aDtcblxuICAgIGNvbnN0IG9wdHMgPSBbJ3N0YXRlJywgJ3N0YXRlSW50ZXJmYWNlJ10ucmVkdWNlKFxuICAgICAgKGN1cnJlbnQ6IFBhcnRpYWw8Q29udGFpbmVyT3B0aW9ucz4sIGtleSkgPT4ge1xuICAgICAgICByZXR1cm4gb21pdChjdXJyZW50LCBrZXkgYXMgYW55KTtcbiAgICAgIH0sXG4gICAgICBvcHRpb25zXG4gICAgKTtcblxuICAgIGNvbnN0IHRlbXBsYXRlU291cmNlID0gYXBwbHkoXG4gICAgICB1cmwob3B0aW9ucy50ZXN0RGVwdGggPT09ICd1bml0JyA/ICcuL2ZpbGVzJyA6ICcuL2ludGVncmF0aW9uLWZpbGVzJyksXG4gICAgICBbXG4gICAgICAgIG9wdGlvbnMuc3BlY1xuICAgICAgICAgID8gbm9vcCgpXG4gICAgICAgICAgOiBmaWx0ZXIocGF0aCA9PiAhcGF0aC5lbmRzV2l0aCgnLnNwZWMudHMudGVtcGxhdGUnKSksXG4gICAgICAgIGFwcGx5VGVtcGxhdGVzKHtcbiAgICAgICAgICAnaWYtZmxhdCc6IChzOiBzdHJpbmcpID0+IChvcHRpb25zLmZsYXQgPyAnJyA6IHMpLFxuICAgICAgICAgIC4uLnN0cmluZ1V0aWxzLFxuICAgICAgICAgIC4uLihvcHRpb25zIGFzIG9iamVjdCksXG4gICAgICAgIH0gYXMgYW55KSxcbiAgICAgICAgbW92ZShwYXJzZWRQYXRoLnBhdGgpLFxuICAgICAgXVxuICAgICk7XG5cbiAgICByZXR1cm4gY2hhaW4oW1xuICAgICAgZXh0ZXJuYWxTY2hlbWF0aWMoJ0BzY2hlbWF0aWNzL2FuZ3VsYXInLCAnY29tcG9uZW50Jywge1xuICAgICAgICAuLi5vcHRzLFxuICAgICAgICBzcGVjOiBmYWxzZSxcbiAgICAgIH0pLFxuICAgICAgYWRkU3RhdGVUb0NvbXBvbmVudChvcHRpb25zKSxcbiAgICAgIG1lcmdlV2l0aCh0ZW1wbGF0ZVNvdXJjZSksXG4gICAgXSkoaG9zdCwgY29udGV4dCk7XG4gIH07XG59XG4iXX0=