(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@ngrx/schematics/src/schematics-core/testing/index", ["require", "exports", "@ngrx/schematics/src/schematics-core/testing/create-app-module", "@ngrx/schematics/src/schematics-core/testing/create-reducers", "@ngrx/schematics/src/schematics-core/testing/create-workspace", "@ngrx/schematics/src/schematics-core/testing/get-file-content"], factory);
    }
})(function (require, exports) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    __export(require("@ngrx/schematics/src/schematics-core/testing/create-app-module"));
    __export(require("@ngrx/schematics/src/schematics-core/testing/create-reducers"));
    __export(require("@ngrx/schematics/src/schematics-core/testing/create-workspace"));
    __export(require("@ngrx/schematics/src/schematics-core/testing/get-file-content"));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3NjaGVtYXRpY3Mvc3JjL3NjaGVtYXRpY3MtY29yZS90ZXN0aW5nL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0lBQUEsb0ZBQW9DO0lBQ3BDLGtGQUFrQztJQUNsQyxtRkFBbUM7SUFDbkMsbUZBQW1DIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0ICogZnJvbSAnLi9jcmVhdGUtYXBwLW1vZHVsZSc7XG5leHBvcnQgKiBmcm9tICcuL2NyZWF0ZS1yZWR1Y2Vycyc7XG5leHBvcnQgKiBmcm9tICcuL2NyZWF0ZS13b3Jrc3BhY2UnO1xuZXhwb3J0ICogZnJvbSAnLi9nZXQtZmlsZS1jb250ZW50JztcbiJdfQ==