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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1hLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9zY2hlbWF0aWNzL3NyYy9mZWF0dXJlL3NjaGVtYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGludGVyZmFjZSBTY2hlbWEge1xuICAvKipcbiAgICogVGhlIG5hbWUgb2YgdGhlIGZlYXR1cmUuXG4gICAqL1xuICBuYW1lOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSBwYXRoIHRvIGNyZWF0ZSB0aGUgZmVhdHVyZS5cbiAgICovXG4gIHBhdGg/OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSBuYW1lIG9mIHRoZSBwcm9qZWN0LlxuICAgKi9cbiAgcHJvamVjdD86IHN0cmluZztcblxuICAvKipcbiAgICogRmxhZyB0byBpbmRpY2F0ZSBpZiBhIGRpciBpcyBjcmVhdGVkLlxuICAgKi9cbiAgZmxhdD86IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFNwZWNpZmllcyBpZiBhIHNwZWMgZmlsZSBpcyBnZW5lcmF0ZWQuXG4gICAqL1xuICBzcGVjPzogYm9vbGVhbjtcblxuICAvKipcbiAgICogQWxsb3dzIHNwZWNpZmljYXRpb24gb2YgdGhlIGRlY2xhcmluZyBtb2R1bGUuXG4gICAqL1xuICBtb2R1bGU/OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIEFsbG93cyBzcGVjaWZpY2F0aW9uIG9mIHRoZSBkZWNsYXJpbmcgcmVkdWNlcnMuXG4gICAqL1xuICByZWR1Y2Vycz86IHN0cmluZztcblxuICAvKipcbiAgICogU3BlY2lmaWVzIGlmIHRoaXMgaXMgZ3JvdXBlZCB3aXRoaW4gc3ViIGZvbGRlcnNcbiAgICovXG4gIGdyb3VwPzogYm9vbGVhbjtcblxuICAvKipcbiAgICogU3BlY2lmaWVzIGlmIGFwaSBzdWNjZXNzIGFuZCBmYWlsdXJlIGFjdGlvbnMsIHJlZHVjZXIsIGFuZCBlZmZlY3RzXG4gICAqIHNob3VsZCBiZSBnZW5lcmF0ZWQgYXMgcGFydCBvZiB0aGlzIGZlYXR1cmUuXG4gICAqL1xuICBhcGk/OiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBTcGVjaWZpZXMgd2hldGhlciB0byB1c2UgY3JlYXRvciBmdW5jdGlvbnMgZm9yIGFjdGlvbnMsIHJlZHVjZXJzLCBhbmQgZWZmZWN0cy5cbiAgICovXG4gIGNyZWF0b3JzPzogYm9vbGVhbjtcbn1cbiJdfQ==