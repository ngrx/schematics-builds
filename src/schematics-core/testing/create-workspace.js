(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@ngrx/schematics/src/schematics-core/testing/create-workspace", ["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var defaultWorkspaceOptions = {
        name: 'workspace',
        newProjectRoot: 'projects',
        version: '6.0.0',
    };
    var defaultAppOptions = {
        name: 'bar',
        inlineStyle: false,
        inlineTemplate: false,
        viewEncapsulation: 'Emulated',
        routing: false,
        style: 'css',
        skipTests: false,
    };
    var defaultModuleOptions = {
        name: 'foo',
        spec: true,
        module: undefined,
        flat: false,
    };
    function getTestProjectPath(workspaceOptions, appOptions) {
        if (workspaceOptions === void 0) { workspaceOptions = defaultWorkspaceOptions; }
        if (appOptions === void 0) { appOptions = defaultAppOptions; }
        return "/" + workspaceOptions.newProjectRoot + "/" + appOptions.name;
    }
    exports.getTestProjectPath = getTestProjectPath;
    function createWorkspace(schematicRunner, appTree, workspaceOptions, appOptions) {
        if (workspaceOptions === void 0) { workspaceOptions = defaultWorkspaceOptions; }
        if (appOptions === void 0) { appOptions = defaultAppOptions; }
        appTree = schematicRunner.runExternalSchematic('@schematics/angular', 'workspace', workspaceOptions);
        appTree = schematicRunner.runExternalSchematic('@schematics/angular', 'application', appOptions, appTree);
        return appTree;
    }
    exports.createWorkspace = createWorkspace;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLXdvcmtzcGFjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvc2NoZW1hdGljcy9zcmMvc2NoZW1hdGljcy1jb3JlL3Rlc3RpbmcvY3JlYXRlLXdvcmtzcGFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztJQUtBLElBQU0sdUJBQXVCLEdBQUc7UUFDOUIsSUFBSSxFQUFFLFdBQVc7UUFDakIsY0FBYyxFQUFFLFVBQVU7UUFDMUIsT0FBTyxFQUFFLE9BQU87S0FDakIsQ0FBQztJQUVGLElBQU0saUJBQWlCLEdBQUc7UUFDeEIsSUFBSSxFQUFFLEtBQUs7UUFDWCxXQUFXLEVBQUUsS0FBSztRQUNsQixjQUFjLEVBQUUsS0FBSztRQUNyQixpQkFBaUIsRUFBRSxVQUFVO1FBQzdCLE9BQU8sRUFBRSxLQUFLO1FBQ2QsS0FBSyxFQUFFLEtBQUs7UUFDWixTQUFTLEVBQUUsS0FBSztLQUNqQixDQUFDO0lBRUYsSUFBTSxvQkFBb0IsR0FBRztRQUMzQixJQUFJLEVBQUUsS0FBSztRQUNYLElBQUksRUFBRSxJQUFJO1FBQ1YsTUFBTSxFQUFFLFNBQVM7UUFDakIsSUFBSSxFQUFFLEtBQUs7S0FDWixDQUFDO0lBRUYsNEJBQ0UsZ0JBQStDLEVBQy9DLFVBQW1DO1FBRG5DLGlDQUFBLEVBQUEsMENBQStDO1FBQy9DLDJCQUFBLEVBQUEsOEJBQW1DO1FBRW5DLE1BQU0sQ0FBQyxNQUFJLGdCQUFnQixDQUFDLGNBQWMsU0FBSSxVQUFVLENBQUMsSUFBTSxDQUFDO0lBQ2xFLENBQUM7SUFMRCxnREFLQztJQUVELHlCQUNFLGVBQW9DLEVBQ3BDLE9BQXFCLEVBQ3JCLGdCQUEwQyxFQUMxQyxVQUE4QjtRQUQ5QixpQ0FBQSxFQUFBLDBDQUEwQztRQUMxQywyQkFBQSxFQUFBLDhCQUE4QjtRQUU5QixPQUFPLEdBQUcsZUFBZSxDQUFDLG9CQUFvQixDQUM1QyxxQkFBcUIsRUFDckIsV0FBVyxFQUNYLGdCQUFnQixDQUNqQixDQUFDO1FBQ0YsT0FBTyxHQUFHLGVBQWUsQ0FBQyxvQkFBb0IsQ0FDNUMscUJBQXFCLEVBQ3JCLGFBQWEsRUFDYixVQUFVLEVBQ1YsT0FBTyxDQUNSLENBQUM7UUFFRixNQUFNLENBQUMsT0FBTyxDQUFDO0lBQ2pCLENBQUM7SUFuQkQsMENBbUJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgVW5pdFRlc3RUcmVlLFxuICBTY2hlbWF0aWNUZXN0UnVubmVyLFxufSBmcm9tICdAYW5ndWxhci1kZXZraXQvc2NoZW1hdGljcy90ZXN0aW5nJztcblxuY29uc3QgZGVmYXVsdFdvcmtzcGFjZU9wdGlvbnMgPSB7XG4gIG5hbWU6ICd3b3Jrc3BhY2UnLFxuICBuZXdQcm9qZWN0Um9vdDogJ3Byb2plY3RzJyxcbiAgdmVyc2lvbjogJzYuMC4wJyxcbn07XG5cbmNvbnN0IGRlZmF1bHRBcHBPcHRpb25zID0ge1xuICBuYW1lOiAnYmFyJyxcbiAgaW5saW5lU3R5bGU6IGZhbHNlLFxuICBpbmxpbmVUZW1wbGF0ZTogZmFsc2UsXG4gIHZpZXdFbmNhcHN1bGF0aW9uOiAnRW11bGF0ZWQnLFxuICByb3V0aW5nOiBmYWxzZSxcbiAgc3R5bGU6ICdjc3MnLFxuICBza2lwVGVzdHM6IGZhbHNlLFxufTtcblxuY29uc3QgZGVmYXVsdE1vZHVsZU9wdGlvbnMgPSB7XG4gIG5hbWU6ICdmb28nLFxuICBzcGVjOiB0cnVlLFxuICBtb2R1bGU6IHVuZGVmaW5lZCxcbiAgZmxhdDogZmFsc2UsXG59O1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VGVzdFByb2plY3RQYXRoKFxuICB3b3Jrc3BhY2VPcHRpb25zOiBhbnkgPSBkZWZhdWx0V29ya3NwYWNlT3B0aW9ucyxcbiAgYXBwT3B0aW9uczogYW55ID0gZGVmYXVsdEFwcE9wdGlvbnNcbikge1xuICByZXR1cm4gYC8ke3dvcmtzcGFjZU9wdGlvbnMubmV3UHJvamVjdFJvb3R9LyR7YXBwT3B0aW9ucy5uYW1lfWA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVXb3Jrc3BhY2UoXG4gIHNjaGVtYXRpY1J1bm5lcjogU2NoZW1hdGljVGVzdFJ1bm5lcixcbiAgYXBwVHJlZTogVW5pdFRlc3RUcmVlLFxuICB3b3Jrc3BhY2VPcHRpb25zID0gZGVmYXVsdFdvcmtzcGFjZU9wdGlvbnMsXG4gIGFwcE9wdGlvbnMgPSBkZWZhdWx0QXBwT3B0aW9uc1xuKSB7XG4gIGFwcFRyZWUgPSBzY2hlbWF0aWNSdW5uZXIucnVuRXh0ZXJuYWxTY2hlbWF0aWMoXG4gICAgJ0BzY2hlbWF0aWNzL2FuZ3VsYXInLFxuICAgICd3b3Jrc3BhY2UnLFxuICAgIHdvcmtzcGFjZU9wdGlvbnNcbiAgKTtcbiAgYXBwVHJlZSA9IHNjaGVtYXRpY1J1bm5lci5ydW5FeHRlcm5hbFNjaGVtYXRpYyhcbiAgICAnQHNjaGVtYXRpY3MvYW5ndWxhcicsXG4gICAgJ2FwcGxpY2F0aW9uJyxcbiAgICBhcHBPcHRpb25zLFxuICAgIGFwcFRyZWVcbiAgKTtcblxuICByZXR1cm4gYXBwVHJlZTtcbn1cbiJdfQ==