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
            const templateOptions = Object.assign(Object.assign(Object.assign({}, schematics_core_1.stringUtils), { 'if-flat': (s) => schematics_core_1.stringUtils.group(options.flat ? '' : s, options.group ? 'reducers' : '') }), options);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3NjaGVtYXRpY3Mvc3JjL3JlZHVjZXIvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7SUFBQSwyREFlb0M7SUFFcEMsc0VBTzBDO0lBRzFDLG1CQUF3QixPQUF1QjtRQUM3QyxPQUFPLENBQUMsSUFBVSxFQUFFLE9BQXlCLEVBQUUsRUFBRTtZQUMvQyxPQUFPLENBQUMsSUFBSSxHQUFHLGdDQUFjLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBRTdDLElBQUksT0FBTyxDQUFDLE1BQU0sRUFBRTtnQkFDbEIsT0FBTyxDQUFDLE1BQU0sR0FBRyx1Q0FBcUIsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7YUFDdkQ7WUFFRCxNQUFNLFVBQVUsR0FBRywyQkFBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3pELE9BQU8sQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQztZQUMvQixPQUFPLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUM7WUFFL0IsTUFBTSxlQUFlLGlEQUNoQiw2QkFBVyxLQUNkLFNBQVMsRUFBRSxDQUFDLENBQVMsRUFBRSxFQUFFLENBQ3ZCLDZCQUFXLENBQUMsS0FBSyxDQUNmLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUNyQixPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FDaEMsS0FDQyxPQUFrQixDQUN2QixDQUFDO1lBRUYsTUFBTSxjQUFjLEdBQUcsa0JBQUssQ0FBQyxnQkFBRyxDQUFDLGdCQUFnQixDQUFDLEVBQUU7Z0JBQ2xELE9BQU8sQ0FBQyxRQUFRO29CQUNkLENBQUMsQ0FBQyxtQkFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLG1CQUFtQixDQUFDLENBQUM7b0JBQ3JELENBQUMsQ0FBQyxpQkFBSSxFQUFFO2dCQUNWLDJCQUFjLENBQUMsZUFBZSxDQUFDO2dCQUMvQixpQkFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUM7YUFDdEIsQ0FBQyxDQUFDO1lBRUgsTUFBTSxjQUFjLEdBQUcsa0JBQUssQ0FDMUIsZ0JBQUcsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLEVBQ3JELENBQUMsMkJBQWMsQ0FBQyxlQUFlLENBQUMsRUFBRSxpQkFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUN6RCxDQUFDO1lBRUYsT0FBTyxrQkFBSyxDQUFDO2dCQUNYLDJCQUFjLENBQUMsa0JBQUssQ0FBQyxDQUFDLG1DQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbkQsMkJBQWMsQ0FDWixrQkFBSyxDQUFDO29CQUNKLDRDQUEwQixDQUFDLE9BQU8sQ0FBQztvQkFDbkMsc0JBQVMsQ0FBQyxjQUFjLENBQUM7b0JBQ3pCLHNCQUFTLENBQUMsY0FBYyxDQUFDO2lCQUMxQixDQUFDLENBQ0g7YUFDRixDQUFDLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3BCLENBQUMsQ0FBQztJQUNKLENBQUM7SUE5Q0QsNEJBOENDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgUnVsZSxcbiAgU2NoZW1hdGljQ29udGV4dCxcbiAgU2NoZW1hdGljc0V4Y2VwdGlvbixcbiAgVHJlZSxcbiAgYXBwbHksXG4gIGFwcGx5VGVtcGxhdGVzLFxuICBicmFuY2hBbmRNZXJnZSxcbiAgY2hhaW4sXG4gIGZpbHRlcixcbiAgbWVyZ2VXaXRoLFxuICBtb3ZlLFxuICBub29wLFxuICB0ZW1wbGF0ZSxcbiAgdXJsLFxufSBmcm9tICdAYW5ndWxhci1kZXZraXQvc2NoZW1hdGljcyc7XG5pbXBvcnQgKiBhcyB0cyBmcm9tICd0eXBlc2NyaXB0JztcbmltcG9ydCB7XG4gIGdldFByb2plY3RQYXRoLFxuICBmaW5kTW9kdWxlRnJvbU9wdGlvbnMsXG4gIHN0cmluZ1V0aWxzLFxuICBhZGRSZWR1Y2VyVG9TdGF0ZSxcbiAgYWRkUmVkdWNlckltcG9ydFRvTmdNb2R1bGUsXG4gIHBhcnNlTmFtZSxcbn0gZnJvbSAnQG5ncngvc2NoZW1hdGljcy9zY2hlbWF0aWNzLWNvcmUnO1xuaW1wb3J0IHsgU2NoZW1hIGFzIFJlZHVjZXJPcHRpb25zIH0gZnJvbSAnLi9zY2hlbWEnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihvcHRpb25zOiBSZWR1Y2VyT3B0aW9ucyk6IFJ1bGUge1xuICByZXR1cm4gKGhvc3Q6IFRyZWUsIGNvbnRleHQ6IFNjaGVtYXRpY0NvbnRleHQpID0+IHtcbiAgICBvcHRpb25zLnBhdGggPSBnZXRQcm9qZWN0UGF0aChob3N0LCBvcHRpb25zKTtcblxuICAgIGlmIChvcHRpb25zLm1vZHVsZSkge1xuICAgICAgb3B0aW9ucy5tb2R1bGUgPSBmaW5kTW9kdWxlRnJvbU9wdGlvbnMoaG9zdCwgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgY29uc3QgcGFyc2VkUGF0aCA9IHBhcnNlTmFtZShvcHRpb25zLnBhdGgsIG9wdGlvbnMubmFtZSk7XG4gICAgb3B0aW9ucy5uYW1lID0gcGFyc2VkUGF0aC5uYW1lO1xuICAgIG9wdGlvbnMucGF0aCA9IHBhcnNlZFBhdGgucGF0aDtcblxuICAgIGNvbnN0IHRlbXBsYXRlT3B0aW9ucyA9IHtcbiAgICAgIC4uLnN0cmluZ1V0aWxzLFxuICAgICAgJ2lmLWZsYXQnOiAoczogc3RyaW5nKSA9PlxuICAgICAgICBzdHJpbmdVdGlscy5ncm91cChcbiAgICAgICAgICBvcHRpb25zLmZsYXQgPyAnJyA6IHMsXG4gICAgICAgICAgb3B0aW9ucy5ncm91cCA/ICdyZWR1Y2VycycgOiAnJ1xuICAgICAgICApLFxuICAgICAgLi4uKG9wdGlvbnMgYXMgb2JqZWN0KSxcbiAgICB9O1xuXG4gICAgY29uc3QgY29tbW9uVGVtcGxhdGUgPSBhcHBseSh1cmwoJy4vY29tbW9uLWZpbGVzJyksIFtcbiAgICAgIG9wdGlvbnMuc2tpcFRlc3RcbiAgICAgICAgPyBmaWx0ZXIocGF0aCA9PiAhcGF0aC5lbmRzV2l0aCgnLnNwZWMudHMudGVtcGxhdGUnKSlcbiAgICAgICAgOiBub29wKCksXG4gICAgICBhcHBseVRlbXBsYXRlcyh0ZW1wbGF0ZU9wdGlvbnMpLFxuICAgICAgbW92ZShwYXJzZWRQYXRoLnBhdGgpLFxuICAgIF0pO1xuXG4gICAgY29uc3QgdGVtcGxhdGVTb3VyY2UgPSBhcHBseShcbiAgICAgIHVybChvcHRpb25zLmNyZWF0b3JzID8gJy4vY3JlYXRvci1maWxlcycgOiAnLi9maWxlcycpLFxuICAgICAgW2FwcGx5VGVtcGxhdGVzKHRlbXBsYXRlT3B0aW9ucyksIG1vdmUocGFyc2VkUGF0aC5wYXRoKV1cbiAgICApO1xuXG4gICAgcmV0dXJuIGNoYWluKFtcbiAgICAgIGJyYW5jaEFuZE1lcmdlKGNoYWluKFthZGRSZWR1Y2VyVG9TdGF0ZShvcHRpb25zKV0pKSxcbiAgICAgIGJyYW5jaEFuZE1lcmdlKFxuICAgICAgICBjaGFpbihbXG4gICAgICAgICAgYWRkUmVkdWNlckltcG9ydFRvTmdNb2R1bGUob3B0aW9ucyksXG4gICAgICAgICAgbWVyZ2VXaXRoKGNvbW1vblRlbXBsYXRlKSxcbiAgICAgICAgICBtZXJnZVdpdGgodGVtcGxhdGVTb3VyY2UpLFxuICAgICAgICBdKVxuICAgICAgKSxcbiAgICBdKShob3N0LCBjb250ZXh0KTtcbiAgfTtcbn1cbiJdfQ==