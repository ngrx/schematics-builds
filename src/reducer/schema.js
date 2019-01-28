(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@ngrx/schematics/src/reducer/schema", ["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1hLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9zY2hlbWF0aWNzL3NyYy9yZWR1Y2VyL3NjaGVtYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGludGVyZmFjZSBTY2hlbWEge1xuICAvKipcbiAgICogVGhlIG5hbWUgb2YgdGhlIGNvbXBvbmVudC5cbiAgICovXG4gIG5hbWU6IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIHBhdGggdG8gY3JlYXRlIHRoZSBlZmZlY3QuXG4gICAqL1xuICBwYXRoPzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgbmFtZSBvZiB0aGUgcHJvamVjdC5cbiAgICovXG4gIHByb2plY3Q/OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIEZsYWcgdG8gaW5kaWNhdGUgaWYgYSBkaXIgaXMgY3JlYXRlZC5cbiAgICovXG4gIGZsYXQ/OiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBTcGVjaWZpZXMgaWYgYSBzcGVjIGZpbGUgaXMgZ2VuZXJhdGVkLlxuICAgKi9cbiAgc3BlYz86IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIEFsbG93cyBzcGVjaWZpY2F0aW9uIG9mIHRoZSBkZWNsYXJpbmcgbW9kdWxlLlxuICAgKi9cbiAgbW9kdWxlPzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBBbGxvd3Mgc3BlY2lmaWNhdGlvbiBvZiB0aGUgZGVjbGFyaW5nIHJlZHVjZXJzLlxuICAgKi9cbiAgcmVkdWNlcnM/OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFNwZWNpZmllcyBpZiB0aGlzIGlzIGdyb3VwZWQgd2l0aGluIHN1YiBmb2xkZXJzXG4gICAqL1xuICBncm91cD86IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFNwZWNpZmllcyBpZiB0aGlzIGlzIGdyb3VwZWQgd2l0aGluIGEgZmVhdHVyZVxuICAgKi9cbiAgZmVhdHVyZT86IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFNwZWNpZmllcyBpZiBhcGkgc3VjY2VzcyBhbmQgZmFpbHVyZSBhY3Rpb25zXG4gICAqIHNob3VsZCBiZSBhZGRlZCB0byB0aGUgcmVkdWNlci5cbiAgICovXG4gIGFwaT86IGJvb2xlYW47XG59XG4iXX0=