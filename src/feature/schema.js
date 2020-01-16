(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@ngrx/schematics/src/feature/schema", ["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1hLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9zY2hlbWF0aWNzL3NyYy9mZWF0dXJlL3NjaGVtYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGludGVyZmFjZSBTY2hlbWEge1xuICAvKipcbiAgICogVGhlIG5hbWUgb2YgdGhlIGZlYXR1cmUuXG4gICAqL1xuICBuYW1lOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSBwYXRoIHRvIGNyZWF0ZSB0aGUgZmVhdHVyZS5cbiAgICovXG4gIHBhdGg/OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSBuYW1lIG9mIHRoZSBwcm9qZWN0LlxuICAgKi9cbiAgcHJvamVjdD86IHN0cmluZztcblxuICAvKipcbiAgICogRmxhZyB0byBpbmRpY2F0ZSBpZiBhIGRpciBpcyBjcmVhdGVkLlxuICAgKi9cbiAgZmxhdD86IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFdoZW4gdHJ1ZSwgZG9lcyBub3QgY3JlYXRlIHRlc3QgZmlsZXMuXG4gICAqL1xuICBza2lwVGVzdD86IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIEFsbG93cyBzcGVjaWZpY2F0aW9uIG9mIHRoZSBkZWNsYXJpbmcgbW9kdWxlLlxuICAgKi9cbiAgbW9kdWxlPzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBBbGxvd3Mgc3BlY2lmaWNhdGlvbiBvZiB0aGUgZGVjbGFyaW5nIHJlZHVjZXJzLlxuICAgKi9cbiAgcmVkdWNlcnM/OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFNwZWNpZmllcyBpZiB0aGlzIGlzIGdyb3VwZWQgd2l0aGluIHN1YiBmb2xkZXJzXG4gICAqL1xuICBncm91cD86IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFNwZWNpZmllcyBpZiBhcGkgc3VjY2VzcyBhbmQgZmFpbHVyZSBhY3Rpb25zLCByZWR1Y2VyLCBhbmQgZWZmZWN0c1xuICAgKiBzaG91bGQgYmUgZ2VuZXJhdGVkIGFzIHBhcnQgb2YgdGhpcyBmZWF0dXJlLlxuICAgKi9cbiAgYXBpPzogYm9vbGVhbjtcblxuICAvKipcbiAgICogU3BlY2lmaWVzIHdoZXRoZXIgdG8gdXNlIGNyZWF0b3IgZnVuY3Rpb25zIGZvciBhY3Rpb25zLCByZWR1Y2VycywgYW5kIGVmZmVjdHMuXG4gICAqL1xuICBjcmVhdG9ycz86IGJvb2xlYW47XG59XG4iXX0=