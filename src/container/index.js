var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
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
        define("@ngrx/schematics/src/container/index", ["require", "exports", "@angular-devkit/schematics", "typescript", "@ngrx/schematics/src/schematics-core/index"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var schematics_1 = require("@angular-devkit/schematics");
    var ts = require("typescript");
    var schematics_core_1 = require("@ngrx/schematics/src/schematics-core/index");
    function addStateToComponent(options) {
        return function (host) {
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
            var _a = __read(constructorText.split('()'), 2), start = _a[0], end = _a[1];
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
                    if (changes_1_1 && !changes_1_1.done && (_b = changes_1.return)) _b.call(changes_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            host.commitUpdate(recorder);
            return host;
            var e_1, _b;
        };
    }
    function default_1(options) {
        return function (host, context) {
            options.path = schematics_core_1.getProjectPath(host, options);
            var opts = ['state', 'stateInterface'].reduce(function (current, key) {
                return schematics_core_1.omit(current, key);
            }, options);
            var templateSource = schematics_1.apply(schematics_1.url('./files'), [
                options.spec ? schematics_1.noop() : schematics_1.filter(function (path) { return !path.endsWith('__spec.ts'); }),
                schematics_1.template(__assign({ 'if-flat': function (s) { return (options.flat ? '' : s); } }, schematics_core_1.stringUtils, options, { dot: function () { return '.'; } })),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3NjaGVtYXRpY3Mvc3JjL2NvbnRhaW5lci9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFBQSx5REFjb0M7SUFDcEMsK0JBQWlDO0lBQ2pDLDhFQVM0QjtJQUc1Qiw2QkFBNkIsT0FBeUI7UUFDcEQsTUFBTSxDQUFDLFVBQUMsSUFBVTtZQUNoQixFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztnQkFDOUMsTUFBTSxDQUFDLElBQUksQ0FBQztZQUNkLENBQUM7WUFFRCxJQUFNLFNBQVMsR0FBRyxNQUFJLE9BQU8sQ0FBQyxJQUFJLFNBQUksT0FBTyxDQUFDLEtBQU8sQ0FBQztZQUV0RCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDbEIsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDNUIsTUFBTSxJQUFJLEtBQUssQ0FBQyw4QkFBNEIsU0FBUyxvQkFBaUIsQ0FBQyxDQUFDO2dCQUMxRSxDQUFDO1lBQ0gsQ0FBQztZQUVELElBQU0sYUFBYSxHQUNqQixNQUFJLE9BQU8sQ0FBQyxJQUFJLE1BQUc7Z0JBQ25CLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyw2QkFBVyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDO2dCQUMvRCw2QkFBVyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO2dCQUNuQyxlQUFlLENBQUM7WUFFbEIsSUFBTSxJ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LDZCQUFXLEVBQ1YsT0FBa0IsSUFDdEIsR0FBRyxFQUFFLGNBQU0sT0FBQSxHQUFHLEVBQUgsQ0FBRyxHQUNSLENBQUM7YUFDVixDQUFDLENBQUM7WUFFSCxNQUFNLENBQUMsa0JBQUssQ0FBQztnQkFDWCw4QkFBaUIsQ0FBQyxxQkFBcUIsRUFBRSxXQUFXLGVBQy9DLElBQUksSUFDUCxJQUFJLEVBQUUsS0FBSyxJQUNYO2dCQUNGLG1CQUFtQixDQUFDLE9BQU8sQ0FBQztnQkFDNUIsc0JBQVMsQ0FBQyxjQUFjLENBQUM7YUFDMUIsQ0FBQyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNwQixDQUFDLENBQUM7SUFDSixDQUFDO0lBOUJELDRCQThCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIFJ1bGUsXG4gIFNjaGVtYXRpY0NvbnRleHQsXG4gIFNjaGVtYXRpY3NFeGNlcHRpb24sXG4gIFRyZWUsXG4gIGNoYWluLFxuICBleHRlcm5hbFNjaGVtYXRpYyxcbiAgYXBwbHksXG4gIHVybCxcbiAgbm9vcCxcbiAgZmlsdGVyLFxuICB0ZW1wbGF0ZSxcbiAgbW92ZSxcbiAgbWVyZ2VXaXRoLFxufSBmcm9tICdAYW5ndWxhci1kZXZraXQvc2NoZW1hdGljcyc7XG5pbXBvcnQgKiBhcyB0cyBmcm9tICd0eXBlc2NyaXB0JztcbmltcG9ydCB7XG4gIHN0cmluZ1V0aWxzLFxuICBidWlsZFJlbGF0aXZlUGF0aCxcbiAgaW5zZXJ0SW1wb3J0LFxuICBOb29wQ2hhbmdlLFxuICBSZXBsYWNlQ2hhbmdlLFxuICBJbnNlcnRDaGFuZ2UsXG4gIGdldFByb2plY3RQYXRoLFxuICBvbWl0LFxufSBmcm9tICcuLi9zY2hlbWF0aWNzLWNvcmUnO1xuaW1wb3J0IHsgU2NoZW1hIGFzIENvbnRhaW5lck9wdGlvbnMgfSBmcm9tICcuL3NjaGVtYSc7XG5cbmZ1bmN0aW9uIGFkZFN0YXRlVG9Db21wb25lbnQob3B0aW9uczogQ29udGFpbmVyT3B0aW9ucykge1xuICByZXR1cm4gKGhvc3Q6IFRyZWUpID0+IHtcbiAgICBpZiAoIW9wdGlvbnMuc3RhdGUgJiYgIW9wdGlvbnMuc3RhdGVJbnRlcmZhY2UpIHtcbiAgICAgIHJldHVybiBob3N0O1xuICAgIH1cblxuICAgIGNvbnN0IHN0YXRlUGF0aCA9IGAvJHtvcHRpb25zLnBhdGh9LyR7b3B0aW9ucy5zdGF0ZX1gO1xuXG4gICAgaWYgKG9wdGlvbnMuc3RhdGUpIHtcbiAgICAgIGlmICghaG9zdC5leGlzdHMoc3RhdGVQYXRoKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSBTcGVjaWZpZWQgc3RhdGUgcGF0aCAke3N0YXRlUGF0aH0gZG9lcyBub3QgZXhpc3RgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBjb21wb25lbnRQYXRoID1cbiAgICAgIGAvJHtvcHRpb25zLnBhdGh9L2AgK1xuICAgICAgKG9wdGlvbnMuZmxhdCA/ICcnIDogc3RyaW5nVXRpbHMuZGFzaGVyaXplKG9wdGlvbnMubmFtZSkgKyAnLycpICtcbiAgICAgIHN0cmluZ1V0aWxzLmRhc2hlcml6ZShvcHRpb25zLm5hbWUpICtcbiAgICAgICcuY29tcG9uZW50LnRzJztcblxuICAgIGNvbnN0IHRleHQgPSBob3N0LnJlYWQoY29tcG9uZW50UGF0aCk7XG5cbiAgICBpZiAodGV4dCA9PT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IFNjaGVtYXRpY3NFeGNlcHRpb24oYEZpbGUgJHtjb21wb25lbnRQYXRofSBkb2VzIG5vdCBleGlzdC5gKTtcbiAgICB9XG5cbiAgICBjb25zdCBzb3VyY2VUZXh0ID0gdGV4dC50b1N0cmluZygndXRmLTgnKTtcblxuICAgIGNvbnN0IHNvdXJjZSA9IHRzLmNyZWF0ZVNvdXJjZUZpbGUoXG4gICAgICBjb21wb25lbnRQYXRoLFxuICAgICAgc291cmNlVGV4dCxcbiAgICAgIHRzLlNjcmlwdFRhcmdldC5MYXRlc3QsXG4gICAgICB0cnVlXG4gICAgKTtcblxuICAgIGNvbnN0IHN0YXRlSW1wb3J0UGF0aCA9IGJ1aWxkUmVsYXRpdmVQYXRoKGNvbXBvbmVudFBhdGgsIHN0YXRlUGF0aCk7XG4gICAgY29uc3Qgc3RvcmVJbXBvcnQgPSBpbnNlcnRJbXBvcnQoXG4gICAgICBzb3VyY2UsXG4gICAgICBjb21wb25lbnRQYXRoLFxuICAgICAgJ1N0b3JlJyxcbiAgICAgICdAbmdyeC9zdG9yZSdcbiAgICApO1xuICAgIGNvbnN0IHN0YXRlSW1wb3J0ID0gb3B0aW9ucy5zdGF0ZVxuICAgICAgPyBpbnNlcnRJbXBvcnQoXG4gICAgICAgICAgc291cmNlLFxuICAgICAgICAgIGNvbXBvbmVudFBhdGgsXG4gICAgICAgICAgYCogYXMgZnJvbVN0b3JlYCxcbiAgICAgICAgICBzdGF0ZUltcG9ydFBhdGgsXG4gICAgICAgICAgdHJ1ZVxuICAgICAgICApXG4gICAgICA6IG5ldyBOb29wQ2hhbmdlKCk7XG5cbiAgICBjb25zdCBjb21wb25lbnRDbGFzcyA9IHNvdXJjZS5zdGF0ZW1lbnRzLmZpbmQoXG4gICAgICBzdG0gPT4gc3RtLmtpbmQgPT09IHRzLlN5bnRheEtpbmQuQ2xhc3NEZWNsYXJhdGlvblxuICAgICk7XG4gICAgY29uc3QgY29tcG9uZW50ID0gY29tcG9uZW50Q2xhc3MgYXMgdHMuQ2xhc3NEZWNsYXJhdGlvbjtcbiAgICBjb25zdCBjb21wb25lbnRDb25zdHJ1Y3RvciA9IGNvbXBvbmVudC5tZW1iZXJzLmZpbmQoXG4gICAgICBtZW1iZXIgPT4gbWVtYmVyLmtpbmQgPT09IHRzLlN5bnRheEtpbmQuQ29uc3RydWN0b3JcbiAgICApO1xuICAgIGNvbnN0IGNtcEN0ciA9IGNvbXBvbmVudENvbnN0cnVjdG9yIGFzIHRzLkNvbnN0cnVjdG9yRGVjbGFyYXRpb247XG4gICAgY29uc3QgeyBwb3MgfSA9IGNtcEN0cjtcbiAgICBjb25zdCBzdGF0ZVR5cGUgPSBvcHRpb25zLnN0YXRlXG4gICAgICA/IGBmcm9tU3RvcmUuJHtvcHRpb25zLnN0YXRlSW50ZXJmYWNlfWBcbiAgICAgIDogJ2FueSc7XG4gICAgY29uc3QgY29uc3RydWN0b3JUZXh0ID0gY21wQ3RyLmdldFRleHQoKTtcbiAgICBjb25zdCBbc3RhcnQsIGVuZF0gPSBjb25zdHJ1Y3RvclRleHQuc3BsaXQoJygpJyk7XG4gICAgY29uc3Qgc3RvcmVUZXh0ID0gYHByaXZhdGUgc3RvcmU6IFN0b3JlPCR7c3RhdGVUeXBlfT5gO1xuICAgIGNvbnN0IHN0b3JlQ29uc3RydWN0b3IgPSBbc3RhcnQsIGAoJHtzdG9yZVRleHR9KWAsIGVuZF0uam9pbignJyk7XG4gICAgY29uc3QgY29uc3RydWN0b3JVcGRhdGUgPSBuZXcgUmVwbGFjZUNoYW5nZShcbiAgICAgIGNvbXBvbmVudFBhdGgsXG4gICAgICBwb3MsXG4gICAgICBgICAke2NvbnN0cnVjdG9yVGV4dH1cXG5cXG5gLFxuICAgICAgYFxcblxcbiAgJHtzdG9yZUNvbnN0cnVjdG9yfWBcbiAgICApO1xuXG4gICAgY29uc3QgY2hhbmdlcyA9IFtzdG9yZUltcG9ydCwgc3RhdGVJbXBvcnQsIGNvbnN0cnVjdG9yVXBkYXRlXTtcbiAgICBjb25zdCByZWNvcmRlciA9IGhvc3QuYmVnaW5VcGRhdGUoY29tcG9uZW50UGF0aCk7XG5cbiAgICBmb3IgKGNvbnN0IGNoYW5nZSBvZiBjaGFuZ2VzKSB7XG4gICAgICBpZiAoY2hhbmdlIGluc3RhbmNlb2YgSW5zZXJ0Q2hhbmdlKSB7XG4gICAgICAgIHJlY29yZGVyLmluc2VydExlZnQoY2hhbmdlLnBvcywgY2hhbmdlLnRvQWRkKTtcbiAgICAgIH0gZWxzZSBpZiAoY2hhbmdlIGluc3RhbmNlb2YgUmVwbGFjZUNoYW5nZSkge1xuICAgICAgICByZWNvcmRlci5yZW1vdmUocG9zLCBjaGFuZ2Uub2xkVGV4dC5sZW5ndGgpO1xuICAgICAgICByZWNvcmRlci5pbnNlcnRMZWZ0KGNoYW5nZS5vcmRlciwgY2hhbmdlLm5ld1RleHQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGhvc3QuY29tbWl0VXBkYXRlKHJlY29yZGVyKTtcblxuICAgIHJldHVybiBob3N0O1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihvcHRpb25zOiBDb250YWluZXJPcHRpb25zKTogUnVsZSB7XG4gIHJldHVybiAoaG9zdDogVHJlZSwgY29udGV4dDogU2NoZW1hdGljQ29udGV4dCkgPT4ge1xuICAgIG9wdGlvbnMucGF0aCA9IGdldFByb2plY3RQYXRoKGhvc3QsIG9wdGlvbnMpO1xuXG4gICAgY29uc3Qgb3B0cyA9IFsnc3RhdGUnLCAnc3RhdGVJbnRlcmZhY2UnXS5yZWR1Y2UoXG4gICAgICAoY3VycmVudDogUGFydGlhbDxDb250YWluZXJPcHRpb25zPiwga2V5KSA9PiB7XG4gICAgICAgIHJldHVybiBvbWl0KGN1cnJlbnQsIGtleSBhcyBhbnkpO1xuICAgICAgfSxcbiAgICAgIG9wdGlvbnNcbiAgICApO1xuXG4gICAgY29uc3QgdGVtcGxhdGVTb3VyY2UgPSBhcHBseSh1cmwoJy4vZmlsZXMnKSwgW1xuICAgICAgb3B0aW9ucy5zcGVjID8gbm9vcCgpIDogZmlsdGVyKHBhdGggPT4gIXBhdGguZW5kc1dpdGgoJ19fc3BlYy50cycpKSxcbiAgICAgIHRlbXBsYXRlKHtcbiAgICAgICAgJ2lmLWZsYXQnOiAoczogc3RyaW5nKSA9PiAob3B0aW9ucy5mbGF0ID8gJycgOiBzKSxcbiAgICAgICAgLi4uc3RyaW5nVXRpbHMsXG4gICAgICAgIC4uLihvcHRpb25zIGFzIG9iamVjdCksXG4gICAgICAgIGRvdDogKCkgPT4gJy4nLFxuICAgICAgfSBhcyBhbnkpLFxuICAgIF0pO1xuXG4gICAgcmV0dXJuIGNoYWluKFtcbiAgICAgIGV4dGVybmFsU2NoZW1hdGljKCdAc2NoZW1hdGljcy9hbmd1bGFyJywgJ2NvbXBvbmVudCcsIHtcbiAgICAgICAgLi4ub3B0cyxcbiAgICAgICAgc3BlYzogZmFsc2UsXG4gICAgICB9KSxcbiAgICAgIGFkZFN0YXRlVG9Db21wb25lbnQob3B0aW9ucyksXG4gICAgICBtZXJnZVdpdGgodGVtcGxhdGVTb3VyY2UpLFxuICAgIF0pKGhvc3QsIGNvbnRleHQpO1xuICB9O1xufVxuIl19