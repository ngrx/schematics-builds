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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1hLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9zY2hlbWF0aWNzL3NyYy9lbnRpdHkvc2NoZW1hLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiIiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgaW50ZXJmYWNlIFNjaGVtYSB7XG4gIC8qKlxuICAgKiBUaGUgbmFtZSBvZiB0aGUgY29tcG9uZW50LlxuICAgKi9cblxuICBuYW1lOiBzdHJpbmc7XG4gIC8qKlxuICAgKiBUaGUgcGF0aCB0byBjcmVhdGUgdGhlIGVmZmVjdC5cbiAgICovXG5cbiAgcGF0aD86IHN0cmluZztcbiAgLyoqXG4gICAqIFRoZSBuYW1lIG9mIHRoZSBwcm9qZWN0LlxuICAgKi9cbiAgcHJvamVjdD86IHN0cmluZztcbiAgLyoqXG4gICAqIEZsYWcgdG8gaW5kaWNhdGUgaWYgYSBkaXIgaXMgY3JlYXRlZC5cbiAgICovXG4gIGZsYXQ/OiBib29sZWFuO1xuICAvKipcbiAgICogU3BlY2lmaWVzIGlmIGEgc3BlYyBmaWxlIGlzIGdlbmVyYXRlZC5cbiAgICovXG4gIHNwZWM/OiBib29sZWFuO1xuICAvKipcbiAgICogQWxsb3dzIHNwZWNpZmljYXRpb24gb2YgdGhlIGRlY2xhcmluZyBtb2R1bGUuXG4gICAqL1xuXG4gIG1vZHVsZT86IHN0cmluZztcbiAgLyoqXG4gICAqIEFsbG93cyBzcGVjaWZpY2F0aW9uIG9mIHRoZSBkZWNsYXJpbmcgcmVkdWNlcnMuXG4gICAqL1xuXG4gIHJlZHVjZXJzPzogc3RyaW5nO1xuICAvKipcbiAgICogU3BlY2lmaWVzIGlmIHRoaXMgaXMgZ3JvdXBlZCB3aXRoaW4gc3ViIGZvbGRlcnNcbiAgICovXG5cbiAgZ3JvdXA/OiBib29sZWFuO1xufVxuIl19