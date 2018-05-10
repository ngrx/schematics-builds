(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@ngrx/schematics/src/store/schema", ["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1hLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9zY2hlbWF0aWNzL3NyYy9zdG9yZS9zY2hlbWEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBpbnRlcmZhY2UgU2NoZW1hIHtcbiAgLyoqXG4gICAqIFRoZSBuYW1lIG9mIHRoZSBjb21wb25lbnQuXG4gICAqL1xuXG4gIG5hbWU6IHN0cmluZztcbiAgLyoqXG4gICAqIFRoZSBwYXRoIHRvIGNyZWF0ZSB0aGUgZWZmZWN0LlxuICAgKi9cblxuICBwYXRoPzogc3RyaW5nO1xuICAvKipcbiAgICogVGhlIG5hbWUgb2YgdGhlIHByb2plY3QuXG4gICAqL1xuICBwcm9qZWN0Pzogc3RyaW5nO1xuICAvKipcbiAgICogRmxhZyB0byBpbmRpY2F0ZSBpZiBhIGRpciBpcyBjcmVhdGVkLlxuICAgKi9cbiAgZmxhdD86IGJvb2xlYW47XG4gIC8qKlxuICAgKiBTcGVjaWZpZXMgaWYgYSBzcGVjIGZpbGUgaXMgZ2VuZXJhdGVkLlxuICAgKi9cbiAgc3BlYz86IGJvb2xlYW47XG4gIC8qKlxuICAgKiBBbGxvd3Mgc3BlY2lmaWNhdGlvbiBvZiB0aGUgZGVjbGFyaW5nIG1vZHVsZS5cbiAgICovXG4gIG1vZHVsZT86IHN0cmluZztcbiAgLyoqXG4gICAqIFNwZWNpZmllcyB0aGUgZGlyIGZvciB0aGUgc3RhdGUgZm9sZGVyXG4gICAqL1xuXG4gIHN0YXRlUGF0aD86IHN0cmluZztcbiAgLyoqXG4gICAqIFNwZWNpZmllcyB3aGV0aGVyIHRoaXMgaXMgdGhlIHJvb3Qgc3RhdGUgb3IgZmVhdHVyZSBzdGF0ZVxuICAgKi9cblxuICByb290PzogYm9vbGVhbjtcbiAgLyoqXG4gICAqIFNwZWNpZmllcyB0aGUgaW50ZXJmYWNlIGZvciB0aGUgc3RhdGVcbiAgICovXG4gIHN0YXRlSW50ZXJmYWNlPzogc3RyaW5nO1xufVxuIl19