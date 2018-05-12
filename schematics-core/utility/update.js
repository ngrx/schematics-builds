(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@ngrx/schematics/schematics-core/utility/update", ["require", "exports", "@angular-devkit/schematics", "@angular-devkit/schematics/tasks"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var schematics_1 = require("@angular-devkit/schematics");
    var tasks_1 = require("@angular-devkit/schematics/tasks");
    function updatePackage(name) {
        return function (tree, context) {
            var pkgPath = '/package.json';
            var buffer = tree.read(pkgPath);
            if (buffer == null) {
                throw new schematics_1.SchematicsException('Could not read package.json');
            }
            var content = buffer.toString();
            var pkg = JSON.parse(content);
            if (pkg === null || typeof pkg !== 'object' || Array.isArray(pkg)) {
                throw new schematics_1.SchematicsException('Error reading package.json');
            }
            var dependencyCategories = ['dependencies', 'devDependencies'];
            dependencyCategories.forEach(function (category) {
                var packageName = "@ngrx/" + name;
                if (pkg[category] && pkg[category][packageName]) {
                    var firstChar = pkg[category][packageName][0];
                    var suffix = match(firstChar, '^') || match(firstChar, '~');
                    // TODO: remove beta
                    pkg[category][packageName] = suffix + "6.0.0-beta.2";
                }
            });
            tree.overwrite(pkgPath, JSON.stringify(pkg, null, 2));
            context.addTask(new tasks_1.NodePackageInstallTask());
            return tree;
        };
    }
    exports.updatePackage = updatePackage;
    function match(value, test) {
        return value === test ? test : '';
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9zY2hlbWF0aWNzL3NjaGVtYXRpY3MtY29yZS91dGlsaXR5L3VwZGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztJQUFBLHlEQU1vQztJQUNwQywwREFBMEU7SUFFMUUsdUJBQThCLElBQVk7UUFDeEMsTUFBTSxDQUFDLFVBQUMsSUFBVSxFQUFFLE9BQXlCO1lBQzNDLElBQU0sT0FBTyxHQUFHLGVBQWUsQ0FBQztZQUNoQyxJQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ2xDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNuQixNQUFNLElBQUksZ0NBQW1CLENBQUMsNkJBQTZCLENBQUMsQ0FBQztZQUMvRCxDQUFDO1lBQ0QsSUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ2xDLElBQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7WUFFaEMsRUFBRSxDQUFDLENBQUMsR0FBRyxLQUFLLElBQUksSUFBSSxPQUFPLEdBQUcsS0FBSyxRQUFRLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xFLE1BQU0sSUFBSSxnQ0FBbUIsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO1lBQzlELENBQUM7WUFFRCxJQUFNLG9CQUFvQixHQUFHLENBQUMsY0FBYyxFQUFFLGlCQUFpQixDQUFDLENBQUM7WUFFakUsb0JBQW9CLENBQUMsT0FBTyxDQUFDLFVBQUEsUUFBUTtnQkFDbkMsSUFBTSxXQUFXLEdBQUcsV0FBUyxJQUFNLENBQUM7Z0JBRXBDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNoRCxJQUFNLFNBQVMsR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ2hELElBQU0sTUFBTSxHQUFHLEtBQUssQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDLElBQUksS0FBSyxDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUMsQ0FBQztvQkFFOUQsb0JBQW9CO29CQUNwQixHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsV0FBVyxDQUFDLEdBQU0sTUFBTSxpQkFBYyxDQUFDO2dCQUN2RCxDQUFDO1lBQ0gsQ0FBQyxDQUFDLENBQUM7WUFFSCxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0RCxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksOEJBQXNCLEVBQUUsQ0FBQyxDQUFDO1lBRTlDLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDZCxDQUFDLENBQUM7SUFDSixDQUFDO0lBakNELHNDQWlDQztJQUVELGVBQWUsS0FBYSxFQUFFLElBQVk7UUFDeEMsTUFBTSxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQ3BDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBSdWxlLFxuICBTY2hlbWF0aWNDb250ZXh0LFxuICBUcmVlLFxuICBTY2hlbWF0aWNzRXhjZXB0aW9uLFxuICBjaGFpbixcbn0gZnJvbSAnQGFuZ3VsYXItZGV2a2l0L3NjaGVtYXRpY3MnO1xuaW1wb3J0IHsgTm9kZVBhY2thZ2VJbnN0YWxsVGFzayB9IGZyb20gJ0Bhbmd1bGFyLWRldmtpdC9zY2hlbWF0aWNzL3Rhc2tzJztcblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZVBhY2thZ2UobmFtZTogc3RyaW5nKTogUnVsZSB7XG4gIHJldHVybiAodHJlZTogVHJlZSwgY29udGV4dDogU2NoZW1hdGljQ29udGV4dCkgPT4ge1xuICAgIGNvbnN0IHBrZ1BhdGggPSAnL3BhY2thZ2UuanNvbic7XG4gICAgY29uc3QgYnVmZmVyID0gdHJlZS5yZWFkKHBrZ1BhdGgpO1xuICAgIGlmIChidWZmZXIgPT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IFNjaGVtYXRpY3NFeGNlcHRpb24oJ0NvdWxkIG5vdCByZWFkIHBhY2thZ2UuanNvbicpO1xuICAgIH1cbiAgICBjb25zdCBjb250ZW50ID0gYnVmZmVyLnRvU3RyaW5nKCk7XG4gICAgY29uc3QgcGtnID0gSlNPTi5wYXJzZShjb250ZW50KTtcblxuICAgIGlmIChwa2cgPT09IG51bGwgfHwgdHlwZW9mIHBrZyAhPT0gJ29iamVjdCcgfHwgQXJyYXkuaXNBcnJheShwa2cpKSB7XG4gICAgICB0aHJvdyBuZXcgU2NoZW1hdGljc0V4Y2VwdGlvbignRXJyb3IgcmVhZGluZyBwYWNrYWdlLmpzb24nKTtcbiAgICB9XG5cbiAgICBjb25zdCBkZXBlbmRlbmN5Q2F0ZWdvcmllcyA9IFsnZGVwZW5kZW5jaWVzJywgJ2RldkRlcGVuZGVuY2llcyddO1xuXG4gICAgZGVwZW5kZW5jeUNhdGVnb3JpZXMuZm9yRWFjaChjYXRlZ29yeSA9PiB7XG4gICAgICBjb25zdCBwYWNrYWdlTmFtZSA9IGBAbmdyeC8ke25hbWV9YDtcblxuICAgICAgaWYgKHBrZ1tjYXRlZ29yeV0gJiYgcGtnW2NhdGVnb3J5XVtwYWNrYWdlTmFtZV0pIHtcbiAgICAgICAgY29uc3QgZmlyc3RDaGFyID0gcGtnW2NhdGVnb3J5XVtwYWNrYWdlTmFtZV1bMF07XG4gICAgICAgIGNvbnN0IHN1ZmZpeCA9IG1hdGNoKGZpcnN0Q2hhciwgJ14nKSB8fCBtYXRjaChmaXJzdENoYXIsICd+Jyk7XG5cbiAgICAgICAgLy8gVE9ETzogcmVtb3ZlIGJldGFcbiAgICAgICAgcGtnW2NhdGVnb3J5XVtwYWNrYWdlTmFtZV0gPSBgJHtzdWZmaXh9Ni4wLjAtYmV0YS4yYDtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRyZWUub3ZlcndyaXRlKHBrZ1BhdGgsIEpTT04uc3RyaW5naWZ5KHBrZywgbnVsbCwgMikpO1xuICAgIGNvbnRleHQuYWRkVGFzayhuZXcgTm9kZVBhY2thZ2VJbnN0YWxsVGFzaygpKTtcblxuICAgIHJldHVybiB0cmVlO1xuICB9O1xufVxuXG5mdW5jdGlvbiBtYXRjaCh2YWx1ZTogc3RyaW5nLCB0ZXN0OiBzdHJpbmcpIHtcbiAgcmV0dXJuIHZhbHVlID09PSB0ZXN0ID8gdGVzdCA6ICcnO1xufVxuIl19