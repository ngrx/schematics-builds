(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@ngrx/schematics/src/data/schema", ["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1hLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9zY2hlbWF0aWNzL3NyYy9kYXRhL3NjaGVtYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGludGVyZmFjZSBTY2hlbWEge1xuICAvKipcbiAgICogVGhlIG5hbWUgb2YgdGhlIGNvbXBvbmVudC5cbiAgICovXG4gIG5hbWU6IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIHBhdGggdG8gY3JlYXRlIHRoZSBjb21wb25lbnQuXG4gICAqL1xuICBwYXRoPzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgbmFtZSBvZiB0aGUgcHJvamVjdC5cbiAgICovXG4gIHByb2plY3Q/OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFdoZW4gdHJ1ZSwgZG9lcyBub3QgY3JlYXRlIHRlc3QgZmlsZXMuXG4gICAqL1xuICBza2lwVGVzdD86IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIEZsYWcgdG8gaW5kaWNhdGUgaWYgYSBkaXIgaXMgY3JlYXRlZC5cbiAgICovXG5cbiAgZmxhdD86IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIEdyb3VwIGVudGl0eSBtZXRhZGF0YSBmaWxlcyB3aXRoaW4gJ2RhdGEnIGZvbGRlclxuICAgKi9cbiAgZ3JvdXA/OiBib29sZWFuO1xufVxuIl19