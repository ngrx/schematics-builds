(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@ngrx/schematics/src/store/schema", ["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1hLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9zY2hlbWF0aWNzL3NyYy9zdG9yZS9zY2hlbWEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBpbnRlcmZhY2UgU2NoZW1hIHtcbiAgLyoqXG4gICAqIFRoZSBuYW1lIG9mIHRoZSBjb21wb25lbnQuXG4gICAqL1xuXG4gIG5hbWU6IHN0cmluZztcbiAgLyoqXG4gICAqIFRoZSBwYXRoIHRvIGNyZWF0ZSB0aGUgZWZmZWN0LlxuICAgKi9cblxuICBwYXRoPzogc3RyaW5nO1xuICAvKipcbiAgICogVGhlIG5hbWUgb2YgdGhlIHByb2plY3QuXG4gICAqL1xuICBwcm9qZWN0Pzogc3RyaW5nO1xuICAvKipcbiAgICogRmxhZyB0byBpbmRpY2F0ZSBpZiBhIGRpciBpcyBjcmVhdGVkLlxuICAgKi9cbiAgZmxhdD86IGJvb2xlYW47XG4gIC8qKlxuICAgKiBXaGVuIHRydWUsIGRvZXMgbm90IGNyZWF0ZSB0ZXN0IGZpbGVzLlxuICAgKi9cbiAgc2tpcFRlc3Q/OiBib29sZWFuO1xuICAvKipcbiAgICogQWxsb3dzIHNwZWNpZmljYXRpb24gb2YgdGhlIGRlY2xhcmluZyBtb2R1bGUuXG4gICAqL1xuICBtb2R1bGU/OiBzdHJpbmc7XG4gIC8qKlxuICAgKiBTcGVjaWZpZXMgdGhlIGRpciBmb3IgdGhlIHN0YXRlIGZvbGRlclxuICAgKi9cblxuICBzdGF0ZVBhdGg/OiBzdHJpbmc7XG4gIC8qKlxuICAgKiBTcGVjaWZpZXMgd2hldGhlciB0aGlzIGlzIHRoZSByb290IHN0YXRlIG9yIGZlYXR1cmUgc3RhdGVcbiAgICovXG5cbiAgcm9vdD86IGJvb2xlYW47XG4gIC8qKlxuICAgKiBTcGVjaWZpZXMgdGhlIGludGVyZmFjZSBmb3IgdGhlIHN0YXRlXG4gICAqL1xuICBzdGF0ZUludGVyZmFjZT86IHN0cmluZztcbiAgLyoqXG4gICAqIFNldHVwIHN0YXRlIG1hbmFnZW1lbnQgd2l0aG91dCByZWdpc3RlcmluZyBpbml0aWFsIHJlZHVjZXJzLlxuICAgKi9cbiAgbWluaW1hbD86IGJvb2xlYW47XG59XG4iXX0=