(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@ngrx/schematics/schematics-core", ["require", "exports", "@ngrx/schematics/schematics-core/utility/strings", "@ngrx/schematics/schematics-core/utility/angular-utils", "@ngrx/schematics/schematics-core/utility/ast-utils", "@ngrx/schematics/schematics-core/utility/change", "@ngrx/schematics/schematics-core/utility/config", "@ngrx/schematics/schematics-core/utility/find-module", "@ngrx/schematics/schematics-core/utility/json-utilts", "@ngrx/schematics/schematics-core/utility/ngrx-utils", "@ngrx/schematics/schematics-core/utility/project", "@ngrx/schematics/schematics-core/utility/update", "@ngrx/schematics/schematics-core/utility/parse-name", "@ngrx/schematics/schematics-core/utility/package", "@ngrx/schematics/schematics-core/utility/libs-version", "@ngrx/schematics/schematics-core/utility/visitors"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const strings_1 = require("@ngrx/schematics/schematics-core/utility/strings");
    var angular_utils_1 = require("@ngrx/schematics/schematics-core/utility/angular-utils");
    exports.isIvyEnabled = angular_utils_1.isIvyEnabled;
    var ast_utils_1 = require("@ngrx/schematics/schematics-core/utility/ast-utils");
    exports.findNodes = ast_utils_1.findNodes;
    exports.getSourceNodes = ast_utils_1.getSourceNodes;
    exports.getDecoratorMetadata = ast_utils_1.getDecoratorMetadata;
    exports.getContentOfKeyLiteral = ast_utils_1.getContentOfKeyLiteral;
    exports.insertAfterLastOccurrence = ast_utils_1.insertAfterLastOccurrence;
    exports.insertImport = ast_utils_1.insertImport;
    exports.addBootstrapToModule = ast_utils_1.addBootstrapToModule;
    exports.addDeclarationToModule = ast_utils_1.addDeclarationToModule;
    exports.addExportToModule = ast_utils_1.addExportToModule;
    exports.addImportToModule = ast_utils_1.addImportToModule;
    exports.addProviderToModule = ast_utils_1.addProviderToModule;
    exports.replaceImport = ast_utils_1.replaceImport;
    exports.containsProperty = ast_utils_1.containsProperty;
    var change_1 = require("@ngrx/schematics/schematics-core/utility/change");
    exports.NoopChange = change_1.NoopChange;
    exports.InsertChange = change_1.InsertChange;
    exports.RemoveChange = change_1.RemoveChange;
    exports.ReplaceChange = change_1.ReplaceChange;
    exports.createReplaceChange = change_1.createReplaceChange;
    exports.createChangeRecorder = change_1.createChangeRecorder;
    exports.commitChanges = change_1.commitChanges;
    var config_1 = require("@ngrx/schematics/schematics-core/utility/config");
    exports.getWorkspace = config_1.getWorkspace;
    exports.getWorkspacePath = config_1.getWorkspacePath;
    var find_module_1 = require("@ngrx/schematics/schematics-core/utility/find-module");
    exports.findModule = find_module_1.findModule;
    exports.findModuleFromOptions = find_module_1.findModuleFromOptions;
    exports.buildRelativePath = find_module_1.buildRelativePath;
    var json_utilts_1 = require("@ngrx/schematics/schematics-core/utility/json-utilts");
    exports.findPropertyInAstObject = json_utilts_1.findPropertyInAstObject;
    var ngrx_utils_1 = require("@ngrx/schematics/schematics-core/utility/ngrx-utils");
    exports.addReducerToState = ngrx_utils_1.addReducerToState;
    exports.addReducerToStateInterface = ngrx_utils_1.addReducerToStateInterface;
    exports.addReducerImportToNgModule = ngrx_utils_1.addReducerImportToNgModule;
    exports.addReducerToActionReducerMap = ngrx_utils_1.addReducerToActionReducerMap;
    exports.omit = ngrx_utils_1.omit;
    var project_1 = require("@ngrx/schematics/schematics-core/utility/project");
    exports.getProjectPath = project_1.getProjectPath;
    exports.getProject = project_1.getProject;
    exports.isLib = project_1.isLib;
    exports.stringUtils = {
        dasherize: strings_1.dasherize,
        decamelize: strings_1.decamelize,
        camelize: strings_1.camelize,
        classify: strings_1.classify,
        underscore: strings_1.underscore,
        group: strings_1.group,
        capitalize: strings_1.capitalize,
        featurePath: strings_1.featurePath,
        pluralize: strings_1.pluralize,
    };
    var update_1 = require("@ngrx/schematics/schematics-core/utility/update");
    exports.updatePackage = update_1.updatePackage;
    var parse_name_1 = require("@ngrx/schematics/schematics-core/utility/parse-name");
    exports.parseName = parse_name_1.parseName;
    var package_1 = require("@ngrx/schematics/schematics-core/utility/package");
    exports.addPackageToPackageJson = package_1.addPackageToPackageJson;
    var libs_version_1 = require("@ngrx/schematics/schematics-core/utility/libs-version");
    exports.platformVersion = libs_version_1.platformVersion;
    var visitors_1 = require("@ngrx/schematics/schematics-core/utility/visitors");
    exports.visitTSSourceFiles = visitors_1.visitTSSourceFiles;
    exports.visitNgModuleImports = visitors_1.visitNgModuleImports;
    exports.visitNgModuleExports = visitors_1.visitNgModuleExports;
    exports.visitComponents = visitors_1.visitComponents;
    exports.visitDecorator = visitors_1.visitDecorator;
    exports.visitNgModules = visitors_1.visitNgModules;
    exports.visitTemplates = visitors_1.visitTemplates;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3NjaGVtYXRpY3Mvc2NoZW1hdGljcy1jb3JlL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0lBQUEsOEVBVTJCO0lBRTNCLHdGQUF1RDtJQUE5Qyx1Q0FBQSxZQUFZLENBQUE7SUFFckIsZ0ZBYzZCO0lBYjNCLGdDQUFBLFNBQVMsQ0FBQTtJQUNULHFDQUFBLGNBQWMsQ0FBQTtJQUNkLDJDQUFBLG9CQUFvQixDQUFBO0lBQ3BCLDZDQUFBLHNCQUFzQixDQUFBO0lBQ3RCLGdEQUFBLHlCQUF5QixDQUFBO0lBQ3pCLG1DQUFBLFlBQVksQ0FBQTtJQUNaLDJDQUFBLG9CQUFvQixDQUFBO0lBQ3BCLDZDQUFBLHNCQUFzQixDQUFBO0lBQ3RCLHdDQUFBLGlCQUFpQixDQUFBO0lBQ2pCLHdDQUFBLGlCQUFpQixDQUFBO0lBQ2pCLDBDQUFBLG1CQUFtQixDQUFBO0lBQ25CLG9DQUFBLGFBQWEsQ0FBQTtJQUNiLHVDQUFBLGdCQUFnQixDQUFBO0lBR2xCLDBFQVUwQjtJQVB4Qiw4QkFBQSxVQUFVLENBQUE7SUFDVixnQ0FBQSxZQUFZLENBQUE7SUFDWixnQ0FBQSxZQUFZLENBQUE7SUFDWixpQ0FBQSxhQUFhLENBQUE7SUFDYix1Q0FBQSxtQkFBbUIsQ0FBQTtJQUNuQix3Q0FBQSxvQkFBb0IsQ0FBQTtJQUNwQixpQ0FBQSxhQUFhLENBQUE7SUFHZiwwRUFBNkU7SUFBekQsZ0NBQUEsWUFBWSxDQUFBO0lBQUUsb0NBQUEsZ0JBQWdCLENBQUE7SUFFbEQsb0ZBSytCO0lBSjdCLG1DQUFBLFVBQVUsQ0FBQTtJQUNWLDhDQUFBLHFCQUFxQixDQUFBO0lBQ3JCLDBDQUFBLGlCQUFpQixDQUFBO0lBSW5CLG9GQUFnRTtJQUF2RCxnREFBQSx1QkFBdUIsQ0FBQTtJQUVoQyxrRkFNOEI7SUFMNUIseUNBQUEsaUJBQWlCLENBQUE7SUFDakIsa0RBQUEsMEJBQTBCLENBQUE7SUFDMUIsa0RBQUEsMEJBQTBCLENBQUE7SUFDMUIsb0RBQUEsNEJBQTRCLENBQUE7SUFDNUIsNEJBQUEsSUFBSSxDQUFBO0lBR04sNEVBQXNFO0lBQTdELG1DQUFBLGNBQWMsQ0FBQTtJQUFFLCtCQUFBLFVBQVUsQ0FBQTtJQUFFLDBCQUFBLEtBQUssQ0FBQTtJQUU3QixRQUFBLFdBQVcsR0FBRztRQUN6QixTQUFTLEVBQVQsbUJBQVM7UUFDVCxVQUFVLEVBQVYsb0JBQVU7UUFDVixRQUFRLEVBQVIsa0JBQVE7UUFDUixRQUFRLEVBQVIsa0JBQVE7UUFDUixVQUFVLEVBQVYsb0JBQVU7UUFDVixLQUFLLEVBQUwsZUFBSztRQUNMLFVBQVUsRUFBVixvQkFBVTtRQUNWLFdBQVcsRUFBWCxxQkFBVztRQUNYLFNBQVMsRUFBVCxtQkFBUztLQUNWLENBQUM7SUFFRiwwRUFBaUQ7SUFBeEMsaUNBQUEsYUFBYSxDQUFBO0lBRXRCLGtGQUFpRDtJQUF4QyxpQ0FBQSxTQUFTLENBQUE7SUFFbEIsNEVBQTREO0lBQW5ELDRDQUFBLHVCQUF1QixDQUFBO0lBRWhDLHNGQUF5RDtJQUFoRCx5Q0FBQSxlQUFlLENBQUE7SUFFeEIsOEVBUTRCO0lBUDFCLHdDQUFBLGtCQUFrQixDQUFBO0lBQ2xCLDBDQUFBLG9CQUFvQixDQUFBO0lBQ3BCLDBDQUFBLG9CQUFvQixDQUFBO0lBQ3BCLHFDQUFBLGVBQWUsQ0FBQTtJQUNmLG9DQUFBLGNBQWMsQ0FBQTtJQUNkLG9DQUFBLGNBQWMsQ0FBQTtJQUNkLG9DQUFBLGNBQWMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIGRhc2hlcml6ZSxcbiAgZGVjYW1lbGl6ZSxcbiAgY2FtZWxpemUsXG4gIGNsYXNzaWZ5LFxuICB1bmRlcnNjb3JlLFxuICBncm91cCxcbiAgY2FwaXRhbGl6ZSxcbiAgZmVhdHVyZVBhdGgsXG4gIHBsdXJhbGl6ZSxcbn0gZnJvbSAnLi91dGlsaXR5L3N0cmluZ3MnO1xuXG5leHBvcnQgeyBpc0l2eUVuYWJsZWQgfSBmcm9tICcuL3V0aWxpdHkvYW5ndWxhci11dGlscyc7XG5cbmV4cG9ydCB7XG4gIGZpbmROb2RlcyxcbiAgZ2V0U291cmNlTm9kZXMsXG4gIGdldERlY29yYXRvck1ldGFkYXRhLFxuICBnZXRDb250ZW50T2ZLZXlMaXRlcmFsLFxuICBpbnNlcnRBZnRlckxhc3RPY2N1cnJlbmNlLFxuICBpbnNlcnRJbXBvcnQsXG4gIGFkZEJvb3RzdHJhcFRvTW9kdWxlLFxuICBhZGREZWNsYXJhdGlvblRvTW9kdWxlLFxuICBhZGRFeHBvcnRUb01vZHVsZSxcbiAgYWRkSW1wb3J0VG9Nb2R1bGUsXG4gIGFkZFByb3ZpZGVyVG9Nb2R1bGUsXG4gIHJlcGxhY2VJbXBvcnQsXG4gIGNvbnRhaW5zUHJvcGVydHksXG59IGZyb20gJy4vdXRpbGl0eS9hc3QtdXRpbHMnO1xuXG5leHBvcnQge1xuICBIb3N0LFxuICBDaGFuZ2UsXG4gIE5vb3BDaGFuZ2UsXG4gIEluc2VydENoYW5nZSxcbiAgUmVtb3ZlQ2hhbmdlLFxuICBSZXBsYWNlQ2hhbmdlLFxuICBjcmVhdGVSZXBsYWNlQ2hhbmdlLFxuICBjcmVhdGVDaGFuZ2VSZWNvcmRlcixcbiAgY29tbWl0Q2hhbmdlcyxcbn0gZnJvbSAnLi91dGlsaXR5L2NoYW5nZSc7XG5cbmV4cG9ydCB7IEFwcENvbmZpZywgZ2V0V29ya3NwYWNlLCBnZXRXb3Jrc3BhY2VQYXRoIH0gZnJvbSAnLi91dGlsaXR5L2NvbmZpZyc7XG5cbmV4cG9ydCB7XG4gIGZpbmRNb2R1bGUsXG4gIGZpbmRNb2R1bGVGcm9tT3B0aW9ucyxcbiAgYnVpbGRSZWxhdGl2ZVBhdGgsXG4gIE1vZHVsZU9wdGlvbnMsXG59IGZyb20gJy4vdXRpbGl0eS9maW5kLW1vZHVsZSc7XG5cbmV4cG9ydCB7IGZpbmRQcm9wZXJ0eUluQXN0T2JqZWN0IH0gZnJvbSAnLi91dGlsaXR5L2pzb24tdXRpbHRzJztcblxuZXhwb3J0IHtcbiAgYWRkUmVkdWNlclRvU3RhdGUsXG4gIGFkZFJlZHVjZXJUb1N0YXRlSW50ZXJmYWNlLFxuICBhZGRSZWR1Y2VySW1wb3J0VG9OZ01vZHVsZSxcbiAgYWRkUmVkdWNlclRvQWN0aW9uUmVkdWNlck1hcCxcbiAgb21pdCxcbn0gZnJvbSAnLi91dGlsaXR5L25ncngtdXRpbHMnO1xuXG5leHBvcnQgeyBnZXRQcm9qZWN0UGF0aCwgZ2V0UHJvamVjdCwgaXNMaWIgfSBmcm9tICcuL3V0aWxpdHkvcHJvamVjdCc7XG5cbmV4cG9ydCBjb25zdCBzdHJpbmdVdGlscyA9IHtcbiAgZGFzaGVyaXplLFxuICBkZWNhbWVsaXplLFxuICBjYW1lbGl6ZSxcbiAgY2xhc3NpZnksXG4gIHVuZGVyc2NvcmUsXG4gIGdyb3VwLFxuICBjYXBpdGFsaXplLFxuICBmZWF0dXJlUGF0aCxcbiAgcGx1cmFsaXplLFxufTtcblxuZXhwb3J0IHsgdXBkYXRlUGFja2FnZSB9IGZyb20gJy4vdXRpbGl0eS91cGRhdGUnO1xuXG5leHBvcnQgeyBwYXJzZU5hbWUgfSBmcm9tICcuL3V0aWxpdHkvcGFyc2UtbmFtZSc7XG5cbmV4cG9ydCB7IGFkZFBhY2thZ2VUb1BhY2thZ2VKc29uIH0gZnJvbSAnLi91dGlsaXR5L3BhY2thZ2UnO1xuXG5leHBvcnQgeyBwbGF0Zm9ybVZlcnNpb24gfSBmcm9tICcuL3V0aWxpdHkvbGlicy12ZXJzaW9uJztcblxuZXhwb3J0IHtcbiAgdmlzaXRUU1NvdXJjZUZpbGVzLFxuICB2aXNpdE5nTW9kdWxlSW1wb3J0cyxcbiAgdmlzaXROZ01vZHVsZUV4cG9ydHMsXG4gIHZpc2l0Q29tcG9uZW50cyxcbiAgdmlzaXREZWNvcmF0b3IsXG4gIHZpc2l0TmdNb2R1bGVzLFxuICB2aXNpdFRlbXBsYXRlcyxcbn0gZnJvbSAnLi91dGlsaXR5L3Zpc2l0b3JzJztcbiJdfQ==