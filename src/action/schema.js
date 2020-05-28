(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@ngrx/schematics/src/action/schema", ["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1hLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9zY2hlbWF0aWNzL3NyYy9hY3Rpb24vc2NoZW1hLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiIiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgaW50ZXJmYWNlIFNjaGVtYSB7XG4gIC8qKlxuICAgKiBUaGUgbmFtZSBvZiB0aGUgY29tcG9uZW50LlxuICAgKi9cbiAgbmFtZTogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgcGF0aCB0byBjcmVhdGUgdGhlIGNvbXBvbmVudC5cbiAgICovXG4gIHBhdGg/OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSBuYW1lIG9mIHRoZSBwcm9qZWN0LlxuICAgKi9cbiAgcHJvamVjdD86IHN0cmluZztcblxuICAvKipcbiAgICogV2hlbiB0cnVlLCBkb2VzIG5vdCBjcmVhdGUgdGVzdCBmaWxlcy5cbiAgICogQGRlcHJlY2F0ZWQgVXNlIHNraXBUZXN0cyBpbnN0ZWFkXG4gICAqL1xuICBza2lwVGVzdD86IGJvb2xlYW47XG4gIC8qKlxuICAgKiBXaGVuIHRydWUsIGRvZXMgbm90IGNyZWF0ZSB0ZXN0IGZpbGVzLlxuICAgKi9cbiAgc2tpcFRlc3RzPzogYm9vbGVhbjtcblxuICAvKipcbiAgICogRmxhZyB0byBpbmRpY2F0ZSBpZiBhIGRpciBpcyBjcmVhdGVkLlxuICAgKi9cblxuICBmbGF0PzogYm9vbGVhbjtcblxuICAvKipcbiAgICogR3JvdXAgYWN0aW9ucyBmaWxlIHdpdGhpbiAnYWN0aW9ucycgZm9sZGVyXG4gICAqL1xuICBncm91cD86IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFNwZWNpZmllcyBpZiBhcGkgc3VjY2VzcyBhbmQgZmFpbHVyZSBhY3Rpb25zXG4gICAqIHNob3VsZCBiZSBnZW5lcmF0ZWQuXG4gICAqL1xuICBhcGk/OiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBTcGVjaWZpZXMgd2hldGhlciB0byB1c2UgY3JlYXRvciBmdW5jdGlvbnMgZm9yXG4gICAqIGhhbmRsaW5nIGFjdGlvbnMgYW5kIHJlZHVjZXJzLlxuICAgKi9cbiAgY3JlYXRvcnM/OiBib29sZWFuO1xufVxuIl19