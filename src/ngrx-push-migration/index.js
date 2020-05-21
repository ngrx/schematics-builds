(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@ngrx/schematics/src/ngrx-push-migration/index", ["require", "exports", "typescript", "@angular-devkit/schematics", "@ngrx/schematics/schematics-core"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const ts = require("typescript");
    const schematics_1 = require("@angular-devkit/schematics");
    const schematics_core_1 = require("@ngrx/schematics/schematics-core");
    const ASYNC_REGEXP = /\| {0,}async/g;
    const REACTIVE_MODULE = 'ReactiveComponentModule';
    const COMPONENT_MODULE = '@ngrx/component';
    const reactiveModuleToFind = (node) => ts.isIdentifier(node) && node.text === REACTIVE_MODULE;
    const ngModulesToFind = (node) => ts.isIdentifier(node) &&
        (node.text === 'CommonModule' || node.text === 'BrowserModule');
    function migrateToNgrxPush() {
        return (host) => schematics_core_1.visitTemplates(host, template => {
            let match;
            let changes = [];
            while ((match = ASYNC_REGEXP.exec(template.content)) !== null) {
                const m = match.toString();
                changes.push(new schematics_core_1.ReplaceChange(template.fileName, template.start + match.index, m, m.replace('async', 'ngrxPush')));
            }
            return schematics_core_1.commitChanges(host, template.fileName, changes);
        });
    }
    exports.migrateToNgrxPush = migrateToNgrxPush;
    function importReactiveComponentModule() {
        return (host) => {
            schematics_core_1.visitTSSourceFiles(host, sourceFile => {
                let hasCommonModuleOrBrowserModule = false;
                let hasReactiveComponentModule = false;
                schematics_core_1.visitNgModuleImports(sourceFile, (_, importNodes) => {
                    hasCommonModuleOrBrowserModule = importNodes.some(ngModulesToFind);
                    hasReactiveComponentModule = importNodes.some(reactiveModuleToFind);
                });
                if (hasCommonModuleOrBrowserModule && !hasReactiveComponentModule) {
                    const changes = schematics_core_1.addImportToModule(sourceFile, sourceFile.fileName, REACTIVE_MODULE, COMPONENT_MODULE);
                    schematics_core_1.commitChanges(host, sourceFile.fileName, changes);
                }
            });
        };
    }
    exports.importReactiveComponentModule = importReactiveComponentModule;
    function exportReactiveComponentModule() {
        return (host) => {
            schematics_core_1.visitTSSourceFiles(host, sourceFile => {
                let hasCommonModuleOrBrowserModule = false;
                let hasReactiveComponentModule = false;
                schematics_core_1.visitNgModuleExports(sourceFile, (_, exportNodes) => {
                    hasCommonModuleOrBrowserModule = exportNodes.some(ngModulesToFind);
                    hasReactiveComponentModule = exportNodes.some(reactiveModuleToFind);
                });
                if (hasCommonModuleOrBrowserModule && !hasReactiveComponentModule) {
                    const changes = schematics_core_1.addExportToModule(sourceFile, sourceFile.fileName, REACTIVE_MODULE, COMPONENT_MODULE);
                    schematics_core_1.commitChanges(host, sourceFile.fileName, changes);
                }
            });
        };
    }
    exports.exportReactiveComponentModule = exportReactiveComponentModule;
    function default_1() {
        return schematics_1.chain([
            migrateToNgrxPush(),
            importReactiveComponentModule(),
            exportReactiveComponentModule(),
        ]);
    }
    exports.default = default_1;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3NjaGVtYXRpY3Mvc3JjL25ncngtcHVzaC1taWdyYXRpb24vaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7SUFBQSxpQ0FBaUM7SUFDakMsMkRBQStEO0lBQy9ELHNFQVUwQztJQUUxQyxNQUFNLFlBQVksR0FBRyxlQUFlLENBQUM7SUFDckMsTUFBTSxlQUFlLEdBQUcseUJBQXlCLENBQUM7SUFDbEQsTUFBTSxnQkFBZ0IsR0FBRyxpQkFBaUIsQ0FBQztJQUUzQyxNQUFNLG9CQUFvQixHQUFHLENBQUMsSUFBYSxFQUFFLEVBQUUsQ0FDN0MsRUFBRSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLGVBQWUsQ0FBQztJQUV6RCxNQUFNLGVBQWUsR0FBRyxDQUFDLElBQWEsRUFBRSxFQUFFLENBQ3hDLEVBQUUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDO1FBQ3JCLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxjQUFjLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxlQUFlLENBQUMsQ0FBQztJQUVsRSxTQUFnQixpQkFBaUI7UUFDL0IsT0FBTyxDQUFDLElBQVUsRUFBRSxFQUFFLENBQ3BCLGdDQUFjLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxFQUFFO1lBQzlCLElBQUksS0FBOEIsQ0FBQztZQUNuQyxJQUFJLE9BQU8sR0FBYSxFQUFFLENBQUM7WUFDM0IsT0FBTyxDQUFDLEtBQUssR0FBRyxZQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLElBQUksRUFBRTtnQkFDN0QsTUFBTSxDQUFDLEdBQUcsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUUzQixPQUFPLENBQUMsSUFBSSxDQUNWLElBQUksK0JBQWEsQ0FDZixRQUFRLENBQUMsUUFBUSxFQUNqQixRQUFRLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFNLEVBQzdCLENBQUMsRUFDRCxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsQ0FDL0IsQ0FDRixDQUFDO2FBQ0g7WUFFRCxPQUFPLCtCQUFhLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDekQsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBcEJELDhDQW9CQztJQUVELFNBQWdCLDZCQUE2QjtRQUMzQyxPQUFPLENBQUMsSUFBVSxFQUFFLEVBQUU7WUFDcEIsb0NBQWtCLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxFQUFFO2dCQUNwQyxJQUFJLDhCQUE4QixHQUFHLEtBQUssQ0FBQztnQkFDM0MsSUFBSSwwQkFBMEIsR0FBRyxLQUFLLENBQUM7Z0JBRXZDLHNDQUFvQixDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsRUFBRSxXQUFXLEVBQUUsRUFBRTtvQkFDbEQsOEJBQThCLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztvQkFDbkUsMEJBQTBCLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO2dCQUN0RSxDQUFDLENBQUMsQ0FBQztnQkFFSCxJQUFJLDhCQUE4QixJQUFJLENBQUMsMEJBQTBCLEVBQUU7b0JBQ2pFLE1BQU0sT0FBTyxHQUFhLG1DQUFpQixDQUN6QyxVQUFVLEVBQ1YsVUFBVSxDQUFDLFFBQVEsRUFDbkIsZUFBZSxFQUNmLGdCQUFnQixDQUNqQixDQUFDO29CQUNGLCtCQUFhLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7aUJBQ25EO1lBQ0gsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUM7SUFDSixDQUFDO0lBdEJELHNFQXNCQztJQUVELFNBQWdCLDZCQUE2QjtRQUMzQyxPQUFPLENBQUMsSUFBVSxFQUFFLEVBQUU7WUFDcEIsb0NBQWtCLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxFQUFFO2dCQUNwQyxJQUFJLDhCQUE4QixHQUFHLEtBQUssQ0FBQztnQkFDM0MsSUFBSSwwQkFBMEIsR0FBRyxLQUFLLENBQUM7Z0JBRXZDLHNDQUFvQixDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsRUFBRSxXQUFXLEVBQUUsRUFBRTtvQkFDbEQsOEJBQThCLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztvQkFDbkUsMEJBQTBCLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO2dCQUN0RSxDQUFDLENBQUMsQ0FBQztnQkFFSCxJQUFJLDhCQUE4QixJQUFJLENBQUMsMEJBQTBCLEVBQUU7b0JBQ2pFLE1BQU0sT0FBTyxHQUFhLG1DQUFpQixDQUN6QyxVQUFVLEVBQ1YsVUFBVSxDQUFDLFFBQVEsRUFDbkIsZUFBZSxFQUNmLGdCQUFnQixDQUNqQixDQUFDO29CQUNGLCtCQUFhLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7aUJBQ25EO1lBQ0gsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUM7SUFDSixDQUFDO0lBdEJELHNFQXNCQztJQUVEO1FBQ0UsT0FBTyxrQkFBSyxDQUFDO1lBQ1gsaUJBQWlCLEVBQUU7WUFDbkIsNkJBQTZCLEVBQUU7WUFDL0IsNkJBQTZCLEVBQUU7U0FDaEMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQU5ELDRCQU1DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgdHMgZnJvbSAndHlwZXNjcmlwdCc7XG5pbXBvcnQgeyBUcmVlLCBSdWxlLCBjaGFpbiB9IGZyb20gJ0Bhbmd1bGFyLWRldmtpdC9zY2hlbWF0aWNzJztcbmltcG9ydCB7XG4gIGNvbW1pdENoYW5nZXMsXG4gIHZpc2l0VGVtcGxhdGVzLFxuICBSZXBsYWNlQ2hhbmdlLFxuICBDaGFuZ2UsXG4gIHZpc2l0VFNTb3VyY2VGaWxlcyxcbiAgdmlzaXROZ01vZHVsZUltcG9ydHMsXG4gIHZpc2l0TmdNb2R1bGVFeHBvcnRzLFxuICBhZGRJbXBvcnRUb01vZHVsZSxcbiAgYWRkRXhwb3J0VG9Nb2R1bGUsXG59IGZyb20gJ0BuZ3J4L3NjaGVtYXRpY3Mvc2NoZW1hdGljcy1jb3JlJztcblxuY29uc3QgQVNZTkNfUkVHRVhQID0gL1xcfCB7MCx9YXN5bmMvZztcbmNvbnN0IFJFQUNUSVZFX01PRFVMRSA9ICdSZWFjdGl2ZUNvbXBvbmVudE1vZHVsZSc7XG5jb25zdCBDT01QT05FTlRfTU9EVUxFID0gJ0BuZ3J4L2NvbXBvbmVudCc7XG5cbmNvbnN0IHJlYWN0aXZlTW9kdWxlVG9GaW5kID0gKG5vZGU6IHRzLk5vZGUpID0+XG4gIHRzLmlzSWRlbnRpZmllcihub2RlKSAmJiBub2RlLnRleHQgPT09IFJFQUNUSVZFX01PRFVMRTtcblxuY29uc3QgbmdNb2R1bGVzVG9GaW5kID0gKG5vZGU6IHRzLk5vZGUpID0+XG4gIHRzLmlzSWRlbnRpZmllcihub2RlKSAmJlxuICAobm9kZS50ZXh0ID09PSAnQ29tbW9uTW9kdWxlJyB8fCBub2RlLnRleHQgPT09ICdCcm93c2VyTW9kdWxlJyk7XG5cbmV4cG9ydCBmdW5jdGlvbiBtaWdyYXRlVG9OZ3J4UHVzaCgpOiBSdWxlIHtcbiAgcmV0dXJuIChob3N0OiBUcmVlKSA9PlxuICAgIHZpc2l0VGVtcGxhdGVzKGhvc3QsIHRlbXBsYXRlID0+IHtcbiAgICAgIGxldCBtYXRjaDogUmVnRXhwTWF0Y2hBcnJheSB8IG51bGw7XG4gICAgICBsZXQgY2hhbmdlczogQ2hhbmdlW10gPSBbXTtcbiAgICAgIHdoaWxlICgobWF0Y2ggPSBBU1lOQ19SRUdFWFAuZXhlYyh0ZW1wbGF0ZS5jb250ZW50KSkgIT09IG51bGwpIHtcbiAgICAgICAgY29uc3QgbSA9IG1hdGNoLnRvU3RyaW5nKCk7XG5cbiAgICAgICAgY2hhbmdlcy5wdXNoKFxuICAgICAgICAgIG5ldyBSZXBsYWNlQ2hhbmdlKFxuICAgICAgICAgICAgdGVtcGxhdGUuZmlsZU5hbWUsXG4gICAgICAgICAgICB0ZW1wbGF0ZS5zdGFydCArIG1hdGNoLmluZGV4ISxcbiAgICAgICAgICAgIG0sXG4gICAgICAgICAgICBtLnJlcGxhY2UoJ2FzeW5jJywgJ25ncnhQdXNoJylcbiAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjb21taXRDaGFuZ2VzKGhvc3QsIHRlbXBsYXRlLmZpbGVOYW1lLCBjaGFuZ2VzKTtcbiAgICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGltcG9ydFJlYWN0aXZlQ29tcG9uZW50TW9kdWxlKCk6IFJ1bGUge1xuICByZXR1cm4gKGhvc3Q6IFRyZWUpID0+IHtcbiAgICB2aXNpdFRTU291cmNlRmlsZXMoaG9zdCwgc291cmNlRmlsZSA9PiB7XG4gICAgICBsZXQgaGFzQ29tbW9uTW9kdWxlT3JCcm93c2VyTW9kdWxlID0gZmFsc2U7XG4gICAgICBsZXQgaGFzUmVhY3RpdmVDb21wb25lbnRNb2R1bGUgPSBmYWxzZTtcblxuICAgICAgdmlzaXROZ01vZHVsZUltcG9ydHMoc291cmNlRmlsZSwgKF8sIGltcG9ydE5vZGVzKSA9PiB7XG4gICAgICAgIGhhc0NvbW1vbk1vZHVsZU9yQnJvd3Nlck1vZHVsZSA9IGltcG9ydE5vZGVzLnNvbWUobmdNb2R1bGVzVG9GaW5kKTtcbiAgICAgICAgaGFzUmVhY3RpdmVDb21wb25lbnRNb2R1bGUgPSBpbXBvcnROb2Rlcy5zb21lKHJlYWN0aXZlTW9kdWxlVG9GaW5kKTtcbiAgICAgIH0pO1xuXG4gICAgICBpZiAoaGFzQ29tbW9uTW9kdWxlT3JCcm93c2VyTW9kdWxlICYmICFoYXNSZWFjdGl2ZUNvbXBvbmVudE1vZHVsZSkge1xuICAgICAgICBjb25zdCBjaGFuZ2VzOiBDaGFuZ2VbXSA9IGFkZEltcG9ydFRvTW9kdWxlKFxuICAgICAgICAgIHNvdXJjZUZpbGUsXG4gICAgICAgICAgc291cmNlRmlsZS5maWxlTmFtZSxcbiAgICAgICAgICBSRUFDVElWRV9NT0RVTEUsXG4gICAgICAgICAgQ09NUE9ORU5UX01PRFVMRVxuICAgICAgICApO1xuICAgICAgICBjb21taXRDaGFuZ2VzKGhvc3QsIHNvdXJjZUZpbGUuZmlsZU5hbWUsIGNoYW5nZXMpO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZXhwb3J0UmVhY3RpdmVDb21wb25lbnRNb2R1bGUoKTogUnVsZSB7XG4gIHJldHVybiAoaG9zdDogVHJlZSkgPT4ge1xuICAgIHZpc2l0VFNTb3VyY2VGaWxlcyhob3N0LCBzb3VyY2VGaWxlID0+IHtcbiAgICAgIGxldCBoYXNDb21tb25Nb2R1bGVPckJyb3dzZXJNb2R1bGUgPSBmYWxzZTtcbiAgICAgIGxldCBoYXNSZWFjdGl2ZUNvbXBvbmVudE1vZHVsZSA9IGZhbHNlO1xuXG4gICAgICB2aXNpdE5nTW9kdWxlRXhwb3J0cyhzb3VyY2VGaWxlLCAoXywgZXhwb3J0Tm9kZXMpID0+IHtcbiAgICAgICAgaGFzQ29tbW9uTW9kdWxlT3JCcm93c2VyTW9kdWxlID0gZXhwb3J0Tm9kZXMuc29tZShuZ01vZHVsZXNUb0ZpbmQpO1xuICAgICAgICBoYXNSZWFjdGl2ZUNvbXBvbmVudE1vZHVsZSA9IGV4cG9ydE5vZGVzLnNvbWUocmVhY3RpdmVNb2R1bGVUb0ZpbmQpO1xuICAgICAgfSk7XG5cbiAgICAgIGlmIChoYXNDb21tb25Nb2R1bGVPckJyb3dzZXJNb2R1bGUgJiYgIWhhc1JlYWN0aXZlQ29tcG9uZW50TW9kdWxlKSB7XG4gICAgICAgIGNvbnN0IGNoYW5nZXM6IENoYW5nZVtdID0gYWRkRXhwb3J0VG9Nb2R1bGUoXG4gICAgICAgICAgc291cmNlRmlsZSxcbiAgICAgICAgICBzb3VyY2VGaWxlLmZpbGVOYW1lLFxuICAgICAgICAgIFJFQUNUSVZFX01PRFVMRSxcbiAgICAgICAgICBDT01QT05FTlRfTU9EVUxFXG4gICAgICAgICk7XG4gICAgICAgIGNvbW1pdENoYW5nZXMoaG9zdCwgc291cmNlRmlsZS5maWxlTmFtZSwgY2hhbmdlcyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCk6IFJ1bGUge1xuICByZXR1cm4gY2hhaW4oW1xuICAgIG1pZ3JhdGVUb05ncnhQdXNoKCksXG4gICAgaW1wb3J0UmVhY3RpdmVDb21wb25lbnRNb2R1bGUoKSxcbiAgICBleHBvcnRSZWFjdGl2ZUNvbXBvbmVudE1vZHVsZSgpLFxuICBdKTtcbn1cbiJdfQ==