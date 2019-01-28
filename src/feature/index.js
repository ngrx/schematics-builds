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
                    api: options.api,
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
                    api: options.api,
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
                    api: options.api,
                }),
            ])(host, context);
        };
    }
    exports.default = default_1;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3NjaGVtYXRpY3Mvc3JjL2ZlYXR1cmUvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7SUFBQSx5REFNb0M7SUFHcEMsbUJBQXdCLE9BQXVCO1FBQzdDLE9BQU8sVUFBQyxJQUFVLEVBQUUsT0FBeUI7WUFDM0MsT0FBTyxrQkFBSyxDQUFDO2dCQUNYLHNCQUFTLENBQUMsUUFBUSxFQUFFO29CQUNsQixJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUk7b0JBQ2xCLEtBQUssRUFBRSxPQUFPLENBQUMsS0FBSztvQkFDcEIsSUFBSSxFQUFFLE9BQU8sQ0FBQyxJQUFJO29CQUNsQixJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUk7b0JBQ2xCLE9BQU8sRUFBRSxPQUFPLENBQUMsT0FBTztvQkFDeEIsSUFBSSxFQUFFLEtBQUs7b0JBQ1gsR0FBRyxFQUFFLE9BQU8sQ0FBQyxHQUFHO2lCQUNqQixDQUFDO2dCQUNGLHNCQUFTLENBQUMsU0FBUyxFQUFFO29CQUNuQixJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUk7b0JBQ2xCLEtBQUssRUFBRSxPQUFPLENBQUMsS0FBSztvQkFDcEIsTUFBTSxFQUFFLE9BQU8sQ0FBQyxNQUFNO29CQUN0QixJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUk7b0JBQ2xCLElBQUksRUFBRSxPQUFPLENBQUMsSUFBSTtvQkFDbEIsT0FBTyxFQUFFLE9BQU8sQ0FBQyxPQUFPO29CQUN4QixJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUk7b0JBQ2xCLFFBQVEsRUFBRSxPQUFPLENBQUMsUUFBUTtvQkFDMUIsT0FBTyxFQUFFLElBQUk7b0JBQ2IsR0FBRyxFQUFFLE9BQU8sQ0FBQyxHQUFHO2lCQUNqQixDQUFDO2dCQUNGLHNCQUFTLENBQUMsUUFBUSxFQUFFO29CQUNsQixJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUk7b0JBQ2xCLEtBQUssRUFBRSxPQUFPLENBQUMsS0FBSztvQkFDcEIsTUFBTSxFQUFFLE9BQU8sQ0FBQyxNQUFNO29CQUN0QixJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUk7b0JBQ2xCLElBQUksRUFBRSxPQUFPLENBQUMsSUFBSTtvQkFDbEIsT0FBTyxFQUFFLE9BQU8sQ0FBQyxPQUFPO29CQUN4QixJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUk7b0JBQ2xCLE9BQU8sRUFBRSxJQUFJO29CQUNiLEdBQUcsRUFBRSxPQUFPLENBQUMsR0FBRztpQkFDakIsQ0FBQzthQUNILENBQUMsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDcEIsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQXJDRCw0QkFxQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBSdWxlLFxuICBTY2hlbWF0aWNDb250ZXh0LFxuICBUcmVlLFxuICBjaGFpbixcbiAgc2NoZW1hdGljLFxufSBmcm9tICdAYW5ndWxhci1kZXZraXQvc2NoZW1hdGljcyc7XG5pbXBvcnQgeyBTY2hlbWEgYXMgRmVhdHVyZU9wdGlvbnMgfSBmcm9tICcuL3NjaGVtYSc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG9wdGlvbnM6IEZlYXR1cmVPcHRpb25zKTogUnVsZSB7XG4gIHJldHVybiAoaG9zdDogVHJlZSwgY29udGV4dDogU2NoZW1hdGljQ29udGV4dCkgPT4ge1xuICAgIHJldHVybiBjaGFpbihbXG4gICAgICBzY2hlbWF0aWMoJ2FjdGlvbicsIHtcbiAgICAgICAgZmxhdDogb3B0aW9ucy5mbGF0LFxuICAgICAgICBncm91cDogb3B0aW9ucy5ncm91cCxcbiAgICAgICAgbmFtZTogb3B0aW9ucy5uYW1lLFxuICAgICAgICBwYXRoOiBvcHRpb25zLnBhdGgsXG4gICAgICAgIHByb2plY3Q6IG9wdGlvbnMucHJvamVjdCxcbiAgICAgICAgc3BlYzogZmFsc2UsXG4gICAgICAgIGFwaTogb3B0aW9ucy5hcGksXG4gICAgICB9KSxcbiAgICAgIHNjaGVtYXRpYygncmVkdWNlcicsIHtcbiAgICAgICAgZmxhdDogb3B0aW9ucy5mbGF0LFxuICAgICAgICBncm91cDogb3B0aW9ucy5ncm91cCxcbiAgICAgICAgbW9kdWxlOiBvcHRpb25zLm1vZHVsZSxcbiAgICAgICAgbmFtZTogb3B0aW9ucy5uYW1lLFxuICAgICAgICBwYXRoOiBvcHRpb25zLnBhdGgsXG4gICAgICAgIHByb2plY3Q6IG9wdGlvbnMucHJvamVjdCxcbiAgICAgICAgc3BlYzogb3B0aW9ucy5zcGVjLFxuICAgICAgICByZWR1Y2Vyczogb3B0aW9ucy5yZWR1Y2VycyxcbiAgICAgICAgZmVhdHVyZTogdHJ1ZSxcbiAgICAgICAgYXBpOiBvcHRpb25zLmFwaSxcbiAgICAgIH0pLFxuICAgICAgc2NoZW1hdGljKCdlZmZlY3QnLCB7XG4gICAgICAgIGZsYXQ6IG9wdGlvbnMuZmxhdCxcbiAgICAgICAgZ3JvdXA6IG9wdGlvbnMuZ3JvdXAsXG4gICAgICAgIG1vZHVsZTogb3B0aW9ucy5tb2R1bGUsXG4gICAgICAgIG5hbWU6IG9wdGlvbnMubmFtZSxcbiAgICAgICAgcGF0aDogb3B0aW9ucy5wYXRoLFxuICAgICAgICBwcm9qZWN0OiBvcHRpb25zLnByb2plY3QsXG4gICAgICAgIHNwZWM6IG9wdGlvbnMuc3BlYyxcbiAgICAgICAgZmVhdHVyZTogdHJ1ZSxcbiAgICAgICAgYXBpOiBvcHRpb25zLmFwaSxcbiAgICAgIH0pLFxuICAgIF0pKGhvc3QsIGNvbnRleHQpO1xuICB9O1xufVxuIl19