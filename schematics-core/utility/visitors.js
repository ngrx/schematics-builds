(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@ngrx/schematics/schematics-core/utility/visitors", ["require", "exports", "typescript", "@angular-devkit/core"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const ts = require("typescript");
    const core_1 = require("@angular-devkit/core");
    function visitTSSourceFiles(tree, visitor) {
        let result = undefined;
        for (const sourceFile of visit(tree.root)) {
            result = visitor(sourceFile, tree, result);
        }
        return result;
    }
    exports.visitTSSourceFiles = visitTSSourceFiles;
    function visitTemplates(tree, visitor) {
        visitTSSourceFiles(tree, source => {
            visitComponents(source, (_, decoratorExpressionNode) => {
                ts.forEachChild(decoratorExpressionNode, function findTemplates(n) {
                    if (ts.isPropertyAssignment(n) && ts.isIdentifier(n.name)) {
                        if (n.name.text === 'template' &&
                            ts.isStringLiteralLike(n.initializer)) {
                            // Need to add an offset of one to the start because the template quotes are
                            // not part of the template content.
                            const templateStartIdx = n.initializer.getStart() + 1;
                            visitor({
                                fileName: source.fileName,
                                content: n.initializer.text,
                                inline: true,
                                start: templateStartIdx,
                            }, tree);
                            return;
                        }
                        else if (n.name.text === 'templateUrl' &&
                            ts.isStringLiteralLike(n.initializer)) {
                            const parts = core_1.normalize(source.fileName)
                                .split('/')
                                .slice(0, -1);
                            const templatePath = core_1.resolve(core_1.normalize(parts.join('/')), core_1.normalize(n.initializer.text));
                            if (!tree.exists(templatePath)) {
                                return;
                            }
                            const fileContent = tree.read(templatePath);
                            if (!fileContent) {
                                return;
                            }
                            visitor({
                                fileName: templatePath,
                                content: fileContent.toString(),
                                inline: false,
                                start: 0,
                            }, tree);
                            return;
                        }
                    }
                    ts.forEachChild(n, findTemplates);
                });
            });
        });
    }
    exports.visitTemplates = visitTemplates;
    function visitNgModuleImports(sourceFile, callback) {
        visitNgModuleProperty(sourceFile, callback, 'imports');
    }
    exports.visitNgModuleImports = visitNgModuleImports;
    function visitNgModuleExports(sourceFile, callback) {
        visitNgModuleProperty(sourceFile, callback, 'exports');
    }
    exports.visitNgModuleExports = visitNgModuleExports;
    function visitNgModuleProperty(sourceFile, callback, property) {
        visitNgModules(sourceFile, (_, decoratorExpressionNode) => {
            ts.forEachChild(decoratorExpressionNode, function findTemplates(n) {
                if (ts.isPropertyAssignment(n) &&
                    ts.isIdentifier(n.name) &&
                    n.name.text === property &&
                    ts.isArrayLiteralExpression(n.initializer)) {
                    callback(n, n.initializer.elements);
                    return;
                }
                ts.forEachChild(n, findTemplates);
            });
        });
    }
    function visitComponents(sourceFile, callback) {
        visitDecorator(sourceFile, 'Component', callback);
    }
    exports.visitComponents = visitComponents;
    function visitNgModules(sourceFile, callback) {
        visitDecorator(sourceFile, 'NgModule', callback);
    }
    exports.visitNgModules = visitNgModules;
    function visitDecorator(sourceFile, decoratorName, callback) {
        ts.forEachChild(sourceFile, function findClassDeclaration(node) {
            if (!ts.isClassDeclaration(node)) {
                ts.forEachChild(node, findClassDeclaration);
            }
            const classDeclarationNode = node;
            if (!classDeclarationNode.decorators ||
                !classDeclarationNode.decorators.length) {
                return;
            }
            const componentDecorator = classDeclarationNode.decorators.find(d => {
                return (ts.isCallExpression(d.expression) &&
                    ts.isIdentifier(d.expression.expression) &&
                    d.expression.expression.text === decoratorName);
            });
            if (!componentDecorator) {
                return;
            }
            const { expression } = componentDecorator;
            if (!ts.isCallExpression(expression)) {
                return;
            }
            const [arg] = expression.arguments;
            if (!ts.isObjectLiteralExpression(arg)) {
                return;
            }
            callback(classDeclarationNode, arg);
        });
    }
    exports.visitDecorator = visitDecorator;
    function* visit(directory) {
        for (const path of directory.subfiles) {
            if (path.endsWith('.ts') && !path.endsWith('.d.ts')) {
                const entry = directory.file(path);
                if (entry) {
                    const content = entry.content;
                    const source = ts.createSourceFile(entry.path, content.toString().replace(/^\uFEFF/, ''), ts.ScriptTarget.Latest, true);
                    yield source;
                }
            }
        }
        for (const path of directory.subdirs) {
            if (path === 'node_modules') {
                continue;
            }
            yield* visit(directory.dir(path));
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlzaXRvcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3NjaGVtYXRpY3Mvc2NoZW1hdGljcy1jb3JlL3V0aWxpdHkvdmlzaXRvcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7SUFBQSxpQ0FBaUM7SUFDakMsK0NBQTBEO0lBRzFELFNBQWdCLGtCQUFrQixDQUNoQyxJQUFVLEVBQ1YsT0FJdUI7UUFFdkIsSUFBSSxNQUFNLEdBQXVCLFNBQVMsQ0FBQztRQUMzQyxLQUFLLE1BQU0sVUFBVSxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDekMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxVQUFVLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1NBQzVDO1FBRUQsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQWRELGdEQWNDO0lBRUQsU0FBZ0IsY0FBYyxDQUM1QixJQUFVLEVBQ1YsT0FRUztRQUVULGtCQUFrQixDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNoQyxlQUFlLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxFQUFFLHVCQUF1QixFQUFFLEVBQUU7Z0JBQ3JELEVBQUUsQ0FBQyxZQUFZLENBQUMsdUJBQXVCLEVBQUUsU0FBUyxhQUFhLENBQUMsQ0FBQztvQkFDL0QsSUFBSSxFQUFFLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUU7d0JBQ3pELElBQ0UsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssVUFBVTs0QkFDMUIsRUFBRSxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsRUFDckM7NEJBQ0EsNEVBQTRFOzRCQUM1RSxvQ0FBb0M7NEJBQ3BDLE1BQU0sZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDLFdBQVcs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WUFFRCxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1NBQ25DO0lBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIHRzIGZyb20gJ3R5cGVzY3JpcHQnO1xuaW1wb3J0IHsgbm9ybWFsaXplLCByZXNvbHZlIH0gZnJvbSAnQGFuZ3VsYXItZGV2a2l0L2NvcmUnO1xuaW1wb3J0IHsgVHJlZSwgRGlyRW50cnkgfSBmcm9tICdAYW5ndWxhci1kZXZraXQvc2NoZW1hdGljcyc7XG5cbmV4cG9ydCBmdW5jdGlvbiB2aXNpdFRTU291cmNlRmlsZXM8UmVzdWx0ID0gdm9pZD4oXG4gIHRyZWU6IFRyZWUsXG4gIHZpc2l0b3I6IChcbiAgICBzb3VyY2VGaWxlOiB0cy5Tb3VyY2VGaWxlLFxuICAgIHRyZWU6IFRyZWUsXG4gICAgcmVzdWx0PzogUmVzdWx0XG4gICkgPT4gUmVzdWx0IHwgdW5kZWZpbmVkXG4pOiBSZXN1bHQgfCB1bmRlZmluZWQge1xuICBsZXQgcmVzdWx0OiBSZXN1bHQgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XG4gIGZvciAoY29uc3Qgc291cmNlRmlsZSBvZiB2aXNpdCh0cmVlLnJvb3QpKSB7XG4gICAgcmVzdWx0ID0gdmlzaXRvcihzb3VyY2VGaWxlLCB0cmVlLCByZXN1bHQpO1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHZpc2l0VGVtcGxhdGVzKFxuICB0cmVlOiBUcmVlLFxuICB2aXNpdG9yOiAoXG4gICAgdGVtcGxhdGU6IHtcbiAgICAgIGZpbGVOYW1lOiBzdHJpbmc7XG4gICAgICBjb250ZW50OiBzdHJpbmc7XG4gICAgICBpbmxpbmU6IGJvb2xlYW47XG4gICAgICBzdGFydDogbnVtYmVyO1xuICAgIH0sXG4gICAgdHJlZTogVHJlZVxuICApID0+IHZvaWRcbik6IHZvaWQge1xuICB2aXNpdFRTU291cmNlRmlsZXModHJlZSwgc291cmNlID0+IHtcbiAgICB2aXNpdENvbXBvbmVudHMoc291cmNlLCAoXywgZGVjb3JhdG9yRXhwcmVzc2lvbk5vZGUpID0+IHtcbiAgICAgIHRzLmZvckVhY2hDaGlsZChkZWNvcmF0b3JFeHByZXNzaW9uTm9kZSwgZnVuY3Rpb24gZmluZFRlbXBsYXRlcyhuKSB7XG4gICAgICAgIGlmICh0cy5pc1Byb3BlcnR5QXNzaWdubWVudChuKSAmJiB0cy5pc0lkZW50aWZpZXIobi5uYW1lKSkge1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIG4ubmFtZS50ZXh0ID09PSAndGVtcGxhdGUnICYmXG4gICAgICAgICAgICB0cy5pc1N0cmluZ0xpdGVyYWxMaWtlKG4uaW5pdGlhbGl6ZXIpXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICAvLyBOZWVkIHRvIGFkZCBhbiBvZmZzZXQgb2Ygb25lIHRvIHRoZSBzdGFydCBiZWNhdXNlIHRoZSB0ZW1wbGF0ZSBxdW90ZXMgYXJlXG4gICAgICAgICAgICAvLyBub3QgcGFydCBvZiB0aGUgdGVtcGxhdGUgY29udGVudC5cbiAgICAgICAgICAgIGNvbnN0IHRlbXBsYXRlU3RhcnRJZHggPSBuLmluaXRpYWxpemVyLmdldFN0YXJ0KCkgKyAxO1xuICAgICAgICAgICAgdmlzaXRvcihcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZpbGVOYW1lOiBzb3VyY2UuZmlsZU5hbWUsXG4gICAgICAgICAgICAgICAgY29udGVudDogbi5pbml0aWFsaXplci50ZXh0LFxuICAgICAgICAgICAgICAgIGlubGluZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBzdGFydDogdGVtcGxhdGVTdGFydElkeCxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgdHJlZVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgbi5uYW1lLnRleHQgPT09ICd0ZW1wbGF0ZVVybCcgJiZcbiAgICAgICAgICAgIHRzLmlzU3RyaW5nTGl0ZXJhbExpa2Uobi5pbml0aWFsaXplcilcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIGNvbnN0IHBhcnRzID0gbm9ybWFsaXplKHNvdXJjZS5maWxlTmFtZSlcbiAgICAgICAgICAgICAgLnNwbGl0KCcvJylcbiAgICAgICAgICAgICAgLnNsaWNlKDAsIC0xKTtcbiAgICAgICAgICAgIGNvbnN0IHRlbXBsYXRlUGF0aCA9IHJlc29sdmUoXG4gICAgICAgICAgICAgIG5vcm1hbGl6ZShwYXJ0cy5qb2luKCcvJykpLFxuICAgICAgICAgICAgICBub3JtYWxpemUobi5pbml0aWFsaXplci50ZXh0KVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGlmICghdHJlZS5leGlzdHModGVtcGxhdGVQYXRoKSkge1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IGZpbGVDb250ZW50ID0gdHJlZS5yZWFkKHRlbXBsYXRlUGF0aCk7XG4gICAgICAgICAgICBpZiAoIWZpbGVDb250ZW50KSB7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmlzaXRvcihcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZpbGVOYW1lOiB0ZW1wbGF0ZVBhdGgsXG4gICAgICAgICAgICAgICAgY29udGVudDogZmlsZUNvbnRlbnQudG9TdHJpbmcoKSxcbiAgICAgICAgICAgICAgICBpbmxpbmU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHN0YXJ0OiAwLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB0cmVlXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRzLmZvckVhY2hDaGlsZChuLCBmaW5kVGVtcGxhdGVzKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHZpc2l0TmdNb2R1bGVJbXBvcnRzKFxuICBzb3VyY2VGaWxlOiB0cy5Tb3VyY2VGaWxlLFxuICBjYWxsYmFjazogKFxuICAgIGltcG9ydE5vZGU6IHRzLlByb3BlcnR5QXNzaWdubWVudCxcbiAgICBlbGVtZW50RXhwcmVzc2lvbnM6IHRzLk5vZGVBcnJheTx0cy5FeHByZXNzaW9uPlxuICApID0+IHZvaWRcbikge1xuICB2aXNpdE5nTW9kdWxlUHJvcGVydHkoc291cmNlRmlsZSwgY2FsbGJhY2ssICdpbXBvcnRzJyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB2aXNpdE5nTW9kdWxlRXhwb3J0cyhcbiAgc291cmNlRmlsZTogdHMuU291cmNlRmlsZSxcbiAgY2FsbGJhY2s6IChcbiAgICBleHBvcnROb2RlOiB0cy5Qcm9wZXJ0eUFzc2lnbm1lbnQsXG4gICAgZWxlbWVudEV4cHJlc3Npb25zOiB0cy5Ob2RlQXJyYXk8dHMuRXhwcmVzc2lvbj5cbiAgKSA9PiB2b2lkXG4pIHtcbiAgdmlzaXROZ01vZHVsZVByb3BlcnR5KHNvdXJjZUZpbGUsIGNhbGxiYWNrLCAnZXhwb3J0cycpO1xufVxuXG5mdW5jdGlvbiB2aXNpdE5nTW9kdWxlUHJvcGVydHkoXG4gIHNvdXJjZUZpbGU6IHRzLlNvdXJjZUZpbGUsXG4gIGNhbGxiYWNrOiAoXG4gICAgbm9kZXM6IHRzLlByb3BlcnR5QXNzaWdubWVudCxcbiAgICBlbGVtZW50RXhwcmVzc2lvbnM6IHRzLk5vZGVBcnJheTx0cy5FeHByZXNzaW9uPlxuICApID0+IHZvaWQsXG4gIHByb3BlcnR5OiBzdHJpbmdcbikge1xuICB2aXNpdE5nTW9kdWxlcyhzb3VyY2VGaWxlLCAoXywgZGVjb3JhdG9yRXhwcmVzc2lvbk5vZGUpID0+IHtcbiAgICB0cy5mb3JFYWNoQ2hpbGQoZGVjb3JhdG9yRXhwcmVzc2lvbk5vZGUsIGZ1bmN0aW9uIGZpbmRUZW1wbGF0ZXMobikge1xuICAgICAgaWYgKFxuICAgICAgICB0cy5pc1Byb3BlcnR5QXNzaWdubWVudChuKSAmJlxuICAgICAgICB0cy5pc0lkZW50aWZpZXIobi5uYW1lKSAmJlxuICAgICAgICBuLm5hbWUudGV4dCA9PT0gcHJvcGVydHkgJiZcbiAgICAgICAgdHMuaXNBcnJheUxpdGVyYWxFeHByZXNzaW9uKG4uaW5pdGlhbGl6ZXIpXG4gICAgICApIHtcbiAgICAgICAgY2FsbGJhY2sobiwgbi5pbml0aWFsaXplci5lbGVtZW50cyk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdHMuZm9yRWFjaENoaWxkKG4sIGZpbmRUZW1wbGF0ZXMpO1xuICAgIH0pO1xuICB9KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiB2aXNpdENvbXBvbmVudHMoXG4gIHNvdXJjZUZpbGU6IHRzLlNvdXJjZUZpbGUsXG4gIGNhbGxiYWNrOiAoXG4gICAgY2xhc3NEZWNsYXJhdGlvbk5vZGU6IHRzLkNsYXNzRGVjbGFyYXRpb24sXG4gICAgZGVjb3JhdG9yRXhwcmVzc2lvbk5vZGU6IHRzLk9iamVjdExpdGVyYWxFeHByZXNzaW9uXG4gICkgPT4gdm9pZFxuKSB7XG4gIHZpc2l0RGVjb3JhdG9yKHNvdXJjZUZpbGUsICdDb21wb25lbnQnLCBjYWxsYmFjayk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB2aXNpdE5nTW9kdWxlcyhcbiAgc291cmNlRmlsZTogdHMuU291cmNlRmlsZSxcbiAgY2FsbGJhY2s6IChcbiAgICBjbGFzc0RlY2xhcmF0aW9uTm9kZTogdHMuQ2xhc3NEZWNsYXJhdGlvbixcbiAgICBkZWNvcmF0b3JFeHByZXNzaW9uTm9kZTogdHMuT2JqZWN0TGl0ZXJhbEV4cHJlc3Npb25cbiAgKSA9PiB2b2lkXG4pIHtcbiAgdmlzaXREZWNvcmF0b3Ioc291cmNlRmlsZSwgJ05nTW9kdWxlJywgY2FsbGJhY2spO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdmlzaXREZWNvcmF0b3IoXG4gIHNvdXJjZUZpbGU6IHRzLlNvdXJjZUZpbGUsXG4gIGRlY29yYXRvck5hbWU6IHN0cmluZyxcbiAgY2FsbGJhY2s6IChcbiAgICBjbGFzc0RlY2xhcmF0aW9uTm9kZTogdHMuQ2xhc3NEZWNsYXJhdGlvbixcbiAgICBkZWNvcmF0b3JFeHByZXNzaW9uTm9kZTogdHMuT2JqZWN0TGl0ZXJhbEV4cHJlc3Npb25cbiAgKSA9PiB2b2lkXG4pIHtcbiAgdHMuZm9yRWFjaENoaWxkKHNvdXJjZUZpbGUsIGZ1bmN0aW9uIGZpbmRDbGFzc0RlY2xhcmF0aW9uKG5vZGUpIHtcbiAgICBpZiAoIXRzLmlzQ2xhc3NEZWNsYXJhdGlvbihub2RlKSkge1xuICAgICAgdHMuZm9yRWFjaENoaWxkKG5vZGUsIGZpbmRDbGFzc0RlY2xhcmF0aW9uKTtcbiAgICB9XG5cbiAgICBjb25zdCBjbGFzc0RlY2xhcmF0aW9uTm9kZSA9IG5vZGUgYXMgdHMuQ2xhc3NEZWNsYXJhdGlvbjtcblxuICAgIGlmIChcbiAgICAgICFjbGFzc0RlY2xhcmF0aW9uTm9kZS5kZWNvcmF0b3JzIHx8XG4gICAgICAhY2xhc3NEZWNsYXJhdGlvbk5vZGUuZGVjb3JhdG9ycy5sZW5ndGhcbiAgICApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBjb21wb25lbnREZWNvcmF0b3IgPSBjbGFzc0RlY2xhcmF0aW9uTm9kZS5kZWNvcmF0b3JzLmZpbmQoZCA9PiB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICB0cy5pc0NhbGxFeHByZXNzaW9uKGQuZXhwcmVzc2lvbikgJiZcbiAgICAgICAgdHMuaXNJZGVudGlmaWVyKGQuZXhwcmVzc2lvbi5leHByZXNzaW9uKSAmJlxuICAgICAgICBkLmV4cHJlc3Npb24uZXhwcmVzc2lvbi50ZXh0ID09PSBkZWNvcmF0b3JOYW1lXG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgaWYgKCFjb21wb25lbnREZWNvcmF0b3IpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCB7IGV4cHJlc3Npb24gfSA9IGNvbXBvbmVudERlY29yYXRvcjtcbiAgICBpZiAoIXRzLmlzQ2FsbEV4cHJlc3Npb24oZXhwcmVzc2lvbikpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBbYXJnXSA9IGV4cHJlc3Npb24uYXJndW1lbnRzO1xuICAgIGlmICghdHMuaXNPYmplY3RMaXRlcmFsRXhwcmVzc2lvbihhcmcpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY2FsbGJhY2soY2xhc3NEZWNsYXJhdGlvbk5vZGUsIGFyZyk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiogdmlzaXQoZGlyZWN0b3J5OiBEaXJFbnRyeSk6IEl0ZXJhYmxlSXRlcmF0b3I8dHMuU291cmNlRmlsZT4ge1xuICBmb3IgKGNvbnN0IHBhdGggb2YgZGlyZWN0b3J5LnN1YmZpbGVzKSB7XG4gICAgaWYgKHBhdGguZW5kc1dpdGgoJy50cycpICYmICFwYXRoLmVuZHNXaXRoKCcuZC50cycpKSB7XG4gICAgICBjb25zdCBlbnRyeSA9IGRpcmVjdG9yeS5maWxlKHBhdGgpO1xuICAgICAgaWYgKGVudHJ5KSB7XG4gICAgICAgIGNvbnN0IGNvbnRlbnQgPSBlbnRyeS5jb250ZW50O1xuICAgICAgICBjb25zdCBzb3VyY2UgPSB0cy5jcmVhdGVTb3VyY2VGaWxlKFxuICAgICAgICAgIGVudHJ5LnBhdGgsXG4gICAgICAgICAgY29udGVudC50b1N0cmluZygpLnJlcGxhY2UoL15cXHVGRUZGLywgJycpLFxuICAgICAgICAgIHRzLlNjcmlwdFRhcmdldC5MYXRlc3QsXG4gICAgICAgICAgdHJ1ZVxuICAgICAgICApO1xuICAgICAgICB5aWVsZCBzb3VyY2U7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZm9yIChjb25zdCBwYXRoIG9mIGRpcmVjdG9yeS5zdWJkaXJzKSB7XG4gICAgaWYgKHBhdGggPT09ICdub2RlX21vZHVsZXMnKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICB5aWVsZCogdmlzaXQoZGlyZWN0b3J5LmRpcihwYXRoKSk7XG4gIH1cbn1cbiJdfQ==