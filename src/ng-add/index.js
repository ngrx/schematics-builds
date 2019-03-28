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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3NjaGVtYXRpY3Mvc3JjL25nLWFkZC9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztJQUFBLDJEQU1vQztJQUNwQyw0RUFJOEM7SUFHOUMsU0FBUyxlQUFlLENBQUMsSUFBVSxFQUFFLEdBQTBCLEVBQUUsS0FBVTtRQUN6RSxNQUFNLFNBQVMsR0FBRyxxQkFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3JDLE1BQU0sSUFBSSxHQUFHLHlCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BDLFNBQVMsQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUM7UUFDdkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVELFNBQVMsc0JBQXNCO1FBQzdCLE1BQU0sR0FBRyxHQUFHO1lBQ1YsaUJBQWlCLEVBQUUsa0JBQWtCO1NBQ3RDLENBQUM7UUFDRixPQUFPLENBQUMsSUFBVSxFQUFFLEVBQUU7WUFDcEIsZUFBZSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDbEMsT0FBTyxJQUFJLENBQUM7UUFDZCxDQUFDLENBQUM7SUFDSixDQUFDO0lBRUQsbUJBQXdCLE9BQXlCO1FBQy9DLE9BQU8sQ0FBQyxJQUFVLEVBQUUsT0FBeUIsRUFBRSxFQUFFO1lBQy9DLE9BQU8sa0JBQUssQ0FBQztnQkFDWCxPQUFPLElBQUksT0FBTyxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxzQkFBc0IsRUFBRSxDQUFDLENBQUMsQ0FBQyxpQkFBSSxFQUFFO2FBQ3pFLENBQUMsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDcEIsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQU5ELDRCQU1DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgUnVsZSxcbiAgU2NoZW1hdGljQ29udGV4dCxcbiAgVHJlZSxcbiAgY2hhaW4sXG4gIG5vb3AsXG59IGZyb20gJ0Bhbmd1bGFyLWRldmtpdC9zY2hlbWF0aWNzJztcbmltcG9ydCB7XG4gIFdvcmtzcGFjZVNjaGVtYSxcbiAgZ2V0V29ya3NwYWNlUGF0aCxcbiAgZ2V0V29ya3NwYWNlLFxufSBmcm9tICcuLi8uLi9zY2hlbWF0aWNzLWNvcmUvdXRpbGl0eS9jb25maWcnO1xuaW1wb3J0IHsgU2NoZW1hIGFzIFNjaGVtYXRpY09wdGlvbnMgfSBmcm9tICcuL3NjaGVtYSc7XG5cbmZ1bmN0aW9uIHVwZGF0ZVdvcmtzcGFjZShob3N0OiBUcmVlLCBrZXk6IGtleW9mIFdvcmtzcGFjZVNjaGVtYSwgdmFsdWU6IGFueSkge1xuICBjb25zdCB3b3Jrc3BhY2UgPSBnZXRXb3Jrc3BhY2UoaG9zdCk7XG4gIGNvbnN0IHBhdGggPSBnZXRXb3Jrc3BhY2VQYXRoKGhvc3QpO1xuICB3b3Jrc3BhY2Vba2V5XSA9IHZhbHVlO1xuICBob3N0Lm92ZXJ3cml0ZShwYXRoLCBKU09OLnN0cmluZ2lmeSh3b3Jrc3BhY2UsIG51bGwsIDIpKTtcbn1cblxuZnVuY3Rpb24gc2V0QXNEZWZhdWx0U2NoZW1hdGljcygpIHtcbiAgY29uc3QgY2xpID0ge1xuICAgIGRlZmF1bHRDb2xsZWN0aW9uOiAnQG5ncngvc2NoZW1hdGljcycsXG4gIH07XG4gIHJldHVybiAoaG9zdDogVHJlZSkgPT4ge1xuICAgIHVwZGF0ZVdvcmtzcGFjZShob3N0LCAnY2xpJywgY2xpKTtcbiAgICByZXR1cm4gaG9zdDtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24ob3B0aW9uczogU2NoZW1hdGljT3B0aW9ucyk6IFJ1bGUge1xuICByZXR1cm4gKGhvc3Q6IFRyZWUsIGNvbnRleHQ6IFNjaGVtYXRpY0NvbnRleHQpID0+IHtcbiAgICByZXR1cm4gY2hhaW4oW1xuICAgICAgb3B0aW9ucyAmJiBvcHRpb25zLmRlZmF1bHRDb2xsZWN0aW9uID8gc2V0QXNEZWZhdWx0U2NoZW1hdGljcygpIDogbm9vcCgpLFxuICAgIF0pKGhvc3QsIGNvbnRleHQpO1xuICB9O1xufVxuIl19