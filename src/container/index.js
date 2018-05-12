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
        define("@ngrx/schematics/src/container/index", ["require", "exports", "@angular-devkit/schematics", "typescript", "@ngrx/schematics/schematics-core/index"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var schematics_1 = require("@angular-devkit/schematics");
    var ts = require("typescript");
    var schematics_core_1 = require("@ngrx/schematics/schematics-core/index");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3NjaGVtYXRpY3Mvc3JjL2NvbnRhaW5lci9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFBQSx5REFjb0M7SUFDcEMsK0JBQWlDO0lBQ2pDLDBFQVMwQztJQUcxQyw2QkFBNkIsT0FBeUI7UUFDcEQsTUFBTSxDQUFDLFVBQUMsSUFBVTtZQUNoQixFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztnQkFDOUMsTUFBTSxDQUFDLElBQUksQ0FBQztZQUNkLENBQUM7WUFFRCxJQUFNLFNBQVMsR0FBRyxNQUFJLE9BQU8sQ0FBQyxJQUFJLFNBQUksT0FBTyxDQUFDLEtBQU8sQ0FBQztZQUV0RCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDbEIsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDNUIsTUFBTSxJQUFJLEtBQUssQ0FBQyw4QkFBNEIsU0FBUyxvQkFBaUIsQ0FBQyxDQUFDO2dCQUMxRSxDQUFDO1lBQ0gsQ0FBQztZQUVELElBQU0sYUFBYSxHQUNqQixNQUFJLE9BQU8sQ0FBQyxJQUFJLE1BQUc7Z0JBQ25CLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyw2QkFBVyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDO2dCQUMvRCw2QkFBVyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO2dCQUNuQyxlQUFlLENBQUM7WUFFbEIsSUFBTSxJ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LDZCQUFXLEVBQ1YsT0FBa0IsSUFDdEIsR0FBRyxFQUFFLGNBQU0sT0FBQSxHQUFHLEVBQUgsQ0FBRyxHQUNSLENBQUM7YUFDVixDQUFDLENBQUM7WUFFSCxNQUFNLENBQUMsa0JBQUssQ0FBQztnQkFDWCw4QkFBaUIsQ0FBQyxxQkFBcUIsRUFBRSxXQUFXLGVBQy9DLElBQUksSUFDUCxJQUFJLEVBQUUsS0FBSyxJQUNYO2dCQUNGLG1CQUFtQixDQUFDLE9BQU8sQ0FBQztnQkFDNUIsc0JBQVMsQ0FBQyxjQUFjLENBQUM7YUFDMUIsQ0FBQyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNwQixDQUFDLENBQUM7SUFDSixDQUFDO0lBOUJELDRCQThCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIFJ1bGUsXG4gIFNjaGVtYXRpY0NvbnRleHQsXG4gIFNjaGVtYXRpY3NFeGNlcHRpb24sXG4gIFRyZWUsXG4gIGNoYWluLFxuICBleHRlcm5hbFNjaGVtYXRpYyxcbiAgYXBwbHksXG4gIHVybCxcbiAgbm9vcCxcbiAgZmlsdGVyLFxuICB0ZW1wbGF0ZSxcbiAgbW92ZSxcbiAgbWVyZ2VXaXRoLFxufSBmcm9tICdAYW5ndWxhci1kZXZraXQvc2NoZW1hdGljcyc7XG5pbXBvcnQgKiBhcyB0cyBmcm9tICd0eXBlc2NyaXB0JztcbmltcG9ydCB7XG4gIHN0cmluZ1V0aWxzLFxuICBidWlsZFJlbGF0aXZlUGF0aCxcbiAgaW5zZXJ0SW1wb3J0LFxuICBOb29wQ2hhbmdlLFxuICBSZXBsYWNlQ2hhbmdlLFxuICBJbnNlcnRDaGFuZ2UsXG4gIGdldFByb2plY3RQYXRoLFxuICBvbWl0LFxufSBmcm9tICdAbmdyeC9zY2hlbWF0aWNzL3NjaGVtYXRpY3MtY29yZSc7XG5pbXBvcnQgeyBTY2hlbWEgYXMgQ29udGFpbmVyT3B0aW9ucyB9IGZyb20gJy4vc2NoZW1hJztcblxuZnVuY3Rpb24gYWRkU3RhdGVUb0NvbXBvbmVudChvcHRpb25zOiBDb250YWluZXJPcHRpb25zKSB7XG4gIHJldHVybiAoaG9zdDogVHJlZSkgPT4ge1xuICAgIGlmICghb3B0aW9ucy5zdGF0ZSAmJiAhb3B0aW9ucy5zdGF0ZUludGVyZmFjZSkge1xuICAgICAgcmV0dXJuIGhvc3Q7XG4gICAgfVxuXG4gICAgY29uc3Qgc3RhdGVQYXRoID0gYC8ke29wdGlvbnMucGF0aH0vJHtvcHRpb25zLnN0YXRlfWA7XG5cbiAgICBpZiAob3B0aW9ucy5zdGF0ZSkge1xuICAgICAgaWYgKCFob3N0LmV4aXN0cyhzdGF0ZVBhdGgpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgVGhlIFNwZWNpZmllZCBzdGF0ZSBwYXRoICR7c3RhdGVQYXRofSBkb2VzIG5vdCBleGlzdGApO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGNvbXBvbmVudFBhdGggPVxuICAgICAgYC8ke29wdGlvbnMucGF0aH0vYCArXG4gICAgICAob3B0aW9ucy5mbGF0ID8gJycgOiBzdHJpbmdVdGlscy5kYXNoZXJpemUob3B0aW9ucy5uYW1lKSArICcvJykgK1xuICAgICAgc3RyaW5nVXRpbHMuZGFzaGVyaXplKG9wdGlvbnMubmFtZSkgK1xuICAgICAgJy5jb21wb25lbnQudHMnO1xuXG4gICAgY29uc3QgdGV4dCA9IGhvc3QucmVhZChjb21wb25lbnRQYXRoKTtcblxuICAgIGlmICh0ZXh0ID09PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgU2NoZW1hdGljc0V4Y2VwdGlvbihgRmlsZSAke2NvbXBvbmVudFBhdGh9IGRvZXMgbm90IGV4aXN0LmApO1xuICAgIH1cblxuICAgIGNvbnN0IHNvdXJjZVRleHQgPSB0ZXh0LnRvU3RyaW5nKCd1dGYtOCcpO1xuXG4gICAgY29uc3Qgc291cmNlID0gdHMuY3JlYXRlU291cmNlRmlsZShcbiAgICAgIGNvbXBvbmVudFBhdGgsXG4gICAgICBzb3VyY2VUZXh0LFxuICAgICAgdHMuU2NyaXB0VGFyZ2V0LkxhdGVzdCxcbiAgICAgIHRydWVcbiAgICApO1xuXG4gICAgY29uc3Qgc3RhdGVJbXBvcnRQYXRoID0gYnVpbGRSZWxhdGl2ZVBhdGgoY29tcG9uZW50UGF0aCwgc3RhdGVQYXRoKTtcbiAgICBjb25zdCBzdG9yZUltcG9ydCA9IGluc2VydEltcG9ydChcbiAgICAgIHNvdXJjZSxcbiAgICAgIGNvbXBvbmVudFBhdGgsXG4gICAgICAnU3RvcmUnLFxuICAgICAgJ0BuZ3J4L3N0b3JlJ1xuICAgICk7XG4gICAgY29uc3Qgc3RhdGVJbXBvcnQgPSBvcHRpb25zLnN0YXRlXG4gICAgICA/IGluc2VydEltcG9ydChcbiAgICAgICAgICBzb3VyY2UsXG4gICAgICAgICAgY29tcG9uZW50UGF0aCxcbiAgICAgICAgICBgKiBhcyBmcm9tU3RvcmVgLFxuICAgICAgICAgIHN0YXRlSW1wb3J0UGF0aCxcbiAgICAgICAgICB0cnVlXG4gICAgICAgIClcbiAgICAgIDogbmV3IE5vb3BDaGFuZ2UoKTtcblxuICAgIGNvbnN0IGNvbXBvbmVudENsYXNzID0gc291cmNlLnN0YXRlbWVudHMuZmluZChcbiAgICAgIHN0bSA9PiBzdG0ua2luZCA9PT0gdHMuU3ludGF4S2luZC5DbGFzc0RlY2xhcmF0aW9uXG4gICAgKTtcbiAgICBjb25zdCBjb21wb25lbnQgPSBjb21wb25lbnRDbGFzcyBhcyB0cy5DbGFzc0RlY2xhcmF0aW9uO1xuICAgIGNvbnN0IGNvbXBvbmVudENvbnN0cnVjdG9yID0gY29tcG9uZW50Lm1lbWJlcnMuZmluZChcbiAgICAgIG1lbWJlciA9PiBtZW1iZXIua2luZCA9PT0gdHMuU3ludGF4S2luZC5Db25zdHJ1Y3RvclxuICAgICk7XG4gICAgY29uc3QgY21wQ3RyID0gY29tcG9uZW50Q29uc3RydWN0b3IgYXMgdHMuQ29uc3RydWN0b3JEZWNsYXJhdGlvbjtcbiAgICBjb25zdCB7IHBvcyB9ID0gY21wQ3RyO1xuICAgIGNvbnN0IHN0YXRlVHlwZSA9IG9wdGlvbnMuc3RhdGVcbiAgICAgID8gYGZyb21TdG9yZS4ke29wdGlvbnMuc3RhdGVJbnRlcmZhY2V9YFxuICAgICAgOiAnYW55JztcbiAgICBjb25zdCBjb25zdHJ1Y3RvclRleHQgPSBjbXBDdHIuZ2V0VGV4dCgpO1xuICAgIGNvbnN0IFtzdGFydCwgZW5kXSA9IGNvbnN0cnVjdG9yVGV4dC5zcGxpdCgnKCknKTtcbiAgICBjb25zdCBzdG9yZVRleHQgPSBgcHJpdmF0ZSBzdG9yZTogU3RvcmU8JHtzdGF0ZVR5cGV9PmA7XG4gICAgY29uc3Qgc3RvcmVDb25zdHJ1Y3RvciA9IFtzdGFydCwgYCgke3N0b3JlVGV4dH0pYCwgZW5kXS5qb2luKCcnKTtcbiAgICBjb25zdCBjb25zdHJ1Y3RvclVwZGF0ZSA9IG5ldyBSZXBsYWNlQ2hhbmdlKFxuICAgICAgY29tcG9uZW50UGF0aCxcbiAgICAgIHBvcyxcbiAgICAgIGAgICR7Y29uc3RydWN0b3JUZXh0fVxcblxcbmAsXG4gICAgICBgXFxuXFxuICAke3N0b3JlQ29uc3RydWN0b3J9YFxuICAgICk7XG5cbiAgICBjb25zdCBjaGFuZ2VzID0gW3N0b3JlSW1wb3J0LCBzdGF0ZUltcG9ydCwgY29uc3RydWN0b3JVcGRhdGVdO1xuICAgIGNvbnN0IHJlY29yZGVyID0gaG9zdC5iZWdpblVwZGF0ZShjb21wb25lbnRQYXRoKTtcblxuICAgIGZvciAoY29uc3QgY2hhbmdlIG9mIGNoYW5nZXMpIHtcbiAgICAgIGlmIChjaGFuZ2UgaW5zdGFuY2VvZiBJbnNlcnRDaGFuZ2UpIHtcbiAgICAgICAgcmVjb3JkZXIuaW5zZXJ0TGVmdChjaGFuZ2UucG9zLCBjaGFuZ2UudG9BZGQpO1xuICAgICAgfSBlbHNlIGlmIChjaGFuZ2UgaW5zdGFuY2VvZiBSZXBsYWNlQ2hhbmdlKSB7XG4gICAgICAgIHJlY29yZGVyLnJlbW92ZShwb3MsIGNoYW5nZS5vbGRUZXh0Lmxlbmd0aCk7XG4gICAgICAgIHJlY29yZGVyLmluc2VydExlZnQoY2hhbmdlLm9yZGVyLCBjaGFuZ2UubmV3VGV4dCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaG9zdC5jb21taXRVcGRhdGUocmVjb3JkZXIpO1xuXG4gICAgcmV0dXJuIGhvc3Q7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG9wdGlvbnM6IENvbnRhaW5lck9wdGlvbnMpOiBSdWxlIHtcbiAgcmV0dXJuIChob3N0OiBUcmVlLCBjb250ZXh0OiBTY2hlbWF0aWNDb250ZXh0KSA9PiB7XG4gICAgb3B0aW9ucy5wYXRoID0gZ2V0UHJvamVjdFBhdGgoaG9zdCwgb3B0aW9ucyk7XG5cbiAgICBjb25zdCBvcHRzID0gWydzdGF0ZScsICdzdGF0ZUludGVyZmFjZSddLnJlZHVjZShcbiAgICAgIChjdXJyZW50OiBQYXJ0aWFsPENvbnRhaW5lck9wdGlvbnM+LCBrZXkpID0+IHtcbiAgICAgICAgcmV0dXJuIG9taXQoY3VycmVudCwga2V5IGFzIGFueSk7XG4gICAgICB9LFxuICAgICAgb3B0aW9uc1xuICAgICk7XG5cbiAgICBjb25zdCB0ZW1wbGF0ZVNvdXJjZSA9IGFwcGx5KHVybCgnLi9maWxlcycpLCBbXG4gICAgICBvcHRpb25zLnNwZWMgPyBub29wKCkgOiBmaWx0ZXIocGF0aCA9PiAhcGF0aC5lbmRzV2l0aCgnX19zcGVjLnRzJykpLFxuICAgICAgdGVtcGxhdGUoe1xuICAgICAgICAnaWYtZmxhdCc6IChzOiBzdHJpbmcpID0+IChvcHRpb25zLmZsYXQgPyAnJyA6IHMpLFxuICAgICAgICAuLi5zdHJpbmdVdGlscyxcbiAgICAgICAgLi4uKG9wdGlvbnMgYXMgb2JqZWN0KSxcbiAgICAgICAgZG90OiAoKSA9PiAnLicsXG4gICAgICB9IGFzIGFueSksXG4gICAgXSk7XG5cbiAgICByZXR1cm4gY2hhaW4oW1xuICAgICAgZXh0ZXJuYWxTY2hlbWF0aWMoJ0BzY2hlbWF0aWNzL2FuZ3VsYXInLCAnY29tcG9uZW50Jywge1xuICAgICAgICAuLi5vcHRzLFxuICAgICAgICBzcGVjOiBmYWxzZSxcbiAgICAgIH0pLFxuICAgICAgYWRkU3RhdGVUb0NvbXBvbmVudChvcHRpb25zKSxcbiAgICAgIG1lcmdlV2l0aCh0ZW1wbGF0ZVNvdXJjZSksXG4gICAgXSkoaG9zdCwgY29udGV4dCk7XG4gIH07XG59XG4iXX0=