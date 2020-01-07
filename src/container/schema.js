(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@ngrx/schematics/src/container/schema", ["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1hLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9zY2hlbWF0aWNzL3NyYy9jb250YWluZXIvc2NoZW1hLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiIiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgaW50ZXJmYWNlIFNjaGVtYSB7XG4gIC8qKlxuICAgKiBUaGUgcGF0aCB0byBjcmVhdGUgdGhlIGNvbXBvbmVudC5cbiAgICovXG4gIHBhdGg/OiBzdHJpbmc7XG4gIC8qKlxuICAgKiBUaGUgbmFtZSBvZiB0aGUgcHJvamVjdC5cbiAgICovXG4gIHByb2plY3Q/OiBzdHJpbmc7XG4gIC8qKlxuICAgKiBUaGUgbmFtZSBvZiB0aGUgY29tcG9uZW50LlxuICAgKi9cbiAgbmFtZTogc3RyaW5nO1xuICAvKipcbiAgICogU3BlY2lmaWVzIGlmIHRoZSBzdHlsZSB3aWxsIGJlIGluIHRoZSB0cyBmaWxlLlxuICAgKi9cbiAgaW5saW5lU3R5bGU/OiBib29sZWFuO1xuICAvKipcbiAgICogU3BlY2lmaWVzIGlmIHRoZSB0ZW1wbGF0ZSB3aWxsIGJlIGluIHRoZSB0cyBmaWxlLlxuICAgKi9cbiAgaW5saW5lVGVtcGxhdGU/OiBib29sZWFuO1xuICAvKipcbiAgICogU3BlY2lmaWVzIHRoZSB2aWV3IGVuY2Fwc3VsYXRpb24gc3RyYXRlZ3kuXG4gICAqL1xuICB2aWV3RW5jYXBzdWxhdGlvbj86ICdFbXVsYXRlZCcgfCAnTmF0aXZlJyB8ICdOb25lJztcbiAgLyoqXG4gICAqIFNwZWNpZmllcyB0aGUgY2hhbmdlIGRldGVjdGlvbiBzdHJhdGVneS5cbiAgICovXG4gIGNoYW5nZURldGVjdGlvbj86ICdEZWZhdWx0JyB8ICdPblB1c2gnO1xuICAvKipcbiAgICogVGhlIHByZWZpeCB0byBhcHBseSB0byBnZW5lcmF0ZWQgc2VsZWN0b3JzLlxuICAgKi9cbiAgcHJlZml4Pzogc3RyaW5nO1xuICAvKipcbiAgICogVGhlIGZpbGUgZXh0ZW5zaW9uIG9yIHByZXByb2Nlc3NvciB0byB1c2UgZm9yIHN0eWxlIGZpbGVzLlxuICAgKi9cbiAgc3R5bGU/OiBzdHJpbmc7XG4gIC8qKlxuICAgKiBTcGVjaWZpZXMgaWYgYSBzcGVjIGZpbGUgaXMgZ2VuZXJhdGVkLlxuICAgKi9cbiAgc3BlYz86IGJvb2xlYW47XG4gIC8qKlxuICAgKiBGbGFnIHRvIGluZGljYXRlIGlmIGEgZGlyIGlzIGNyZWF0ZWQuXG4gICAqL1xuICBmbGF0PzogYm9vbGVhbjtcbiAgLyoqXG4gICAqIEZsYWcgdG8gc2tpcCB0aGUgbW9kdWxlIGltcG9ydC5cbiAgICovXG4gIHNraXBJbXBvcnQ/OiBib29sZWFuO1xuICAvKipcbiAgICogVGhlIHNlbGVjdG9yIHRvIHVzZSBmb3IgdGhlIGNvbXBvbmVudC5cbiAgICovXG4gIHNlbGVjdG9yPzogc3RyaW5nO1xuICAvKipcbiAgICogQWxsb3dzIHNwZWNpZmljYXRpb24gb2YgdGhlIGRlY2xhcmluZyBtb2R1bGUuXG4gICAqL1xuICBtb2R1bGU/OiBzdHJpbmc7XG4gIC8qKlxuICAgKiBTcGVjaWZpZXMgaWYgZGVjbGFyaW5nIG1vZHVsZSBleHBvcnRzIHRoZSBjb21wb25lbnQuXG4gICAqL1xuICBleHBvcnQ/OiBib29sZWFuO1xuICAvKipcbiAgICogU3BlY2lmaWVzIHRoZSBwYXRoIHRvIHRoZSBzdGF0ZSBleHBvcnRzXG4gICAqL1xuICBzdGF0ZT86IHN0cmluZztcblxuICAvKipcbiAgICogU3BlY2lmaWVzIHRoZSBpbnRlcmZhY2UgZm9yIHRoZSBzdGF0ZVxuICAgKi9cbiAgc3RhdGVJbnRlcmZhY2U/OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFNwZWNpZmllcyB3aGV0aGVyIHRvIGNyZWF0ZSBhIHVuaXQgdGVzdCBvciBhbiBpbnRlZ3JhdGlvbiB0ZXN0LlxuICAgKi9cbiAgdGVzdERlcHRoPzogc3RyaW5nO1xufVxuIl19