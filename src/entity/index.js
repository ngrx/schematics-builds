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
                schematics_core_1.addReducerImportToNgModule(Object.assign({}, options)),
                schematics_1.branchAndMerge(schematics_1.chain([schematics_1.mergeWith(commonTemplates), schematics_1.mergeWith(templateSource)])),
            ])(host, context);
        };
    }
    exports.default = default_1;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3NjaGVtYXRpY3Mvc3JjL2VudGl0eS9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztJQUFBLDJEQWVvQztJQUNwQyxzRUFPMEM7SUFHMUMsbUJBQXdCLE9BQXNCO1FBQzVDLE9BQU8sQ0FBQyxJQUFVLEVBQUUsT0FBeUIsRUFBRSxFQUFFO1lBQy9DLE9BQU8sQ0FBQyxJQUFJLEdBQUcsZ0NBQWMsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFFN0MsTUFBTSxVQUFVLEdBQUcsMkJBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN6RCxPQUFPLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUM7WUFDL0IsT0FBTyxDQUFDLElBQUksR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDO1lBRS9CLElBQUksT0FBTyxDQUFDLE1BQU0sRUFBRTtnQkFDbEIsT0FBTyxDQUFDLE1BQU0sR0FBRyx1Q0FBcUIsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7YUFDdkQ7WUFFRCxNQUFNLGVBQWUscUJBQ2hCLDZCQUFXLElBQ2QsU0FBUyxFQUFFLENBQUMsQ0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQ2pELGVBQWUsRUFBRSxDQUFDLElBQVksRUFBRSxFQUFFLENBQ2hDLDZCQUFXLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUN6RCxjQUFjLEVBQUUsQ0FBQyxJQUFZLEVBQUUsRUFBRSxDQUMvQiw2QkFBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFDeEQsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFTLEVBQUUsRUFBRSxDQUM5Qiw2QkFBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFDbkQsT0FBa0IsQ0FDdkIsQ0FBQztZQUVGLE1BQU0sZUFBZSxHQUFHLGtCQUFLLENBQUMsZ0JBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFO2dCQUNuRCxPQUFPLENBQUMsSUFBSTtvQkFDVixDQUFDLENBQUMsaUJBQUksRUFBRTtvQkFDUixDQUFDLENBQUMsbUJBQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO2dCQUN2RCwyQkFBYyxDQUFDLGVBQWUsQ0FBQztnQkFDL0IsaUJBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDO2FBQ3RCLENBQUMsQ0FBQztZQUVILE1BQU0sY0FBYyxHQUFHLGtCQUFLLENBQzFCLGdCQUFHLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxFQUNyRCxDQUFDLDJCQUFjLENBQUMsZUFBZSxDQUFDLEVBQUUsaUJBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FDekQsQ0FBQztZQUVGLE9BQU8sa0JBQUssQ0FBQztnQkFDWCxtQ0FBaUIsbUJBQU0sT0FBTyxJQUFFLE1BQU0sRUFBRSxJQUFJLElBQUc7Z0JBQy9DLDRDQUEwQixtQkFBTSxPQUFPLEVBQUc7Z0JBQzFDLDJCQUFjLENBQ1osa0JBQUssQ0FBQyxDQUFDLHNCQUFTLENBQUMsZUFBZSxDQUFDLEVBQUUsc0JBQVMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQy9EO2FBQ0YsQ0FBQyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNwQixDQUFDLENBQUM7SUFDSixDQUFDO0lBN0NELDRCQTZDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIFJ1bGUsXG4gIFNjaGVtYXRpY3NFeGNlcHRpb24sXG4gIGFwcGx5LFxuICBhcHBseVRlbXBsYXRlcyxcbiAgYnJhbmNoQW5kTWVyZ2UsXG4gIGNoYWluLFxuICBmaWx0ZXIsXG4gIG1lcmdlV2l0aCxcbiAgbW92ZSxcbiAgbm9vcCxcbiAgdGVtcGxhdGUsXG4gIHVybCxcbiAgVHJlZSxcbiAgU2NoZW1hdGljQ29udGV4dCxcbn0gZnJvbSAnQGFuZ3VsYXItZGV2a2l0L3NjaGVtYXRpY3MnO1xuaW1wb3J0IHtcbiAgc3RyaW5nVXRpbHMsXG4gIGFkZFJlZHVjZXJUb1N0YXRlLFxuICBhZGRSZWR1Y2VySW1wb3J0VG9OZ01vZHVsZSxcbiAgZ2V0UHJvamVjdFBhdGgsXG4gIGZpbmRNb2R1bGVGcm9tT3B0aW9ucyxcbiAgcGFyc2VOYW1lLFxufSBmcm9tICdAbmdyeC9zY2hlbWF0aWNzL3NjaGVtYXRpY3MtY29yZSc7XG5pbXBvcnQgeyBTY2hlbWEgYXMgRW50aXR5T3B0aW9ucyB9IGZyb20gJy4vc2NoZW1hJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24ob3B0aW9uczogRW50aXR5T3B0aW9ucyk6IFJ1bGUge1xuICByZXR1cm4gKGhvc3Q6IFRyZWUsIGNvbnRleHQ6IFNjaGVtYXRpY0NvbnRleHQpID0+IHtcbiAgICBvcHRpb25zLnBhdGggPSBnZXRQcm9qZWN0UGF0aChob3N0LCBvcHRpb25zKTtcblxuICAgIGNvbnN0IHBhcnNlZFBhdGggPSBwYXJzZU5hbWUob3B0aW9ucy5wYXRoLCBvcHRpb25zLm5hbWUpO1xuICAgIG9wdGlvbnMubmFtZSA9IHBhcnNlZFBhdGgubmFtZTtcbiAgICBvcHRpb25zLnBhdGggPSBwYXJzZWRQYXRoLnBhdGg7XG5cbiAgICBpZiAob3B0aW9ucy5tb2R1bGUpIHtcbiAgICAgIG9wdGlvbnMubW9kdWxlID0gZmluZE1vZHVsZUZyb21PcHRpb25zKGhvc3QsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIGNvbnN0IHRlbXBsYXRlT3B0aW9ucyA9IHtcbiAgICAgIC4uLnN0cmluZ1V0aWxzLFxuICAgICAgJ2lmLWZsYXQnOiAoczogc3RyaW5nKSA9PiAob3B0aW9ucy5mbGF0ID8gJycgOiBzKSxcbiAgICAgICdncm91cC1hY3Rpb25zJzogKG5hbWU6IHN0cmluZykgPT5cbiAgICAgICAgc3RyaW5nVXRpbHMuZ3JvdXAobmFtZSwgb3B0aW9ucy5ncm91cCA/ICdhY3Rpb25zJyA6ICcnKSxcbiAgICAgICdncm91cC1tb2RlbHMnOiAobmFtZTogc3RyaW5nKSA9PlxuICAgICAgICBzdHJpbmdVdGlscy5ncm91cChuYW1lLCBvcHRpb25zLmdyb3VwID8gJ21vZGVscycgOiAnJyksXG4gICAgICAnZ3JvdXAtcmVkdWNlcnMnOiAoczogc3RyaW5nKSA9PlxuICAgICAgICBzdHJpbmdVdGlscy5ncm91cChzLCBvcHRpb25zLmdyb3VwID8gJ3JlZHVjZXJzJyA6ICcnKSxcbiAgICAgIC4uLihvcHRpb25zIGFzIG9iamVjdCksXG4gICAgfTtcblxuICAgIGNvbnN0IGNvbW1vblRlbXBsYXRlcyA9IGFwcGx5KHVybCgnLi9jb21tb24tZmlsZXMnKSwgW1xuICAgICAgb3B0aW9ucy5zcGVjXG4gICAgICAgID8gbm9vcCgpXG4gICAgICAgIDogZmlsdGVyKHBhdGggPT4gIXBhdGguZW5kc1dpdGgoJy5zcGVjLnRzLnRlbXBsYXRlJykpLFxuICAgICAgYXBwbHlUZW1wbGF0ZXModGVtcGxhdGVPcHRpb25zKSxcbiAgICAgIG1vdmUocGFyc2VkUGF0aC5wYXRoKSxcbiAgICBdKTtcblxuICAgIGNvbnN0IHRlbXBsYXRlU291cmNlID0gYXBwbHkoXG4gICAgICB1cmwob3B0aW9ucy5jcmVhdG9ycyA/ICcuL2NyZWF0b3ItZmlsZXMnIDogJy4vZmlsZXMnKSxcbiAgICAgIFthcHBseVRlbXBsYXRlcyh0ZW1wbGF0ZU9wdGlvbnMpLCBtb3ZlKHBhcnNlZFBhdGgucGF0aCldXG4gICAgKTtcblxuICAgIHJldHVybiBjaGFpbihbXG4gICAgICBhZGRSZWR1Y2VyVG9TdGF0ZSh7IC4uLm9wdGlvbnMsIHBsdXJhbDogdHJ1ZSB9KSxcbiAgICAgIGFkZFJlZHVjZXJJbXBvcnRUb05nTW9kdWxlKHsgLi4ub3B0aW9ucyB9KSxcbiAgICAgIGJyYW5jaEFuZE1lcmdlKFxuICAgICAgICBjaGFpbihbbWVyZ2VXaXRoKGNvbW1vblRlbXBsYXRlcyksIG1lcmdlV2l0aCh0ZW1wbGF0ZVNvdXJjZSldKVxuICAgICAgKSxcbiAgICBdKShob3N0LCBjb250ZXh0KTtcbiAgfTtcbn1cbiJdfQ==