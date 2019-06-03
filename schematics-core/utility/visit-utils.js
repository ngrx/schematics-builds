(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@ngrx/schematics/schematics-core/utility/visit-utils", ["require", "exports", "typescript"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const ts = require("typescript");
    function visitTSSourceFiles(tree, visitor) {
        let result = undefined;
        tree.visit(path => {
            if (!path.endsWith('.ts')) {
                return;
            }
            const sourceFile = ts.createSourceFile(path, tree.read(path).toString(), ts.ScriptTarget.Latest);
            if (sourceFile.isDeclarationFile) {
                return;
            }
            result = visitor(sourceFile, tree, result);
        });
        return result;
    }
    exports.visitTSSourceFiles = visitTSSourceFiles;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlzaXQtdXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3NjaGVtYXRpY3Mvc2NoZW1hdGljcy1jb3JlL3V0aWxpdHkvdmlzaXQtdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7SUFBQSxpQ0FBaUM7SUFHakMsU0FBZ0Isa0JBQWtCLENBQ2hDLElBQVUsRUFDVixPQUl1QjtRQUV2QixJQUFJLE1BQU0sR0FBdUIsU0FBUyxDQUFDO1FBRTNDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDaEIsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ3pCLE9BQU87YUFDUjtZQUVELE1BQU0sVUFBVSxHQUFHLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FDcEMsSUFBSSxFQUNKLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFFLENBQUMsUUFBUSxFQUFFLEVBQzNCLEVBQUUsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUN2QixDQUFDO1lBRUYsSUFBSSxVQUFVLENBQUMsaUJBQWlCLEVBQUU7Z0JBQ2hDLE9BQU87YUFDUjtZQUVELE1BQU0sR0FBRyxPQUFPLENBQUMsVUFBVSxFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztRQUM3QyxDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUE3QkQsZ0RBNkJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgdHMgZnJvbSAndHlwZXNjcmlwdCc7XG5pbXBvcnQgeyBUcmVlIH0gZnJvbSAnQGFuZ3VsYXItZGV2a2l0L3NjaGVtYXRpY3MnO1xuXG5leHBvcnQgZnVuY3Rpb24gdmlzaXRUU1NvdXJjZUZpbGVzPFJlc3VsdCA9IHZvaWQ+KFxuICB0cmVlOiBUcmVlLFxuICB2aXNpdG9yOiAoXG4gICAgc291cmNlRmlsZTogdHMuU291cmNlRmlsZSxcbiAgICB0cmVlOiBUcmVlLFxuICAgIHJlc3VsdD86IFJlc3VsdFxuICApID0+IFJlc3VsdCB8IHVuZGVmaW5lZFxuKTogUmVzdWx0IHwgdW5kZWZpbmVkIHtcbiAgbGV0IHJlc3VsdDogUmVzdWx0IHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkO1xuXG4gIHRyZWUudmlzaXQocGF0aCA9PiB7XG4gICAgaWYgKCFwYXRoLmVuZHNXaXRoKCcudHMnKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHNvdXJjZUZpbGUgPSB0cy5jcmVhdGVTb3VyY2VGaWxlKFxuICAgICAgcGF0aCxcbiAgICAgIHRyZWUucmVhZChwYXRoKSEudG9TdHJpbmcoKSxcbiAgICAgIHRzLlNjcmlwdFRhcmdldC5MYXRlc3RcbiAgICApO1xuXG4gICAgaWYgKHNvdXJjZUZpbGUuaXNEZWNsYXJhdGlvbkZpbGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICByZXN1bHQgPSB2aXNpdG9yKHNvdXJjZUZpbGUsIHRyZWUsIHJlc3VsdCk7XG4gIH0pO1xuXG4gIHJldHVybiByZXN1bHQ7XG59XG4iXX0=