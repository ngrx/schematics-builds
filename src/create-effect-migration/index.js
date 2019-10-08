(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@ngrx/schematics/src/create-effect-migration/index", ["require", "exports", "typescript", "@angular-devkit/schematics", "@ngrx/schematics/schematics-core"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const ts = require("typescript");
    const schematics_1 = require("@angular-devkit/schematics");
    const schematics_core_1 = require("@ngrx/schematics/schematics-core");
    function migrateToCreators() {
        return (host) => host.visit(path => {
            if (!path.endsWith('.ts')) {
                return;
            }
            const sourceFile = ts.createSourceFile(path, host.read(path).toString(), ts.ScriptTarget.Latest);
            if (sourceFile.isDeclarationFile) {
                return;
            }
            const effectsPerClass = sourceFile.statements
                .filter(ts.isClassDeclaration)
                .map(clas => clas.members
                .filter(ts.isPropertyDeclaration)
                .filter(property => property.decorators &&
                property.decorators.some(isEffectDecorator)));
            const effects = effectsPerClass.reduce((acc, effects) => acc.concat(effects), []);
            const createEffectsChanges = replaceEffectDecorators(host, path, effects);
            const importChanges = schematics_core_1.replaceImport(sourceFile, path, '@ngrx/effects', 'Effect', 'createEffect');
            return schematics_core_1.commitChanges(host, sourceFile.fileName, [
                ...importChanges,
                ...createEffectsChanges,
            ]);
        });
    }
    exports.migrateToCreators = migrateToCreators;
    function replaceEffectDecorators(host, path, effects) {
        const inserts = effects
            .filter(effect => !!effect.initializer)
            .map(effect => {
            const decorator = (effect.decorators || []).find(isEffectDecorator);
            const effectArguments = getDispatchProperties(host, path, decorator);
            const end = effectArguments ? `, ${effectArguments})` : ')';
            return [
                new schematics_core_1.InsertChange(path, effect.initializer.pos, ' createEffect(() =>'),
                new schematics_core_1.InsertChange(path, effect.initializer.end, end),
            ];
        })
            .reduce((acc, inserts) => acc.concat(inserts), []);
        const removes = effects
            .map(effect => effect.decorators)
            .filter(decorators => decorators)
            .map(decorators => {
            const effectDecorators = decorators.filter(isEffectDecorator);
            return effectDecorators.map(decorator => {
                return new schematics_core_1.RemoveChange(path, decorator.expression.pos - 1, // also get the @ sign
                decorator.expression.end);
            });
        })
            .reduce((acc, removes) => acc.concat(removes), []);
        return [...inserts, ...removes];
    }
    function isEffectDecorator(decorator) {
        return (ts.isCallExpression(decorator.expression) &&
            ts.isIdentifier(decorator.expression.expression) &&
            decorator.expression.expression.text === 'Effect');
    }
    function getDispatchProperties(host, path, decorator) {
        if (!decorator.expression || !ts.isCallExpression(decorator.expression)) {
            return '';
        }
        // just copy the effect properties
        const content = host.read(path).toString('utf8');
        const args = content
            .substring(decorator.expression.arguments.pos, decorator.expression.arguments.end)
            .trim();
        return args;
    }
    function default_1() {
        return schematics_1.chain([migrateToCreators()]);
    }
    exports.default = default_1;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3NjaGVtYXRpY3Mvc3JjL2NyZWF0ZS1lZmZlY3QtbWlncmF0aW9uL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0lBQUEsaUNBQWlDO0lBRWpDLDJEQUErRDtJQUMvRCxzRUFLMEM7SUFFMUMsU0FBZ0IsaUJBQWlCO1FBQy9CLE9BQU8sQ0FBQyxJQUFVLEVBQUUsRUFBRSxDQUNwQixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ2hCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUN6QixPQUFPO2FBQ1I7WUFFRCxNQUFNLFVBQVUsR0FBRyxFQUFFLENBQUMsZ0JBQWdCLENBQ3BDLElBQUksRUFDSixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBRSxDQUFDLFFBQVEsRUFBRSxFQUMzQixFQUFFLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FDdkIsQ0FBQztZQUVGLElBQUksVUFBVSxDQUFDLGlCQUFpQixFQUFFO2dCQUNoQyxPQUFPO2FBQ1I7WUFFRCxNQUFNLGVBQWUsR0FBRyxVQUFVLENBQUMsVUFBVTtpQkFDMUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQztpQkFDN0IsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQ1YsSUFBSSxDQUFDLE9BQU87aUJBQ1QsTUFBTSxDQUFDLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQztpQkFDaEMsTUFBTSxDQUNMLFFBQVEsQ0FBQyxFQUFFLENBQ1QsUUFBUSxDQUFDLFVBQVU7Z0JBQ25CLFFBQVEsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQzlDLENBQ0osQ0FBQztZQUVKLE1BQU0sT0FBTyxHQUFHLGVBQWUsQ0FBQyxNQUFNLENBQ3BDLENBQUMsR0FBRyxFQUFFLE9BQU8s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RCxTQUFTLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEtBQUssUUFBUSxDQUNsRCxDQUFDO0lBQ0osQ0FBQztJQUVELFNBQVMscUJBQXFCLENBQzVCLElBQVUsRUFDVixJQUFVLEVBQ1YsU0FBdUI7UUFFdkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLElBQUksQ0FBQyxFQUFFLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQ3ZFLE9BQU8sRUFBRSxDQUFDO1NBQ1g7UUFFRCxrQ0FBa0M7UUFDbEMsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbEQsTUFBTSxJQUFJLEdBQUcsT0FBTzthQUNqQixTQUFTLENBQ1IsU0FBUyxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUNsQyxTQUFTLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQ25DO2FBQ0EsSUFBSSxFQUFFLENBQUM7UUFDVixPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRDtRQUNFLE9BQU8sa0JBQUssQ0FBQyxDQUFDLGlCQUFpQixFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFGRCw0QkFFQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIHRzIGZyb20gJ3R5cGVzY3JpcHQnO1xuaW1wb3J0IHsgUGF0aCB9IGZyb20gJ0Bhbmd1bGFyLWRldmtpdC9jb3JlJztcbmltcG9ydCB7IFRyZWUsIFJ1bGUsIGNoYWluIH0gZnJvbSAnQGFuZ3VsYXItZGV2a2l0L3NjaGVtYXRpY3MnO1xuaW1wb3J0IHtcbiAgSW5zZXJ0Q2hhbmdlLFxuICBSZW1vdmVDaGFuZ2UsXG4gIHJlcGxhY2VJbXBvcnQsXG4gIGNvbW1pdENoYW5nZXMsXG59IGZyb20gJ0BuZ3J4L3NjaGVtYXRpY3Mvc2NoZW1hdGljcy1jb3JlJztcblxuZXhwb3J0IGZ1bmN0aW9uIG1pZ3JhdGVUb0NyZWF0b3JzKCk6IFJ1bGUge1xuICByZXR1cm4gKGhvc3Q6IFRyZWUpID0+XG4gICAgaG9zdC52aXNpdChwYXRoID0+IHtcbiAgICAgIGlmICghcGF0aC5lbmRzV2l0aCgnLnRzJykpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBzb3VyY2VGaWxlID0gdHMuY3JlYXRlU291cmNlRmlsZShcbiAgICAgICAgcGF0aCxcbiAgICAgICAgaG9zdC5yZWFkKHBhdGgpIS50b1N0cmluZygpLFxuICAgICAgICB0cy5TY3JpcHRUYXJnZXQuTGF0ZXN0XG4gICAgICApO1xuXG4gICAgICBpZiAoc291cmNlRmlsZS5pc0RlY2xhcmF0aW9uRmlsZSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGVmZmVjdHNQZXJDbGFzcyA9IHNvdXJjZUZpbGUuc3RhdGVtZW50c1xuICAgICAgICAuZmlsdGVyKHRzLmlzQ2xhc3NEZWNsYXJhdGlvbilcbiAgICAgICAgLm1hcChjbGFzID0+XG4gICAgICAgICAgY2xhcy5tZW1iZXJzXG4gICAgICAgICAgICAuZmlsdGVyKHRzLmlzUHJvcGVydHlEZWNsYXJhdGlvbilcbiAgICAgICAgICAgIC5maWx0ZXIoXG4gICAgICAgICAgICAgIHByb3BlcnR5ID0+XG4gICAgICAgICAgICAgICAgcHJvcGVydHkuZGVjb3JhdG9ycyAmJlxuICAgICAgICAgICAgICAgIHByb3BlcnR5LmRlY29yYXRvcnMuc29tZShpc0VmZmVjdERlY29yYXRvcilcbiAgICAgICAgICAgIClcbiAgICAgICAgKTtcblxuICAgICAgY29uc3QgZWZmZWN0cyA9IGVmZmVjdHNQZXJDbGFzcy5yZWR1Y2UoXG4gICAgICAgIChhY2MsIGVmZmVjdHMpID0+IGFjYy5jb25jYXQoZWZmZWN0cyksXG4gICAgICAgIFtdXG4gICAgICApO1xuXG4gICAgICBjb25zdCBjcmVhdGVFZmZlY3RzQ2hhbmdlcyA9IHJlcGxhY2VFZmZlY3REZWNvcmF0b3JzKGhvc3QsIHBhdGgsIGVmZmVjdHMpO1xuICAgICAgY29uc3QgaW1wb3J0Q2hhbmdlcyA9IHJlcGxhY2VJbXBvcnQoXG4gICAgICAgIHNvdXJjZUZpbGUsXG4gICAgICAgIHBhdGgsXG4gICAgICAgICdAbmdyeC9lZmZlY3RzJyxcbiAgICAgICAgJ0VmZmVjdCcsXG4gICAgICAgICdjcmVhdGVFZmZlY3QnXG4gICAgICApO1xuXG4gICAgICByZXR1cm4gY29tbWl0Q2hhbmdlcyhob3N0LCBzb3VyY2VGaWxlLmZpbGVOYW1lLCBbXG4gICAgICAgIC4uLmltcG9ydENoYW5nZXMsXG4gICAgICAgIC4uLmNyZWF0ZUVmZmVjdHNDaGFuZ2VzLFxuICAgICAgXSk7XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIHJlcGxhY2VFZmZlY3REZWNvcmF0b3JzKFxuICBob3N0OiBUcmVlLFxuICBwYXRoOiBQYXRoLFxuICBlZmZlY3RzOiB0cy5Qcm9wZXJ0eURlY2xhcmF0aW9uW11cbikge1xuICBjb25zdCBpbnNlcnRzID0gZWZmZWN0c1xuICAgIC5maWx0ZXIoZWZmZWN0ID0+ICEhZWZmZWN0LmluaXRpYWxpemVyKVxuICAgIC5tYXAoZWZmZWN0ID0+IHtcbiAgICAgIGNvbnN0IGRlY29yYXRvciA9IChlZmZlY3QuZGVjb3JhdG9ycyB8fCBbXSkuZmluZChpc0VmZmVjdERlY29yYXRvcikhO1xuICAgICAgY29uc3QgZWZmZWN0QXJndW1lbnRzID0gZ2V0RGlzcGF0Y2hQcm9wZXJ0aWVzKGhvc3QsIHBhdGgsIGRlY29yYXRvcik7XG4gICAgICBjb25zdCBlbmQgPSBlZmZlY3RBcmd1bWVudHMgPyBgLCAke2VmZmVjdEFyZ3VtZW50c30pYCA6ICcpJztcblxuICAgICAgcmV0dXJuIFtcbiAgICAgICAgbmV3IEluc2VydENoYW5nZShwYXRoLCBlZmZlY3QuaW5pdGlhbGl6ZXIhLnBvcywgJyBjcmVhdGVFZmZlY3QoKCkgPT4nKSxcbiAgICAgICAgbmV3IEluc2VydENoYW5nZShwYXRoLCBlZmZlY3QuaW5pdGlhbGl6ZXIhLmVuZCwgZW5kKSxcbiAgICAgIF07XG4gICAgfSlcbiAgICAucmVkdWNlKChhY2MsIGluc2VydHMpID0+IGFjYy5jb25jYXQoaW5zZXJ0cyksIFtdKTtcblxuICBjb25zdCByZW1vdmVzID0gZWZmZWN0c1xuICAgIC5tYXAoZWZmZWN0ID0+IGVmZmVjdC5kZWNvcmF0b3JzKVxuICAgIC5maWx0ZXIoZGVjb3JhdG9ycyA9PiBkZWNvcmF0b3JzKVxuICAgIC5tYXAoZGVjb3JhdG9ycyA9PiB7XG4gICAgICBjb25zdCBlZmZlY3REZWNvcmF0b3JzID0gZGVjb3JhdG9ycyEuZmlsdGVyKGlzRWZmZWN0RGVjb3JhdG9yKTtcbiAgICAgIHJldHVybiBlZmZlY3REZWNvcmF0b3JzLm1hcChkZWNvcmF0b3IgPT4ge1xuICAgICAgICByZXR1cm4gbmV3IFJlbW92ZUNoYW5nZShcbiAgICAgICAgICBwYXRoLFxuICAgICAgICAgIGRlY29yYXRvci5leHByZXNzaW9uLnBvcyAtIDEsIC8vIGFsc28gZ2V0IHRoZSBAIHNpZ25cbiAgICAgICAgICBkZWNvcmF0b3IuZXhwcmVzc2lvbi5lbmRcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICAgIH0pXG4gICAgLnJlZHVjZSgoYWNjLCByZW1vdmVzKSA9PiBhY2MuY29uY2F0KHJlbW92ZXMpLCBbXSk7XG5cbiAgcmV0dXJuIFsuLi5pbnNlcnRzLCAuLi5yZW1vdmVzXTtcbn1cblxuZnVuY3Rpb24gaXNFZmZlY3REZWNvcmF0b3IoZGVjb3JhdG9yOiB0cy5EZWNvcmF0b3IpIHtcbiAgcmV0dXJuIChcbiAgICB0cy5pc0NhbGxFeHByZXNzaW9uKGRlY29yYXRvci5leHByZXNzaW9uKSAmJlxuICAgIHRzLmlzSWRlbnRpZmllcihkZWNvcmF0b3IuZXhwcmVzc2lvbi5leHByZXNzaW9uKSAmJlxuICAgIGRlY29yYXRvci5leHByZXNzaW9uLmV4cHJlc3Npb24udGV4dCA9PT0gJ0VmZmVjdCdcbiAgKTtcbn1cblxuZnVuY3Rpb24gZ2V0RGlzcGF0Y2hQcm9wZXJ0aWVzKFxuICBob3N0OiBUcmVlLFxuICBwYXRoOiBQYXRoLFxuICBkZWNvcmF0b3I6IHRzLkRlY29yYXRvclxuKSB7XG4gIGlmICghZGVjb3JhdG9yLmV4cHJlc3Npb24gfHwgIXRzLmlzQ2FsbEV4cHJlc3Npb24oZGVjb3JhdG9yLmV4cHJlc3Npb24pKSB7XG4gICAgcmV0dXJuICcnO1xuICB9XG5cbiAgLy8ganVzdCBjb3B5IHRoZSBlZmZlY3QgcHJvcGVydGllc1xuICBjb25zdCBjb250ZW50ID0gaG9zdC5yZWFkKHBhdGgpIS50b1N0cmluZygndXRmOCcpO1xuICBjb25zdCBhcmdzID0gY29udGVudFxuICAgIC5zdWJzdHJpbmcoXG4gICAgICBkZWNvcmF0b3IuZXhwcmVzc2lvbi5hcmd1bWVudHMucG9zLFxuICAgICAgZGVjb3JhdG9yLmV4cHJlc3Npb24uYXJndW1lbnRzLmVuZFxuICAgIClcbiAgICAudHJpbSgpO1xuICByZXR1cm4gYXJncztcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKTogUnVsZSB7XG4gIHJldHVybiBjaGFpbihbbWlncmF0ZVRvQ3JlYXRvcnMoKV0pO1xufVxuIl19