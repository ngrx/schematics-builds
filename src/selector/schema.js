(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@ngrx/schematics/src/selector/schema", ["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1hLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9zY2hlbWF0aWNzL3NyYy9zZWxlY3Rvci9zY2hlbWEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBpbnRlcmZhY2UgU2NoZW1hIHtcbiAgLyoqXG4gICAqIFRoZSBuYW1lIG9mIHRoZSBzZWxlY3Rvci5cbiAgICovXG4gIG5hbWU6IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIHBhdGggdG8gY3JlYXRlIHRoZSBzZWxlY3Rvci5cbiAgICovXG4gIHBhdGg/OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSBuYW1lIG9mIHRoZSBwcm9qZWN0LlxuICAgKi9cbiAgcHJvamVjdD86IHN0cmluZztcblxuICAvKipcbiAgICogRmxhZyB0byBpbmRpY2F0ZSBpZiBhIGRpciBpcyBjcmVhdGVkLlxuICAgKi9cbiAgZmxhdD86IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFNwZWNpZmllcyBpZiBhIHNwZWMgZmlsZSBpcyBnZW5lcmF0ZWQuXG4gICAqL1xuICBzcGVjPzogYm9vbGVhbjtcblxuICAvKipcbiAgICogU3BlY2lmaWVzIGlmIHRoaXMgaXMgZ3JvdXBlZCB3aXRoaW4gYSBmZWF0dXJlXG4gICAqL1xuICBmZWF0dXJlPzogYm9vbGVhbjtcblxuICAvKipcbiAgICogU3BlY2lmaWVzIGlmIHRoaXMgaXMgZ3JvdXBlZCB3aXRoaW4gYW4gJ3NlbGVjdG9ycycgZm9sZGVyXG4gICAqL1xuICBncm91cD86IGJvb2xlYW47XG59XG4iXX0=