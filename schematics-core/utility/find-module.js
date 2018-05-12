(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@ngrx/schematics/schematics-core/utility/find-module", ["require", "exports", "@angular-devkit/core"], factory);
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
    /**
     * Find the module referred by a set of options passed to the schematics.
     */
    function findModuleFromOptions(host, options) {
        if (options.hasOwnProperty('skipImport') && options.skipImport) {
            return undefined;
        }
        if (!options.module) {
            var pathToCheck = (options.path || '') +
                (options.flat ? '' : '/' + core_1.strings.dasherize(options.name));
            return core_1.normalize(findModule(host, pathToCheck));
        }
        else {
            var modulePath = core_1.normalize('/' + options.path + '/' + options.module);
            var moduleBaseName = core_1.normalize(modulePath)
                .split('/')
                .pop();
            if (host.exists(modulePath)) {
                return core_1.normalize(modulePath);
            }
            else if (host.exists(modulePath + '.ts')) {
                return core_1.normalize(modulePath + '.ts');
            }
            else if (host.exists(modulePath + '.module.ts')) {
                return core_1.normalize(modulePath + '.module.ts');
            }
            else if (host.exists(modulePath + '/' + moduleBaseName + '.module.ts')) {
                return core_1.normalize(modulePath + '/' + moduleBaseName + '.module.ts');
            }
            else {
                throw new Error('Specified module does not exist');
            }
        }
    }
    exports.findModuleFromOptions = findModuleFromOptions;
    /**
     * Function to find the "closest" module to a generated file's path.
     */
    function findModule(host, generateDir) {
        var dir = host.getDir('/' + generateDir);
        var moduleRe = /\.module\.ts$/;
        var routingModuleRe = /-routing\.module\.ts/;
        while (dir) {
            var matches = dir.subfiles.filter(function (p) { return moduleRe.test(p) && !routingModuleRe.test(p); });
            if (matches.length == 1) {
                return core_1.join(dir.path, matches[0]);
            }
            else if (matches.length > 1) {
                throw new Error('More than one module matches. Use skip-import option to skip importing ' +
                    'the component into the closest module.');
            }
            dir = dir.parent;
        }
        throw new Error('Could not find an NgModule. Use the skip-import ' +
            'option to skip importing in NgModule.');
    }
    exports.findModule = findModule;
    /**
     * Build a relative path from one file path to another file path.
     */
    function buildRelativePath(from, to) {
        from = core_1.normalize(from);
        to = core_1.normalize(to);
        // Convert to arrays.
        var fromParts = from.split('/');
        var toParts = to.split('/');
        // Remove file names (preserving destination)
        fromParts.pop();
        var toFileName = toParts.pop();
        var relativePath = core_1.relative(core_1.normalize(fromParts.join('/')), core_1.normalize(toParts.join('/')));
        var pathPrefix = '';
        // Set the path prefix for same dir or child dir, parent dir starts with `..`
        if (!relativePath) {
            pathPrefix = '.';
        }
        else if (!relativePath.startsWith('.')) {
            pathPrefix = "./";
        }
        if (pathPrefix && !pathPrefix.endsWith('/')) {
            pathPrefix += '/';
        }
        return pathPrefix + (relativePath ? relativePath + '/' : '') + toFileName;
    }
    exports.buildRelativePath = buildRelativePath;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmluZC1tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3NjaGVtYXRpY3Mvc2NoZW1hdGljcy1jb3JlL3V0aWxpdHkvZmluZC1tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7SUFBQTs7Ozs7O09BTUc7SUFDSCw2Q0FBZ0Y7SUFXaEY7O09BRUc7SUFDSCwrQkFDRSxJQUFVLEVBQ1YsT0FBc0I7UUFFdEIsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsSUFBSSxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUMvRCxNQUFNLENBQUMsU0FBUyxDQUFDO1FBQ25CLENBQUM7UUFFRCxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLElBQU0sV0FBVyxHQUNmLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUM7Z0JBQ3BCLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsY0FBTyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUU5RCxNQUFNLENBQUMsZ0JBQVMsQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLFdBQVcsQ0FBQyxDQUFDLENBQUM7UUFDbEQsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sSUFBTSxVQUFVLEdBQUcsZ0JBQVMsQ0FBQyxHQUFHLEdBQUcsT0FBTyxDQUFDLElBQUksR0FBRyxHQUFHLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3hFLElBQU0sY0FBYyxHQUFHLGdCQUFTLENBQUMsVUFBVSxDQUFDO2lCQUN6QyxLQUFLLENBQUMsR0FBRyxDQUFDO2lCQUNWLEdBQUcsRUFBRSxDQUFDO1lBRVQsRUFBRSxDQUFD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QUUsQ0FBQztRQUVqQyxJQUFNLFlBQVksR0FBRyxlQUFRLENBQzNCLGdCQUFTLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUM5QixnQkFBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FDN0IsQ0FBQztRQUNGLElBQUksVUFBVSxHQUFHLEVBQUUsQ0FBQztRQUVwQiw2RUFBNkU7UUFDN0UsRUFBRSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBQ2xCLFVBQVUsR0FBRyxHQUFHLENBQUM7UUFDbkIsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pDLFVBQVUsR0FBRyxJQUFJLENBQUM7UUFDcEIsQ0FBQztRQUNELEVBQUUsQ0FBQyxDQUFDLFVBQVUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzVDLFVBQVUsSUFBSSxHQUFHLENBQUM7UUFDcEIsQ0FBQztRQUVELE1BQU0sQ0FBQyxVQUFVLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFVBQVUsQ0FBQztJQUM1RSxDQUFDO0lBN0JELDhDQTZCQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7IFBhdGgsIGpvaW4sIG5vcm1hbGl6ZSwgcmVsYXRpdmUsIHN0cmluZ3MgfSBmcm9tICdAYW5ndWxhci1kZXZraXQvY29yZSc7XG5pbXBvcnQgeyBEaXJFbnRyeSwgVHJlZSB9IGZyb20gJ0Bhbmd1bGFyLWRldmtpdC9zY2hlbWF0aWNzJztcblxuZXhwb3J0IGludGVyZmFjZSBNb2R1bGVPcHRpb25zIHtcbiAgbW9kdWxlPzogc3RyaW5nO1xuICBuYW1lOiBzdHJpbmc7XG4gIGZsYXQ/OiBib29sZWFuO1xuICBwYXRoPzogc3RyaW5nO1xuICBza2lwSW1wb3J0PzogYm9vbGVhbjtcbn1cblxuLyoqXG4gKiBGaW5kIHRoZSBtb2R1bGUgcmVmZXJyZWQgYnkgYSBzZXQgb2Ygb3B0aW9ucyBwYXNzZWQgdG8gdGhlIHNjaGVtYXRpY3MuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmaW5kTW9kdWxlRnJvbU9wdGlvbnMoXG4gIGhvc3Q6IFRyZWUsXG4gIG9wdGlvbnM6IE1vZHVsZU9wdGlvbnNcbik6IFBhdGggfCB1bmRlZmluZWQge1xuICBpZiAob3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnc2tpcEltcG9ydCcpICYmIG9wdGlvbnMuc2tpcEltcG9ydCkge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBpZiAoIW9wdGlvbnMubW9kdWxlKSB7XG4gICAgY29uc3QgcGF0aFRvQ2hlY2sgPVxuICAgICAgKG9wdGlvbnMucGF0aCB8fCAnJykgK1xuICAgICAgKG9wdGlvbnMuZmxhdCA/ICcnIDogJy8nICsgc3RyaW5ncy5kYXNoZXJpemUob3B0aW9ucy5uYW1lKSk7XG5cbiAgICByZXR1cm4gbm9ybWFsaXplKGZpbmRNb2R1bGUoaG9zdCwgcGF0aFRvQ2hlY2spKTtcbiAgfSBlbHNlIHtcbiAgICBjb25zdCBtb2R1bGVQYXRoID0gbm9ybWFsaXplKCcvJyArIG9wdGlvbnMucGF0aCArICcvJyArIG9wdGlvbnMubW9kdWxlKTtcbiAgICBjb25zdCBtb2R1bGVCYXNlTmFtZSA9IG5vcm1hbGl6ZShtb2R1bGVQYXRoKVxuICAgICAgLnNwbGl0KCcvJylcbiAgICAgIC5wb3AoKTtcblxuICAgIGlmIChob3N0LmV4aXN0cyhtb2R1bGVQYXRoKSkge1xuICAgICAgcmV0dXJuIG5vcm1hbGl6ZShtb2R1bGVQYXRoKTtcbiAgICB9IGVsc2UgaWYgKGhvc3QuZXhpc3RzKG1vZHVsZVBhdGggKyAnLnRzJykpIHtcbiAgICAgIHJldHVybiBub3JtYWxpemUobW9kdWxlUGF0aCArICcudHMnKTtcbiAgICB9IGVsc2UgaWYgKGhvc3QuZXhpc3RzKG1vZHVsZVBhdGggKyAnLm1vZHVsZS50cycpKSB7XG4gICAgICByZXR1cm4gbm9ybWFsaXplKG1vZHVsZVBhdGggKyAnLm1vZHVsZS50cycpO1xuICAgIH0gZWxzZSBpZiAoaG9zdC5leGlzdHMobW9kdWxlUGF0aCArICcvJyArIG1vZHVsZUJhc2VOYW1lICsgJy5tb2R1bGUudHMnKSkge1xuICAgICAgcmV0dXJuIG5vcm1hbGl6ZShtb2R1bGVQYXRoICsgJy8nICsgbW9kdWxlQmFzZU5hbWUgKyAnLm1vZHVsZS50cycpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NwZWNpZmllZCBtb2R1bGUgZG9lcyBub3QgZXhpc3QnKTtcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBGdW5jdGlvbiB0byBmaW5kIHRoZSBcImNsb3Nlc3RcIiBtb2R1bGUgdG8gYSBnZW5lcmF0ZWQgZmlsZSdzIHBhdGguXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmaW5kTW9kdWxlKGhvc3Q6IFRyZWUsIGdlbmVyYXRlRGlyOiBzdHJpbmcpOiBQYXRoIHtcbiAgbGV0IGRpcjogRGlyRW50cnkgfCBudWxsID0gaG9zdC5nZXREaXIoJy8nICsgZ2VuZXJhdGVEaXIpO1xuXG4gIGNvbnN0IG1vZHVsZVJlID0gL1xcLm1vZHVsZVxcLnRzJC87XG4gIGNvbnN0IHJvdXRpbmdNb2R1bGVSZSA9IC8tcm91dGluZ1xcLm1vZHVsZVxcLnRzLztcblxuICB3aGlsZSAoZGlyKSB7XG4gICAgY29uc3QgbWF0Y2hlcyA9IGRpci5zdWJmaWxlcy5maWx0ZXIoXG4gICAgICBwID0+IG1vZHVsZVJlLnRlc3QocCkgJiYgIXJvdXRpbmdNb2R1bGVSZS50ZXN0KHApXG4gICAgKTtcblxuICAgIGlmIChtYXRjaGVzLmxlbmd0aCA9PSAxKSB7XG4gICAgICByZXR1cm4gam9pbihkaXIucGF0aCwgbWF0Y2hlc1swXSk7XG4gICAgfSBlbHNlIGlmIChtYXRjaGVzLmxlbmd0aCA+IDEpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ01vcmUgdGhhbiBvbmUgbW9kdWxlIG1hdGNoZXMuIFVzZSBza2lwLWltcG9ydCBvcHRpb24gdG8gc2tpcCBpbXBvcnRpbmcgJyArXG4gICAgICAgICAgJ3RoZSBjb21wb25lbnQgaW50byB0aGUgY2xvc2VzdCBtb2R1bGUuJ1xuICAgICAgKTtcbiAgICB9XG5cbiAgICBkaXIgPSBkaXIucGFyZW50O1xuICB9XG5cbiAgdGhyb3cgbmV3IEVycm9yKFxuICAgICdDb3VsZCBub3QgZmluZCBhbiBOZ01vZHVsZS4gVXNlIHRoZSBza2lwLWltcG9ydCAnICtcbiAgICAgICdvcHRpb24gdG8gc2tpcCBpbXBvcnRpbmcgaW4gTmdNb2R1bGUuJ1xuICApO1xufVxuXG4vKipcbiAqIEJ1aWxkIGEgcmVsYXRpdmUgcGF0aCBmcm9tIG9uZSBmaWxlIHBhdGggdG8gYW5vdGhlciBmaWxlIHBhdGguXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBidWlsZFJlbGF0aXZlUGF0aChmcm9tOiBzdHJpbmcsIHRvOiBzdHJpbmcpOiBzdHJpbmcge1xuICBmcm9tID0gbm9ybWFsaXplKGZyb20pO1xuICB0byA9IG5vcm1hbGl6ZSh0byk7XG5cbiAgLy8gQ29udmVydCB0byBhcnJheXMuXG4gIGNvbnN0IGZyb21QYXJ0cyA9IGZyb20uc3BsaXQoJy8nKTtcbiAgY29uc3QgdG9QYXJ0cyA9IHRvLnNwbGl0KCcvJyk7XG5cbiAgLy8gUmVtb3ZlIGZpbGUgbmFtZXMgKHByZXNlcnZpbmcgZGVzdGluYXRpb24pXG4gIGZyb21QYXJ0cy5wb3AoKTtcbiAgY29uc3QgdG9GaWxlTmFtZSA9IHRvUGFydHMucG9wKCk7XG5cbiAgY29uc3QgcmVsYXRpdmVQYXRoID0gcmVsYXRpdmUoXG4gICAgbm9ybWFsaXplKGZyb21QYXJ0cy5qb2luKCcvJykpLFxuICAgIG5vcm1hbGl6ZSh0b1BhcnRzLmpvaW4oJy8nKSlcbiAgKTtcbiAgbGV0IHBhdGhQcmVmaXggPSAnJztcblxuICAvLyBTZXQgdGhlIHBhdGggcHJlZml4IGZvciBzYW1lIGRpciBvciBjaGlsZCBkaXIsIHBhcmVudCBkaXIgc3RhcnRzIHdpdGggYC4uYFxuICBpZiAoIXJlbGF0aXZlUGF0aCkge1xuICAgIHBhdGhQcmVmaXggPSAnLic7XG4gIH0gZWxzZSBpZiAoIXJlbGF0aXZlUGF0aC5zdGFydHNXaXRoKCcuJykpIHtcbiAgICBwYXRoUHJlZml4ID0gYC4vYDtcbiAgfVxuICBpZiAocGF0aFByZWZpeCAmJiAhcGF0aFByZWZpeC5lbmRzV2l0aCgnLycpKSB7XG4gICAgcGF0aFByZWZpeCArPSAnLyc7XG4gIH1cblxuICByZXR1cm4gcGF0aFByZWZpeCArIChyZWxhdGl2ZVBhdGggPyByZWxhdGl2ZVBhdGggKyAnLycgOiAnJykgKyB0b0ZpbGVOYW1lO1xufVxuIl19