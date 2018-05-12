(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@ngrx/schematics/migrations/6_0_0/index", ["require", "exports", "@ngrx/schematics/schematics-core/index"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var schematics_core_1 = require("@ngrx/schematics/schematics-core/index");
    function default_1() {
        return schematics_core_1.updatePackage('schematics');
    }
    exports.default = default_1;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3NjaGVtYXRpY3MvbWlncmF0aW9ucy82XzBfMC9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztJQUNBLDBFQUFpRTtJQUVqRTtRQUNFLE1BQU0sQ0FBQywrQkFBYSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFGRCw0QkFFQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJ1bGUgfSBmcm9tICdAYW5ndWxhci1kZXZraXQvc2NoZW1hdGljcyc7XG5pbXBvcnQgeyB1cGRhdGVQYWNrYWdlIH0gZnJvbSAnQG5ncngvc2NoZW1hdGljcy9zY2hlbWF0aWNzLWNvcmUnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpOiBSdWxlIHtcbiAgcmV0dXJuIHVwZGF0ZVBhY2thZ2UoJ3NjaGVtYXRpY3MnKTtcbn1cbiJdfQ==