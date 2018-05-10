var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@ngrx/schematics/src/entity/index", ["require", "exports", "@angular-devkit/schematics", "@ngrx/schematics/src/schematics-core/index"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var schematics_1 = require("@angular-devkit/schematics");
    var schematics_core_1 = require("@ngrx/schematics/src/schematics-core/index");
    function default_1(options) {
        return function (host, context) {
            options.path = schematics_core_1.getProjectPath(host, options);
            if (options.module) {
                options.module = schematics_core_1.findModuleFromOptions(host, options);
            }
            var templateSource = schematics_1.apply(schematics_1.url('./files'), [
                options.spec ? schematics_1.noop() : schematics_1.filter(function (path) { return !path.endsWith('__spec.ts'); }),
                schematics_1.template(__assign({}, schematics_core_1.stringUtils, { 'if-flat': function (s) { return (options.flat ? '' : s); }, 'group-actions': function (name) {
                        return schematics_core_1.stringUtils.group(name, options.group ? 'actions' : '');
                    }, 'group-models': function (name) {
                        return schematics_core_1.stringUtils.group(name, options.group ? 'models' : '');
                    }, 'group-reducers': function (s) {
                        return schematics_core_1.stringUtils.group(s, options.group ? 'reducers' : '');
                    } }, options, { dot: function () { return '.'; } })),
            ]);
            return schematics_1.chain([
                schematics_core_1.addReducerToState(__assign({}, options)),
                schematics_core_1.addReducerImportToNgModule(__assign({}, options)),
                schematics_1.branchAndMerge(schematics_1.chain([schematics_1.mergeWith(templateSource)])),
            ])(host, context);
        };
    }
    exports.default = default_1;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3NjaGVtYXRpY3Mvc3JjL2VudGl0eS9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBQUEseURBY29DO0lBQ3BDLDhFQU00QjtJQUc1QixtQkFBd0IsT0FBc0I7UUFDNUMsTUFBTSxDQUFDLFVBQUMsSUFBVSxFQUFFLE9BQXlCO1lBQzNDLE9BQU8sQ0FBQyxJQUFJLEdBQUcsZ0NBQWMsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFFN0MsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQ25CLE9BQU8sQ0FBQyxNQUFNLEdBQUcsdUNBQXFCLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQ3hELENBQUM7WUFFRCxJQUFNLGNBQWMsR0FBRyxrQkFBSyxDQUFDLGdCQUFHLENBQUMsU0FBUyxDQUFDLEVBQUU7Z0JBQzNDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLGlCQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsbUJBQU0sQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsRUFBM0IsQ0FBMkIsQ0FBQztnQkFDbkUscUJBQVEsQ0FBQyxhQUNKLDZCQUFXLElBQ2QsU0FBUyxFQUFFLFVBQUMsQ0FBUyxJQUFLLE9BQUEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUF2QixDQUF1QixFQUNqRCxlQUFlLEVBQUUsVUFBQyxJQUFZO3dCQUM1QixPQUFBLDZCQUFXLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztvQkFBdkQsQ0FBdUQsRUFDekQsY0FBYyxFQUFFLFVBQUMsSUFBWTt3QkFDM0IsT0FBQSw2QkFBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7b0JBQXRELENBQXNELEVBQ3hELGdCQUFnQixFQUFFLFVBQUMsQ0FBUzt3QkFDMUIsT0FBQSw2QkFBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7b0JBQXJELENBQXFELElBQ25ELE9BQWtCLElBQ3RCLEdBQUcsRUFBRSxjQUFNLE9BQUEsR0FBRyxFQUFILENBQUcsR0FDUixDQUFDO2FBQ1YsQ0FBQyxDQUFDO1lBRUgsTUFBTSxDQUFDLGtCQUFLLENBQUM7Z0JBQ1gsbUNBQWlCLGNBQU0sT0FBTyxFQUFHO2dCQUNqQyw0Q0FBMEIsY0FBTSxPQUFPLEVBQUc7Z0JBQzFDLDJCQUFjLENBQUMsa0JBQUssQ0FBQyxDQUFDLHNCQUFTLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ25ELENBQUMsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDcEIsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQTlCRCw0QkE4QkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBSdWxlLFxuICBTY2hlbWF0aWNzRXhjZXB0aW9uLFxuICBhcHBseSxcbiAgYnJhbmNoQW5kTWVyZ2UsXG4gIGNoYWluLFxuICBmaWx0ZXIsXG4gIG1lcmdlV2l0aCxcbiAgbW92ZSxcbiAgbm9vcCxcbiAgdGVtcGxhdGUsXG4gIHVybCxcbiAgVHJlZSxcbiAgU2NoZW1hdGljQ29udGV4dCxcbn0gZnJvbSAnQGFuZ3VsYXItZGV2a2l0L3NjaGVtYXRpY3MnO1xuaW1wb3J0IHtcbiAgc3RyaW5nVXRpbHMsXG4gIGFkZFJlZHVjZXJUb1N0YXRlLFxuICBhZGRSZWR1Y2VySW1wb3J0VG9OZ01vZHVsZSxcbiAgZ2V0UHJvamVjdFBhdGgsXG4gIGZpbmRNb2R1bGVGcm9tT3B0aW9ucyxcbn0gZnJvbSAnLi4vc2NoZW1hdGljcy1jb3JlJztcbmltcG9ydCB7IFNjaGVtYSBhcyBFbnRpdHlPcHRpb25zIH0gZnJvbSAnLi9zY2hlbWEnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihvcHRpb25zOiBFbnRpdHlPcHRpb25zKTogUnVsZSB7XG4gIHJldHVybiAoaG9zdDogVHJlZSwgY29udGV4dDogU2NoZW1hdGljQ29udGV4dCkgPT4ge1xuICAgIG9wdGlvbnMucGF0aCA9IGdldFByb2plY3RQYXRoKGhvc3QsIG9wdGlvbnMpO1xuXG4gICAgaWYgKG9wdGlvbnMubW9kdWxlKSB7XG4gICAgICBvcHRpb25zLm1vZHVsZSA9IGZpbmRNb2R1bGVGcm9tT3B0aW9ucyhob3N0LCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICBjb25zdCB0ZW1wbGF0ZVNvdXJjZSA9IGFwcGx5KHVybCgnLi9maWxlcycpLCBbXG4gICAgICBvcHRpb25zLnNwZWMgPyBub29wKCkgOiBmaWx0ZXIocGF0aCA9PiAhcGF0aC5lbmRzV2l0aCgnX19zcGVjLnRzJykpLFxuICAgICAgdGVtcGxhdGUoe1xuICAgICAgICAuLi5zdHJpbmdVdGlscyxcbiAgICAgICAgJ2lmLWZsYXQnOiAoczogc3RyaW5nKSA9PiAob3B0aW9ucy5mbGF0ID8gJycgOiBzKSxcbiAgICAgICAgJ2dyb3VwLWFjdGlvbnMnOiAobmFtZTogc3RyaW5nKSA9PlxuICAgICAgICAgIHN0cmluZ1V0aWxzLmdyb3VwKG5hbWUsIG9wdGlvbnMuZ3JvdXAgPyAnYWN0aW9ucycgOiAnJyksXG4gICAgICAgICdncm91cC1tb2RlbHMnOiAobmFtZTogc3RyaW5nKSA9PlxuICAgICAgICAgIHN0cmluZ1V0aWxzLmdyb3VwKG5hbWUsIG9wdGlvbnMuZ3JvdXAgPyAnbW9kZWxzJyA6ICcnKSxcbiAgICAgICAgJ2dyb3VwLXJlZHVjZXJzJzogKHM6IHN0cmluZykgPT5cbiAgICAgICAgICBzdHJpbmdVdGlscy5ncm91cChzLCBvcHRpb25zLmdyb3VwID8gJ3JlZHVjZXJzJyA6ICcnKSxcbiAgICAgICAgLi4uKG9wdGlvbnMgYXMgb2JqZWN0KSxcbiAgICAgICAgZG90OiAoKSA9PiAnLicsXG4gICAgICB9IGFzIGFueSksXG4gICAgXSk7XG5cbiAgICByZXR1cm4gY2hhaW4oW1xuICAgICAgYWRkUmVkdWNlclRvU3RhdGUoeyAuLi5vcHRpb25zIH0pLFxuICAgICAgYWRkUmVkdWNlckltcG9ydFRvTmdNb2R1bGUoeyAuLi5vcHRpb25zIH0pLFxuICAgICAgYnJhbmNoQW5kTWVyZ2UoY2hhaW4oW21lcmdlV2l0aCh0ZW1wbGF0ZVNvdXJjZSldKSksXG4gICAgXSkoaG9zdCwgY29udGV4dCk7XG4gIH07XG59XG4iXX0=