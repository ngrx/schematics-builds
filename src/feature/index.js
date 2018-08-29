(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@ngrx/schematics/src/feature/index", ["require", "exports", "@angular-devkit/schematics"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var schematics_1 = require("@angular-devkit/schematics");
    function default_1(options) {
        return function (host, context) {
            return schematics_1.chain([
                schematics_1.schematic('action', {
                    flat: options.flat,
                    group: options.group,
                    name: options.name,
                    path: options.path,
                    project: options.project,
                    spec: false,
                }),
                schematics_1.schematic('reducer', {
                    flat: options.flat,
                    group: options.group,
                    module: options.module,
                    name: options.name,
                    path: options.path,
                    project: options.project,
                    spec: options.spec,
                    reducers: options.reducers,
                    feature: true,
                }),
                schematics_1.schematic('effect', {
                    flat: options.flat,
                    group: options.group,
                    module: options.module,
                    name: options.name,
                    path: options.path,
                    project: options.project,
                    spec: options.spec,
                    feature: true,
                }),
            ])(host, context);
        };
    }
    exports.default = default_1;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3NjaGVtYXRpY3Mvc3JjL2ZlYXR1cmUvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7SUFBQSx5REFNb0M7SUFHcEMsbUJBQXdCLE9BQXVCO1FBQzdDLE9BQU8sVUFBQyxJQUFVLEVBQUUsT0FBeUI7WUFDM0MsT0FBTyxrQkFBSyxDQUFDO2dCQUNYLHNCQUFTLENBQUMsUUFBUSxFQUFFO29CQUNsQixJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUk7b0JBQ2xCLEtBQUssRUFBRSxPQUFPLENBQUMsS0FBSztvQkFDcEIsSUFBSSxFQUFFLE9BQU8sQ0FBQyxJQUFJO29CQUNsQixJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUk7b0JBQ2xCLE9BQU8sRUFBRSxPQUFPLENBQUMsT0FBTztvQkFDeEIsSUFBSSxFQUFFLEtBQUs7aUJBQ1osQ0FBQztnQkFDRixzQkFBUyxDQUFDLFNBQVMsRUFBRTtvQkFDbkIsSUFBSSxFQUFFLE9BQU8sQ0FBQyxJQUFJO29CQUNsQixLQUFLLEVBQUUsT0FBTyxDQUFDLEtBQUs7b0JBQ3BCLE1BQU0sRUFBRSxPQUFPLENBQUMsTUFBTTtvQkFDdEIsSUFBSSxFQUFFLE9BQU8sQ0FBQyxJQUFJO29CQUNsQixJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUk7b0JBQ2xCLE9BQU8sRUFBRSxPQUFPLENBQUMsT0FBTztvQkFDeEIsSUFBSSxFQUFFLE9BQU8sQ0FBQyxJQUFJO29CQUNsQixRQUFRLEVBQUUsT0FBTyxDQUFDLFFBQVE7b0JBQzFCLE9BQU8sRUFBRSxJQUFJO2lCQUNkLENBQUM7Z0JBQ0Ysc0JBQVMsQ0FBQyxRQUFRLEVBQUU7b0JBQ2xCLElBQUksRUFBRSxPQUFPLENBQUMsSUFBSTtvQkFDbEIsS0FBSyxFQUFFLE9BQU8sQ0FBQyxLQUFLO29CQUNwQixNQUFNLEVBQUUsT0FBTyxDQUFDLE1BQU07b0JBQ3RCLElBQUksRUFBRSxPQUFPLENBQUMsSUFBSTtvQkFDbEIsSUFBSSxFQUFFLE9BQU8sQ0FBQyxJQUFJO29CQUNsQixPQUFPLEVBQUUsT0FBTyxDQUFDLE9BQU87b0JBQ3hCLElBQUksRUFBRSxPQUFPLENBQUMsSUFBSTtvQkFDbEIsT0FBTyxFQUFFLElBQUk7aUJBQ2QsQ0FBQzthQUNILENBQUMsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDcEIsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQWxDRCw0QkFrQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBSdWxlLFxuICBTY2hlbWF0aWNDb250ZXh0LFxuICBUcmVlLFxuICBjaGFpbixcbiAgc2NoZW1hdGljLFxufSBmcm9tICdAYW5ndWxhci1kZXZraXQvc2NoZW1hdGljcyc7XG5pbXBvcnQgeyBTY2hlbWEgYXMgRmVhdHVyZU9wdGlvbnMgfSBmcm9tICcuL3NjaGVtYSc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG9wdGlvbnM6IEZlYXR1cmVPcHRpb25zKTogUnVsZSB7XG4gIHJldHVybiAoaG9zdDogVHJlZSwgY29udGV4dDogU2NoZW1hdGljQ29udGV4dCkgPT4ge1xuICAgIHJldHVybiBjaGFpbihbXG4gICAgICBzY2hlbWF0aWMoJ2FjdGlvbicsIHtcbiAgICAgICAgZmxhdDogb3B0aW9ucy5mbGF0LFxuICAgICAgICBncm91cDogb3B0aW9ucy5ncm91cCxcbiAgICAgICAgbmFtZTogb3B0aW9ucy5uYW1lLFxuICAgICAgICBwYXRoOiBvcHRpb25zLnBhdGgsXG4gICAgICAgIHByb2plY3Q6IG9wdGlvbnMucHJvamVjdCxcbiAgICAgICAgc3BlYzogZmFsc2UsXG4gICAgICB9KSxcbiAgICAgIHNjaGVtYXRpYygncmVkdWNlcicsIHtcbiAgICAgICAgZmxhdDogb3B0aW9ucy5mbGF0LFxuICAgICAgICBncm91cDogb3B0aW9ucy5ncm91cCxcbiAgICAgICAgbW9kdWxlOiBvcHRpb25zLm1vZHVsZSxcbiAgICAgICAgbmFtZTogb3B0aW9ucy5uYW1lLFxuICAgICAgICBwYXRoOiBvcHRpb25zLnBhdGgsXG4gICAgICAgIHByb2plY3Q6IG9wdGlvbnMucHJvamVjdCxcbiAgICAgICAgc3BlYzogb3B0aW9ucy5zcGVjLFxuICAgICAgICByZWR1Y2Vyczogb3B0aW9ucy5yZWR1Y2VycyxcbiAgICAgICAgZmVhdHVyZTogdHJ1ZSxcbiAgICAgIH0pLFxuICAgICAgc2NoZW1hdGljKCdlZmZlY3QnLCB7XG4gICAgICAgIGZsYXQ6IG9wdGlvbnMuZmxhdCxcbiAgICAgICAgZ3JvdXA6IG9wdGlvbnMuZ3JvdXAsXG4gICAgICAgIG1vZHVsZTogb3B0aW9ucy5tb2R1bGUsXG4gICAgICAgIG5hbWU6IG9wdGlvbnMubmFtZSxcbiAgICAgICAgcGF0aDogb3B0aW9ucy5wYXRoLFxuICAgICAgICBwcm9qZWN0OiBvcHRpb25zLnByb2plY3QsXG4gICAgICAgIHNwZWM6IG9wdGlvbnMuc3BlYyxcbiAgICAgICAgZmVhdHVyZTogdHJ1ZSxcbiAgICAgIH0pLFxuICAgIF0pKGhvc3QsIGNvbnRleHQpO1xuICB9O1xufVxuIl19