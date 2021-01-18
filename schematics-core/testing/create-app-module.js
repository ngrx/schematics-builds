"use strict";
exports.__esModule = true;
exports.createAppModuleWithEffects = exports.createAppModule = void 0;
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
//# sourceMappingURL=create-app-module.js.map