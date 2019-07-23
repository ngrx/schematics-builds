(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@ngrx/schematics/src/entity/index", ["require", "exports", "@angular-devkit/schematics", "@ngrx/schematics/schematics-core"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const schematics_1 = require("@angular-devkit/schematics");
    const schematics_core_1 = require("@ngrx/schematics/schematics-core");
    function default_1(options) {
        return (host, context) => {
            options.path = schematics_core_1.getProjectPath(host, options);
            const parsedPath = schematics_core_1.parseName(options.path, options.name);
            options.name = parsedPath.name;
            options.path = parsedPath.path;
            if (options.module) {
                options.module = schematics_core_1.findModuleFromOptions(host, options);
            }
            const templateOptions = Object.assign({}, schematics_core_1.stringUtils, { 'if-flat': (s) => (options.flat ? '' : s), 'group-actions': (name) => schematics_core_1.stringUtils.group(name, options.group ? 'actions' : ''), 'group-models': (name) => schematics_core_1.stringUtils.group(name, options.group ? 'models' : ''), 'group-reducers': (s) => schematics_core_1.stringUtils.group(s, options.group ? 'reducers' : '') }, options);
            const commonTemplates = schematics_1.apply(schematics_1.url('./common-files'), [
                options.spec
                    ? schematics_1.noop()
                    : schematics_1.filter(path => !path.endsWith('.spec.ts.template')),
                schematics_1.applyTemplates(templateOptions),
                schematics_1.move(parsedPath.path),
            ]);
            const templateSource = schematics_1.apply(schematics_1.url(options.creators ? './creator-files' : './files'), [schematics_1.applyTemplates(templateOptions), schematics_1.move(parsedPath.path)]);
            return schematics_1.chain([
                schematics_core_1.addReducerToState(Object.assign({}, options, { plural: true })),
                schematics_core_1.addReducerImportToNgModule(Object.assign({}, options, { plural: true })),
                schematics_1.branchAndMerge(schematics_1.chain([schematics_1.mergeWith(commonTemplates), schematics_1.mergeWith(templateSource)])),
            ])(host, context);
        };
    }
    exports.default = default_1;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3NjaGVtYXRpY3Mvc3JjL2VudGl0eS9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztJQUFBLDJEQWVvQztJQUNwQyxzRUFPMEM7SUFHMUMsbUJBQXdCLE9BQXNCO1FBQzVDLE9BQU8sQ0FBQyxJQUFVLEVBQUUsT0FBeUIsRUFBRSxFQUFFO1lBQy9DLE9BQU8sQ0FBQyxJQUFJLEdBQUcsZ0NBQWMsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFFN0MsTUFBTSxVQUFVLEdBQUcsMkJBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN6RCxPQUFPLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUM7WUFDL0IsT0FBTyxDQUFDLElBQUksR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDO1lBRS9CLElBQUksT0FBTyxDQUFDLE1BQU0sRUFBRTtnQkFDbEIsT0FBTyxDQUFDLE1BQU0sR0FBRyx1Q0FBcUIsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7YUFDdkQ7WUFFRCxNQUFNLGVBQWUscUJBQ2hCLDZCQUFXLElBQ2QsU0FBUyxFQUFFLENBQUMsQ0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQ2pELGVBQWUsRUFBRSxDQUFDLElBQVksRUFBRSxFQUFFLENBQ2hDLDZCQUFXLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUN6RCxjQUFjLEVBQUUsQ0FBQyxJQUFZLEVBQUUsRUFBRSxDQUMvQiw2QkFBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFDeEQsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFTLEVBQUUsRUFBRSxDQUM5Qiw2QkFBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFDbkQsT0FBa0IsQ0FDdkIsQ0FBQztZQUVGLE1BQU0sZUFBZSxHQUFHLGtCQUFLLENBQUMsZ0JBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFO2dCQUNuRCxPQUFPLENBQUMsSUFBSTtvQkFDVixDQUFDLENBQUMsaUJBQUksRUFBRTtvQkFDUixDQUFDLENBQUMsbUJBQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO2dCQUN2RCwyQkFBYyxDQUFDLGVBQWUsQ0FBQztnQkFDL0IsaUJBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDO2FBQ3RCLENBQUMsQ0FBQztZQUVILE1BQU0sY0FBYyxHQUFHLGtCQUFLLENBQzFCLGdCQUFHLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxFQUNyRCxDQUFDLDJCQUFjLENBQUMsZUFBZSxDQUFDLEVBQUUsaUJBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FDekQsQ0FBQztZQUVGLE9BQU8sa0JBQUssQ0FBQztnQkFDWCxtQ0FBaUIsbUJBQU0sT0FBTyxJQUFFLE1BQU0sRUFBRSxJQUFJLElBQUc7Z0JBQy9DLDRDQUEwQixtQkFBTSxPQUFPLElBQUUsTUFBTSxFQUFFLElBQUksSUFBRztnQkFDeEQsMkJBQWMsQ0FDWixrQkFBSyxDQUFDLENBQUMsc0JBQVMsQ0FBQyxlQUFlLENBQUMsRUFBRSxzQkFBUyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FDL0Q7YUFDRixDQUFDLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3BCLENBQUMsQ0FBQztJQUNKLENBQUM7SUE3Q0QsNEJBNkNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgUnVsZSxcbiAgU2NoZW1hdGljc0V4Y2VwdGlvbixcbiAgYXBwbHksXG4gIGFwcGx5VGVtcGxhdGVzLFxuICBicmFuY2hBbmRNZXJnZSxcbiAgY2hhaW4sXG4gIGZpbHRlcixcbiAgbWVyZ2VXaXRoLFxuICBtb3ZlLFxuICBub29wLFxuICB0ZW1wbGF0ZSxcbiAgdXJsLFxuICBUcmVlLFxuICBTY2hlbWF0aWNDb250ZXh0LFxufSBmcm9tICdAYW5ndWxhci1kZXZraXQvc2NoZW1hdGljcyc7XG5pbXBvcnQge1xuICBzdHJpbmdVdGlscyxcbiAgYWRkUmVkdWNlclRvU3RhdGUsXG4gIGFkZFJlZHVjZXJJbXBvcnRUb05nTW9kdWxlLFxuICBnZXRQcm9qZWN0UGF0aCxcbiAgZmluZE1vZHVsZUZyb21PcHRpb25zLFxuICBwYXJzZU5hbWUsXG59IGZyb20gJ0BuZ3J4L3NjaGVtYXRpY3Mvc2NoZW1hdGljcy1jb3JlJztcbmltcG9ydCB7IFNjaGVtYSBhcyBFbnRpdHlPcHRpb25zIH0gZnJvbSAnLi9zY2hlbWEnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihvcHRpb25zOiBFbnRpdHlPcHRpb25zKTogUnVsZSB7XG4gIHJldHVybiAoaG9zdDogVHJlZSwgY29udGV4dDogU2NoZW1hdGljQ29udGV4dCkgPT4ge1xuICAgIG9wdGlvbnMucGF0aCA9IGdldFByb2plY3RQYXRoKGhvc3QsIG9wdGlvbnMpO1xuXG4gICAgY29uc3QgcGFyc2VkUGF0aCA9IHBhcnNlTmFtZShvcHRpb25zLnBhdGgsIG9wdGlvbnMubmFtZSk7XG4gICAgb3B0aW9ucy5uYW1lID0gcGFyc2VkUGF0aC5uYW1lO1xuICAgIG9wdGlvbnMucGF0aCA9IHBhcnNlZFBhdGgucGF0aDtcblxuICAgIGlmIChvcHRpb25zLm1vZHVsZSkge1xuICAgICAgb3B0aW9ucy5tb2R1bGUgPSBmaW5kTW9kdWxlRnJvbU9wdGlvbnMoaG9zdCwgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgY29uc3QgdGVtcGxhdGVPcHRpb25zID0ge1xuICAgICAgLi4uc3RyaW5nVXRpbHMsXG4gICAgICAnaWYtZmxhdCc6IChzOiBzdHJpbmcpID0+IChvcHRpb25zLmZsYXQgPyAnJyA6IHMpLFxuICAgICAgJ2dyb3VwLWFjdGlvbnMnOiAobmFtZTogc3RyaW5nKSA9PlxuICAgICAgICBzdHJpbmdVdGlscy5ncm91cChuYW1lLCBvcHRpb25zLmdyb3VwID8gJ2FjdGlvbnMnIDogJycpLFxuICAgICAgJ2dyb3VwLW1vZGVscyc6IChuYW1lOiBzdHJpbmcpID0+XG4gICAgICAgIHN0cmluZ1V0aWxzLmdyb3VwKG5hbWUsIG9wdGlvbnMuZ3JvdXAgPyAnbW9kZWxzJyA6ICcnKSxcbiAgICAgICdncm91cC1yZWR1Y2Vycyc6IChzOiBzdHJpbmcpID0+XG4gICAgICAgIHN0cmluZ1V0aWxzLmdyb3VwKHMsIG9wdGlvbnMuZ3JvdXAgPyAncmVkdWNlcnMnIDogJycpLFxuICAgICAgLi4uKG9wdGlvbnMgYXMgb2JqZWN0KSxcbiAgICB9O1xuXG4gICAgY29uc3QgY29tbW9uVGVtcGxhdGVzID0gYXBwbHkodXJsKCcuL2NvbW1vbi1maWxlcycpLCBbXG4gICAgICBvcHRpb25zLnNwZWNcbiAgICAgICAgPyBub29wKClcbiAgICAgICAgOiBmaWx0ZXIocGF0aCA9PiAhcGF0aC5lbmRzV2l0aCgnLnNwZWMudHMudGVtcGxhdGUnKSksXG4gICAgICBhcHBseVRlbXBsYXRlcyh0ZW1wbGF0ZU9wdGlvbnMpLFxuICAgICAgbW92ZShwYXJzZWRQYXRoLnBhdGgpLFxuICAgIF0pO1xuXG4gICAgY29uc3QgdGVtcGxhdGVTb3VyY2UgPSBhcHBseShcbiAgICAgIHVybChvcHRpb25zLmNyZWF0b3JzID8gJy4vY3JlYXRvci1maWxlcycgOiAnLi9maWxlcycpLFxuICAgICAgW2FwcGx5VGVtcGxhdGVzKHRlbXBsYXRlT3B0aW9ucyksIG1vdmUocGFyc2VkUGF0aC5wYXRoKV1cbiAgICApO1xuXG4gICAgcmV0dXJuIGNoYWluKFtcbiAgICAgIGFkZFJlZHVjZXJUb1N0YXRlKHsgLi4ub3B0aW9ucywgcGx1cmFsOiB0cnVlIH0pLFxuICAgICAgYWRkUmVkdWNlckltcG9ydFRvTmdNb2R1bGUoeyAuLi5vcHRpb25zLCBwbHVyYWw6IHRydWUgfSksXG4gICAgICBicmFuY2hBbmRNZXJnZShcbiAgICAgICAgY2hhaW4oW21lcmdlV2l0aChjb21tb25UZW1wbGF0ZXMpLCBtZXJnZVdpdGgodGVtcGxhdGVTb3VyY2UpXSlcbiAgICAgICksXG4gICAgXSkoaG9zdCwgY29udGV4dCk7XG4gIH07XG59XG4iXX0=