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
        define("@ngrx/schematics/src/entity/index", ["require", "exports", "@angular-devkit/schematics", "@ngrx/schematics/schematics-core/index"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var schematics_1 = require("@angular-devkit/schematics");
    var schematics_core_1 = require("@ngrx/schematics/schematics-core/index");
    function default_1(options) {
        return function (host, context) {
            options.path = schematics_core_1.getProjectPath(host, options);
            var parsedPath = schematics_core_1.parseName(options.path, options.name);
            options.name = parsedPath.name;
            options.path = parsedPath.path;
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
                schematics_1.move(parsedPath.path),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3NjaGVtYXRpY3Mvc3JjL2VudGl0eS9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBQUEseURBY29DO0lBQ3BDLDBFQU8wQztJQUcxQyxtQkFBd0IsT0FBc0I7UUFDNUMsTUFBTSxDQUFDLFVBQUMsSUFBVSxFQUFFLE9BQXlCO1lBQzNDLE9BQU8sQ0FBQyxJQUFJLEdBQUcsZ0NBQWMsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFFN0MsSUFBTSxVQUFVLEdBQUcsMkJBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN6RCxPQUFPLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUM7WUFDL0IsT0FBTyxDQUFDLElBQUksR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDO1lBRS9CLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUNuQixPQUFPLENBQUMsTUFBTSxHQUFHLHVDQUFxQixDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztZQUN4RCxDQUFDO1lBRUQsSUFBTSxjQUFjLEdBQUcsa0JBQUssQ0FBQyxnQkFBRyxDQUFDLFNBQVMsQ0FBQyxFQUFFO2dCQUMzQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxpQkFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLG1CQUFNLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEVBQTNCLENBQTJCLENBQUM7Z0JBQ25FLHFCQUFRLENBQUMsYUFDSiw2QkFBVyxJQUNkLFNBQVMsRUFBRSxVQUFDLENBQVMsSUFBSyxPQUFBLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBdkIsQ0FBdUIsRUFDakQsZUFBZSxFQUFFLFVBQUMsSUFBWTt3QkFDNUIsT0FBQSw2QkFBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7b0JBQXZELENBQXVELEVBQ3pELGNBQWMsRUFBRSxVQUFDLElBQVk7d0JBQzNCLE9BQUEsNkJBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO29CQUF0RCxDQUFzRCxFQUN4RCxnQkFBZ0IsRUFBRSxVQUFDLENBQVM7d0JBQzFCLE9BQUEsNkJBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO29CQUFyRCxDQUFxRCxJQUNuRCxPQUFrQixJQUN0QixHQUFHLEVBQUUsY0FBTSxPQUFBLEdBQUcsRUFBSCxDQUFHLEdBQ1IsQ0FBQztnQkFDVCxpQkFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUM7YUFDdEIsQ0FBQyxDQUFDO1lBRUgsTUFBTSxDQUFDLGtCQUFLLENBQUM7Z0JBQ1gsbUNBQWlCLGNBQU0sT0FBTyxFQUFHO2dCQUNqQyw0Q0FBMEIsY0FBTSxPQUFPLEVBQUc7Z0JBQzFDLDJCQUFjLENBQUMsa0JBQUssQ0FBQyxDQUFDLHNCQUFTLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ25ELENBQUMsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDcEIsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQW5DRCw0QkFtQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBSdWxlLFxuICBTY2hlbWF0aWNzRXhjZXB0aW9uLFxuICBhcHBseSxcbiAgYnJhbmNoQW5kTWVyZ2UsXG4gIGNoYWluLFxuICBmaWx0ZXIsXG4gIG1lcmdlV2l0aCxcbiAgbW92ZSxcbiAgbm9vcCxcbiAgdGVtcGxhdGUsXG4gIHVybCxcbiAgVHJlZSxcbiAgU2NoZW1hdGljQ29udGV4dCxcbn0gZnJvbSAnQGFuZ3VsYXItZGV2a2l0L3NjaGVtYXRpY3MnO1xuaW1wb3J0IHtcbiAgc3RyaW5nVXRpbHMsXG4gIGFkZFJlZHVjZXJUb1N0YXRlLFxuICBhZGRSZWR1Y2VySW1wb3J0VG9OZ01vZHVsZSxcbiAgZ2V0UHJvamVjdFBhdGgsXG4gIGZpbmRNb2R1bGVGcm9tT3B0aW9ucyxcbiAgcGFyc2VOYW1lLFxufSBmcm9tICdAbmdyeC9zY2hlbWF0aWNzL3NjaGVtYXRpY3MtY29yZSc7XG5pbXBvcnQgeyBTY2hlbWEgYXMgRW50aXR5T3B0aW9ucyB9IGZyb20gJy4vc2NoZW1hJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24ob3B0aW9uczogRW50aXR5T3B0aW9ucyk6IFJ1bGUge1xuICByZXR1cm4gKGhvc3Q6IFRyZWUsIGNvbnRleHQ6IFNjaGVtYXRpY0NvbnRleHQpID0+IHtcbiAgICBvcHRpb25zLnBhdGggPSBnZXRQcm9qZWN0UGF0aChob3N0LCBvcHRpb25zKTtcblxuICAgIGNvbnN0IHBhcnNlZFBhdGggPSBwYXJzZU5hbWUob3B0aW9ucy5wYXRoLCBvcHRpb25zLm5hbWUpO1xuICAgIG9wdGlvbnMubmFtZSA9IHBhcnNlZFBhdGgubmFtZTtcbiAgICBvcHRpb25zLnBhdGggPSBwYXJzZWRQYXRoLnBhdGg7XG5cbiAgICBpZiAob3B0aW9ucy5tb2R1bGUpIHtcbiAgICAgIG9wdGlvbnMubW9kdWxlID0gZmluZE1vZHVsZUZyb21PcHRpb25zKGhvc3QsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIGNvbnN0IHRlbXBsYXRlU291cmNlID0gYXBwbHkodXJsKCcuL2ZpbGVzJyksIFtcbiAgICAgIG9wdGlvbnMuc3BlYyA/IG5vb3AoKSA6IGZpbHRlcihwYXRoID0+ICFwYXRoLmVuZHNXaXRoKCdfX3NwZWMudHMnKSksXG4gICAgICB0ZW1wbGF0ZSh7XG4gICAgICAgIC4uLnN0cmluZ1V0aWxzLFxuICAgICAgICAnaWYtZmxhdCc6IChzOiBzdHJpbmcpID0+IChvcHRpb25zLmZsYXQgPyAnJyA6IHMpLFxuICAgICAgICAnZ3JvdXAtYWN0aW9ucyc6IChuYW1lOiBzdHJpbmcpID0+XG4gICAgICAgICAgc3RyaW5nVXRpbHMuZ3JvdXAobmFtZSwgb3B0aW9ucy5ncm91cCA/ICdhY3Rpb25zJyA6ICcnKSxcbiAgICAgICAgJ2dyb3VwLW1vZGVscyc6IChuYW1lOiBzdHJpbmcpID0+XG4gICAgICAgICAgc3RyaW5nVXRpbHMuZ3JvdXAobmFtZSwgb3B0aW9ucy5ncm91cCA/ICdtb2RlbHMnIDogJycpLFxuICAgICAgICAnZ3JvdXAtcmVkdWNlcnMnOiAoczogc3RyaW5nKSA9PlxuICAgICAgICAgIHN0cmluZ1V0aWxzLmdyb3VwKHMsIG9wdGlvbnMuZ3JvdXAgPyAncmVkdWNlcnMnIDogJycpLFxuICAgICAgICAuLi4ob3B0aW9ucyBhcyBvYmplY3QpLFxuICAgICAgICBkb3Q6ICgpID0+ICcuJyxcbiAgICAgIH0gYXMgYW55KSxcbiAgICAgIG1vdmUocGFyc2VkUGF0aC5wYXRoKSxcbiAgICBdKTtcblxuICAgIHJldHVybiBjaGFpbihbXG4gICAgICBhZGRSZWR1Y2VyVG9TdGF0ZSh7IC4uLm9wdGlvbnMgfSksXG4gICAgICBhZGRSZWR1Y2VySW1wb3J0VG9OZ01vZHVsZSh7IC4uLm9wdGlvbnMgfSksXG4gICAgICBicmFuY2hBbmRNZXJnZShjaGFpbihbbWVyZ2VXaXRoKHRlbXBsYXRlU291cmNlKV0pKSxcbiAgICBdKShob3N0LCBjb250ZXh0KTtcbiAgfTtcbn1cbiJdfQ==