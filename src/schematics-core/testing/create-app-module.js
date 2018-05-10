(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@ngrx/schematics/src/schematics-core/testing/create-app-module", ["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function createAppModule(tree, path) {
        tree.create(path || '/src/app/app.module.ts', "\n    import { BrowserModule } from '@angular/platform-browser';\n    import { NgModule } from '@angular/core';\n    import { AppComponent } from './app.component';\n\n    @NgModule({\n    declarations: [\n      AppComponent\n    ],\n    imports: [\n      BrowserModule\n    ],\n    providers: [],\n    bootstrap: [AppComponent]\n    })\n    export class AppModule { }\n  ");
        return tree;
    }
    exports.createAppModule = createAppModule;
    function createAppModuleWithEffects(tree, path, effects) {
        tree.create(path || '/src/app/app.module.ts', "\n    import { BrowserModule } from '@angular/platform-browser';\n    import { NgModule } from '@angular/core';\n    import { AppComponent } from './app.component';\n    import { EffectsModule } from '@ngrx/effects';\n\n    @NgModule({\n      declarations: [\n        AppComponent\n      ],\n      imports: [\n        BrowserModule,\n        " + effects + "\n      ],\n      providers: [],\n      bootstrap: [AppComponent]\n    })\n    export class AppModule { }\n  ");
        return tree;
    }
    exports.createAppModuleWithEffects = createAppModuleWithEffects;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLWFwcC1tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3NjaGVtYXRpY3Mvc3JjL3NjaGVtYXRpY3MtY29yZS90ZXN0aW5nL2NyZWF0ZS1hcHAtbW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0lBRUEseUJBQ0UsSUFBa0IsRUFDbEIsSUFBYTtRQUViLElBQUksQ0FBQyxNQUFNLENBQ1QsSUFBSSxJQUFJLHdCQUF3QixFQUNoQyxzWEFnQkQsQ0FDQSxDQUFDO1FBRUYsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNkLENBQUM7SUExQkQsMENBMEJDO0lBRUQsb0NBQ0UsSUFBa0IsRUFDbEIsSUFBWSxFQUNaLE9BQWdCO1FBRWhCLElBQUksQ0FBQyxNQUFNLENBQ1QsSUFBSSxJQUFJLHdCQUF3QixFQUNoQywyVkFZTSxPQUFPLGtIQU1kLENBQ0EsQ0FBQztRQUVGLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBN0JELGdFQTZCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFVuaXRUZXN0VHJlZSB9IGZyb20gJ0Bhbmd1bGFyLWRldmtpdC9zY2hlbWF0aWNzL3Rlc3RpbmcnO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQXBwTW9kdWxlKFxuICB0cmVlOiBVbml0VGVzdFRyZWUsXG4gIHBhdGg/OiBzdHJpbmdcbik6IFVuaXRUZXN0VHJlZSB7XG4gIHRyZWUuY3JlYXRlKFxuICAgIHBhdGggfHwgJy9zcmMvYXBwL2FwcC5tb2R1bGUudHMnLFxuICAgIGBcbiAgICBpbXBvcnQgeyBCcm93c2VyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG4gICAgaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbiAgICBpbXBvcnQgeyBBcHBDb21wb25lbnQgfSBmcm9tICcuL2FwcC5jb21wb25lbnQnO1xuXG4gICAgQE5nTW9kdWxlKHtcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgIEFwcENvbXBvbmVudFxuICAgIF0sXG4gICAgaW1wb3J0czogW1xuICAgICAgQnJvd3Nlck1vZHVsZVxuICAgIF0sXG4gICAgcHJvdmlkZXJzOiBbXSxcbiAgICBib290c3RyYXA6IFtBcHBDb21wb25lbnRdXG4gICAgfSlcbiAgICBleHBvcnQgY2xhc3MgQXBwTW9kdWxlIHsgfVxuICBgXG4gICk7XG5cbiAgcmV0dXJuIHRyZWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVBcHBNb2R1bGVXaXRoRWZmZWN0cyhcbiAgdHJlZTogVW5pdFRlc3RUcmVlLFxuICBwYXRoOiBzdHJpbmcsXG4gIGVmZmVjdHM/OiBzdHJpbmdcbik6IFVuaXRUZXN0VHJlZSB7XG4gIHRyZWUuY3JlYXRlKFxuICAgIHBhdGggfHwgJy9zcmMvYXBwL2FwcC5tb2R1bGUudHMnLFxuICAgIGBcbiAgICBpbXBvcnQgeyBCcm93c2VyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG4gICAgaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbiAgICBpbXBvcnQgeyBBcHBDb21wb25lbnQgfSBmcm9tICcuL2FwcC5jb21wb25lbnQnO1xuICAgIGltcG9ydCB7IEVmZmVjdHNNb2R1bGUgfSBmcm9tICdAbmdyeC9lZmZlY3RzJztcblxuICAgIEBOZ01vZHVsZSh7XG4gICAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgQXBwQ29tcG9uZW50XG4gICAgICBdLFxuICAgICAgaW1wb3J0czogW1xuICAgICAgICBCcm93c2VyTW9kdWxlLFxuICAgICAgICAke2VmZmVjdHN9XG4gICAgICBdLFxuICAgICAgcHJvdmlkZXJzOiBbXSxcbiAgICAgIGJvb3RzdHJhcDogW0FwcENvbXBvbmVudF1cbiAgICB9KVxuICAgIGV4cG9ydCBjbGFzcyBBcHBNb2R1bGUgeyB9XG4gIGBcbiAgKTtcblxuICByZXR1cm4gdHJlZTtcbn1cbiJdfQ==