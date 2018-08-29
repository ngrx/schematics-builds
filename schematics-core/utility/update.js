(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@ngrx/schematics/schematics-core/utility/update", ["require", "exports", "@angular-devkit/schematics"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var schematics_1 = require("@angular-devkit/schematics");
    function updatePackage(name) {
        return function (tree, context) {
            var pkgPath = '/package.json';
            var buffer = tree.read(pkgPath);
            if (buffer === null) {
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
                    pkg[category][packageName] = suffix + "6.0.0";
                }
            });
            tree.overwrite(pkgPath, JSON.stringify(pkg, null, 2));
            return tree;
        };
    }
    exports.updatePackage = updatePackage;
    function match(value, test) {
        return value === test ? test : '';
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9zY2hlbWF0aWNzL3NjaGVtYXRpY3MtY29yZS91dGlsaXR5L3VwZGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztJQUFBLHlEQUtvQztJQUVwQyx1QkFBOEIsSUFBWTtRQUN4QyxPQUFPLFVBQUMsSUFBVSxFQUFFLE9BQXlCO1lBQzNDLElBQU0sT0FBTyxHQUFHLGVBQWUsQ0FBQztZQUNoQyxJQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ2xDLElBQUksTUFBTSxLQUFLLElBQUksRUFBRTtnQkFDbkIsTUFBTSxJQUFJLGdDQUFtQixDQUFDLDZCQUE2QixDQUFDLENBQUM7YUFDOUQ7WUFDRCxJQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDbEMsSUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUVoQyxJQUFJLEdBQUcsS0FBSyxJQUFJLElBQUksT0FBTyxHQUFHLEtBQUssUUFBUSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ2pFLE1BQU0sSUFBSSxnQ0FBbUIsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO2FBQzdEO1lBRUQsSUFBTSxvQkFBb0IsR0FBRyxDQUFDLGNBQWMsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO1lBRWpFLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxVQUFBLFFBQVE7Z0JBQ25DLElBQU0sV0FBVyxHQUFHLFdBQVMsSUFBTSxDQUFDO2dCQUVwQyxJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsV0FBVyxDQUFDLEVBQUU7b0JBQy9DLElBQU0sU0FBUyxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDaEQsSUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUMsSUFBSSxLQUFLLENBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDO29CQUU5RCxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsV0FBVyxDQUFDLEdBQU0sTUFBTSxVQUFPLENBQUM7aUJBQy9DO1lBQ0gsQ0FBQyxDQUFDLENBQUM7WUFFSCxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUV0RCxPQUFPLElBQUksQ0FBQztRQUNkLENBQUMsQ0FBQztJQUNKLENBQUM7SUEvQkQsc0NBK0JDO0lBRUQsZUFBZSxLQUFhLEVBQUUsSUFBWTtRQUN4QyxPQUFPLEtBQUssS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQ3BDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBSdWxlLFxuICBTY2hlbWF0aWNDb250ZXh0LFxuICBUcmVlLFxuICBTY2hlbWF0aWNzRXhjZXB0aW9uLFxufSBmcm9tICdAYW5ndWxhci1kZXZraXQvc2NoZW1hdGljcyc7XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVQYWNrYWdlKG5hbWU6IHN0cmluZyk6IFJ1bGUge1xuICByZXR1cm4gKHRyZWU6IFRyZWUsIGNvbnRleHQ6IFNjaGVtYXRpY0NvbnRleHQpID0+IHtcbiAgICBjb25zdCBwa2dQYXRoID0gJy9wYWNrYWdlLmpzb24nO1xuICAgIGNvbnN0IGJ1ZmZlciA9IHRyZWUucmVhZChwa2dQYXRoKTtcbiAgICBpZiAoYnVmZmVyID09PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgU2NoZW1hdGljc0V4Y2VwdGlvbignQ291bGQgbm90IHJlYWQgcGFja2FnZS5qc29uJyk7XG4gICAgfVxuICAgIGNvbnN0IGNvbnRlbnQgPSBidWZmZXIudG9TdHJpbmcoKTtcbiAgICBjb25zdCBwa2cgPSBKU09OLnBhcnNlKGNvbnRlbnQpO1xuXG4gICAgaWYgKHBrZyA9PT0gbnVsbCB8fCB0eXBlb2YgcGtnICE9PSAnb2JqZWN0JyB8fCBBcnJheS5pc0FycmF5KHBrZykpIHtcbiAgICAgIHRocm93IG5ldyBTY2hlbWF0aWNzRXhjZXB0aW9uKCdFcnJvciByZWFkaW5nIHBhY2thZ2UuanNvbicpO1xuICAgIH1cblxuICAgIGNvbnN0IGRlcGVuZGVuY3lDYXRlZ29yaWVzID0gWydkZXBlbmRlbmNpZXMnLCAnZGV2RGVwZW5kZW5jaWVzJ107XG5cbiAgICBkZXBlbmRlbmN5Q2F0ZWdvcmllcy5mb3JFYWNoKGNhdGVnb3J5ID0+IHtcbiAgICAgIGNvbnN0IHBhY2thZ2VOYW1lID0gYEBuZ3J4LyR7bmFtZX1gO1xuXG4gICAgICBpZiAocGtnW2NhdGVnb3J5XSAmJiBwa2dbY2F0ZWdvcnldW3BhY2thZ2VOYW1lXSkge1xuICAgICAgICBjb25zdCBmaXJzdENoYXIgPSBwa2dbY2F0ZWdvcnldW3BhY2thZ2VOYW1lXVswXTtcbiAgICAgICAgY29uc3Qgc3VmZml4ID0gbWF0Y2goZmlyc3RDaGFyLCAnXicpIHx8IG1hdGNoKGZpcnN0Q2hhciwgJ34nKTtcblxuICAgICAgICBwa2dbY2F0ZWdvcnldW3BhY2thZ2VOYW1lXSA9IGAke3N1ZmZpeH02LjAuMGA7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0cmVlLm92ZXJ3cml0ZShwa2dQYXRoLCBKU09OLnN0cmluZ2lmeShwa2csIG51bGwsIDIpKTtcblxuICAgIHJldHVybiB0cmVlO1xuICB9O1xufVxuXG5mdW5jdGlvbiBtYXRjaCh2YWx1ZTogc3RyaW5nLCB0ZXN0OiBzdHJpbmcpIHtcbiAgcmV0dXJuIHZhbHVlID09PSB0ZXN0ID8gdGVzdCA6ICcnO1xufVxuIl19