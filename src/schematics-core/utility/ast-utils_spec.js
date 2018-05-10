var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@ngrx/schematics/src/schematics-core/utility/ast-utils_spec", ["require", "exports", "@angular-devkit/core", "@angular-devkit/schematics", "typescript", "@ngrx/schematics/src/schematics-core/utility/change", "@ngrx/schematics/src/schematics-core/testing/index", "@ngrx/schematics/src/schematics-core/utility/ast-utils"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var core_1 = require("@angular-devkit/core");
    var schematics_1 = require("@angular-devkit/schematics");
    var ts = require("typescript");
    var change_1 = require("@ngrx/schematics/src/schematics-core/utility/change");
    var testing_1 = require("@ngrx/schematics/src/schematics-core/testing/index");
    var ast_utils_1 = require("@ngrx/schematics/src/schematics-core/utility/ast-utils");
    function getTsSource(path, content) {
        return ts.createSourceFile(path, content, ts.ScriptTarget.Latest, true);
    }
    function applyChanges(path, content, changes) {
        var tree = new schematics_1.VirtualTree();
        tree.create(path, content);
        var exportRecorder = tree.beginUpdate(path);
        try {
            for (var changes_1 = __values(changes), changes_1_1 = changes_1.next(); !changes_1_1.done; changes_1_1 = changes_1.next()) {
                var change = changes_1_1.value;
                if (change instanceof change_1.InsertChange) {
                    exportRecorder.insertLeft(change.pos, change.toAdd);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (changes_1_1 && !changes_1_1.done && (_a = changes_1.return)) _a.call(changes_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        tree.commitUpdate(exportRecorder);
        return testing_1.getFileContent(tree, path);
        var e_1, _a;
    }
    describe('ast utils', function () {
        var modulePath;
        var moduleContent;
        beforeEach(function () {
            modulePath = '/src/app/app.module.ts';
            moduleContent = "\n      import { BrowserModule } from '@angular/platform-browser';\n      import { NgModule } from '@angular/core';\n      import { AppComponent } from './app.component';\n\n      @NgModule({\n        declarations: [\n          AppComponent\n        ],\n        imports: [\n          BrowserModule\n        ],\n        providers: [],\n        bootstrap: [AppComponent]\n      })\n      export class AppModule { }\n    ";
        });
        it('should add export to module', function () {
            var source = getTsSource(modulePath, moduleContent);
            var changes = ast_utils_1.addExportToModule(source, modulePath, 'FooComponent', './foo.component');
            var output = applyChanges(modulePath, moduleContent, changes);
            expect(output).toMatch(/import { FooComponent } from '.\/foo.component';/);
            expect(output).toMatch(/exports: \[FooComponent\]/);
        });
        it('should add export to module if not indented', function () {
            moduleContent = core_1.tags.stripIndent(templateObject_1 || (templateObject_1 = __makeTemplateObject(["", ""], ["", ""])), moduleContent);
            var source = getTsSource(modulePath, moduleContent);
            var changes = ast_utils_1.addExportToModule(source, modulePath, 'FooComponent', './foo.component');
            var output = applyChanges(modulePath, moduleContent, changes);
            expect(output).toMatch(/import { FooComponent } from '.\/foo.component';/);
            expect(output).toMatch(/exports: \[FooComponent\]/);
        });
    });
    var templateObject_1;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXN0LXV0aWxzX3NwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3NjaGVtYXRpY3Mvc3JjL3NjaGVtYXRpY3MtY29yZS91dGlsaXR5L2FzdC11dGlsc19zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFBQTs7Ozs7O09BTUc7SUFDSCw2Q0FBNEM7SUFDNUMseURBQXlEO0lBQ3pELCtCQUFpQztJQUNqQyw4RUFBZ0Q7SUFDaEQsOEVBQTRDO0lBQzVDLG9GQUFnRDtJQUVoRCxxQkFBcUIsSUFBWSxFQUFFLE9BQWU7UUFDaEQsTUFBTSxDQUFDLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzFFLENBQUM7SUFFRCxzQkFDRSxJQUFZLEVBQ1osT0FBZSxFQUNmLE9BQWlCO1FBRWpCLElBQU0sSUFBSSxHQUFHLElBQUksd0JBQVcsRUFBRSxDQUFDO1FBQy9CLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQzNCLElBQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7O1lBQzlDLEdBQUcsQ0FBQyxDQUFpQixJQUFBLFlBQUEsU0FBQSxPQUFPLENBQUEsZ0NBQUE7Z0JBQXZCLElBQU0sTUFBTSxvQkFBQTtnQkFDZixFQUFFLENBQUMsQ0FBQyxNQUFNLFlBQVkscUJBQVksQ0FBQyxDQUFDLENBQUM7b0JBQ25DLGNBQWMsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3RELENBQUM7YUFDRjs7Ozs7Ozs7O1FBQ0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUVsQyxNQUFNLENBQUMsd0JBQWMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7O0lBQ3BDLENBQUM7SUFFRCxRQUFRLENBQUMsV0FBVyxFQUFFO1FBQ3BCLElBQUksVUFBa0IsQ0FBQztRQUN2QixJQUFJLGFBQXFCLENBQUM7UUFDMUIsVUFBVSxDQUFDO1lBQ1QsVUFBVSxHQUFHLHdCQUF3QixDQUFDO1lBQ3RDLGFBQWEsR0FBRyxvYUFnQmYsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFDO1FBRUgsRUFBRSxDQUFDLDZCQUE2QixFQUFFO1lBQ2hDLElBQU0sTUFBTSxHQUFHLFdBQVcsQ0FBQyxVQUFVLEVBQUUsYUFBYSxDQUFDLENBQUM7WUFDdEQsSUFBTSxPQUFPLEdBQUcsNkJBQWlCLENBQy9CLE1BQU0sRUFDTixVQUFVLEVBQ1YsY0FBYyxFQUNkLGlCQUFpQixDQUNsQixDQUFDO1lBQ0YsSUFBTSxNQUFNLEdBQUcsWUFBWSxDQUFDLFVBQVUsRUFBRSxhQUFhLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDaEUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxrREFBa0QsQ0FBQyxDQUFDO1lBQzNFLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsMkJBQTJCLENBQUMsQ0FBQztRQUN0RCxDQUFDLENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQyw2Q0FBNkMsRUFBRTtZQUNoRCxhQUFhLEdBQUcsV0FBSSxDQUFDLFdBQVcseUVBQUEsRUFBRyxFQUFhLEVBQUUsS0FBZixhQUFhLENBQUUsQ0FBQztZQUNuRCxJQUFNLE1BQU0sR0FBRyxXQUFXLENBQUMsVUFBVSxFQUFFLGFBQWEsQ0FBQyxDQUFDO1lBQ3RELElBQU0sT0FBTyxHQUFHLDZCQUFpQixDQUMvQixNQUFNLEVBQ04sVUFBVSxFQUNWLGNBQWMsRUFDZCxpQkFBaUIsQ0FDbEIsQ0FBQztZQUNGLElBQU0sTUFBTSxHQUFHLFlBQVksQ0FBQyxVQUFVLEVBQUUsYUFBYSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQ2hFLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsa0RBQWtELENBQUMsQ0FBQztZQUMzRSxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLDJCQUEyQixDQUFDLENBQUM7UUFDdEQsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7IHRhZ3MgfSBmcm9tICdAYW5ndWxhci1kZXZraXQvY29yZSc7XG5pbXBvcnQgeyBWaXJ0dWFsVHJlZSB9IGZyb20gJ0Bhbmd1bGFyLWRldmtpdC9zY2hlbWF0aWNzJztcbmltcG9ydCAqIGFzIHRzIGZyb20gJ3R5cGVzY3JpcHQnO1xuaW1wb3J0IHsgQ2hhbmdlLCBJbnNlcnRDaGFuZ2UgfSBmcm9tICcuL2NoYW5nZSc7XG5pbXBvcnQgeyBnZXRGaWxlQ29udGVudCB9IGZyb20gJy4uL3Rlc3RpbmcnO1xuaW1wb3J0IHsgYWRkRXhwb3J0VG9Nb2R1bGUgfSBmcm9tICcuL2FzdC11dGlscyc7XG5cbmZ1bmN0aW9uIGdldFRzU291cmNlKHBhdGg6IHN0cmluZywgY29udGVudDogc3RyaW5nKTogdHMuU291cmNlRmlsZSB7XG4gIHJldHVybiB0cy5jcmVhdGVTb3VyY2VGaWxlKHBhdGgsIGNvbnRlbnQsIHRzLlNjcmlwdFRhcmdldC5MYXRlc3QsIHRydWUpO1xufVxuXG5mdW5jdGlvbiBhcHBseUNoYW5nZXMoXG4gIHBhdGg6IHN0cmluZyxcbiAgY29udGVudDogc3RyaW5nLFxuICBjaGFuZ2VzOiBDaGFuZ2VbXVxuKTogc3RyaW5nIHtcbiAgY29uc3QgdHJlZSA9IG5ldyBWaXJ0dWFsVHJlZSgpO1xuICB0cmVlLmNyZWF0ZShwYXRoLCBjb250ZW50KTtcbiAgY29uc3QgZXhwb3J0UmVjb3JkZXIgPSB0cmVlLmJlZ2luVXBkYXRlKHBhdGgpO1xuICBmb3IgKGNvbnN0IGNoYW5nZSBvZiBjaGFuZ2VzKSB7XG4gICAgaWYgKGNoYW5nZSBpbnN0YW5jZW9mIEluc2VydENoYW5nZSkge1xuICAgICAgZXhwb3J0UmVjb3JkZXIuaW5zZXJ0TGVmdChjaGFuZ2UucG9zLCBjaGFuZ2UudG9BZGQpO1xuICAgIH1cbiAgfVxuICB0cmVlLmNvbW1pdFVwZGF0ZShleHBvcnRSZWNvcmRlcik7XG5cbiAgcmV0dXJuIGdldEZpbGVDb250ZW50KHRyZWUsIHBhdGgpO1xufVxuXG5kZXNjcmliZSgnYXN0IHV0aWxzJywgKCkgPT4ge1xuICBsZXQgbW9kdWxlUGF0aDogc3RyaW5nO1xuICBsZXQgbW9kdWxlQ29udGVudDogc3RyaW5nO1xuICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICBtb2R1bGVQYXRoID0gJy9zcmMvYXBwL2FwcC5tb2R1bGUudHMnO1xuICAgIG1vZHVsZUNvbnRlbnQgPSBgXG4gICAgICBpbXBvcnQgeyBCcm93c2VyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG4gICAgICBpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuICAgICAgaW1wb3J0IHsgQXBwQ29tcG9uZW50IH0gZnJvbSAnLi9hcHAuY29tcG9uZW50JztcblxuICAgICAgQE5nTW9kdWxlKHtcbiAgICAgICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgICAgQXBwQ29tcG9uZW50XG4gICAgICAgIF0sXG4gICAgICAgIGltcG9ydHM6IFtcbiAgICAgICAgICBCcm93c2VyTW9kdWxlXG4gICAgICAgIF0sXG4gICAgICAgIHByb3ZpZGVyczogW10sXG4gICAgICAgIGJvb3RzdHJhcDogW0FwcENvbXBvbmVudF1cbiAgICAgIH0pXG4gICAgICBleHBvcnQgY2xhc3MgQXBwTW9kdWxlIHsgfVxuICAgIGA7XG4gIH0pO1xuXG4gIGl0KCdzaG91bGQgYWRkIGV4cG9ydCB0byBtb2R1bGUnLCAoKSA9PiB7XG4gICAgY29uc3Qgc291cmNlID0gZ2V0VHNTb3VyY2UobW9kdWxlUGF0aCwgbW9kdWxlQ29udGVudCk7XG4gICAgY29uc3QgY2hhbmdlcyA9IGFkZEV4cG9ydFRvTW9kdWxlKFxuICAgICAgc291cmNlLFxuICAgICAgbW9kdWxlUGF0aCxcbiAgICAgICdGb29Db21wb25lbnQnLFxuICAgICAgJy4vZm9vLmNvbXBvbmVudCdcbiAgICApO1xuICAgIGNvbnN0IG91dHB1dCA9IGFwcGx5Q2hhbmdlcyhtb2R1bGVQYXRoLCBtb2R1bGVDb250ZW50LCBjaGFuZ2VzKTtcbiAgICBleHBlY3Qob3V0cHV0KS50b01hdGNoKC9pbXBvcnQgeyBGb29Db21wb25lbnQgfSBmcm9tICcuXFwvZm9vLmNvbXBvbmVudCc7Lyk7XG4gICAgZXhwZWN0KG91dHB1dCkudG9NYXRjaCgvZXhwb3J0czogXFxbRm9vQ29tcG9uZW50XFxdLyk7XG4gIH0pO1xuXG4gIGl0KCdzaG91bGQgYWRkIGV4cG9ydCB0byBtb2R1bGUgaWYgbm90IGluZGVudGVkJywgKCkgPT4ge1xuICAgIG1vZHVsZUNvbnRlbnQgPSB0YWdzLnN0cmlwSW5kZW50YCR7bW9kdWxlQ29udGVudH1gO1xuICAgIGNvbnN0IHNvdXJjZSA9IGdldFRzU291cmNlKG1vZHVsZVBhdGgsIG1vZHVsZUNvbnRlbnQpO1xuICAgIGNvbnN0IGNoYW5nZXMgPSBhZGRFeHBvcnRUb01vZHVsZShcbiAgICAgIHNvdXJjZSxcbiAgICAgIG1vZHVsZVBhdGgsXG4gICAgICAnRm9vQ29tcG9uZW50JyxcbiAgICAgICcuL2Zvby5jb21wb25lbnQnXG4gICAgKTtcbiAgICBjb25zdCBvdXRwdXQgPSBhcHBseUNoYW5nZXMobW9kdWxlUGF0aCwgbW9kdWxlQ29udGVudCwgY2hhbmdlcyk7XG4gICAgZXhwZWN0KG91dHB1dCkudG9NYXRjaCgvaW1wb3J0IHsgRm9vQ29tcG9uZW50IH0gZnJvbSAnLlxcL2Zvby5jb21wb25lbnQnOy8pO1xuICAgIGV4cGVjdChvdXRwdXQpLnRvTWF0Y2goL2V4cG9ydHM6IFxcW0Zvb0NvbXBvbmVudFxcXS8pO1xuICB9KTtcbn0pO1xuIl19