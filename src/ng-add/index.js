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
    const schematics_1 = require("@angular-devkit/schematics");
    const config_1 = require("@ngrx/schematics/schematics-core/utility/config");
    function updateWorkspace(host, key, value) {
        const workspace = config_1.getWorkspace(host);
        const path = config_1.getWorkspacePath(host);
        workspace[key] = value;
        host.overwrite(path, JSON.stringify(workspace, null, 2));
    }
    function setAsDefaultSchematics() {
        const cli = {
            defaultCollection: '@ngrx/schematics',
        };
        return (host) => {
            updateWorkspace(host, 'cli', cli);
            return host;
        };
    }
    function default_1(options) {
        return (host, context) => {
            return schematics_1.chain([
                options && options.defaultCollection ? setAsDefaultSchematics() : schematics_1.noop(),
            ])(host, context);
        };
    }
    exports.default = default_1;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3NjaGVtYXRpY3Mvc3JjL25nLWFkZC9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztJQUFBLDJEQU1vQztJQUNwQyw0RUFJOEM7SUFHOUMsU0FBUyxlQUFlLENBQ3RCLElBQVUsRUFDVixHQUFNLEVBQ04sS0FBVTtRQUVWLE1BQU0sU0FBUyxHQUFHLHFCQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDckMsTUFBTSxJQUFJLEdBQUcseUJBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDcEMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQztRQUN2QixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMzRCxDQUFDO0lBRUQsU0FBUyxzQkFBc0I7UUFDN0IsTUFBTSxHQUFHLEdBQUc7WUFDVixpQkFBaUIsRUFBRSxrQkFBa0I7U0FDdEMsQ0FBQztRQUNGLE9BQU8sQ0FBQyxJQUFVLEVBQUUsRUFBRTtZQUNwQixlQUFlLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztZQUNsQyxPQUFPLElBQUksQ0FBQztRQUNkLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRCxtQkFBd0IsT0FBeUI7UUFDL0MsT0FBTyxDQUFDLElBQVUsRUFBRSxPQUF5QixFQUFFLEVBQUU7WUFDL0MsT0FBTyxrQkFBSyxDQUFDO2dCQUNYLE9BQU8sSUFBSSxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLHNCQUFzQixFQUFFLENBQUMsQ0FBQyxDQUFDLGlCQUFJLEVBQUU7YUFDekUsQ0FBQyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNwQixDQUFDLENBQUM7SUFDSixDQUFDO0lBTkQsNEJBTUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBSdWxlLFxuICBTY2hlbWF0aWNDb250ZXh0LFxuICBUcmVlLFxuICBjaGFpbixcbiAgbm9vcCxcbn0gZnJvbSAnQGFuZ3VsYXItZGV2a2l0L3NjaGVtYXRpY3MnO1xuaW1wb3J0IHtcbiAgV29ya3NwYWNlU2NoZW1hLFxuICBnZXRXb3Jrc3BhY2VQYXRoLFxuICBnZXRXb3Jrc3BhY2UsXG59IGZyb20gJy4uLy4uL3NjaGVtYXRpY3MtY29yZS91dGlsaXR5L2NvbmZpZyc7XG5pbXBvcnQgeyBTY2hlbWEgYXMgU2NoZW1hdGljT3B0aW9ucyB9IGZyb20gJy4vc2NoZW1hJztcblxuZnVuY3Rpb24gdXBkYXRlV29ya3NwYWNlPEsgZXh0ZW5kcyBrZXlvZiBXb3Jrc3BhY2VTY2hlbWE+KFxuICBob3N0OiBUcmVlLFxuICBrZXk6IEssXG4gIHZhbHVlOiBhbnlcbikge1xuICBjb25zdCB3b3Jrc3BhY2UgPSBnZXRXb3Jrc3BhY2UoaG9zdCk7XG4gIGNvbnN0IHBhdGggPSBnZXRXb3Jrc3BhY2VQYXRoKGhvc3QpO1xuICB3b3Jrc3BhY2Vba2V5XSA9IHZhbHVlO1xuICBob3N0Lm92ZXJ3cml0ZShwYXRoLCBKU09OLnN0cmluZ2lmeSh3b3Jrc3BhY2UsIG51bGwsIDIpKTtcbn1cblxuZnVuY3Rpb24gc2V0QXNEZWZhdWx0U2NoZW1hdGljcygpIHtcbiAgY29uc3QgY2xpID0ge1xuICAgIGRlZmF1bHRDb2xsZWN0aW9uOiAnQG5ncngvc2NoZW1hdGljcycsXG4gIH07XG4gIHJldHVybiAoaG9zdDogVHJlZSkgPT4ge1xuICAgIHVwZGF0ZVdvcmtzcGFjZShob3N0LCAnY2xpJywgY2xpKTtcbiAgICByZXR1cm4gaG9zdDtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24ob3B0aW9uczogU2NoZW1hdGljT3B0aW9ucyk6IFJ1bGUge1xuICByZXR1cm4gKGhvc3Q6IFRyZWUsIGNvbnRleHQ6IFNjaGVtYXRpY0NvbnRleHQpID0+IHtcbiAgICByZXR1cm4gY2hhaW4oW1xuICAgICAgb3B0aW9ucyAmJiBvcHRpb25zLmRlZmF1bHRDb2xsZWN0aW9uID8gc2V0QXNEZWZhdWx0U2NoZW1hdGljcygpIDogbm9vcCgpLFxuICAgIF0pKGhvc3QsIGNvbnRleHQpO1xuICB9O1xufVxuIl19