(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@ngrx/schematics/src/schematics-core/testing/get-file-content", ["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function getFileContent(tree, path) {
        var fileEntry = tree.get(path);
        if (!fileEntry) {
            throw new Error("The file (" + path + ") does not exist.");
        }
        return fileEntry.content.toString();
    }
    exports.getFileContent = getFileContent;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LWZpbGUtY29udGVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvc2NoZW1hdGljcy9zcmMvc2NoZW1hdGljcy1jb3JlL3Rlc3RpbmcvZ2V0LWZpbGUtY29udGVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztJQUVBLHdCQUErQixJQUFVLEVBQUUsSUFBWTtRQUNyRCxJQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRWpDLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNmLE1BQU0sSUFBSSxLQUFLLENBQUMsZUFBYSxJQUFJLHNCQUFtQixDQUFDLENBQUM7UUFDeEQsQ0FBQztRQUVELE1BQU0sQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3RDLENBQUM7SUFSRCx3Q0FRQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRyZWUgfSBmcm9tICdAYW5ndWxhci1kZXZraXQvc2NoZW1hdGljcyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRGaWxlQ29udGVudCh0cmVlOiBUcmVlLCBwYXRoOiBzdHJpbmcpOiBzdHJpbmcge1xuICBjb25zdCBmaWxlRW50cnkgPSB0cmVlLmdldChwYXRoKTtcblxuICBpZiAoIWZpbGVFbnRyeSkge1xuICAgIHRocm93IG5ldyBFcnJvcihgVGhlIGZpbGUgKCR7cGF0aH0pIGRvZXMgbm90IGV4aXN0LmApO1xuICB9XG5cbiAgcmV0dXJuIGZpbGVFbnRyeS5jb250ZW50LnRvU3RyaW5nKCk7XG59XG4iXX0=