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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3NjaGVtYXRpY3Mvc3JjL2NvbnRhaW5lci9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFBQSx5REFjb0M7SUFDcEMsK0JBQWlDO0lBQ2pDLG9FQVUwQztJQUcxQyw2QkFBNkIsT0FBeUI7UUFDcEQsT0FBTyxVQUFDLElBQVU7WUFDaEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUFFO2dCQUM3QyxPQUFPLElBQUksQ0FBQzthQUNiO1lBRUQsSUFBTSxTQUFTLEdBQUcsTUFBSSxPQUFPLENBQUMsSUFBSSxTQUFJLE9BQU8sQ0FBQyxLQUFPLENBQUM7WUFFdEQsSUFBSSxPQUFPLENBQUMsS0FBSyxFQUFFO2dCQUNqQixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsRUFBRTtvQkFDM0IsTUFBTSxJQUFJLEtBQUssQ0FBQyw4QkFBNEIsU0FBUyxvQkFBaUIsQ0FBQyxDQUFDO2lCQUN6RTthQUNGO1lBRUQsSUFBTSxhQUFhLEdBQ2pCLE1BQUksT0FBTyxDQUFDLElBQUksTUFBRztnQkFDbkIsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLDZCQUFXLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUM7Z0JBQy9ELDZCQUFXLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7Z0JBQ25DLGVBQWUsQ0FBQztZQUVsQixJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBRXRDLElBQUksSUFBSSxLQUFLLElBQUksRUFBRTtnQkFDakIsTUFB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QUcsRUFBRSxjQUFNLE9BQUEsR0FBRyxFQUFILENBQUcsR0FDUixDQUFDO2dCQUNULGlCQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQzthQUN0QixDQUFDLENBQUM7WUFFSCxPQUFPLGtCQUFLLENBQUM7Z0JBQ1gsOEJBQWlCLENBQUMscUJBQXFCLEVBQUUsV0FBVyxlQUMvQyxJQUFJLElBQ1AsSUFBSSxFQUFFLEtBQUssSUFDWDtnQkFDRixtQkFBbUIsQ0FBQyxPQUFPLENBQUM7Z0JBQzVCLHNCQUFTLENBQUMsY0FBYyxDQUFDO2FBQzFCLENBQUMsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDcEIsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQW5DRCw0QkFtQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBSdWxlLFxuICBTY2hlbWF0aWNDb250ZXh0LFxuICBTY2hlbWF0aWNzRXhjZXB0aW9uLFxuICBUcmVlLFxuICBjaGFpbixcbiAgZXh0ZXJuYWxTY2hlbWF0aWMsXG4gIGFwcGx5LFxuICB1cmwsXG4gIG5vb3AsXG4gIGZpbHRlcixcbiAgdGVtcGxhdGUsXG4gIG1vdmUsXG4gIG1lcmdlV2l0aCxcbn0gZnJvbSAnQGFuZ3VsYXItZGV2a2l0L3NjaGVtYXRpY3MnO1xuaW1wb3J0ICogYXMgdHMgZnJvbSAndHlwZXNjcmlwdCc7XG5pbXBvcnQge1xuICBzdHJpbmdVdGlscyxcbiAgYnVpbGRSZWxhdGl2ZVBhdGgsXG4gIGluc2VydEltcG9ydCxcbiAgTm9vcENoYW5nZSxcbiAgUmVwbGFjZUNoYW5nZSxcbiAgSW5zZXJ0Q2hhbmdlLFxuICBnZXRQcm9qZWN0UGF0aCxcbiAgb21pdCxcbiAgcGFyc2VOYW1lLFxufSBmcm9tICdAbmdyeC9zY2hlbWF0aWNzL3NjaGVtYXRpY3MtY29yZSc7XG5pbXBvcnQgeyBTY2hlbWEgYXMgQ29udGFpbmVyT3B0aW9ucyB9IGZyb20gJy4vc2NoZW1hJztcblxuZnVuY3Rpb24gYWRkU3RhdGVUb0NvbXBvbmVudChvcHRpb25zOiBDb250YWluZXJPcHRpb25zKSB7XG4gIHJldHVybiAoaG9zdDogVHJlZSkgPT4ge1xuICAgIGlmICghb3B0aW9ucy5zdGF0ZSAmJiAhb3B0aW9ucy5zdGF0ZUludGVyZmFjZSkge1xuICAgICAgcmV0dXJuIGhvc3Q7XG4gICAgfVxuXG4gICAgY29uc3Qgc3RhdGVQYXRoID0gYC8ke29wdGlvbnMucGF0aH0vJHtvcHRpb25zLnN0YXRlfWA7XG5cbiAgICBpZiAob3B0aW9ucy5zdGF0ZSkge1xuICAgICAgaWYgKCFob3N0LmV4aXN0cyhzdGF0ZVBhdGgpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgVGhlIFNwZWNpZmllZCBzdGF0ZSBwYXRoICR7c3RhdGVQYXRofSBkb2VzIG5vdCBleGlzdGApO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGNvbXBvbmVudFBhdGggPVxuICAgICAgYC8ke29wdGlvbnMucGF0aH0vYCArXG4gICAgICAob3B0aW9ucy5mbGF0ID8gJycgOiBzdHJpbmdVdGlscy5kYXNoZXJpemUob3B0aW9ucy5uYW1lKSArICcvJykgK1xuICAgICAgc3RyaW5nVXRpbHMuZGFzaGVyaXplKG9wdGlvbnMubmFtZSkgK1xuICAgICAgJy5jb21wb25lbnQudHMnO1xuXG4gICAgY29uc3QgdGV4dCA9IGhvc3QucmVhZChjb21wb25lbnRQYXRoKTtcblxuICAgIGlmICh0ZXh0ID09PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgU2NoZW1hdGljc0V4Y2VwdGlvbihgRmlsZSAke2NvbXBvbmVudFBhdGh9IGRvZXMgbm90IGV4aXN0LmApO1xuICAgIH1cblxuICAgIGNvbnN0IHNvdXJjZVRleHQgPSB0ZXh0LnRvU3RyaW5nKCd1dGYtOCcpO1xuXG4gICAgY29uc3Qgc291cmNlID0gdHMuY3JlYXRlU291cmNlRmlsZShcbiAgICAgIGNvbXBvbmVudFBhdGgsXG4gICAgICBzb3VyY2VUZXh0LFxuICAgICAgdHMuU2NyaXB0VGFyZ2V0LkxhdGVzdCxcbiAgICAgIHRydWVcbiAgICApO1xuXG4gICAgY29uc3Qgc3RhdGVJbXBvcnRQYXRoID0gYnVpbGRSZWxhdGl2ZVBhdGgoY29tcG9uZW50UGF0aCwgc3RhdGVQYXRoKTtcbiAgICBjb25zdCBzdG9yZUltcG9ydCA9IGluc2VydEltcG9ydChcbiAgICAgIHNvdXJjZSxcbiAgICAgIGNvbXBvbmVudFBhdGgsXG4gICAgICAnU3RvcmUnLFxuICAgICAgJ0BuZ3J4L3N0b3JlJ1xuICAgICk7XG4gICAgY29uc3Qgc3RhdGVJbXBvcnQgPSBvcHRpb25zLnN0YXRlXG4gICAgICA/IGluc2VydEltcG9ydChcbiAgICAgICAgICBzb3VyY2UsXG4gICAgICAgICAgY29tcG9uZW50UGF0aCxcbiAgICAgICAgICBgKiBhcyBmcm9tU3RvcmVgLFxuICAgICAgICAgIHN0YXRlSW1wb3J0UGF0aCxcbiAgICAgICAgICB0cnVlXG4gICAgICAgIClcbiAgICAgIDogbmV3IE5vb3BDaGFuZ2UoKTtcblxuICAgIGNvbnN0IGNvbXBvbmVudENsYXNzID0gc291cmNlLnN0YXRlbWVudHMuZmluZChcbiAgICAgIHN0bSA9PiBzdG0ua2luZCA9PT0gdHMuU3ludGF4S2luZC5DbGFzc0RlY2xhcmF0aW9uXG4gICAgKTtcbiAgICBjb25zdCBjb21wb25lbnQgPSBjb21wb25lbnRDbGFzcyBhcyB0cy5DbGFzc0RlY2xhcmF0aW9uO1xuICAgIGNvbnN0IGNvbXBvbmVudENvbnN0cnVjdG9yID0gY29tcG9uZW50Lm1lbWJlcnMuZmluZChcbiAgICAgIG1lbWJlciA9PiBtZW1iZXIua2luZCA9PT0gdHMuU3ludGF4S2luZC5Db25zdHJ1Y3RvclxuICAgICk7XG4gICAgY29uc3QgY21wQ3RyID0gY29tcG9uZW50Q29uc3RydWN0b3IgYXMgdHMuQ29uc3RydWN0b3JEZWNsYXJhdGlvbjtcbiAgICBjb25zdCB7IHBvcyB9ID0gY21wQ3RyO1xuICAgIGNvbnN0IHN0YXRlVHlwZSA9IG9wdGlvbnMuc3RhdGVcbiAgICAgID8gYGZyb21TdG9yZS4ke29wdGlvbnMuc3RhdGVJbnRlcmZhY2V9YFxuICAgICAgOiAnYW55JztcbiAgICBjb25zdCBjb25zdHJ1Y3RvclRleHQgPSBjbXBDdHIuZ2V0VGV4dCgpO1xuICAgIGNvbnN0IFtzdGFydCwgZW5kXSA9IGNvbnN0cnVjdG9yVGV4dC5zcGxpdCgnKCknKTtcbiAgICBjb25zdCBzdG9yZVRleHQgPSBgcHJpdmF0ZSBzdG9yZTogU3RvcmU8JHtzdGF0ZVR5cGV9PmA7XG4gICAgY29uc3Qgc3RvcmVDb25zdHJ1Y3RvciA9IFtzdGFydCwgYCgke3N0b3JlVGV4dH0pYCwgZW5kXS5qb2luKCcnKTtcbiAgICBjb25zdCBjb25zdHJ1Y3RvclVwZGF0ZSA9IG5ldyBSZXBsYWNlQ2hhbmdlKFxuICAgICAgY29tcG9uZW50UGF0aCxcbiAgICAgIHBvcyxcbiAgICAgIGAgICR7Y29uc3RydWN0b3JUZXh0fVxcblxcbmAsXG4gICAgICBgXFxuXFxuICAke3N0b3JlQ29uc3RydWN0b3J9YFxuICAgICk7XG5cbiAgICBjb25zdCBjaGFuZ2VzID0gW3N0b3JlSW1wb3J0LCBzdGF0ZUltcG9ydCwgY29uc3RydWN0b3JVcGRhdGVdO1xuICAgIGNvbnN0IHJlY29yZGVyID0gaG9zdC5iZWdpblVwZGF0ZShjb21wb25lbnRQYXRoKTtcblxuICAgIGZvciAoY29uc3QgY2hhbmdlIG9mIGNoYW5nZXMpIHtcbiAgICAgIGlmIChjaGFuZ2UgaW5zdGFuY2VvZiBJbnNlcnRDaGFuZ2UpIHtcbiAgICAgICAgcmVjb3JkZXIuaW5zZXJ0TGVmdChjaGFuZ2UucG9zLCBjaGFuZ2UudG9BZGQpO1xuICAgICAgfSBlbHNlIGlmIChjaGFuZ2UgaW5zdGFuY2VvZiBSZXBsYWNlQ2hhbmdlKSB7XG4gICAgICAgIHJlY29yZGVyLnJlbW92ZShwb3MsIGNoYW5nZS5vbGRUZXh0Lmxlbmd0aCk7XG4gICAgICAgIHJlY29yZGVyLmluc2VydExlZnQoY2hhbmdlLm9yZGVyLCBjaGFuZ2UubmV3VGV4dCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaG9zdC5jb21taXRVcGRhdGUocmVjb3JkZXIpO1xuXG4gICAgcmV0dXJuIGhvc3Q7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG9wdGlvbnM6IENvbnRhaW5lck9wdGlvbnMpOiBSdWxlIHtcbiAgcmV0dXJuIChob3N0OiBUcmVlLCBjb250ZXh0OiBTY2hlbWF0aWNDb250ZXh0KSA9PiB7XG4gICAgb3B0aW9ucy5wYXRoID0gZ2V0UHJvamVjdFBhdGgoaG9zdCwgb3B0aW9ucyk7XG5cbiAgICBjb25zdCBwYXJzZWRQYXRoID0gcGFyc2VOYW1lKG9wdGlvbnMucGF0aCwgb3B0aW9ucy5uYW1lKTtcbiAgICBvcHRpb25zLm5hbWUgPSBwYXJzZWRQYXRoLm5hbWU7XG4gICAgb3B0aW9ucy5wYXRoID0gcGFyc2VkUGF0aC5wYXRoO1xuXG4gICAgY29uc3Qgb3B0cyA9IFsnc3RhdGUnLCAnc3RhdGVJbnRlcmZhY2UnXS5yZWR1Y2UoXG4gICAgICAoY3VycmVudDogUGFydGlhbDxDb250YWluZXJPcHRpb25zPiwga2V5KSA9PiB7XG4gICAgICAgIHJldHVybiBvbWl0KGN1cnJlbnQsIGtleSBhcyBhbnkpO1xuICAgICAgfSxcbiAgICAgIG9wdGlvbnNcbiAgICApO1xuXG4gICAgY29uc3QgdGVtcGxhdGVTb3VyY2UgPSBhcHBseSh1cmwoJy4vZmlsZXMnKSwgW1xuICAgICAgb3B0aW9ucy5zcGVjID8gbm9vcCgpIDogZmlsdGVyKHBhdGggPT4gIXBhdGguZW5kc1dpdGgoJ19fc3BlYy50cycpKSxcbiAgICAgIHRlbXBsYXRlKHtcbiAgICAgICAgJ2lmLWZsYXQnOiAoczogc3RyaW5nKSA9PiAob3B0aW9ucy5mbGF0ID8gJycgOiBzKSxcbiAgICAgICAgLi4uc3RyaW5nVXRpbHMsXG4gICAgICAgIC4uLihvcHRpb25zIGFzIG9iamVjdCksXG4gICAgICAgIGRvdDogKCkgPT4gJy4nLFxuICAgICAgfSBhcyBhbnkpLFxuICAgICAgbW92ZShwYXJzZWRQYXRoLnBhdGgpLFxuICAgIF0pO1xuXG4gICAgcmV0dXJuIGNoYWluKFtcbiAgICAgIGV4dGVybmFsU2NoZW1hdGljKCdAc2NoZW1hdGljcy9hbmd1bGFyJywgJ2NvbXBvbmVudCcsIHtcbiAgICAgICAgLi4ub3B0cyxcbiAgICAgICAgc3BlYzogZmFsc2UsXG4gICAgICB9KSxcbiAgICAgIGFkZFN0YXRlVG9Db21wb25lbnQob3B0aW9ucyksXG4gICAgICBtZXJnZVdpdGgodGVtcGxhdGVTb3VyY2UpLFxuICAgIF0pKGhvc3QsIGNvbnRleHQpO1xuICB9O1xufVxuIl19