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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3NjaGVtYXRpY3Mvc3JjL2NvbnRhaW5lci9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFBQSx5REFjb0M7SUFDcEMsK0JBQWlDO0lBQ2pDLDBFQVUwQztJQUcxQyw2QkFBNkIsT0FBeUI7UUFDcEQsTUFBTSxDQUFDLFVBQUMsSUFBVTtZQUNoQixFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztnQkFDOUMsTUFBTSxDQUFDLElBQUksQ0FBQztZQUNkLENBQUM7WUFFRCxJQUFNLFNBQVMsR0FBRyxNQUFJLE9BQU8sQ0FBQyxJQUFJLFNBQUksT0FBTyxDQUFDLEtBQU8sQ0FBQztZQUV0RCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDbEIsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDNUIsTUFBTSxJQUFJLEtBQUssQ0FBQyw4QkFBNEIsU0FBUyxvQkFBaUIsQ0FBQyxDQUFDO2dCQUMxRSxDQUFDO1lBQ0gsQ0FBQztZQUVELElBQU0sYUFBYSxHQUNqQixNQUFJLE9BQU8sQ0FBQyxJQUFJLE1BQUc7Z0JBQ25CLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyw2QkFBVyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDO2dCQUMvRCw2QkFBVyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO2dCQUNuQyxlQUFlLENBQUM7WUFFbEIsSUFBTSxJ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USxDQUFDLFdBQVcsQ0FBQyxFQUEzQixDQUEyQixDQUFDO2dCQUNuRSxxQkFBUSxDQUFDLFdBQ1AsU0FBUyxFQUFFLFVBQUMsQ0FBUyxJQUFLLE9BQUEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUF2QixDQUF1QixJQUM5Qyw2QkFBVyxFQUNWLE9BQWtCLElBQ3RCLEdBQUcsRUFBRSxjQUFNLE9BQUEsR0FBRyxFQUFILENBQUcsR0FDUixDQUFDO2dCQUNULGlCQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQzthQUN0QixDQUFDLENBQUM7WUFFSCxNQUFNLENBQUMsa0JBQUssQ0FBQztnQkFDWCw4QkFBaUIsQ0FBQyxxQkFBcUIsRUFBRSxXQUFXLGVBQy9DLElBQUksSUFDUCxJQUFJLEVBQUUsS0FBSyxJQUNYO2dCQUNGLG1CQUFtQixDQUFDLE9BQU8sQ0FBQztnQkFDNUIsc0JBQVMsQ0FBQyxjQUFjLENBQUM7YUFDMUIsQ0FBQyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNwQixDQUFDLENBQUM7SUFDSixDQUFDO0lBbkNELDRCQW1DQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIFJ1bGUsXG4gIFNjaGVtYXRpY0NvbnRleHQsXG4gIFNjaGVtYXRpY3NFeGNlcHRpb24sXG4gIFRyZWUsXG4gIGNoYWluLFxuICBleHRlcm5hbFNjaGVtYXRpYyxcbiAgYXBwbHksXG4gIHVybCxcbiAgbm9vcCxcbiAgZmlsdGVyLFxuICB0ZW1wbGF0ZSxcbiAgbW92ZSxcbiAgbWVyZ2VXaXRoLFxufSBmcm9tICdAYW5ndWxhci1kZXZraXQvc2NoZW1hdGljcyc7XG5pbXBvcnQgKiBhcyB0cyBmcm9tICd0eXBlc2NyaXB0JztcbmltcG9ydCB7XG4gIHN0cmluZ1V0aWxzLFxuICBidWlsZFJlbGF0aXZlUGF0aCxcbiAgaW5zZXJ0SW1wb3J0LFxuICBOb29wQ2hhbmdlLFxuICBSZXBsYWNlQ2hhbmdlLFxuICBJbnNlcnRDaGFuZ2UsXG4gIGdldFByb2plY3RQYXRoLFxuICBvbWl0LFxuICBwYXJzZU5hbWUsXG59IGZyb20gJ0BuZ3J4L3NjaGVtYXRpY3Mvc2NoZW1hdGljcy1jb3JlJztcbmltcG9ydCB7IFNjaGVtYSBhcyBDb250YWluZXJPcHRpb25zIH0gZnJvbSAnLi9zY2hlbWEnO1xuXG5mdW5jdGlvbiBhZGRTdGF0ZVRvQ29tcG9uZW50KG9wdGlvbnM6IENvbnRhaW5lck9wdGlvbnMpIHtcbiAgcmV0dXJuIChob3N0OiBUcmVlKSA9PiB7XG4gICAgaWYgKCFvcHRpb25zLnN0YXRlICYmICFvcHRpb25zLnN0YXRlSW50ZXJmYWNlKSB7XG4gICAgICByZXR1cm4gaG9zdDtcbiAgICB9XG5cbiAgICBjb25zdCBzdGF0ZVBhdGggPSBgLyR7b3B0aW9ucy5wYXRofS8ke29wdGlvbnMuc3RhdGV9YDtcblxuICAgIGlmIChvcHRpb25zLnN0YXRlKSB7XG4gICAgICBpZiAoIWhvc3QuZXhpc3RzKHN0YXRlUGF0aCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBUaGUgU3BlY2lmaWVkIHN0YXRlIHBhdGggJHtzdGF0ZVBhdGh9IGRvZXMgbm90IGV4aXN0YCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgY29tcG9uZW50UGF0aCA9XG4gICAgICBgLyR7b3B0aW9ucy5wYXRofS9gICtcbiAgICAgIChvcHRpb25zLmZsYXQgPyAnJyA6IHN0cmluZ1V0aWxzLmRhc2hlcml6ZShvcHRpb25zLm5hbWUpICsgJy8nKSArXG4gICAgICBzdHJpbmdVdGlscy5kYXNoZXJpemUob3B0aW9ucy5uYW1lKSArXG4gICAgICAnLmNvbXBvbmVudC50cyc7XG5cbiAgICBjb25zdCB0ZXh0ID0gaG9zdC5yZWFkKGNvbXBvbmVudFBhdGgpO1xuXG4gICAgaWYgKHRleHQgPT09IG51bGwpIHtcbiAgICAgIHRocm93IG5ldyBTY2hlbWF0aWNzRXhjZXB0aW9uKGBGaWxlICR7Y29tcG9uZW50UGF0aH0gZG9lcyBub3QgZXhpc3QuYCk7XG4gICAgfVxuXG4gICAgY29uc3Qgc291cmNlVGV4dCA9IHRleHQudG9TdHJpbmcoJ3V0Zi04Jyk7XG5cbiAgICBjb25zdCBzb3VyY2UgPSB0cy5jcmVhdGVTb3VyY2VGaWxlKFxuICAgICAgY29tcG9uZW50UGF0aCxcbiAgICAgIHNvdXJjZVRleHQsXG4gICAgICB0cy5TY3JpcHRUYXJnZXQuTGF0ZXN0LFxuICAgICAgdHJ1ZVxuICAgICk7XG5cbiAgICBjb25zdCBzdGF0ZUltcG9ydFBhdGggPSBidWlsZFJlbGF0aXZlUGF0aChjb21wb25lbnRQYXRoLCBzdGF0ZVBhdGgpO1xuICAgIGNvbnN0IHN0b3JlSW1wb3J0ID0gaW5zZXJ0SW1wb3J0KFxuICAgICAgc291cmNlLFxuICAgICAgY29tcG9uZW50UGF0aCxcbiAgICAgICdTdG9yZScsXG4gICAgICAnQG5ncngvc3RvcmUnXG4gICAgKTtcbiAgICBjb25zdCBzdGF0ZUltcG9ydCA9IG9wdGlvbnMuc3RhdGVcbiAgICAgID8gaW5zZXJ0SW1wb3J0KFxuICAgICAgICAgIHNvdXJjZSxcbiAgICAgICAgICBjb21wb25lbnRQYXRoLFxuICAgICAgICAgIGAqIGFzIGZyb21TdG9yZWAsXG4gICAgICAgICAgc3RhdGVJbXBvcnRQYXRoLFxuICAgICAgICAgIHRydWVcbiAgICAgICAgKVxuICAgICAgOiBuZXcgTm9vcENoYW5nZSgpO1xuXG4gICAgY29uc3QgY29tcG9uZW50Q2xhc3MgPSBzb3VyY2Uuc3RhdGVtZW50cy5maW5kKFxuICAgICAgc3RtID0+IHN0bS5raW5kID09PSB0cy5TeW50YXhLaW5kLkNsYXNzRGVjbGFyYXRpb25cbiAgICApO1xuICAgIGNvbnN0IGNvbXBvbmVudCA9IGNvbXBvbmVudENsYXNzIGFzIHRzLkNsYXNzRGVjbGFyYXRpb247XG4gICAgY29uc3QgY29tcG9uZW50Q29uc3RydWN0b3IgPSBjb21wb25lbnQubWVtYmVycy5maW5kKFxuICAgICAgbWVtYmVyID0+IG1lbWJlci5raW5kID09PSB0cy5TeW50YXhLaW5kLkNvbnN0cnVjdG9yXG4gICAgKTtcbiAgICBjb25zdCBjbXBDdHIgPSBjb21wb25lbnRDb25zdHJ1Y3RvciBhcyB0cy5Db25zdHJ1Y3RvckRlY2xhcmF0aW9uO1xuICAgIGNvbnN0IHsgcG9zIH0gPSBjbXBDdHI7XG4gICAgY29uc3Qgc3RhdGVUeXBlID0gb3B0aW9ucy5zdGF0ZVxuICAgICAgPyBgZnJvbVN0b3JlLiR7b3B0aW9ucy5zdGF0ZUludGVyZmFjZX1gXG4gICAgICA6ICdhbnknO1xuICAgIGNvbnN0IGNvbnN0cnVjdG9yVGV4dCA9IGNtcEN0ci5nZXRUZXh0KCk7XG4gICAgY29uc3QgW3N0YXJ0LCBlbmRdID0gY29uc3RydWN0b3JUZXh0LnNwbGl0KCcoKScpO1xuICAgIGNvbnN0IHN0b3JlVGV4dCA9IGBwcml2YXRlIHN0b3JlOiBTdG9yZTwke3N0YXRlVHlwZX0+YDtcbiAgICBjb25zdCBzdG9yZUNvbnN0cnVjdG9yID0gW3N0YXJ0LCBgKCR7c3RvcmVUZXh0fSlgLCBlbmRdLmpvaW4oJycpO1xuICAgIGNvbnN0IGNvbnN0cnVjdG9yVXBkYXRlID0gbmV3IFJlcGxhY2VDaGFuZ2UoXG4gICAgICBjb21wb25lbnRQYXRoLFxuICAgICAgcG9zLFxuICAgICAgYCAgJHtjb25zdHJ1Y3RvclRleHR9XFxuXFxuYCxcbiAgICAgIGBcXG5cXG4gICR7c3RvcmVDb25zdHJ1Y3Rvcn1gXG4gICAgKTtcblxuICAgIGNvbnN0IGNoYW5nZXMgPSBbc3RvcmVJbXBvcnQsIHN0YXRlSW1wb3J0LCBjb25zdHJ1Y3RvclVwZGF0ZV07XG4gICAgY29uc3QgcmVjb3JkZXIgPSBob3N0LmJlZ2luVXBkYXRlKGNvbXBvbmVudFBhdGgpO1xuXG4gICAgZm9yIChjb25zdCBjaGFuZ2Ugb2YgY2hhbmdlcykge1xuICAgICAgaWYgKGNoYW5nZSBpbnN0YW5jZW9mIEluc2VydENoYW5nZSkge1xuICAgICAgICByZWNvcmRlci5pbnNlcnRMZWZ0KGNoYW5nZS5wb3MsIGNoYW5nZS50b0FkZCk7XG4gICAgICB9IGVsc2UgaWYgKGNoYW5nZSBpbnN0YW5jZW9mIFJlcGxhY2VDaGFuZ2UpIHtcbiAgICAgICAgcmVjb3JkZXIucmVtb3ZlKHBvcywgY2hhbmdlLm9sZFRleHQubGVuZ3RoKTtcbiAgICAgICAgcmVjb3JkZXIuaW5zZXJ0TGVmdChjaGFuZ2Uub3JkZXIsIGNoYW5nZS5uZXdUZXh0KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBob3N0LmNvbW1pdFVwZGF0ZShyZWNvcmRlcik7XG5cbiAgICByZXR1cm4gaG9zdDtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24ob3B0aW9uczogQ29udGFpbmVyT3B0aW9ucyk6IFJ1bGUge1xuICByZXR1cm4gKGhvc3Q6IFRyZWUsIGNvbnRleHQ6IFNjaGVtYXRpY0NvbnRleHQpID0+IHtcbiAgICBvcHRpb25zLnBhdGggPSBnZXRQcm9qZWN0UGF0aChob3N0LCBvcHRpb25zKTtcblxuICAgIGNvbnN0IHBhcnNlZFBhdGggPSBwYXJzZU5hbWUob3B0aW9ucy5wYXRoLCBvcHRpb25zLm5hbWUpO1xuICAgIG9wdGlvbnMubmFtZSA9IHBhcnNlZFBhdGgubmFtZTtcbiAgICBvcHRpb25zLnBhdGggPSBwYXJzZWRQYXRoLnBhdGg7XG5cbiAgICBjb25zdCBvcHRzID0gWydzdGF0ZScsICdzdGF0ZUludGVyZmFjZSddLnJlZHVjZShcbiAgICAgIChjdXJyZW50OiBQYXJ0aWFsPENvbnRhaW5lck9wdGlvbnM+LCBrZXkpID0+IHtcbiAgICAgICAgcmV0dXJuIG9taXQoY3VycmVudCwga2V5IGFzIGFueSk7XG4gICAgICB9LFxuICAgICAgb3B0aW9uc1xuICAgICk7XG5cbiAgICBjb25zdCB0ZW1wbGF0ZVNvdXJjZSA9IGFwcGx5KHVybCgnLi9maWxlcycpLCBbXG4gICAgICBvcHRpb25zLnNwZWMgPyBub29wKCkgOiBmaWx0ZXIocGF0aCA9PiAhcGF0aC5lbmRzV2l0aCgnX19zcGVjLnRzJykpLFxuICAgICAgdGVtcGxhdGUoe1xuICAgICAgICAnaWYtZmxhdCc6IChzOiBzdHJpbmcpID0+IChvcHRpb25zLmZsYXQgPyAnJyA6IHMpLFxuICAgICAgICAuLi5zdHJpbmdVdGlscyxcbiAgICAgICAgLi4uKG9wdGlvbnMgYXMgb2JqZWN0KSxcbiAgICAgICAgZG90OiAoKSA9PiAnLicsXG4gICAgICB9IGFzIGFueSksXG4gICAgICBtb3ZlKHBhcnNlZFBhdGgucGF0aCksXG4gICAgXSk7XG5cbiAgICByZXR1cm4gY2hhaW4oW1xuICAgICAgZXh0ZXJuYWxTY2hlbWF0aWMoJ0BzY2hlbWF0aWNzL2FuZ3VsYXInLCAnY29tcG9uZW50Jywge1xuICAgICAgICAuLi5vcHRzLFxuICAgICAgICBzcGVjOiBmYWxzZSxcbiAgICAgIH0pLFxuICAgICAgYWRkU3RhdGVUb0NvbXBvbmVudChvcHRpb25zKSxcbiAgICAgIG1lcmdlV2l0aCh0ZW1wbGF0ZVNvdXJjZSksXG4gICAgXSkoaG9zdCwgY29udGV4dCk7XG4gIH07XG59XG4iXX0=