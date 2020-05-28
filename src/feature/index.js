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
        if (!options.skipTests && options.skipTest) {
            options.skipTests = options.skipTest;
        }
        return (host, context) => {
            return schematics_1.chain([
                schematics_1.schematic('action', {
                    flat: options.flat,
                    group: options.group,
                    name: options.name,
                    path: options.path,
                    project: options.project,
                    skipTests: options.skipTests,
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
                    skipTests: options.skipTests,
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
                    skipTests: options.skipTests,
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
                    skipTests: options.skipTests,
                    feature: true,
                }),
            ])(host, context);
        };
    }
    exports.default = default_1;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3NjaGVtYXRpY3Mvc3JjL2ZlYXR1cmUvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7SUFBQSwyREFNb0M7SUFHcEMsbUJBQXdCLE9BQXVCO1FBQzdDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxJQUFJLE9BQU8sQ0FBQyxRQUFRLEVBQUU7WUFDMUMsT0FBTyxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDO1NBQ3RDO1FBRUQsT0FBTyxDQUFDLElBQVUsRUFBRSxPQUF5QixFQUFFLEVBQUU7WUFDL0MsT0FBTyxrQkFBSyxDQUFDO2dCQUNYLHNCQUFTLENBQUMsUUFBUSxFQUFFO29CQUNsQixJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUk7b0JBQ2xCLEtBQUssRUFBRSxPQUFPLENBQUMsS0FBSztvQkFDcEIsSUFBSSxFQUFFLE9BQU8sQ0FBQyxJQUFJO29CQUNsQixJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUk7b0JBQ2xCLE9BQU8sRUFBRSxPQUFPLENBQUMsT0FBTztvQkFDeEIsU0FBUyxFQUFFLE9BQU8sQ0FBQyxTQUFTO29CQUM1QixHQUFHLEVBQUUsT0FBTyxDQUFDLEdBQUc7b0JBQ2hCLFFBQVEsRUFBRSxPQUFPLENBQUMsUUFBUTtpQkFDM0IsQ0FBQztnQkFDRixzQkFBUyxDQUFDLFNBQVMsRUFBRTtvQkFDbkIsSUFBSSxFQUFFLE9BQU8sQ0FBQyxJQUFJO29CQUNsQixLQUFLLEVBQUUsT0FBTyxDQUFDLEtBQUs7b0JBQ3BCLE1BQU0sRUFBRSxPQUFPLENBQUMsTUFBTTtvQkFDdEIsSUFBSSxFQUFFLE9BQU8sQ0FBQyxJQUFJO29CQUNsQixJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUk7b0JBQ2xCLE9BQU8sRUFBRSxPQUFPLENBQUMsT0FBTztvQkFDeEIsU0FBUyxFQUFFLE9BQU8sQ0FBQyxTQUFTO29CQUM1QixRQUFRLEVBQUUsT0FBTyxDQUFDLFFBQVE7b0JBQzFCLE9BQU8sRUFBRSxJQUFJO29CQUNiLEdBQUcsRUFBRSxPQUFPLENBQUMsR0FBRztvQkFDaEIsUUFBUSxFQUFFLE9BQU8sQ0FBQyxRQUFRO2lCQUMzQixDQUFDO2dCQUNGLHNCQUFTLENBQUMsUUFBUSxFQUFFO29CQUNsQixJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUk7b0JBQ2xCLEtBQUssRUFBRSxPQUFPLENBQUMsS0FBSztvQkFDcEIsTUFBTSxFQUFFLE9BQU8sQ0FBQyxNQUFNO29CQUN0QixJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUk7b0JBQ2xCLElBQUksRUFBRSxPQUFPLENBQUMsSUFBSTtvQkFDbEIsT0FBTyxFQUFFLE9BQU8sQ0FBQyxPQUFPO29CQUN4QixTQUFTLEVBQUUsT0FBTyxDQUFDLFNBQVM7b0JBQzVCLE9BQU8sRUFBRSxJQUFJO29CQUNiLEdBQUcsRUFBRSxPQUFPLENBQUMsR0FBRztvQkFDaEIsUUFBUSxFQUFFLE9BQU8sQ0FBQyxRQUFRO2lCQUMzQixDQUFDO2dCQUNGLHNCQUFTLENBQUMsVUFBVSxFQUFFO29CQUNwQixJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUk7b0JBQ2xCLEtBQUssRUFBRSxPQUFPLENBQUMsS0FBSztvQkFDcEIsSUFBSSxFQUFFLE9BQU8sQ0FBQyxJQUFJO29CQUNsQixJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUk7b0JBQ2xCLE9BQU8sRUFBRSxPQUFPLENBQUMsT0FBTztvQkFDeEIsU0FBUyxFQUFFLE9BQU8sQ0FBQyxTQUFTO29CQUM1QixPQUFPLEVBQUUsSUFBSTtpQkFDZCxDQUFDO2FBQ0gsQ0FBQyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNwQixDQUFDLENBQUM7SUFDSixDQUFDO0lBckRELDRCQXFEQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIFJ1bGUsXG4gIFNjaGVtYXRpY0NvbnRleHQsXG4gIFRyZWUsXG4gIGNoYWluLFxuICBzY2hlbWF0aWMsXG59IGZyb20gJ0Bhbmd1bGFyLWRldmtpdC9zY2hlbWF0aWNzJztcbmltcG9ydCB7IFNjaGVtYSBhcyBGZWF0dXJlT3B0aW9ucyB9IGZyb20gJy4vc2NoZW1hJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24ob3B0aW9uczogRmVhdHVyZU9wdGlvbnMpOiBSdWxlIHtcbiAgaWYgKCFvcHRpb25zLnNraXBUZXN0cyAmJiBvcHRpb25zLnNraXBUZXN0KSB7XG4gICAgb3B0aW9ucy5za2lwVGVzdHMgPSBvcHRpb25zLnNraXBUZXN0O1xuICB9XG5cbiAgcmV0dXJuIChob3N0OiBUcmVlLCBjb250ZXh0OiBTY2hlbWF0aWNDb250ZXh0KSA9PiB7XG4gICAgcmV0dXJuIGNoYWluKFtcbiAgICAgIHNjaGVtYXRpYygnYWN0aW9uJywge1xuICAgICAgICBmbGF0OiBvcHRpb25zLmZsYXQsXG4gICAgICAgIGdyb3VwOiBvcHRpb25zLmdyb3VwLFxuICAgICAgICBuYW1lOiBvcHRpb25zLm5hbWUsXG4gICAgICAgIHBhdGg6IG9wdGlvbnMucGF0aCxcbiAgICAgICAgcHJvamVjdDogb3B0aW9ucy5wcm9qZWN0LFxuICAgICAgICBza2lwVGVzdHM6IG9wdGlvbnMuc2tpcFRlc3RzLFxuICAgICAgICBhcGk6IG9wdGlvbnMuYXBpLFxuICAgICAgICBjcmVhdG9yczogb3B0aW9ucy5jcmVhdG9ycyxcbiAgICAgIH0pLFxuICAgICAgc2NoZW1hdGljKCdyZWR1Y2VyJywge1xuICAgICAgICBmbGF0OiBvcHRpb25zLmZsYXQsXG4gICAgICAgIGdyb3VwOiBvcHRpb25zLmdyb3VwLFxuICAgICAgICBtb2R1bGU6IG9wdGlvbnMubW9kdWxlLFxuICAgICAgICBuYW1lOiBvcHRpb25zLm5hbWUsXG4gICAgICAgIHBhdGg6IG9wdGlvbnMucGF0aCxcbiAgICAgICAgcHJvamVjdDogb3B0aW9ucy5wcm9qZWN0LFxuICAgICAgICBza2lwVGVzdHM6IG9wdGlvbnMuc2tpcFRlc3RzLFxuICAgICAgICByZWR1Y2Vyczogb3B0aW9ucy5yZWR1Y2VycyxcbiAgICAgICAgZmVhdHVyZTogdHJ1ZSxcbiAgICAgICAgYXBpOiBvcHRpb25zLmFwaSxcbiAgICAgICAgY3JlYXRvcnM6IG9wdGlvbnMuY3JlYXRvcnMsXG4gICAgICB9KSxcbiAgICAgIHNjaGVtYXRpYygnZWZmZWN0Jywge1xuICAgICAgICBmbGF0OiBvcHRpb25zLmZsYXQsXG4gICAgICAgIGdyb3VwOiBvcHRpb25zLmdyb3VwLFxuICAgICAgICBtb2R1bGU6IG9wdGlvbnMubW9kdWxlLFxuICAgICAgICBuYW1lOiBvcHRpb25zLm5hbWUsXG4gICAgICAgIHBhdGg6IG9wdGlvbnMucGF0aCxcbiAgICAgICAgcHJvamVjdDogb3B0aW9ucy5wcm9qZWN0LFxuICAgICAgICBza2lwVGVzdHM6IG9wdGlvbnMuc2tpcFRlc3RzLFxuICAgICAgICBmZWF0dXJlOiB0cnVlLFxuICAgICAgICBhcGk6IG9wdGlvbnMuYXBpLFxuICAgICAgICBjcmVhdG9yczogb3B0aW9ucy5jcmVhdG9ycyxcbiAgICAgIH0pLFxuICAgICAgc2NoZW1hdGljKCdzZWxlY3RvcicsIHtcbiAgICAgICAgZmxhdDogb3B0aW9ucy5mbGF0LFxuICAgICAgICBncm91cDogb3B0aW9ucy5ncm91cCxcbiAgICAgICAgbmFtZTogb3B0aW9ucy5uYW1lLFxuICAgICAgICBwYXRoOiBvcHRpb25zLnBhdGgsXG4gICAgICAgIHByb2plY3Q6IG9wdGlvbnMucHJvamVjdCxcbiAgICAgICAgc2tpcFRlc3RzOiBvcHRpb25zLnNraXBUZXN0cyxcbiAgICAgICAgZmVhdHVyZTogdHJ1ZSxcbiAgICAgIH0pLFxuICAgIF0pKGhvc3QsIGNvbnRleHQpO1xuICB9O1xufVxuIl19