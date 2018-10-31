var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
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
        define("@ngrx/schematics/src/container/index", ["require", "exports", "@angular-devkit/schematics", "typescript", "@ngrx/schematics/schematics-core"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var schematics_1 = require("@angular-devkit/schematics");
    var ts = require("typescript");
    var schematics_core_1 = require("@ngrx/schematics/schematics-core");
    function addStateToComponent(options) {
        return function (host) {
            var e_1, _a;
            if (!options.state && !options.stateInterface) {
                return host;
            }
            var statePath = "/" + options.path + "/" + options.state;
            if (options.state) {
                if (!host.exists(statePath)) {
                    throw new Error("The Specified state path " + statePath + " does not exist");
                }
            }
            var componentPath = "/" + options.path + "/" +
                (options.flat ? '' : schematics_core_1.stringUtils.dasherize(options.name) + '/') +
                schematics_core_1.stringUtils.dasherize(options.name) +
                '.component.ts';
            var text = host.read(componentPath);
            if (text === null) {
                throw new schematics_1.SchematicsException("File " + componentPath + " does not exist.");
            }
            var sourceText = text.toString('utf-8');
            var source = ts.createSourceFile(componentPath, sourceText, ts.ScriptTarget.Latest, true);
            var stateImportPath = schematics_core_1.buildRelativePath(componentPath, statePath);
            var storeImport = schematics_core_1.insertImport(source, componentPath, 'Store', '@ngrx/store');
            var stateImport = options.state
                ? schematics_core_1.insertImport(source, componentPath, "* as fromStore", stateImportPath, true)
                : new schematics_core_1.NoopChange();
            var componentClass = source.statements.find(function (stm) { return stm.kind === ts.SyntaxKind.ClassDeclaration; });
            var component = componentClass;
            var componentConstructor = component.members.find(function (member) { return member.kind === ts.SyntaxKind.Constructor; });
            var cmpCtr = componentConstructor;
            var pos = cmpCtr.pos;
            var stateType = options.state
                ? "fromStore." + options.stateInterface
                : 'any';
            var constructorText = cmpCtr.getText();
            var _b = __read(constructorText.split('()'), 2), start = _b[0], end = _b[1];
            var storeText = "private store: Store<" + stateType + ">";
            var storeConstructor = [start, "(" + storeText + ")", end].join('');
            var constructorUpdate = new schematics_core_1.ReplaceChange(componentPath, pos, "  " + constructorText + "\n\n", "\n\n  " + storeConstructor);
            var changes = [storeImport, stateImport, constructorUpdate];
            var recorder = host.beginUpdate(componentPath);
            try {
                for (var changes_1 = __values(changes), changes_1_1 = changes_1.next(); !changes_1_1.done; changes_1_1 = changes_1.next()) {
                    var change = changes_1_1.value;
                    if (change instanceof schematics_core_1.InsertChange) {
                        recorder.insertLeft(change.pos, change.toAdd);
                    }
                    else if (change instanceof schematics_core_1.ReplaceChange) {
                        recorder.remove(pos, change.oldText.length);
                        recorder.insertLeft(change.order, change.newText);
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
            host.commitUpdate(recorder);
            return host;
        };
    }
    function default_1(options) {
        return function (host, context) {
            options.path = schematics_core_1.getProjectPath(host, options);
            var parsedPath = schematics_core_1.parseName(options.path, options.name);
            options.name = parsedPath.name;
            options.path = parsedPath.path;
            var opts = ['state', 'stateInterface'].reduce(function (current, key) {
                return schematics_core_1.omit(current, key);
            }, options);
            var templateSource = schematics_1.apply(schematics_1.url('./files'), [
                options.spec ? schematics_1.noop() : schematics_1.filter(function (path) { return !path.endsWith('__spec.ts'); }),
                schematics_1.template(__assign({ 'if-flat': function (s) { return (options.flat ? '' : s); } }, schematics_core_1.stringUtils, options, { dot: function () { return '.'; } })),
                schematics_1.move(parsedPath.path),
            ]);
            return schematics_1.chain([
                schematics_1.externalSchematic('@schematics/angular', 'component', __assign({}, opts, { spec: false })),
                addStateToComponent(options),
                schematics_1.mergeWith(templateSource),
            ])(host, context);
        };
    }
    exports.default = default_1;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3NjaGVtYXRpY3Mvc3JjL2NvbnRhaW5lci9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFBQSx5REFjb0M7SUFDcEMsK0JBQWlDO0lBQ2pDLG9FQVUwQztJQUcxQyxTQUFTLG1CQUFtQixDQUFDLE9BQXlCO1FBQ3BELE9BQU8sVUFBQyxJQUFVOztZQUNoQixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLEVBQUU7Z0JBQzdDLE9BQU8sSUFBSSxDQUFDO2FBQ2I7WUFFRCxJQUFNLFNBQVMsR0FBRyxNQUFJLE9BQU8sQ0FBQyxJQUFJLFNBQUksT0FBTyxDQUFDLEtBQU8sQ0FBQztZQUV0RCxJQUFJLE9BQU8sQ0FBQyxLQUFLLEVBQUU7Z0JBQ2pCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxFQUFFO29CQUMzQixNQUFNLElBQUksS0FBSyxDQUFDLDhCQUE0QixTQUFTLG9CQUFpQixDQUFDLENBQUM7aUJBQ3pFO2FBQ0Y7WUFFRCxJQUFNLGFBQWEsR0FDakIsTUFBSSxPQUFPLENBQUMsSUFBSSxNQUFHO2dCQUNuQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsNkJBQVcsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQztnQkFDL0QsNkJBQVcsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztnQkFDbkMsZUFBZSxDQUFDO1lBRWxCLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7WUFFdEMsSUFBSSxJQUFJLEtBQUssSUFBSSxFQUFFO2dCQUNqQixNQUFNLElBQUksZ0NBQW1CLENBQUMsVUFBUSxhQUFhLHFCQUFrQixDQUFDLENBQUM7YUFDeEU7WUFFRCxJQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBRTFDLElBQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FDaEMsYUFBYSxFQUNiLFVBQVUsRUFDVixFQUFFLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFDdEIsSUFBSSxDQUNMLENBQUM7WUFFRixJQUFNLGVBQWUsR0FBRyxtQ0FBaUIsQ0FBQyxhQUFhLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFDcEUsSUFBTSxXQUFXLEdBQUcsOEJBQVksQ0FDOUIsTUFBTSxFQUNOLGFBQWEsRUFDYixPQUFPLEVBQ1AsYUFBYSxDQUNkLENBQUM7WUFDRixJQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsS0FBSztnQkFDL0IsQ0FBQyxDQUFDLDhCQUFZLENBQ1YsTUFBTSxFQUNOLGFBQWEsRUFDYixnQkFBZ0IsRUFDaEIsZUFBZSxFQUNmLElBQUksQ0FDTDtnQkFDSCxDQUFDLENBQUMsSUFBSSw0QkFBVSxFQUFFLENBQUM7WUFFckIsSUFBTSxjQUFjLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQzNDLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxDQUFDLElBQUksS0FBSyxFQUFFLENBQUMsVUFBVSxDQUFDLGdCQUFnQixFQUEzQyxDQUEyQyxDQUNuRCxDQUFDO1lBQ0YsSUFBTSxTQUFTLEdBQUcsY0FBcUMsQ0FBQztZQUN4RCxJQUFNLG9CQUFvQixHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUNqRCxVQUFBLE1BQU0sSUFBSSxPQUFBLE1BQU0sQ0FBQyxJQUFJLEtBQUssRUFBRSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQXpDLENBQXlDLENBQ3BELENBQUM7WUFDRixJQUFNLE1BQU0sR0FBRyxvQkFBaUQsQ0FBQztZQUN6RCxJQUFBLGdCQUFHLENBQVk7WUFDdkIsSUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLEtBQUs7Z0JBQzdCLENBQUMsQ0FBQyxlQUFhLE9BQU8sQ0FBQyxjQUFnQjtnQkFDdkMsQ0FBQyxDQUFDLEtBQUssQ0FBQztZQUNWLElBQU0sZUFBZSxHQUFHLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNuQyxJQUFBLDJDQUEwQyxFQUF6QyxhQUFLLEVBQUUsV0FBa0MsQ0FBQztZQUNqRCxJQUFNLFNBQVMsR0FBRywwQkFBd0IsU0FBUyxNQUFHLENBQUM7WUFDdkQsSUFBTSxnQkFBZ0IsR0FBRyxDQUFDLEtBQUssRUFBRSxNQUFJLFNBQVMsTUFBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNqRSxJQUFNLGlCQUFpQixHQUFHLElBQUksK0JBQWEsQ0FDekMsYUFBYSxFQUNiLEdBQUcsRUFDSCxPQUFLLGVBQWUsU0FBTSxFQUMxQixXQUFTLGdCQUFrQixDQUM1QixDQUFDO1lBRUYsSUFBTSxPQUFPLEdBQUcsQ0FBQyxXQUFXLEVBQUUsV0FBVyxFQUFFLGlCQUFpQixDQUFDLENBQUM7WUFDOUQsSUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQzs7Z0JBRWpELEtBQXFCLElBQUEsWUFBQSxTQUFBLE9BQU8sQ0FBQSxnQ0FBQSxxREFBRTtvQkFBekIsSUFBTSxNQUFNLG9CQUFBO29CQUNmLElBQUksTUFBTSxZQUFZLDhCQUFZLEVBQUU7d0JBQ2xDLFFBQVEsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7cUJBQy9DO3lCQUFNLElBQUksTUFBTSxZQUFZLCtCQUFhLEVBQUU7d0JBQzFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7d0JBQzVDLFFBQVEsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7cUJBQ25EO2lCQUNGOzs7Ozs7Ozs7WUFFRCxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBRTVCLE9BQU8sSUFBSSxDQUFDO1FBQ2QsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVELG1CQUF3QixPQUF5QjtRQUMvQyxPQUFPLFVBQUMsSUFBVSxFQUFFLE9BQXlCO1lBQzNDLE9BQU8sQ0FBQyxJQUFJLEdBQUcsZ0NBQWMsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFFN0MsSUFBTSxVQUFVLEdBQUcsMkJBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN6RCxPQUFPLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUM7WUFDL0IsT0FBTyxDQUFDLElBQUksR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDO1lBRS9CLElBQU0sSUFBSSxHQUFHLENBQUMsT0FBTyxFQUFFLGdCQUFnQixDQUFDLENBQUMsTUFBTSxDQUM3QyxVQUFDLE9BQWtDLEVBQUUsR0FBRztnQkFDdEMsT0FBTyxzQkFBSSxDQUFDLE9BQU8sRUFBRSxHQUFVLENBQUMsQ0FBQztZQUNuQyxDQUFDLEVBQ0QsT0FBTyxDQUNSLENBQUM7WUFFRixJQUFNLGNBQWMsR0FBRyxrQkFBSyxDQUFDLGdCQUFHLENBQUMsU0FBUyxDQUFDLEVBQUU7Z0JBQzNDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLGlCQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsbUJBQU0sQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsRUFBM0IsQ0FBMkIsQ0FBQztnQkFDbkUscUJBQVEsQ0FBQyxXQUNQLFNBQVMsRUFBRSxVQUFDLENBQVMsSUFBSyxPQUFBLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBdkIsQ0FBdUIsSUFDOUMsNkJBQVcsRUFDVixPQUFrQixJQUN0QixHQUFHLEVBQUUsY0FBTSxPQUFBLEdBQUcsRUFBSCxDQUFHLEdBQ1IsQ0FBQztnQkFDVCxpQkFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUM7YUFDdEIsQ0FBQyxDQUFDO1lBRUgsT0FBTyxrQkFBSyxDQUFDO2dCQUNYLDhCQUFpQixDQUFDLHFCQUFxQixFQUFFLFdBQVcsZUFDL0MsSUFBSSxJQUNQLElBQUksRUFBRSxLQUFLLElBQ1g7Z0JBQ0YsbUJBQW1CLENBQUMsT0FBTyxDQUFDO2dCQUM1QixzQkFBUyxDQUFDLGNBQWMsQ0FBQzthQUMxQixDQUFDLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3BCLENBQUMsQ0FBQztJQUNKLENBQUM7SUFuQ0QsNEJBbUNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgUnVsZSxcbiAgU2NoZW1hdGljQ29udGV4dCxcbiAgU2NoZW1hdGljc0V4Y2VwdGlvbixcbiAgVHJlZSxcbiAgY2hhaW4sXG4gIGV4dGVybmFsU2NoZW1hdGljLFxuICBhcHBseSxcbiAgdXJsLFxuICBub29wLFxuICBmaWx0ZXIsXG4gIHRlbXBsYXRlLFxuICBtb3ZlLFxuICBtZXJnZVdpdGgsXG59IGZyb20gJ0Bhbmd1bGFyLWRldmtpdC9zY2hlbWF0aWNzJztcbmltcG9ydCAqIGFzIHRzIGZyb20gJ3R5cGVzY3JpcHQnO1xuaW1wb3J0IHtcbiAgc3RyaW5nVXRpbHMsXG4gIGJ1aWxkUmVsYXRpdmVQYXRoLFxuICBpbnNlcnRJbXBvcnQsXG4gIE5vb3BDaGFuZ2UsXG4gIFJlcGxhY2VDaGFuZ2UsXG4gIEluc2VydENoYW5nZSxcbiAgZ2V0UHJvamVjdFBhdGgsXG4gIG9taXQsXG4gIHBhcnNlTmFtZSxcbn0gZnJvbSAnQG5ncngvc2NoZW1hdGljcy9zY2hlbWF0aWNzLWNvcmUnO1xuaW1wb3J0IHsgU2NoZW1hIGFzIENvbnRhaW5lck9wdGlvbnMgfSBmcm9tICcuL3NjaGVtYSc7XG5cbmZ1bmN0aW9uIGFkZFN0YXRlVG9Db21wb25lbnQob3B0aW9uczogQ29udGFpbmVyT3B0aW9ucykge1xuICByZXR1cm4gKGhvc3Q6IFRyZWUpID0+IHtcbiAgICBpZiAoIW9wdGlvbnMuc3RhdGUgJiYgIW9wdGlvbnMuc3RhdGVJbnRlcmZhY2UpIHtcbiAgICAgIHJldHVybiBob3N0O1xuICAgIH1cblxuICAgIGNvbnN0IHN0YXRlUGF0aCA9IGAvJHtvcHRpb25zLnBhdGh9LyR7b3B0aW9ucy5zdGF0ZX1gO1xuXG4gICAgaWYgKG9wdGlvbnMuc3RhdGUpIHtcbiAgICAgIGlmICghaG9zdC5leGlzdHMoc3RhdGVQYXRoKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSBTcGVjaWZpZWQgc3RhdGUgcGF0aCAke3N0YXRlUGF0aH0gZG9lcyBub3QgZXhpc3RgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBjb21wb25lbnRQYXRoID1cbiAgICAgIGAvJHtvcHRpb25zLnBhdGh9L2AgK1xuICAgICAgKG9wdGlvbnMuZmxhdCA/ICcnIDogc3RyaW5nVXRpbHMuZGFzaGVyaXplKG9wdGlvbnMubmFtZSkgKyAnLycpICtcbiAgICAgIHN0cmluZ1V0aWxzLmRhc2hlcml6ZShvcHRpb25zLm5hbWUpICtcbiAgICAgICcuY29tcG9uZW50LnRzJztcblxuICAgIGNvbnN0IHRleHQgPSBob3N0LnJlYWQoY29tcG9uZW50UGF0aCk7XG5cbiAgICBpZiAodGV4dCA9PT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IFNjaGVtYXRpY3NFeGNlcHRpb24oYEZpbGUgJHtjb21wb25lbnRQYXRofSBkb2VzIG5vdCBleGlzdC5gKTtcbiAgICB9XG5cbiAgICBjb25zdCBzb3VyY2VUZXh0ID0gdGV4dC50b1N0cmluZygndXRmLTgnKTtcblxuICAgIGNvbnN0IHNvdXJjZSA9IHRzLmNyZWF0ZVNvdXJjZUZpbGUoXG4gICAgICBjb21wb25lbnRQYXRoLFxuICAgICAgc291cmNlVGV4dCxcbiAgICAgIHRzLlNjcmlwdFRhcmdldC5MYXRlc3QsXG4gICAgICB0cnVlXG4gICAgKTtcblxuICAgIGNvbnN0IHN0YXRlSW1wb3J0UGF0aCA9IGJ1aWxkUmVsYXRpdmVQYXRoKGNvbXBvbmVudFBhdGgsIHN0YXRlUGF0aCk7XG4gICAgY29uc3Qgc3RvcmVJbXBvcnQgPSBpbnNlcnRJbXBvcnQoXG4gICAgICBzb3VyY2UsXG4gICAgICBjb21wb25lbnRQYXRoLFxuICAgICAgJ1N0b3JlJyxcbiAgICAgICdAbmdyeC9zdG9yZSdcbiAgICApO1xuICAgIGNvbnN0IHN0YXRlSW1wb3J0ID0gb3B0aW9ucy5zdGF0ZVxuICAgICAgPyBpbnNlcnRJbXBvcnQoXG4gICAgICAgICAgc291cmNlLFxuICAgICAgICAgIGNvbXBvbmVudFBhdGgsXG4gICAgICAgICAgYCogYXMgZnJvbVN0b3JlYCxcbiAgICAgICAgICBzdGF0ZUltcG9ydFBhdGgsXG4gICAgICAgICAgdHJ1ZVxuICAgICAgICApXG4gICAgICA6IG5ldyBOb29wQ2hhbmdlKCk7XG5cbiAgICBjb25zdCBjb21wb25lbnRDbGFzcyA9IHNvdXJjZS5zdGF0ZW1lbnRzLmZpbmQoXG4gICAgICBzdG0gPT4gc3RtLmtpbmQgPT09IHRzLlN5bnRheEtpbmQuQ2xhc3NEZWNsYXJhdGlvblxuICAgICk7XG4gICAgY29uc3QgY29tcG9uZW50ID0gY29tcG9uZW50Q2xhc3MgYXMgdHMuQ2xhc3NEZWNsYXJhdGlvbjtcbiAgICBjb25zdCBjb21wb25lbnRDb25zdHJ1Y3RvciA9IGNvbXBvbmVudC5tZW1iZXJzLmZpbmQoXG4gICAgICBtZW1iZXIgPT4gbWVtYmVyLmtpbmQgPT09IHRzLlN5bnRheEtpbmQuQ29uc3RydWN0b3JcbiAgICApO1xuICAgIGNvbnN0IGNtcEN0ciA9IGNvbXBvbmVudENvbnN0cnVjdG9yIGFzIHRzLkNvbnN0cnVjdG9yRGVjbGFyYXRpb247XG4gICAgY29uc3QgeyBwb3MgfSA9IGNtcEN0cjtcbiAgICBjb25zdCBzdGF0ZVR5cGUgPSBvcHRpb25zLnN0YXRlXG4gICAgICA/IGBmcm9tU3RvcmUuJHtvcHRpb25zLnN0YXRlSW50ZXJmYWNlfWBcbiAgICAgIDogJ2FueSc7XG4gICAgY29uc3QgY29uc3RydWN0b3JUZXh0ID0gY21wQ3RyLmdldFRleHQoKTtcbiAgICBjb25zdCBbc3RhcnQsIGVuZF0gPSBjb25zdHJ1Y3RvclRleHQuc3BsaXQoJygpJyk7XG4gICAgY29uc3Qgc3RvcmVUZXh0ID0gYHByaXZhdGUgc3RvcmU6IFN0b3JlPCR7c3RhdGVUeXBlfT5gO1xuICAgIGNvbnN0IHN0b3JlQ29uc3RydWN0b3IgPSBbc3RhcnQsIGAoJHtzdG9yZVRleHR9KWAsIGVuZF0uam9pbignJyk7XG4gICAgY29uc3QgY29uc3RydWN0b3JVcGRhdGUgPSBuZXcgUmVwbGFjZUNoYW5nZShcbiAgICAgIGNvbXBvbmVudFBhdGgsXG4gICAgICBwb3MsXG4gICAgICBgICAke2NvbnN0cnVjdG9yVGV4dH1cXG5cXG5gLFxuICAgICAgYFxcblxcbiAgJHtzdG9yZUNvbnN0cnVjdG9yfWBcbiAgICApO1xuXG4gICAgY29uc3QgY2hhbmdlcyA9IFtzdG9yZUltcG9ydCwgc3RhdGVJbXBvcnQsIGNvbnN0cnVjdG9yVXBkYXRlXTtcbiAgICBjb25zdCByZWNvcmRlciA9IGhvc3QuYmVnaW5VcGRhdGUoY29tcG9uZW50UGF0aCk7XG5cbiAgICBmb3IgKGNvbnN0IGNoYW5nZSBvZiBjaGFuZ2VzKSB7XG4gICAgICBpZiAoY2hhbmdlIGluc3RhbmNlb2YgSW5zZXJ0Q2hhbmdlKSB7XG4gICAgICAgIHJlY29yZGVyLmluc2VydExlZnQoY2hhbmdlLnBvcywgY2hhbmdlLnRvQWRkKTtcbiAgICAgIH0gZWxzZSBpZiAoY2hhbmdlIGluc3RhbmNlb2YgUmVwbGFjZUNoYW5nZSkge1xuICAgICAgICByZWNvcmRlci5yZW1vdmUocG9zLCBjaGFuZ2Uub2xkVGV4dC5sZW5ndGgpO1xuICAgICAgICByZWNvcmRlci5pbnNlcnRMZWZ0KGNoYW5nZS5vcmRlciwgY2hhbmdlLm5ld1RleHQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGhvc3QuY29tbWl0VXBkYXRlKHJlY29yZGVyKTtcblxuICAgIHJldHVybiBob3N0O1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihvcHRpb25zOiBDb250YWluZXJPcHRpb25zKTogUnVsZSB7XG4gIHJldHVybiAoaG9zdDogVHJlZSwgY29udGV4dDogU2NoZW1hdGljQ29udGV4dCkgPT4ge1xuICAgIG9wdGlvbnMucGF0aCA9IGdldFByb2plY3RQYXRoKGhvc3QsIG9wdGlvbnMpO1xuXG4gICAgY29uc3QgcGFyc2VkUGF0aCA9IHBhcnNlTmFtZShvcHRpb25zLnBhdGgsIG9wdGlvbnMubmFtZSk7XG4gICAgb3B0aW9ucy5uYW1lID0gcGFyc2VkUGF0aC5uYW1lO1xuICAgIG9wdGlvbnMucGF0aCA9IHBhcnNlZFBhdGgucGF0aDtcblxuICAgIGNvbnN0IG9wdHMgPSBbJ3N0YXRlJywgJ3N0YXRlSW50ZXJmYWNlJ10ucmVkdWNlKFxuICAgICAgKGN1cnJlbnQ6IFBhcnRpYWw8Q29udGFpbmVyT3B0aW9ucz4sIGtleSkgPT4ge1xuICAgICAgICByZXR1cm4gb21pdChjdXJyZW50LCBrZXkgYXMgYW55KTtcbiAgICAgIH0sXG4gICAgICBvcHRpb25zXG4gICAgKTtcblxuICAgIGNvbnN0IHRlbXBsYXRlU291cmNlID0gYXBwbHkodXJsKCcuL2ZpbGVzJyksIFtcbiAgICAgIG9wdGlvbnMuc3BlYyA/IG5vb3AoKSA6IGZpbHRlcihwYXRoID0+ICFwYXRoLmVuZHNXaXRoKCdfX3NwZWMudHMnKSksXG4gICAgICB0ZW1wbGF0ZSh7XG4gICAgICAgICdpZi1mbGF0JzogKHM6IHN0cmluZykgPT4gKG9wdGlvbnMuZmxhdCA/ICcnIDogcyksXG4gICAgICAgIC4uLnN0cmluZ1V0aWxzLFxuICAgICAgICAuLi4ob3B0aW9ucyBhcyBvYmplY3QpLFxuICAgICAgICBkb3Q6ICgpID0+ICcuJyxcbiAgICAgIH0gYXMgYW55KSxcbiAgICAgIG1vdmUocGFyc2VkUGF0aC5wYXRoKSxcbiAgICBdKTtcblxuICAgIHJldHVybiBjaGFpbihbXG4gICAgICBleHRlcm5hbFNjaGVtYXRpYygnQHNjaGVtYXRpY3MvYW5ndWxhcicsICdjb21wb25lbnQnLCB7XG4gICAgICAgIC4uLm9wdHMsXG4gICAgICAgIHNwZWM6IGZhbHNlLFxuICAgICAgfSksXG4gICAgICBhZGRTdGF0ZVRvQ29tcG9uZW50KG9wdGlvbnMpLFxuICAgICAgbWVyZ2VXaXRoKHRlbXBsYXRlU291cmNlKSxcbiAgICBdKShob3N0LCBjb250ZXh0KTtcbiAgfTtcbn1cbiJdfQ==