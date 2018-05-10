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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1hLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9zY2hlbWF0aWNzL3NyYy9hY3Rpb24vc2NoZW1hLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiIiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgaW50ZXJmYWNlIFNjaGVtYSB7XG4gIC8qKlxuICAgKiBUaGUgbmFtZSBvZiB0aGUgY29tcG9uZW50LlxuICAgKi9cblxuICBuYW1lOiBzdHJpbmc7XG4gIC8qKlxuICAgKiBUaGUgcGF0aCB0byBjcmVhdGUgdGhlIGNvbXBvbmVudC5cbiAgICovXG5cbiAgcGF0aD86IHN0cmluZztcbiAgLyoqXG4gICAqIFRoZSBuYW1lIG9mIHRoZSBwcm9qZWN0LlxuICAgKi9cbiAgcHJvamVjdD86IHN0cmluZztcbiAgLyoqXG4gICAqIFNwZWNpZmllcyBpZiBhIHNwZWMgZmlsZSBpcyBnZW5lcmF0ZWQuXG4gICAqL1xuICBzcGVjPzogYm9vbGVhbjtcbiAgLyoqXG4gICAqIEZsYWcgdG8gaW5kaWNhdGUgaWYgYSBkaXIgaXMgY3JlYXRlZC5cbiAgICovXG5cbiAgZmxhdD86IGJvb2xlYW47XG4gIC8qKlxuICAgKiBHcm91cCBhY3Rpb25zIGZpbGUgd2l0aGluICdhY3Rpb25zJyBmb2xkZXJcbiAgICovXG5cbiAgZ3JvdXA/OiBib29sZWFuO1xufVxuIl19