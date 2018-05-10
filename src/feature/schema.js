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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1hLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9zY2hlbWF0aWNzL3NyYy9mZWF0dXJlL3NjaGVtYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGludGVyZmFjZSBTY2hlbWEge1xuICAvKipcbiAgICogVGhlIG5hbWUgb2YgdGhlIGZlYXR1cmUuXG4gICAqL1xuICBuYW1lOiBzdHJpbmc7XG4gIC8qKlxuICAgKiBUaGUgcGF0aCB0byBjcmVhdGUgdGhlIGZlYXR1cmUuXG4gICAqL1xuICBwYXRoPzogc3RyaW5nO1xuICAvKipcbiAgICogVGhlIG5hbWUgb2YgdGhlIHByb2plY3QuXG4gICAqL1xuICBwcm9qZWN0Pzogc3RyaW5nO1xuICAvKipcbiAgICogRmxhZyB0byBpbmRpY2F0ZSBpZiBhIGRpciBpcyBjcmVhdGVkLlxuICAgKi9cbiAgZmxhdD86IGJvb2xlYW47XG4gIC8qKlxuICAgKiBTcGVjaWZpZXMgaWYgYSBzcGVjIGZpbGUgaXMgZ2VuZXJhdGVkLlxuICAgKi9cbiAgc3BlYz86IGJvb2xlYW47XG4gIC8qKlxuICAgKiBBbGxvd3Mgc3BlY2lmaWNhdGlvbiBvZiB0aGUgZGVjbGFyaW5nIG1vZHVsZS5cbiAgICovXG5cbiAgbW9kdWxlPzogc3RyaW5nO1xuICAvKipcbiAgICogQWxsb3dzIHNwZWNpZmljYXRpb24gb2YgdGhlIGRlY2xhcmluZyByZWR1Y2Vycy5cbiAgICovXG5cbiAgcmVkdWNlcnM/OiBzdHJpbmc7XG4gIC8qKlxuICAgKiBTcGVjaWZpZXMgaWYgdGhpcyBpcyBncm91cGVkIHdpdGhpbiBzdWIgZm9sZGVyc1xuICAgKi9cblxuICBncm91cD86IGJvb2xlYW47XG4gIC8qKlxuICAgKiBTcGVjaWZpZXMgaWYgdGhpcyBpcyBncm91cGVkIHdpdGhpbiBhIGZlYXR1cmVcbiAgICovXG59XG4iXX0=