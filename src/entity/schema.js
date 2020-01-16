(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@ngrx/schematics/src/entity/schema", ["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1hLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9zY2hlbWF0aWNzL3NyYy9lbnRpdHkvc2NoZW1hLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiIiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgaW50ZXJmYWNlIFNjaGVtYSB7XG4gIC8qKlxuICAgKiBUaGUgbmFtZSBvZiB0aGUgY29tcG9uZW50LlxuICAgKi9cblxuICBuYW1lOiBzdHJpbmc7XG4gIC8qKlxuICAgKiBUaGUgcGF0aCB0byBjcmVhdGUgdGhlIGVmZmVjdC5cbiAgICovXG5cbiAgcGF0aD86IHN0cmluZztcbiAgLyoqXG4gICAqIFRoZSBuYW1lIG9mIHRoZSBwcm9qZWN0LlxuICAgKi9cbiAgcHJvamVjdD86IHN0cmluZztcbiAgLyoqXG4gICAqIEZsYWcgdG8gaW5kaWNhdGUgaWYgYSBkaXIgaXMgY3JlYXRlZC5cbiAgICovXG4gIGZsYXQ/OiBib29sZWFuO1xuICAvKipcbiAgICogV2hlbiB0cnVlLCBkb2VzIG5vdCBjcmVhdGUgdGVzdCBmaWxlcy5cbiAgICovXG4gIHNraXBUZXN0PzogYm9vbGVhbjtcbiAgLyoqXG4gICAqIEFsbG93cyBzcGVjaWZpY2F0aW9uIG9mIHRoZSBkZWNsYXJpbmcgbW9kdWxlLlxuICAgKi9cblxuICBtb2R1bGU/OiBzdHJpbmc7XG4gIC8qKlxuICAgKiBBbGxvd3Mgc3BlY2lmaWNhdGlvbiBvZiB0aGUgZGVjbGFyaW5nIHJlZHVjZXJzLlxuICAgKi9cblxuICByZWR1Y2Vycz86IHN0cmluZztcbiAgLyoqXG4gICAqIFNwZWNpZmllcyBpZiB0aGlzIGlzIGdyb3VwZWQgd2l0aGluIHN1YiBmb2xkZXJzXG4gICAqL1xuXG4gIGdyb3VwPzogYm9vbGVhbjtcblxuICAvKipcbiAgICogU3BlY2lmaWVzIHdoZXRoZXIgdG8gdXNlIGNyZWF0b3IgZnVuY3Rpb25zIGZvclxuICAgKiBoYW5kbGluZyBhY3Rpb25zIGFuZCByZWR1Y2Vycy5cbiAgICovXG4gIGNyZWF0b3JzPzogYm9vbGVhbjtcbn1cbiJdfQ==