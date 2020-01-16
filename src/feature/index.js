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
    const schematics_1 = require("@angular-devkit/schematics");
    function default_1(options) {
        return (host, context) => {
            return schematics_1.chain([
                schematics_1.schematic('action', {
                    flat: options.flat,
                    group: options.group,
                    name: options.name,
                    path: options.path,
                    project: options.project,
                    skipTest: true,
                    api: options.api,
                    creators: options.creators,
                }),
                schematics_1.schematic('reducer', {
                    flat: options.flat,
                    group: options.group,
                    module: options.module,
                    name: options.name,
                    path: options.path,
                    project: options.project,
                    skipTest: options.skipTest,
                    reducers: options.reducers,
                    feature: true,
                    api: options.api,
                    creators: options.creators,
                }),
                schematics_1.schematic('effect', {
                    flat: options.flat,
                    group: options.group,
                    module: options.module,
                    name: options.name,
                    path: options.path,
                    project: options.project,
                    skipTest: options.skipTest,
                    feature: true,
                    api: options.api,
                    creators: options.creators,
                }),
                schematics_1.schematic('selector', {
                    flat: options.flat,
                    group: options.group,
                    name: options.name,
                    path: options.path,
                    project: options.project,
                    skipTest: options.skipTest,
                    feature: true,
                }),
            ])(host, context);
        };
    }
    exports.default = default_1;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3NjaGVtYXRpY3Mvc3JjL2ZlYXR1cmUvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7SUFBQSwyREFNb0M7SUFHcEMsbUJBQXdCLE9BQXVCO1FBQzdDLE9BQU8sQ0FBQyxJQUFVLEVBQUUsT0FBeUIsRUFBRSxFQUFFO1lBQy9DLE9BQU8sa0JBQUssQ0FBQztnQkFDWCxzQkFBUyxDQUFDLFFBQVEsRUFBRTtvQkFDbEIsSUFBSSxFQUFFLE9BQU8sQ0FBQyxJQUFJO29CQUNsQixLQUFLLEVBQUUsT0FBTyxDQUFDLEtBQUs7b0JBQ3BCLElBQUksRUFBRSxPQUFPLENBQUMsSUFBSTtvQkFDbEIsSUFBSSxFQUFFLE9BQU8sQ0FBQyxJQUFJO29CQUNsQixPQUFPLEVBQUUsT0FBTyxDQUFDLE9BQU87b0JBQ3hCLFFBQVEsRUFBRSxJQUFJO29CQUNkLEdBQUcsRUFBRSxPQUFPLENBQUMsR0FBRztvQkFDaEIsUUFBUSxFQUFFLE9BQU8sQ0FBQyxRQUFRO2lCQUMzQixDQUFDO2dCQUNGLHNCQUFTLENBQUMsU0FBUyxFQUFFO29CQUNuQixJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUk7b0JBQ2xCLEtBQUssRUFBRSxPQUFPLENBQUMsS0FBSztvQkFDcEIsTUFBTSxFQUFFLE9BQU8sQ0FBQyxNQUFNO29CQUN0QixJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUk7b0JBQ2xCLElBQUksRUFBRSxPQUFPLENBQUMsSUFBSTtvQkFDbEIsT0FBTyxFQUFFLE9BQU8sQ0FBQyxPQUFPO29CQUN4QixRQUFRLEVBQUUsT0FBTyxDQUFDLFFBQVE7b0JBQzFCLFFBQVEsRUFBRSxPQUFPLENBQUMsUUFBUTtvQkFDMUIsT0FBTyxFQUFFLElBQUk7b0JBQ2IsR0FBRyxFQUFFLE9BQU8sQ0FBQyxHQUFHO29CQUNoQixRQUFRLEVBQUUsT0FBTyxDQUFDLFFBQVE7aUJBQzNCLENBQUM7Z0JBQ0Ysc0JBQVMsQ0FBQyxRQUFRLEVBQUU7b0JBQ2xCLElBQUksRUFBRSxPQUFPLENBQUMsSUFBSTtvQkFDbEIsS0FBSyxFQUFFLE9BQU8sQ0FBQyxLQUFLO29CQUNwQixNQUFNLEVBQUUsT0FBTyxDQUFDLE1BQU07b0JBQ3RCLElBQUksRUFBRSxPQUFPLENBQUMsSUFBSTtvQkFDbEIsSUFBSSxFQUFFLE9BQU8sQ0FBQyxJQUFJO29CQUNsQixPQUFPLEVBQUUsT0FBTyxDQUFDLE9BQU87b0JBQ3hCLFFBQVEsRUFBRSxPQUFPLENBQUMsUUFBUTtvQkFDMUIsT0FBTyxFQUFFLElBQUk7b0JBQ2IsR0FBRyxFQUFFLE9BQU8sQ0FBQyxHQUFHO29CQUNoQixRQUFRLEVBQUUsT0FBTyxDQUFDLFFBQVE7aUJBQzNCLENBQUM7Z0JBQ0Ysc0JBQVMsQ0FBQyxVQUFVLEVBQUU7b0JBQ3BCLElBQUksRUFBRSxPQUFPLENBQUMsSUFBSTtvQkFDbEIsS0FBSyxFQUFFLE9BQU8sQ0FBQyxLQUFLO29CQUNwQixJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUk7b0JBQ2xCLElBQUksRUFBRSxPQUFPLENBQUMsSUFBSTtvQkFDbEIsT0FBTyxFQUFFLE9BQU8sQ0FBQyxPQUFPO29CQUN4QixRQUFRLEVBQUUsT0FBTyxDQUFDLFFBQVE7b0JBQzFCLE9BQU8sRUFBRSxJQUFJO2lCQUNkLENBQUM7YUFDSCxDQUFDLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3BCLENBQUMsQ0FBQztJQUNKLENBQUM7SUFqREQsNEJBaURDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgUnVsZSxcbiAgU2NoZW1hdGljQ29udGV4dCxcbiAgVHJlZSxcbiAgY2hhaW4sXG4gIHNjaGVtYXRpYyxcbn0gZnJvbSAnQGFuZ3VsYXItZGV2a2l0L3NjaGVtYXRpY3MnO1xuaW1wb3J0IHsgU2NoZW1hIGFzIEZlYXR1cmVPcHRpb25zIH0gZnJvbSAnLi9zY2hlbWEnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihvcHRpb25zOiBGZWF0dXJlT3B0aW9ucyk6IFJ1bGUge1xuICByZXR1cm4gKGhvc3Q6IFRyZWUsIGNvbnRleHQ6IFNjaGVtYXRpY0NvbnRleHQpID0+IHtcbiAgICByZXR1cm4gY2hhaW4oW1xuICAgICAgc2NoZW1hdGljKCdhY3Rpb24nLCB7XG4gICAgICAgIGZsYXQ6IG9wdGlvbnMuZmxhdCxcbiAgICAgICAgZ3JvdXA6IG9wdGlvbnMuZ3JvdXAsXG4gICAgICAgIG5hbWU6IG9wdGlvbnMubmFtZSxcbiAgICAgICAgcGF0aDogb3B0aW9ucy5wYXRoLFxuICAgICAgICBwcm9qZWN0OiBvcHRpb25zLnByb2plY3QsXG4gICAgICAgIHNraXBUZXN0OiB0cnVlLFxuICAgICAgICBhcGk6IG9wdGlvbnMuYXBpLFxuICAgICAgICBjcmVhdG9yczogb3B0aW9ucy5jcmVhdG9ycyxcbiAgICAgIH0pLFxuICAgICAgc2NoZW1hdGljKCdyZWR1Y2VyJywge1xuICAgICAgICBmbGF0OiBvcHRpb25zLmZsYXQsXG4gICAgICAgIGdyb3VwOiBvcHRpb25zLmdyb3VwLFxuICAgICAgICBtb2R1bGU6IG9wdGlvbnMubW9kdWxlLFxuICAgICAgICBuYW1lOiBvcHRpb25zLm5hbWUsXG4gICAgICAgIHBhdGg6IG9wdGlvbnMucGF0aCxcbiAgICAgICAgcHJvamVjdDogb3B0aW9ucy5wcm9qZWN0LFxuICAgICAgICBza2lwVGVzdDogb3B0aW9ucy5za2lwVGVzdCxcbiAgICAgICAgcmVkdWNlcnM6IG9wdGlvbnMucmVkdWNlcnMsXG4gICAgICAgIGZlYXR1cmU6IHRydWUsXG4gICAgICAgIGFwaTogb3B0aW9ucy5hcGksXG4gICAgICAgIGNyZWF0b3JzOiBvcHRpb25zLmNyZWF0b3JzLFxuICAgICAgfSksXG4gICAgICBzY2hlbWF0aWMoJ2VmZmVjdCcsIHtcbiAgICAgICAgZmxhdDogb3B0aW9ucy5mbGF0LFxuICAgICAgICBncm91cDogb3B0aW9ucy5ncm91cCxcbiAgICAgICAgbW9kdWxlOiBvcHRpb25zLm1vZHVsZSxcbiAgICAgICAgbmFtZTogb3B0aW9ucy5uYW1lLFxuICAgICAgICBwYXRoOiBvcHRpb25zLnBhdGgsXG4gICAgICAgIHByb2plY3Q6IG9wdGlvbnMucHJvamVjdCxcbiAgICAgICAgc2tpcFRlc3Q6IG9wdGlvbnMuc2tpcFRlc3QsXG4gICAgICAgIGZlYXR1cmU6IHRydWUsXG4gICAgICAgIGFwaTogb3B0aW9ucy5hcGksXG4gICAgICAgIGNyZWF0b3JzOiBvcHRpb25zLmNyZWF0b3JzLFxuICAgICAgfSksXG4gICAgICBzY2hlbWF0aWMoJ3NlbGVjdG9yJywge1xuICAgICAgICBmbGF0OiBvcHRpb25zLmZsYXQsXG4gICAgICAgIGdyb3VwOiBvcHRpb25zLmdyb3VwLFxuICAgICAgICBuYW1lOiBvcHRpb25zLm5hbWUsXG4gICAgICAgIHBhdGg6IG9wdGlvbnMucGF0aCxcbiAgICAgICAgcHJvamVjdDogb3B0aW9ucy5wcm9qZWN0LFxuICAgICAgICBza2lwVGVzdDogb3B0aW9ucy5za2lwVGVzdCxcbiAgICAgICAgZmVhdHVyZTogdHJ1ZSxcbiAgICAgIH0pLFxuICAgIF0pKGhvc3QsIGNvbnRleHQpO1xuICB9O1xufVxuIl19