(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@ngrx/schematics/src/ng-add/index", ["require", "exports", "@angular-devkit/schematics", "@ngrx/schematics/schematics-core/utility/config"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var schematics_1 = require("@angular-devkit/schematics");
    var config_1 = require("@ngrx/schematics/schematics-core/utility/config");
    function updateWorkspace(host, key, value) {
        var workspace = config_1.getWorkspace(host);
        var path = config_1.getWorkspacePath(host);
        workspace[key] = value;
        host.overwrite(path, JSON.stringify(workspace, null, 2));
    }
    function setAsDefaultSchematics() {
        var cli = {
            defaultCollection: '@ngrx/schematics',
        };
        return function (host) {
            updateWorkspace(host, 'cli', cli);
            return host;
        };
    }
    function default_1(options) {
        return function (host, context) {
            return schematics_1.chain([
                options && options.defaultCollection ? setAsDefaultSchematics() : schematics_1.noop(),
            ])(host, context);
        };
    }
    exports.default = default_1;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3NjaGVtYXRpY3Mvc3JjL25nLWFkZC9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztJQUFBLHlEQU1vQztJQUNwQywwRUFJOEM7SUFHOUMsU0FBUyxlQUFlLENBQUMsSUFBVSxFQUFFLEdBQTBCLEVBQUUsS0FBVTtRQUN6RSxJQUFNLFNBQVMsR0FBRyxxQkFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3JDLElBQU0sSUFBSSxHQUFHLHlCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BDLFNBQVMsQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUM7UUFDdkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVELFNBQVMsc0JBQXNCO1FBQzdCLElBQU0sR0FBRyxHQUFHO1lBQ1YsaUJBQWlCLEVBQUUsa0JBQWtCO1NBQ3RDLENBQUM7UUFDRixPQUFPLFVBQUMsSUFBVTtZQUNoQixlQUFlLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztZQUNsQyxPQUFPLElBQUksQ0FBQztRQUNkLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRCxtQkFBd0IsT0FBeUI7UUFDL0MsT0FBTyxVQUFDLElBQVUsRUFBRSxPQUF5QjtZQUMzQyxPQUFPLGtCQUFLLENBQUM7Z0JBQ1gsT0FBTyxJQUFJLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsc0JBQXNCLEVBQUUsQ0FBQyxDQUFDLENBQUMsaUJBQUksRUFBRTthQUN6RSxDQUFDLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3BCLENBQUMsQ0FBQztJQUNKLENBQUM7SUFORCw0QkFNQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIFJ1bGUsXG4gIFNjaGVtYXRpY0NvbnRleHQsXG4gIFRyZWUsXG4gIGNoYWluLFxuICBub29wLFxufSBmcm9tICdAYW5ndWxhci1kZXZraXQvc2NoZW1hdGljcyc7XG5pbXBvcnQge1xuICBXb3Jrc3BhY2VTY2hlbWEsXG4gIGdldFdvcmtzcGFjZVBhdGgsXG4gIGdldFdvcmtzcGFjZSxcbn0gZnJvbSAnLi4vLi4vc2NoZW1hdGljcy1jb3JlL3V0aWxpdHkvY29uZmlnJztcbmltcG9ydCB7IFNjaGVtYSBhcyBTY2hlbWF0aWNPcHRpb25zIH0gZnJvbSAnLi9zY2hlbWEnO1xuXG5mdW5jdGlvbiB1cGRhdGVXb3Jrc3BhY2UoaG9zdDogVHJlZSwga2V5OiBrZXlvZiBXb3Jrc3BhY2VTY2hlbWEsIHZhbHVlOiBhbnkpIHtcbiAgY29uc3Qgd29ya3NwYWNlID0gZ2V0V29ya3NwYWNlKGhvc3QpO1xuICBjb25zdCBwYXRoID0gZ2V0V29ya3NwYWNlUGF0aChob3N0KTtcbiAgd29ya3NwYWNlW2tleV0gPSB2YWx1ZTtcbiAgaG9zdC5vdmVyd3JpdGUocGF0aCwgSlNPTi5zdHJpbmdpZnkod29ya3NwYWNlLCBudWxsLCAyKSk7XG59XG5cbmZ1bmN0aW9uIHNldEFzRGVmYXVsdFNjaGVtYXRpY3MoKSB7XG4gIGNvbnN0IGNsaSA9IHtcbiAgICBkZWZhdWx0Q29sbGVjdGlvbjogJ0BuZ3J4L3NjaGVtYXRpY3MnLFxuICB9O1xuICByZXR1cm4gKGhvc3Q6IFRyZWUpID0+IHtcbiAgICB1cGRhdGVXb3Jrc3BhY2UoaG9zdCwgJ2NsaScsIGNsaSk7XG4gICAgcmV0dXJuIGhvc3Q7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG9wdGlvbnM6IFNjaGVtYXRpY09wdGlvbnMpOiBSdWxlIHtcbiAgcmV0dXJuIChob3N0OiBUcmVlLCBjb250ZXh0OiBTY2hlbWF0aWNDb250ZXh0KSA9PiB7XG4gICAgcmV0dXJuIGNoYWluKFtcbiAgICAgIG9wdGlvbnMgJiYgb3B0aW9ucy5kZWZhdWx0Q29sbGVjdGlvbiA/IHNldEFzRGVmYXVsdFNjaGVtYXRpY3MoKSA6IG5vb3AoKSxcbiAgICBdKShob3N0LCBjb250ZXh0KTtcbiAgfTtcbn1cbiJdfQ==