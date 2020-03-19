(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@ngrx/schematics/src/reducer/index", ["require", "exports", "@angular-devkit/schematics", "@ngrx/schematics/schematics-core"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const schematics_1 = require("@angular-devkit/schematics");
    const schematics_core_1 = require("@ngrx/schematics/schematics-core");
    function default_1(options) {
        return (host, context) => {
            options.path = schematics_core_1.getProjectPath(host, options);
            if (options.module) {
                options.module = schematics_core_1.findModuleFromOptions(host, options);
            }
            const parsedPath = schematics_core_1.parseName(options.path, options.name);
            options.name = parsedPath.name;
            options.path = parsedPath.path;
            const templateOptions = Object.assign(Object.assign(Object.assign({}, schematics_core_1.stringUtils), { 'if-flat': (s) => schematics_core_1.stringUtils.group(options.flat ? '' : s, options.group ? 'reducers' : ''), isIvyEnabled: schematics_core_1.isIvyEnabled(host, 'tsconfig.json') }), options);
            const commonTemplate = schematics_1.apply(schematics_1.url('./common-files'), [
                options.skipTest
                    ? schematics_1.filter(path => !path.endsWith('.spec.ts.template'))
                    : schematics_1.noop(),
                schematics_1.applyTemplates(templateOptions),
                schematics_1.move(parsedPath.path),
            ]);
            const templateSource = schematics_1.apply(schematics_1.url(options.creators ? './creator-files' : './files'), [schematics_1.applyTemplates(templateOptions), schematics_1.move(parsedPath.path)]);
            return schematics_1.chain([
                schematics_1.branchAndMerge(schematics_1.chain([schematics_core_1.addReducerToState(options)])),
                schematics_1.branchAndMerge(schematics_1.chain([
                    schematics_core_1.addReducerImportToNgModule(options),
                    schematics_1.mergeWith(commonTemplate),
                    schematics_1.mergeWith(templateSource),
                ])),
            ])(host, context);
        };
    }
    exports.default = default_1;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3NjaGVtYXRpY3Mvc3JjL3JlZHVjZXIvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7SUFBQSwyREFlb0M7SUFFcEMsc0VBUTBDO0lBRzFDLG1CQUF3QixPQUF1QjtRQUM3QyxPQUFPLENBQUMsSUFBVSxFQUFFLE9BQXlCLEVBQUUsRUFBRTtZQUMvQyxPQUFPLENBQUMsSUFBSSxHQUFHLGdDQUFjLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBRTdDLElBQUksT0FBTyxDQUFDLE1BQU0sRUFBRTtnQkFDbEIsT0FBTyxDQUFDLE1BQU0sR0FBRyx1Q0FBcUIsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7YUFDdkQ7WUFFRCxNQUFNLFVBQVUsR0FBRywyQkFBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3pELE9BQU8sQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQztZQUMvQixPQUFPLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUM7WUFFL0IsTUFBTSxlQUFlLGlEQUNoQiw2QkFBVyxLQUNkLFNBQVMsRUFBRSxDQUFDLENBQVMsRUFBRSxFQUFFLENBQ3ZCLDZCQUFXLENBQUMsS0FBSyxDQUNmLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUNyQixPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FDaEMsRUFDSCxZQUFZLEVBQUUsOEJBQVksQ0FBQyxJQUFJLEVBQUUsZUFBZSxDQUFDLEtBQzdDLE9BQWtCLENBQ3ZCLENBQUM7WUFFRixNQUFNLGNBQWMsR0FBRyxrQkFBSyxDQUFDLGdCQUFHLENBQUMsZ0JBQWdCLENBQUMsRUFBRTtnQkFDbEQsT0FBTyxDQUFDLFFBQVE7b0JBQ2QsQ0FBQyxDQUFDLG1CQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUMsQ0FBQztvQkFDckQsQ0FBQyxDQUFDLGlCQUFJLEVBQUU7Z0JBQ1YsMkJBQWMsQ0FBQyxlQUFlLENBQUM7Z0JBQy9CLGlCQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQzthQUN0QixDQUFDLENBQUM7WUFFSCxNQUFNLGNBQWMsR0FBRyxrQkFBSyxDQUMxQixnQkFBRyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsRUFDckQsQ0FBQywyQkFBYyxDQUFDLGVBQWUsQ0FBQyxFQUFFLGlCQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQ3pELENBQUM7WUFFRixPQUFPLGtCQUFLLENBQUM7Z0JBQ1gsMkJBQWMsQ0FBQyxrQkFBSyxDQUFDLENBQUMsbUNBQWlCLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNuRCwyQkFBYyxDQUNaLGtCQUFLLENBQUM7b0JBQ0osNENBQTBCLENBQUMsT0FBTyxDQUFDO29CQUNuQyxzQkFBUyxDQUFDLGNBQWMsQ0FBQztvQkFDekIsc0JBQVMsQ0FBQyxjQUFjLENBQUM7aUJBQzFCLENBQUMsQ0FDSDthQUNGLENBQUMsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDcEIsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQS9DRCw0QkErQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBSdWxlLFxuICBTY2hlbWF0aWNDb250ZXh0LFxuICBTY2hlbWF0aWNzRXhjZXB0aW9uLFxuICBUcmVlLFxuICBhcHBseSxcbiAgYXBwbHlUZW1wbGF0ZXMsXG4gIGJyYW5jaEFuZE1lcmdlLFxuICBjaGFpbixcbiAgZmlsdGVyLFxuICBtZXJnZVdpdGgsXG4gIG1vdmUsXG4gIG5vb3AsXG4gIHRlbXBsYXRlLFxuICB1cmwsXG59IGZyb20gJ0Bhbmd1bGFyLWRldmtpdC9zY2hlbWF0aWNzJztcbmltcG9ydCAqIGFzIHRzIGZyb20gJ3R5cGVzY3JpcHQnO1xuaW1wb3J0IHtcbiAgZ2V0UHJvamVjdFBhdGgsXG4gIGZpbmRNb2R1bGVGcm9tT3B0aW9ucyxcbiAgc3RyaW5nVXRpbHMsXG4gIGFkZFJlZHVjZXJUb1N0YXRlLFxuICBhZGRSZWR1Y2VySW1wb3J0VG9OZ01vZHVsZSxcbiAgcGFyc2VOYW1lLFxuICBpc0l2eUVuYWJsZWQsXG59IGZyb20gJ0BuZ3J4L3NjaGVtYXRpY3Mvc2NoZW1hdGljcy1jb3JlJztcbmltcG9ydCB7IFNjaGVtYSBhcyBSZWR1Y2VyT3B0aW9ucyB9IGZyb20gJy4vc2NoZW1hJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24ob3B0aW9uczogUmVkdWNlck9wdGlvbnMpOiBSdWxlIHtcbiAgcmV0dXJuIChob3N0OiBUcmVlLCBjb250ZXh0OiBTY2hlbWF0aWNDb250ZXh0KSA9PiB7XG4gICAgb3B0aW9ucy5wYXRoID0gZ2V0UHJvamVjdFBhdGgoaG9zdCwgb3B0aW9ucyk7XG5cbiAgICBpZiAob3B0aW9ucy5tb2R1bGUpIHtcbiAgICAgIG9wdGlvbnMubW9kdWxlID0gZmluZE1vZHVsZUZyb21PcHRpb25zKGhvc3QsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIGNvbnN0IHBhcnNlZFBhdGggPSBwYXJzZU5hbWUob3B0aW9ucy5wYXRoLCBvcHRpb25zLm5hbWUpO1xuICAgIG9wdGlvbnMubmFtZSA9IHBhcnNlZFBhdGgubmFtZTtcbiAgICBvcHRpb25zLnBhdGggPSBwYXJzZWRQYXRoLnBhdGg7XG5cbiAgICBjb25zdCB0ZW1wbGF0ZU9wdGlvbnMgPSB7XG4gICAgICAuLi5zdHJpbmdVdGlscyxcbiAgICAgICdpZi1mbGF0JzogKHM6IHN0cmluZykgPT5cbiAgICAgICAgc3RyaW5nVXRpbHMuZ3JvdXAoXG4gICAgICAgICAgb3B0aW9ucy5mbGF0ID8gJycgOiBzLFxuICAgICAgICAgIG9wdGlvbnMuZ3JvdXAgPyAncmVkdWNlcnMnIDogJydcbiAgICAgICAgKSxcbiAgICAgIGlzSXZ5RW5hYmxlZDogaXNJdnlFbmFibGVkKGhvc3QsICd0c2NvbmZpZy5qc29uJyksXG4gICAgICAuLi4ob3B0aW9ucyBhcyBvYmplY3QpLFxuICAgIH07XG5cbiAgICBjb25zdCBjb21tb25UZW1wbGF0ZSA9IGFwcGx5KHVybCgnLi9jb21tb24tZmlsZXMnKSwgW1xuICAgICAgb3B0aW9ucy5za2lwVGVzdFxuICAgICAgICA/IGZpbHRlcihwYXRoID0+ICFwYXRoLmVuZHNXaXRoKCcuc3BlYy50cy50ZW1wbGF0ZScpKVxuICAgICAgICA6IG5vb3AoKSxcbiAgICAgIGFwcGx5VGVtcGxhdGVzKHRlbXBsYXRlT3B0aW9ucyksXG4gICAgICBtb3ZlKHBhcnNlZFBhdGgucGF0aCksXG4gICAgXSk7XG5cbiAgICBjb25zdCB0ZW1wbGF0ZVNvdXJjZSA9IGFwcGx5KFxuICAgICAgdXJsKG9wdGlvbnMuY3JlYXRvcnMgPyAnLi9jcmVhdG9yLWZpbGVzJyA6ICcuL2ZpbGVzJyksXG4gICAgICBbYXBwbHlUZW1wbGF0ZXModGVtcGxhdGVPcHRpb25zKSwgbW92ZShwYXJzZWRQYXRoLnBhdGgpXVxuICAgICk7XG5cbiAgICByZXR1cm4gY2hhaW4oW1xuICAgICAgYnJhbmNoQW5kTWVyZ2UoY2hhaW4oW2FkZFJlZHVjZXJUb1N0YXRlKG9wdGlvbnMpXSkpLFxuICAgICAgYnJhbmNoQW5kTWVyZ2UoXG4gICAgICAgIGNoYWluKFtcbiAgICAgICAgICBhZGRSZWR1Y2VySW1wb3J0VG9OZ01vZHVsZShvcHRpb25zKSxcbiAgICAgICAgICBtZXJnZVdpdGgoY29tbW9uVGVtcGxhdGUpLFxuICAgICAgICAgIG1lcmdlV2l0aCh0ZW1wbGF0ZVNvdXJjZSksXG4gICAgICAgIF0pXG4gICAgICApLFxuICAgIF0pKGhvc3QsIGNvbnRleHQpO1xuICB9O1xufVxuIl19