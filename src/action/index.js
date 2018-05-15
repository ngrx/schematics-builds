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
        define("@ngrx/schematics/src/action/index", ["require", "exports", "@angular-devkit/schematics", "@ngrx/schematics/schematics-core/index"], factory);
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
            var templateSource = schematics_1.apply(schematics_1.url('./files'), [
                options.spec ? schematics_1.noop() : schematics_1.filter(function (path) { return !path.endsWith('__spec.ts'); }),
                schematics_1.template(__assign({ 'if-flat': function (s) {
                        return schematics_core_1.stringUtils.group(options.flat ? '' : s, options.group ? 'actions' : '');
                    } }, schematics_core_1.stringUtils, options, { dot: function () { return '.'; } })),
                schematics_1.move(parsedPath.path),
            ]);
            return schematics_1.chain([schematics_1.branchAndMerge(schematics_1.chain([schematics_1.mergeWith(templateSource)]))])(host, context);
        };
    }
    exports.default = default_1;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3NjaGVtYXRpY3Mvc3JjL2FjdGlvbi9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBQUEseURBY29DO0lBRXBDLDBFQUkwQztJQUUxQyxtQkFBd0IsT0FBc0I7UUFDNUMsTUFBTSxDQUFDLFVBQUMsSUFBVSxFQUFFLE9BQXlCO1lBQzNDLE9BQU8sQ0FBQyxJQUFJLEdBQUcsZ0NBQWMsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFFN0MsSUFBTSxVQUFVLEdBQUcsMkJBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN6RCxPQUFPLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUM7WUFDL0IsT0FBTyxDQUFDLElBQUksR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDO1lBRS9CLElBQU0sY0FBYyxHQUFHLGtCQUFLLENBQUMsZ0JBQUcsQ0FBQyxTQUFTLENBQUMsRUFBRTtnQkFDM0MsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsaUJBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxtQkFBTSxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxFQUEzQixDQUEyQixDQUFDO2dCQUNuRSxxQkFBUSxDQUFDLFdBQ1AsU0FBUyxFQUFFLFVBQUMsQ0FBUzt3QkFDbkIsT0FBQSw2QkFBVyxDQUFDLEtBQUssQ0FDZixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDckIsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQy9CO29CQUhELENBR0MsSUFDQSw2QkFBVyxFQUNWLE9BQWtCLElBQ3RCLEdBQUcsRUFBRSxjQUFNLE9BQUEsR0FBRyxFQUFILENBQUcsR0FDUixDQUFDO2dCQUNULGlCQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQzthQUN0QixDQUFDLENBQUM7WUFFSCxNQUFNLENBQUMsa0JBQUssQ0FBQyxDQUFDLDJCQUFjLENBQUMsa0JBQUssQ0FBQyxDQUFDLHNCQUFTLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUNoRSxJQUFJLEVBQ0osT0FBTyxDQUNSLENBQUM7UUFDSixDQUFDLENBQUM7SUFDSixDQUFDO0lBNUJELDRCQTRCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIFJ1bGUsXG4gIFNjaGVtYXRpY3NFeGNlcHRpb24sXG4gIGFwcGx5LFxuICBicmFuY2hBbmRNZXJnZSxcbiAgY2hhaW4sXG4gIGZpbHRlcixcbiAgbWVyZ2VXaXRoLFxuICBtb3ZlLFxuICBub29wLFxuICB0ZW1wbGF0ZSxcbiAgdXJsLFxuICBUcmVlLFxuICBTY2hlbWF0aWNDb250ZXh0LFxufSBmcm9tICdAYW5ndWxhci1kZXZraXQvc2NoZW1hdGljcyc7XG5pbXBvcnQgeyBTY2hlbWEgYXMgQWN0aW9uT3B0aW9ucyB9IGZyb20gJy4vc2NoZW1hJztcbmltcG9ydCB7XG4gIGdldFByb2plY3RQYXRoLFxuICBzdHJpbmdVdGlscyxcbiAgcGFyc2VOYW1lLFxufSBmcm9tICdAbmdyeC9zY2hlbWF0aWNzL3NjaGVtYXRpY3MtY29yZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG9wdGlvbnM6IEFjdGlvbk9wdGlvbnMpOiBSdWxlIHtcbiAgcmV0dXJuIChob3N0OiBUcmVlLCBjb250ZXh0OiBTY2hlbWF0aWNDb250ZXh0KSA9PiB7XG4gICAgb3B0aW9ucy5wYXRoID0gZ2V0UHJvamVjdFBhdGgoaG9zdCwgb3B0aW9ucyk7XG5cbiAgICBjb25zdCBwYXJzZWRQYXRoID0gcGFyc2VOYW1lKG9wdGlvbnMucGF0aCwgb3B0aW9ucy5uYW1lKTtcbiAgICBvcHRpb25zLm5hbWUgPSBwYXJzZWRQYXRoLm5hbWU7XG4gICAgb3B0aW9ucy5wYXRoID0gcGFyc2VkUGF0aC5wYXRoO1xuXG4gICAgY29uc3QgdGVtcGxhdGVTb3VyY2UgPSBhcHBseSh1cmwoJy4vZmlsZXMnKSwgW1xuICAgICAgb3B0aW9ucy5zcGVjID8gbm9vcCgpIDogZmlsdGVyKHBhdGggPT4gIXBhdGguZW5kc1dpdGgoJ19fc3BlYy50cycpKSxcbiAgICAgIHRlbXBsYXRlKHtcbiAgICAgICAgJ2lmLWZsYXQnOiAoczogc3RyaW5nKSA9PlxuICAgICAgICAgIHN0cmluZ1V0aWxzLmdyb3VwKFxuICAgICAgICAgICAgb3B0aW9ucy5mbGF0ID8gJycgOiBzLFxuICAgICAgICAgICAgb3B0aW9ucy5ncm91cCA/ICdhY3Rpb25zJyA6ICcnXG4gICAgICAgICAgKSxcbiAgICAgICAgLi4uc3RyaW5nVXRpbHMsXG4gICAgICAgIC4uLihvcHRpb25zIGFzIG9iamVjdCksXG4gICAgICAgIGRvdDogKCkgPT4gJy4nLFxuICAgICAgfSBhcyBhbnkpLFxuICAgICAgbW92ZShwYXJzZWRQYXRoLnBhdGgpLFxuICAgIF0pO1xuXG4gICAgcmV0dXJuIGNoYWluKFticmFuY2hBbmRNZXJnZShjaGFpbihbbWVyZ2VXaXRoKHRlbXBsYXRlU291cmNlKV0pKV0pKFxuICAgICAgaG9zdCxcbiAgICAgIGNvbnRleHRcbiAgICApO1xuICB9O1xufVxuIl19