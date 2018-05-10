(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@ngrx/schematics/src/schematics-core/testing/create-reducers", ["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function createReducers(tree, path, project) {
        if (project === void 0) { project = 'bar'; }
        tree.create(path || "/projects/" + project + "/src/app/reducers/index.ts", "\n    import {\n      ActionReducer,\n      ActionReducerMap,\n      createFeatureSelector,\n      createSelector,\n      MetaReducer\n    } from '@ngrx/store';\n    import { environment } from '../../environments/environment';\n    \n    export interface State {\n    \n    }\n    \n    export const reducers: ActionReducerMap<State> = {\n    \n    };\n    \n    \n    export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];\n  ");
        return tree;
    }
    exports.createReducers = createReducers;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLXJlZHVjZXJzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9zY2hlbWF0aWNzL3NyYy9zY2hlbWF0aWNzLWNvcmUvdGVzdGluZy9jcmVhdGUtcmVkdWNlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7SUFFQSx3QkFDRSxJQUFrQixFQUNsQixJQUFhLEVBQ2IsT0FBZTtRQUFmLHdCQUFBLEVBQUEsZUFBZTtRQUVmLElBQUksQ0FBQyxNQUFNLENBQ1QsSUFBSSxJQUFJLGVBQWEsT0FBTywrQkFBNEIsRUFDeEQsNGNBb0JELENBQ0EsQ0FBQztRQUVGLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBL0JELHdDQStCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFVuaXRUZXN0VHJlZSB9IGZyb20gJ0Bhbmd1bGFyLWRldmtpdC9zY2hlbWF0aWNzL3Rlc3RpbmcnO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUmVkdWNlcnMoXG4gIHRyZWU6IFVuaXRUZXN0VHJlZSxcbiAgcGF0aD86IHN0cmluZyxcbiAgcHJvamVjdCA9ICdiYXInXG4pIHtcbiAgdHJlZS5jcmVhdGUoXG4gICAgcGF0aCB8fCBgL3Byb2plY3RzLyR7cHJvamVjdH0vc3JjL2FwcC9yZWR1Y2Vycy9pbmRleC50c2AsXG4gICAgYFxuICAgIGltcG9ydCB7XG4gICAgICBBY3Rpb25SZWR1Y2VyLFxuICAgICAgQWN0aW9uUmVkdWNlck1hcCxcbiAgICAgIGNyZWF0ZUZlYXR1cmVTZWxlY3RvcixcbiAgICAgIGNyZWF0ZVNlbGVjdG9yLFxuICAgICAgTWV0YVJlZHVjZXJcbiAgICB9IGZyb20gJ0BuZ3J4L3N0b3JlJztcbiAgICBpbXBvcnQgeyBlbnZpcm9ubWVudCB9IGZyb20gJy4uLy4uL2Vudmlyb25tZW50cy9lbnZpcm9ubWVudCc7XG4gICAgXG4gICAgZXhwb3J0IGludGVyZmFjZSBTdGF0ZSB7XG4gICAgXG4gICAgfVxuICAgIFxuICAgIGV4cG9ydCBjb25zdCByZWR1Y2VyczogQWN0aW9uUmVkdWNlck1hcDxTdGF0ZT4gPSB7XG4gICAgXG4gICAgfTtcbiAgICBcbiAgICBcbiAgICBleHBvcnQgY29uc3QgbWV0YVJlZHVjZXJzOiBNZXRhUmVkdWNlcjxTdGF0ZT5bXSA9ICFlbnZpcm9ubWVudC5wcm9kdWN0aW9uID8gW10gOiBbXTtcbiAgYFxuICApO1xuXG4gIHJldHVybiB0cmVlO1xufVxuIl19