(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@ngrx/schematics/src/selector/index", ["require", "exports", "@angular-devkit/schematics", "@ngrx/schematics/schematics-core"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const schematics_1 = require("@angular-devkit/schematics");
    const schematics_core_1 = require("@ngrx/schematics/schematics-core");
    function default_1(options) {
        return (host, context) => {
            options.path = schematics_core_1.getProjectPath(host, options);
            const parsedPath = schematics_core_1.parseName(options.path, options.name || '');
            options.name = parsedPath.name;
            options.path = parsedPath.path;
            const templateSource = schematics_1.apply(schematics_1.url('./files'), [
                options.spec
                    ? schematics_1.noop()
                    : schematics_1.filter(path => !path.endsWith('.spec.ts.template')),
                schematics_1.applyTemplates(Object.assign({}, schematics_core_1.stringUtils, { 'if-flat': (s) => schematics_core_1.stringUtils.group(options.flat ? '' : s, options.group ? 'selectors' : ''), reducerPath: `${relativePath(options)}${schematics_core_1.stringUtils.dasherize(options.name)}.reducer` }, options)),
                schematics_1.move(parsedPath.path),
            ]);
            return schematics_1.chain([schematics_1.branchAndMerge(schematics_1.chain([schematics_1.mergeWith(templateSource)]))])(host, context);
        };
    }
    exports.default = default_1;
    function relativePath(options) {
        if (options.feature) {
            return schematics_core_1.stringUtils.featurePath(options.group, options.flat, 'reducers', schematics_core_1.stringUtils.dasherize(options.name));
        }
        return '';
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3NjaGVtYXRpY3Mvc3JjL3NlbGVjdG9yL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0lBQUEsMkRBYW9DO0lBQ3BDLHNFQUkwQztJQUcxQyxtQkFBd0IsT0FBd0I7UUFDOUMsT0FBTyxDQUFDLElBQVUsRUFBRSxPQUF5QixFQUFFLEVBQUU7WUFDL0MsT0FBTyxDQUFDLElBQUksR0FBRyxnQ0FBYyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztZQUU3QyxNQUFNLFVBQVUsR0FBRywyQkFBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQztZQUMvRCxPQUFPLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUM7WUFDL0IsT0FBTyxDQUFDLElBQUksR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDO1lBRS9CLE1BQU0sY0FBYyxHQUFHLGtCQUFLLENBQUMsZ0JBQUcsQ0FBQyxTQUFTLENBQUMsRUFBRTtnQkFDM0MsT0FBTyxDQUFDLElBQUk7b0JBQ1YsQ0FBQyxDQUFDLGlCQUFJLEVBQUU7b0JBQ1IsQ0FBQyxDQUFDLG1CQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUMsQ0FBQztnQkFDdkQsMkJBQWMsQ0FBQyxrQkFDViw2QkFBVyxJQUNkLFNBQVMsRUFBRSxDQUFDLENBQVMsRUFBRSxFQUFFLENBQ3ZCLDZCQUFXLENBQUMsS0FBSyxDQUNmLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUNyQixPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FDakMsRUFDSCxXQUFXLEVBQUUsR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDLEdBQUcsNkJBQVcsQ0FBQyxTQUFTLENBQzNELE9BQU8sQ0FBQyxJQUFJLENBQ2IsVUFBVSxJQUNQLE9BQWtCLENBQ2hCLENBQUM7Z0JBQ1QsaUJBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDO2FBQ3RCLENBQUMsQ0FBQztZQUVILE9BQU8sa0JBQUssQ0FBQyxDQUFDLDJCQUFjLENBQUMsa0JBQUssQ0FBQyxDQUFDLHNCQUFTLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUNoRSxJQUFJLEVBQ0osT0FBTyxDQUNSLENBQUM7UUFDSixDQUFDLENBQUM7SUFDSixDQUFDO0lBaENELDRCQWdDQztJQUVELFNBQVMsWUFBWSxDQUFDLE9BQXdCO1FBQzVDLElBQUksT0FBTyxDQUFDLE9BQU8sRUFBRTtZQUNuQixPQUFPLDZCQUFXLENBQUMsV0FBVyxDQUM1QixPQUFPLENBQUMsS0FBSyxFQUNiLE9BQU8sQ0FBQyxJQUFJLEVBQ1osVUFBVSxFQUNWLDZCQUFXLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FDcEMsQ0FBQztTQUNIO1FBRUQsT0FBTyxFQUFFLENBQUM7SUFDWixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgUnVsZSxcbiAgU2NoZW1hdGljQ29udGV4dCxcbiAgVHJlZSxcbiAgYXBwbHksXG4gIGFwcGx5VGVtcGxhdGVzLFxuICBicmFuY2hBbmRNZXJnZSxcbiAgY2hhaW4sXG4gIGZpbHRlcixcbiAgbWVyZ2VXaXRoLFxuICBtb3ZlLFxuICBub29wLFxuICB1cmwsXG59IGZyb20gJ0Bhbmd1bGFyLWRldmtpdC9zY2hlbWF0aWNzJztcbmltcG9ydCB7XG4gIGdldFByb2plY3RQYXRoLFxuICBwYXJzZU5hbWUsXG4gIHN0cmluZ1V0aWxzLFxufSBmcm9tICdAbmdyeC9zY2hlbWF0aWNzL3NjaGVtYXRpY3MtY29yZSc7XG5pbXBvcnQgeyBTY2hlbWEgYXMgU2VsZWN0b3JPcHRpb25zIH0gZnJvbSAnLi9zY2hlbWEnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihvcHRpb25zOiBTZWxlY3Rvck9wdGlvbnMpOiBSdWxlIHtcbiAgcmV0dXJuIChob3N0OiBUcmVlLCBjb250ZXh0OiBTY2hlbWF0aWNDb250ZXh0KSA9PiB7XG4gICAgb3B0aW9ucy5wYXRoID0gZ2V0UHJvamVjdFBhdGgoaG9zdCwgb3B0aW9ucyk7XG5cbiAgICBjb25zdCBwYXJzZWRQYXRoID0gcGFyc2VOYW1lKG9wdGlvbnMucGF0aCwgb3B0aW9ucy5uYW1lIHx8ICcnKTtcbiAgICBvcHRpb25zLm5hbWUgPSBwYXJzZWRQYXRoLm5hbWU7XG4gICAgb3B0aW9ucy5wYXRoID0gcGFyc2VkUGF0aC5wYXRoO1xuXG4gICAgY29uc3QgdGVtcGxhdGVTb3VyY2UgPSBhcHBseSh1cmwoJy4vZmlsZXMnKSwgW1xuICAgICAgb3B0aW9ucy5zcGVjXG4gICAgICAgID8gbm9vcCgpXG4gICAgICAgIDogZmlsdGVyKHBhdGggPT4gIXBhdGguZW5kc1dpdGgoJy5zcGVjLnRzLnRlbXBsYXRlJykpLFxuICAgICAgYXBwbHlUZW1wbGF0ZXMoe1xuICAgICAgICAuLi5zdHJpbmdVdGlscyxcbiAgICAgICAgJ2lmLWZsYXQnOiAoczogc3RyaW5nKSA9PlxuICAgICAgICAgIHN0cmluZ1V0aWxzLmdyb3VwKFxuICAgICAgICAgICAgb3B0aW9ucy5mbGF0ID8gJycgOiBzLFxuICAgICAgICAgICAgb3B0aW9ucy5ncm91cCA/ICdzZWxlY3RvcnMnIDogJydcbiAgICAgICAgICApLFxuICAgICAgICByZWR1Y2VyUGF0aDogYCR7cmVsYXRpdmVQYXRoKG9wdGlvbnMpfSR7c3RyaW5nVXRpbHMuZGFzaGVyaXplKFxuICAgICAgICAgIG9wdGlvbnMubmFtZVxuICAgICAgICApfS5yZWR1Y2VyYCxcbiAgICAgICAgLi4uKG9wdGlvbnMgYXMgb2JqZWN0KSxcbiAgICAgIH0gYXMgYW55KSxcbiAgICAgIG1vdmUocGFyc2VkUGF0aC5wYXRoKSxcbiAgICBdKTtcblxuICAgIHJldHVybiBjaGFpbihbYnJhbmNoQW5kTWVyZ2UoY2hhaW4oW21lcmdlV2l0aCh0ZW1wbGF0ZVNvdXJjZSldKSldKShcbiAgICAgIGhvc3QsXG4gICAgICBjb250ZXh0XG4gICAgKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gcmVsYXRpdmVQYXRoKG9wdGlvbnM6IFNlbGVjdG9yT3B0aW9ucykge1xuICBpZiAob3B0aW9ucy5mZWF0dXJlKSB7XG4gICAgcmV0dXJuIHN0cmluZ1V0aWxzLmZlYXR1cmVQYXRoKFxuICAgICAgb3B0aW9ucy5ncm91cCxcbiAgICAgIG9wdGlvbnMuZmxhdCxcbiAgICAgICdyZWR1Y2VycycsXG4gICAgICBzdHJpbmdVdGlscy5kYXNoZXJpemUob3B0aW9ucy5uYW1lKVxuICAgICk7XG4gIH1cblxuICByZXR1cm4gJyc7XG59XG4iXX0=