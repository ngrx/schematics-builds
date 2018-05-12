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
        define("@ngrx/schematics/src/reducer/index", ["require", "exports", "@angular-devkit/schematics", "@ngrx/schematics/schematics-core/index"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var schematics_1 = require("@angular-devkit/schematics");
    var schematics_core_1 = require("@ngrx/schematics/schematics-core/index");
    function default_1(options) {
        return function (host, context) {
            options.path = schematics_core_1.getProjectPath(host, options);
            if (options.module) {
                options.module = schematics_core_1.findModuleFromOptions(host, options);
            }
            var templateSource = schematics_1.apply(schematics_1.url('./files'), [
                options.spec ? schematics_1.noop() : schematics_1.filter(function (path) { return !path.endsWith('__spec.ts'); }),
                schematics_1.template(__assign({}, schematics_core_1.stringUtils, { 'if-flat': function (s) {
                        return schematics_core_1.stringUtils.group(options.flat ? '' : s, options.group ? 'reducers' : '');
                    } }, options, { dot: function () { return '.'; } })),
            ]);
            return schematics_1.chain([
                schematics_1.branchAndMerge(schematics_1.chain([
                    schematics_1.filter(function (path) { return !path.includes('node_modules'); }),
                    schematics_core_1.addReducerToState(options),
                ])),
                schematics_1.branchAndMerge(schematics_1.chain([
                    schematics_1.filter(function (path) {
                        return path.endsWith('.module.ts') &&
                            !path.endsWith('-routing.module.ts');
                    }),
                    schematics_core_1.addReducerImportToNgModule(options),
                    schematics_1.mergeWith(templateSource),
                ])),
            ])(host, context);
        };
    }
    exports.default = default_1;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3NjaGVtYXRpY3Mvc3JjL3JlZHVjZXIvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUFBLHlEQWNvQztJQUVwQywwRUFNMEM7SUFHMUMsbUJBQXdCLE9BQXVCO1FBQzdDLE1BQU0sQ0FBQyxVQUFDLElBQVUsRUFBRSxPQUF5QjtZQUMzQyxPQUFPLENBQUMsSUFBSSxHQUFHLGdDQUFjLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBRTdDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUNuQixPQUFPLENBQUMsTUFBTSxHQUFHLHVDQUFxQixDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztZQUN4RCxDQUFDO1lBRUQsSUFBTSxjQUFjLEdBQUcsa0JBQUssQ0FBQyxnQkFBRyxDQUFDLFNBQVMsQ0FBQyxFQUFFO2dCQUMzQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxpQkFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLG1CQUFNLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEVBQTNCLENBQTJCLENBQUM7Z0JBQ25FLHFCQUFRLENBQUMsYUFDSiw2QkFBVyxJQUNkLFNBQVMsRUFBRSxVQUFDLENBQVM7d0JBQ25CLE9BQUEsNkJBQVcsQ0FBQyxLQUFLLENBQ2YsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQ3JCLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUNoQztvQkFIRCxDQUdDLElBQ0MsT0FBa0IsSUFDdEIsR0FBRyxFQUFFLGNBQU0sT0FBQSxHQUFHLEVBQUgsQ0FBRyxHQUNSLENBQUM7YUFDVixDQUFDLENBQUM7WUFFSCxNQUFNLENBQUMsa0JBQUssQ0FBQztnQkFDWCwyQkFBYyxDQUNaLGtCQUFLLENBQUM7b0JBQ0osbUJBQU0sQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsRUFBOUIsQ0FBOEIsQ0FBQztvQkFDOUMsbUNBQWlCLENBQUMsT0FBTyxDQUFDO2lCQUMzQixDQUFDLENBQ0g7Z0JBQ0QsMkJBQWMsQ0FDWixrQkFBSyxDQUFDO29CQUNKLG1CQUFNLENBQ0osVUFBQSxJQUFJO3dCQUNGLE9BQUEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUM7NEJBQzNCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQztvQkFEcEMsQ0FDb0MsQ0FDdkM7b0JBQ0QsNENBQTBCLENBQUMsT0FBTyxDQUFDO29CQUNuQyxzQkFBUyxDQUFDLGNBQWMsQ0FBQztpQkFDMUIsQ0FBQyxDQUNIO2FBQ0YsQ0FBQyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNwQixDQUFDLENBQUM7SUFDSixDQUFDO0lBMUNELDRCQTBDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIFJ1bGUsXG4gIFNjaGVtYXRpY0NvbnRleHQsXG4gIFNjaGVtYXRpY3NFeGNlcHRpb24sXG4gIFRyZWUsXG4gIGFwcGx5LFxuICBicmFuY2hBbmRNZXJnZSxcbiAgY2hhaW4sXG4gIGZpbHRlcixcbiAgbWVyZ2VXaXRoLFxuICBtb3ZlLFxuICBub29wLFxuICB0ZW1wbGF0ZSxcbiAgdXJsLFxufSBmcm9tICdAYW5ndWxhci1kZXZraXQvc2NoZW1hdGljcyc7XG5pbXBvcnQgKiBhcyB0cyBmcm9tICd0eXBlc2NyaXB0JztcbmltcG9ydCB7XG4gIGdldFByb2plY3RQYXRoLFxuICBmaW5kTW9kdWxlRnJvbU9wdGlvbnMsXG4gIHN0cmluZ1V0aWxzLFxuICBhZGRSZWR1Y2VyVG9TdGF0ZSxcbiAgYWRkUmVkdWNlckltcG9ydFRvTmdNb2R1bGUsXG59IGZyb20gJ0BuZ3J4L3NjaGVtYXRpY3Mvc2NoZW1hdGljcy1jb3JlJztcbmltcG9ydCB7IFNjaGVtYSBhcyBSZWR1Y2VyT3B0aW9ucyB9IGZyb20gJy4vc2NoZW1hJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24ob3B0aW9uczogUmVkdWNlck9wdGlvbnMpOiBSdWxlIHtcbiAgcmV0dXJuIChob3N0OiBUcmVlLCBjb250ZXh0OiBTY2hlbWF0aWNDb250ZXh0KSA9PiB7XG4gICAgb3B0aW9ucy5wYXRoID0gZ2V0UHJvamVjdFBhdGgoaG9zdCwgb3B0aW9ucyk7XG5cbiAgICBpZiAob3B0aW9ucy5tb2R1bGUpIHtcbiAgICAgIG9wdGlvbnMubW9kdWxlID0gZmluZE1vZHVsZUZyb21PcHRpb25zKGhvc3QsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIGNvbnN0IHRlbXBsYXRlU291cmNlID0gYXBwbHkodXJsKCcuL2ZpbGVzJyksIFtcbiAgICAgIG9wdGlvbnMuc3BlYyA/IG5vb3AoKSA6IGZpbHRlcihwYXRoID0+ICFwYXRoLmVuZHNXaXRoKCdfX3NwZWMudHMnKSksXG4gICAgICB0ZW1wbGF0ZSh7XG4gICAgICAgIC4uLnN0cmluZ1V0aWxzLFxuICAgICAgICAnaWYtZmxhdCc6IChzOiBzdHJpbmcpID0+XG4gICAgICAgICAgc3RyaW5nVXRpbHMuZ3JvdXAoXG4gICAgICAgICAgICBvcHRpb25zLmZsYXQgPyAnJyA6IHMsXG4gICAgICAgICAgICBvcHRpb25zLmdyb3VwID8gJ3JlZHVjZXJzJyA6ICcnXG4gICAgICAgICAgKSxcbiAgICAgICAgLi4uKG9wdGlvbnMgYXMgb2JqZWN0KSxcbiAgICAgICAgZG90OiAoKSA9PiAnLicsXG4gICAgICB9IGFzIGFueSksXG4gICAgXSk7XG5cbiAgICByZXR1cm4gY2hhaW4oW1xuICAgICAgYnJhbmNoQW5kTWVyZ2UoXG4gICAgICAgIGNoYWluKFtcbiAgICAgICAgICBmaWx0ZXIocGF0aCA9PiAhcGF0aC5pbmNsdWRlcygnbm9kZV9tb2R1bGVzJykpLFxuICAgICAgICAgIGFkZFJlZHVjZXJUb1N0YXRlKG9wdGlvbnMpLFxuICAgICAgICBdKVxuICAgICAgKSxcbiAgICAgIGJyYW5jaEFuZE1lcmdlKFxuICAgICAgICBjaGFpbihbXG4gICAgICAgICAgZmlsdGVyKFxuICAgICAgICAgICAgcGF0aCA9PlxuICAgICAgICAgICAgICBwYXRoLmVuZHNXaXRoKCcubW9kdWxlLnRzJykgJiZcbiAgICAgICAgICAgICAgIXBhdGguZW5kc1dpdGgoJy1yb3V0aW5nLm1vZHVsZS50cycpXG4gICAgICAgICAgKSxcbiAgICAgICAgICBhZGRSZWR1Y2VySW1wb3J0VG9OZ01vZHVsZShvcHRpb25zKSxcbiAgICAgICAgICBtZXJnZVdpdGgodGVtcGxhdGVTb3VyY2UpLFxuICAgICAgICBdKVxuICAgICAgKSxcbiAgICBdKShob3N0LCBjb250ZXh0KTtcbiAgfTtcbn1cbiJdfQ==