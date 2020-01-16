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
            return schematics_1.chain([
                schematics_1.externalSchematic('@schematics/angular', 'component', Object.assign(Object.assign({}, opts), { skipTests: true })),
                addStateToComponent(options),
                schematics_1.mergeWith(templateSource),
            ])(host, context);
        };
    }
    exports.default = default_1;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3NjaGVtYXRpY3Mvc3JjL2NvbnRhaW5lci9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztJQUFBLDJEQWdCb0M7SUFDcEMsaUNBQWlDO0lBQ2pDLHNFQVUwQztJQUcxQyxTQUFTLG1CQUFtQixDQUFDLE9BQXlCO1FBQ3BELE9BQU8sQ0FBQyxJQUFVLEVBQUUsRUFBRTtZQUNwQixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLEVBQUU7Z0JBQzdDLE9BQU8sSUFBSSxDQUFDO2FBQ2I7WUFFRCxNQUFNLFNBQVMsR0FBRyxJQUFJLE9BQU8sQ0FBQyxJQUFJLElBQUksT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBRXRELElBQUksT0FBTyxDQUFDLEtBQUssRUFBRTtnQkFDakIsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEVBQUU7b0JBQzNCLE1BQU0sSUFBSSxLQUFLLENBQUMsNEJBQTRCLFNBQVMsaUJBQWlCLENBQUMsQ0FBQztpQkFDekU7YUFDRjtZQUVELE1BQU0sYUFBYSxHQUNqQixJQUFJLE9BQU8sQ0FBQyxJQUFJLEdBQUc7Z0JBQ25CLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyw2QkFBVyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDO2dCQUMvRCw2QkFBVyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO2dCQUNuQyxlQUFlLENBQUM7WUFFbEIsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUV0QyxJQUFJLElBQUksS0FBSyxJQUFJLEVBQUU7Z0JBQ2pCLE1BQU0sSUFBSSxn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QUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFDOUMsNkJBQVcsR0FDVixPQUFrQixDQUNoQixDQUFDO2dCQUNULGlCQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQzthQUN0QixDQUNGLENBQUM7WUFFRixPQUFPLGtCQUFLLENBQUM7Z0JBQ1gsOEJBQWlCLENBQUMscUJBQXFCLEVBQUUsV0FBVyxrQ0FDL0MsSUFBSSxLQUNQLFNBQVMsRUFBRSxJQUFJLElBQ2Y7Z0JBQ0YsbUJBQW1CLENBQUMsT0FBTyxDQUFDO2dCQUM1QixzQkFBUyxDQUFDLGNBQWMsQ0FBQzthQUMxQixDQUFDLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3BCLENBQUMsQ0FBQztJQUNKLENBQUM7SUF2Q0QsNEJBdUNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgUnVsZSxcbiAgU2NoZW1hdGljQ29udGV4dCxcbiAgU2NoZW1hdGljc0V4Y2VwdGlvbixcbiAgVHJlZSxcbiAgY2hhaW4sXG4gIGV4dGVybmFsU2NoZW1hdGljLFxuICBhcHBseSxcbiAgYXBwbHlUZW1wbGF0ZXMsXG4gIHVybCxcbiAgbm9vcCxcbiAgZmlsdGVyLFxuICB0ZW1wbGF0ZSxcbiAgbW92ZSxcbiAgbWVyZ2VXaXRoLFxuICBNZXJnZVN0cmF0ZWd5LFxufSBmcm9tICdAYW5ndWxhci1kZXZraXQvc2NoZW1hdGljcyc7XG5pbXBvcnQgKiBhcyB0cyBmcm9tICd0eXBlc2NyaXB0JztcbmltcG9ydCB7XG4gIHN0cmluZ1V0aWxzLFxuICBidWlsZFJlbGF0aXZlUGF0aCxcbiAgaW5zZXJ0SW1wb3J0LFxuICBOb29wQ2hhbmdlLFxuICBSZXBsYWNlQ2hhbmdlLFxuICBJbnNlcnRDaGFuZ2UsXG4gIGdldFByb2plY3RQYXRoLFxuICBvbWl0LFxuICBwYXJzZU5hbWUsXG59IGZyb20gJ0BuZ3J4L3NjaGVtYXRpY3Mvc2NoZW1hdGljcy1jb3JlJztcbmltcG9ydCB7IFNjaGVtYSBhcyBDb250YWluZXJPcHRpb25zIH0gZnJvbSAnLi9zY2hlbWEnO1xuXG5mdW5jdGlvbiBhZGRTdGF0ZVRvQ29tcG9uZW50KG9wdGlvbnM6IENvbnRhaW5lck9wdGlvbnMpIHtcbiAgcmV0dXJuIChob3N0OiBUcmVlKSA9PiB7XG4gICAgaWYgKCFvcHRpb25zLnN0YXRlICYmICFvcHRpb25zLnN0YXRlSW50ZXJmYWNlKSB7XG4gICAgICByZXR1cm4gaG9zdDtcbiAgICB9XG5cbiAgICBjb25zdCBzdGF0ZVBhdGggPSBgLyR7b3B0aW9ucy5wYXRofS8ke29wdGlvbnMuc3RhdGV9YDtcblxuICAgIGlmIChvcHRpb25zLnN0YXRlKSB7XG4gICAgICBpZiAoIWhvc3QuZXhpc3RzKHN0YXRlUGF0aCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBUaGUgU3BlY2lmaWVkIHN0YXRlIHBhdGggJHtzdGF0ZVBhdGh9IGRvZXMgbm90IGV4aXN0YCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgY29tcG9uZW50UGF0aCA9XG4gICAgICBgLyR7b3B0aW9ucy5wYXRofS9gICtcbiAgICAgIChvcHRpb25zLmZsYXQgPyAnJyA6IHN0cmluZ1V0aWxzLmRhc2hlcml6ZShvcHRpb25zLm5hbWUpICsgJy8nKSArXG4gICAgICBzdHJpbmdVdGlscy5kYXNoZXJpemUob3B0aW9ucy5uYW1lKSArXG4gICAgICAnLmNvbXBvbmVudC50cyc7XG5cbiAgICBjb25zdCB0ZXh0ID0gaG9zdC5yZWFkKGNvbXBvbmVudFBhdGgpO1xuXG4gICAgaWYgKHRleHQgPT09IG51bGwpIHtcbiAgICAgIHRocm93IG5ldyBTY2hlbWF0aWNzRXhjZXB0aW9uKGBGaWxlICR7Y29tcG9uZW50UGF0aH0gZG9lcyBub3QgZXhpc3QuYCk7XG4gICAgfVxuXG4gICAgY29uc3Qgc291cmNlVGV4dCA9IHRleHQudG9TdHJpbmcoJ3V0Zi04Jyk7XG5cbiAgICBjb25zdCBzb3VyY2UgPSB0cy5jcmVhdGVTb3VyY2VGaWxlKFxuICAgICAgY29tcG9uZW50UGF0aCxcbiAgICAgIHNvdXJjZVRleHQsXG4gICAgICB0cy5TY3JpcHRUYXJnZXQuTGF0ZXN0LFxuICAgICAgdHJ1ZVxuICAgICk7XG5cbiAgICBjb25zdCBzdGF0ZUltcG9ydFBhdGggPSBidWlsZFJlbGF0aXZlUGF0aChjb21wb25lbnRQYXRoLCBzdGF0ZVBhdGgpO1xuICAgIGNvbnN0IHN0b3JlSW1wb3J0ID0gaW5zZXJ0SW1wb3J0KFxuICAgICAgc291cmNlLFxuICAgICAgY29tcG9uZW50UGF0aCxcbiAgICAgICdTdG9yZScsXG4gICAgICAnQG5ncngvc3RvcmUnXG4gICAgKTtcbiAgICBjb25zdCBzdGF0ZUltcG9ydCA9IG9wdGlvbnMuc3RhdGVcbiAgICAgID8gaW5zZXJ0SW1wb3J0KFxuICAgICAgICAgIHNvdXJjZSxcbiAgICAgICAgICBjb21wb25lbnRQYXRoLFxuICAgICAgICAgIGAqIGFzIGZyb21TdG9yZWAsXG4gICAgICAgICAgc3RhdGVJbXBvcnRQYXRoLFxuICAgICAgICAgIHRydWVcbiAgICAgICAgKVxuICAgICAgOiBuZXcgTm9vcENoYW5nZSgpO1xuXG4gICAgY29uc3QgY29tcG9uZW50Q2xhc3MgPSBzb3VyY2Uuc3RhdGVtZW50cy5maW5kKFxuICAgICAgc3RtID0+IHN0bS5raW5kID09PSB0cy5TeW50YXhLaW5kLkNsYXNzRGVjbGFyYXRpb25cbiAgICApO1xuICAgIGNvbnN0IGNvbXBvbmVudCA9IGNvbXBvbmVudENsYXNzIGFzIHRzLkNsYXNzRGVjbGFyYXRpb247XG4gICAgY29uc3QgY29tcG9uZW50Q29uc3RydWN0b3IgPSBjb21wb25lbnQubWVtYmVycy5maW5kKFxuICAgICAgbWVtYmVyID0+IG1lbWJlci5raW5kID09PSB0cy5TeW50YXhLaW5kLkNvbnN0cnVjdG9yXG4gICAgKTtcbiAgICBjb25zdCBjbXBDdHIgPSBjb21wb25lbnRDb25zdHJ1Y3RvciBhcyB0cy5Db25zdHJ1Y3RvckRlY2xhcmF0aW9uO1xuICAgIGNvbnN0IHsgcG9zIH0gPSBjbXBDdHI7XG4gICAgY29uc3Qgc3RhdGVUeXBlID0gb3B0aW9ucy5zdGF0ZVxuICAgICAgPyBgZnJvbVN0b3JlLiR7b3B0aW9ucy5zdGF0ZUludGVyZmFjZX1gXG4gICAgICA6ICdhbnknO1xuICAgIGNvbnN0IGNvbnN0cnVjdG9yVGV4dCA9IGNtcEN0ci5nZXRUZXh0KCk7XG4gICAgY29uc3QgW3N0YXJ0LCBlbmRdID0gY29uc3RydWN0b3JUZXh0LnNwbGl0KCcoKScpO1xuICAgIGNvbnN0IHN0b3JlVGV4dCA9IGBwcml2YXRlIHN0b3JlOiBTdG9yZTwke3N0YXRlVHlwZX0+YDtcbiAgICBjb25zdCBzdG9yZUNvbnN0cnVjdG9yID0gW3N0YXJ0LCBgKCR7c3RvcmVUZXh0fSlgLCBlbmRdLmpvaW4oJycpO1xuICAgIGNvbnN0IGNvbnN0cnVjdG9yVXBkYXRlID0gbmV3IFJlcGxhY2VDaGFuZ2UoXG4gICAgICBjb21wb25lbnRQYXRoLFxuICAgICAgcG9zLFxuICAgICAgYCAgJHtjb25zdHJ1Y3RvclRleHR9XFxuXFxuYCxcbiAgICAgIGBcXG5cXG4gICR7c3RvcmVDb25zdHJ1Y3Rvcn1gXG4gICAgKTtcblxuICAgIGNvbnN0IGNoYW5nZXMgPSBbc3RvcmVJbXBvcnQsIHN0YXRlSW1wb3J0LCBjb25zdHJ1Y3RvclVwZGF0ZV07XG4gICAgY29uc3QgcmVjb3JkZXIgPSBob3N0LmJlZ2luVXBkYXRlKGNvbXBvbmVudFBhdGgpO1xuXG4gICAgZm9yIChjb25zdCBjaGFuZ2Ugb2YgY2hhbmdlcykge1xuICAgICAgaWYgKGNoYW5nZSBpbnN0YW5jZW9mIEluc2VydENoYW5nZSkge1xuICAgICAgICByZWNvcmRlci5pbnNlcnRMZWZ0KGNoYW5nZS5wb3MsIGNoYW5nZS50b0FkZCk7XG4gICAgICB9IGVsc2UgaWYgKGNoYW5nZSBpbnN0YW5jZW9mIFJlcGxhY2VDaGFuZ2UpIHtcbiAgICAgICAgcmVjb3JkZXIucmVtb3ZlKHBvcywgY2hhbmdlLm9sZFRleHQubGVuZ3RoKTtcbiAgICAgICAgcmVjb3JkZXIuaW5zZXJ0TGVmdChjaGFuZ2Uub3JkZXIsIGNoYW5nZS5uZXdUZXh0KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBob3N0LmNvbW1pdFVwZGF0ZShyZWNvcmRlcik7XG5cbiAgICByZXR1cm4gaG9zdDtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24ob3B0aW9uczogQ29udGFpbmVyT3B0aW9ucyk6IFJ1bGUge1xuICByZXR1cm4gKGhvc3Q6IFRyZWUsIGNvbnRleHQ6IFNjaGVtYXRpY0NvbnRleHQpID0+IHtcbiAgICBvcHRpb25zLnBhdGggPSBnZXRQcm9qZWN0UGF0aChob3N0LCBvcHRpb25zKTtcblxuICAgIGNvbnN0IHBhcnNlZFBhdGggPSBwYXJzZU5hbWUob3B0aW9ucy5wYXRoLCBvcHRpb25zLm5hbWUpO1xuICAgIG9wdGlvbnMubmFtZSA9IHBhcnNlZFBhdGgubmFtZTtcbiAgICBvcHRpb25zLnBhdGggPSBwYXJzZWRQYXRoLnBhdGg7XG5cbiAgICBjb25zdCBvcHRzID0gWydzdGF0ZScsICdzdGF0ZUludGVyZmFjZSddLnJlZHVjZShcbiAgICAgIChjdXJyZW50OiBQYXJ0aWFsPENvbnRhaW5lck9wdGlvbnM+LCBrZXkpID0+IHtcbiAgICAgICAgcmV0dXJuIG9taXQoY3VycmVudCwga2V5IGFzIGFueSk7XG4gICAgICB9LFxuICAgICAgb3B0aW9uc1xuICAgICk7XG5cbiAgICBjb25zdCB0ZW1wbGF0ZVNvdXJjZSA9IGFwcGx5KFxuICAgICAgdXJsKG9wdGlvbnMudGVzdERlcHRoID09PSAndW5pdCcgPyAnLi9maWxlcycgOiAnLi9pbnRlZ3JhdGlvbi1maWxlcycpLFxuICAgICAgW1xuICAgICAgICBvcHRpb25zLnNraXBUZXN0XG4gICAgICAgICAgPyBmaWx0ZXIocGF0aCA9PiAhcGF0aC5lbmRzV2l0aCgnLnNwZWMudHMudGVtcGxhdGUnKSlcbiAgICAgICAgICA6IG5vb3AoKSxcbiAgICAgICAgYXBwbHlUZW1wbGF0ZXMoe1xuICAgICAgICAgICdpZi1mbGF0JzogKHM6IHN0cmluZykgPT4gKG9wdGlvbnMuZmxhdCA/ICcnIDogcyksXG4gICAgICAgICAgLi4uc3RyaW5nVXRpbHMsXG4gICAgICAgICAgLi4uKG9wdGlvbnMgYXMgb2JqZWN0KSxcbiAgICAgICAgfSBhcyBhbnkpLFxuICAgICAgICBtb3ZlKHBhcnNlZFBhdGgucGF0aCksXG4gICAgICBdXG4gICAgKTtcblxuICAgIHJldHVybiBjaGFpbihbXG4gICAgICBleHRlcm5hbFNjaGVtYXRpYygnQHNjaGVtYXRpY3MvYW5ndWxhcicsICdjb21wb25lbnQnLCB7XG4gICAgICAgIC4uLm9wdHMsXG4gICAgICAgIHNraXBUZXN0czogdHJ1ZVxuICAgICAgfSksXG4gICAgICBhZGRTdGF0ZVRvQ29tcG9uZW50KG9wdGlvbnMpLFxuICAgICAgbWVyZ2VXaXRoKHRlbXBsYXRlU291cmNlKSxcbiAgICBdKShob3N0LCBjb250ZXh0KTtcbiAgfTtcbn1cbiJdfQ==