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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1hLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9zY2hlbWF0aWNzL3NyYy9hY3Rpb24vc2NoZW1hLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiIiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgaW50ZXJmYWNlIFNjaGVtYSB7XG4gIC8qKlxuICAgKiBUaGUgbmFtZSBvZiB0aGUgY29tcG9uZW50LlxuICAgKi9cbiAgbmFtZTogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgcGF0aCB0byBjcmVhdGUgdGhlIGNvbXBvbmVudC5cbiAgICovXG4gIHBhdGg/OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSBuYW1lIG9mIHRoZSBwcm9qZWN0LlxuICAgKi9cbiAgcHJvamVjdD86IHN0cmluZztcblxuICAvKipcbiAgICogV2hlbiB0cnVlLCBkb2VzIG5vdCBjcmVhdGUgdGVzdCBmaWxlcy5cbiAgICovXG4gIHNraXBUZXN0cz86IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIEZsYWcgdG8gaW5kaWNhdGUgaWYgYSBkaXIgaXMgY3JlYXRlZC5cbiAgICovXG5cbiAgZmxhdD86IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIEdyb3VwIGFjdGlvbnMgZmlsZSB3aXRoaW4gJ2FjdGlvbnMnIGZvbGRlclxuICAgKi9cbiAgZ3JvdXA/OiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBTcGVjaWZpZXMgaWYgYXBpIHN1Y2Nlc3MgYW5kIGZhaWx1cmUgYWN0aW9uc1xuICAgKiBzaG91bGQgYmUgZ2VuZXJhdGVkLlxuICAgKi9cbiAgYXBpPzogYm9vbGVhbjtcblxuICAvKipcbiAgICogU3BlY2lmaWVzIHdoZXRoZXIgdG8gdXNlIGNyZWF0b3IgZnVuY3Rpb25zIGZvclxuICAgKiBoYW5kbGluZyBhY3Rpb25zIGFuZCByZWR1Y2Vycy5cbiAgICovXG4gIGNyZWF0b3JzPzogYm9vbGVhbjtcbn1cbiJdfQ==