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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1hLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9zY2hlbWF0aWNzL3NyYy9hY3Rpb24vc2NoZW1hLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiIiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgaW50ZXJmYWNlIFNjaGVtYSB7XG4gIC8qKlxuICAgKiBUaGUgbmFtZSBvZiB0aGUgY29tcG9uZW50LlxuICAgKi9cbiAgbmFtZTogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgcGF0aCB0byBjcmVhdGUgdGhlIGNvbXBvbmVudC5cbiAgICovXG4gIHBhdGg/OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSBuYW1lIG9mIHRoZSBwcm9qZWN0LlxuICAgKi9cbiAgcHJvamVjdD86IHN0cmluZztcblxuICAvKipcbiAgICogU3BlY2lmaWVzIGlmIGEgc3BlYyBmaWxlIGlzIGdlbmVyYXRlZC5cbiAgICovXG4gIHNwZWM/OiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBGbGFnIHRvIGluZGljYXRlIGlmIGEgZGlyIGlzIGNyZWF0ZWQuXG4gICAqL1xuXG4gIGZsYXQ/OiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBHcm91cCBhY3Rpb25zIGZpbGUgd2l0aGluICdhY3Rpb25zJyBmb2xkZXJcbiAgICovXG4gIGdyb3VwPzogYm9vbGVhbjtcblxuICAvKipcbiAgICogU3BlY2lmaWVzIGlmIGFwaSBzdWNjZXNzIGFuZCBmYWlsdXJlIGFjdGlvbnNcbiAgICogc2hvdWxkIGJlIGdlbmVyYXRlZC5cbiAgICovXG4gIGFwaT86IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFNwZWNpZmllcyB3aGV0aGVyIHRvIHVzZSBjcmVhdG9yIGZ1bmN0aW9ucyBmb3JcbiAgICogaGFuZGxpbmcgYWN0aW9ucyBhbmQgcmVkdWNlcnMuXG4gICAqL1xuICBjcmVhdG9ycz86IGJvb2xlYW47XG59XG4iXX0=