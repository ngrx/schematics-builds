(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@ngrx/schematics/schematics-core/index", ["require", "exports", "@ngrx/schematics/schematics-core/utility/strings", "@ngrx/schematics/schematics-core/utility/ast-utils", "@ngrx/schematics/schematics-core/utility/change", "@ngrx/schematics/schematics-core/utility/config", "@ngrx/schematics/schematics-core/utility/find-module", "@ngrx/schematics/schematics-core/utility/ngrx-utils", "@ngrx/schematics/schematics-core/utility/project", "@ngrx/schematics/schematics-core/utility/route-utils", "@ngrx/schematics/schematics-core/utility/update"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var strings_1 = require("@ngrx/schematics/schematics-core/utility/strings");
    var ast_utils_1 = require("@ngrx/schematics/schematics-core/utility/ast-utils");
    exports.findNodes = ast_utils_1.findNodes;
    exports.getSourceNodes = ast_utils_1.getSourceNodes;
    exports.getDecoratorMetadata = ast_utils_1.getDecoratorMetadata;
    exports.getContentOfKeyLiteral = ast_utils_1.getContentOfKeyLiteral;
    exports.insertAfterLastOccurrence = ast_utils_1.insertAfterLastOccurrence;
    exports.addBootstrapToModule = ast_utils_1.addBootstrapToModule;
    exports.addDeclarationToModule = ast_utils_1.addDeclarationToModule;
    exports.addExportToModule = ast_utils_1.addExportToModule;
    exports.addImportToModule = ast_utils_1.addImportToModule;
    exports.addProviderToModule = ast_utils_1.addProviderToModule;
    var change_1 = require("@ngrx/schematics/schematics-core/utility/change");
    exports.NoopChange = change_1.NoopChange;
    exports.InsertChange = change_1.InsertChange;
    exports.RemoveChange = change_1.RemoveChange;
    exports.ReplaceChange = change_1.ReplaceChange;
    var config_1 = require("@ngrx/schematics/schematics-core/utility/config");
    exports.getAppFromConfig = config_1.getAppFromConfig;
    exports.getConfig = config_1.getConfig;
    exports.getWorkspace = config_1.getWorkspace;
    exports.getWorkspacePath = config_1.getWorkspacePath;
    var find_module_1 = require("@ngrx/schematics/schematics-core/utility/find-module");
    exports.findModule = find_module_1.findModule;
    exports.findModuleFromOptions = find_module_1.findModuleFromOptions;
    exports.buildRelativePath = find_module_1.buildRelativePath;
    var ngrx_utils_1 = require("@ngrx/schematics/schematics-core/utility/ngrx-utils");
    exports.addReducerToState = ngrx_utils_1.addReducerToState;
    exports.addReducerToStateInferface = ngrx_utils_1.addReducerToStateInferface;
    exports.addReducerImportToNgModule = ngrx_utils_1.addReducerImportToNgModule;
    exports.addReducerToActionReducerMap = ngrx_utils_1.addReducerToActionReducerMap;
    exports.omit = ngrx_utils_1.omit;
    var project_1 = require("@ngrx/schematics/schematics-core/utility/project");
    exports.getProjectPath = project_1.getProjectPath;
    var route_utils_1 = require("@ngrx/schematics/schematics-core/utility/route-utils");
    exports.insertImport = route_utils_1.insertImport;
    exports.stringUtils = {
        dasherize: strings_1.dasherize,
        decamelize: strings_1.decamelize,
        camelize: strings_1.camelize,
        classify: strings_1.classify,
        underscore: strings_1.underscore,
        group: strings_1.group,
        capitalize: strings_1.capitalize,
        featurePath: strings_1.featurePath,
    };
    var update_1 = require("@ngrx/schematics/schematics-core/utility/update");
    exports.updatePackage = update_1.updatePackage;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3NjaGVtYXRpY3Mvc2NoZW1hdGljcy1jb3JlL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0lBQUEsNEVBUzJCO0lBRTNCLGdGQVc2QjtJQVYzQixnQ0FBQSxTQUFTLENBQUE7SUFDVCxxQ0FBQSxjQUFjLENBQUE7SUFDZCwyQ0FBQSxvQkFBb0IsQ0FBQTtJQUNwQiw2Q0FBQSxzQkFBc0IsQ0FBQTtJQUN0QixnREFBQSx5QkFBeUIsQ0FBQTtJQUN6QiwyQ0FBQSxvQkFBb0IsQ0FBQTtJQUNwQiw2Q0FBQSxzQkFBc0IsQ0FBQTtJQUN0Qix3Q0FBQSxpQkFBaUIsQ0FBQTtJQUNqQix3Q0FBQSxpQkFBaUIsQ0FBQTtJQUNqQiwwQ0FBQSxtQkFBbUIsQ0FBQTtJQUdyQiwwRUFPMEI7SUFKeEIsOEJBQUEsVUFBVSxDQUFBO0lBQ1YsZ0NBQUEsWUFBWSxDQUFBO0lBQ1osZ0NBQUEsWUFBWSxDQUFBO0lBQ1osaUNBQUEsYUFBYSxDQUFBO0lBR2YsMEVBTzBCO0lBSnhCLG9DQUFBLGdCQUFnQixDQUFBO0lBQ2hCLDZCQUFBLFNBQVMsQ0FBQTtJQUNULGdDQUFBLFlBQVksQ0FBQTtJQUNaLG9DQUFBLGdCQUFnQixDQUFBO0lBR2xCLG9GQUsrQjtJQUo3QixtQ0FBQSxVQUFVLENBQUE7SUFDViw4Q0FBQSxxQkFBcUIsQ0FBQTtJQUNyQiwwQ0FBQSxpQkFBaUIsQ0FBQTtJQUluQixrRkFNOEI7SUFMNUIseUNBQUEsaUJBQWlCLENBQUE7SUFDakIsa0RBQUEsMEJBQTBCLENBQUE7SUFDMUIsa0RBQUEsMEJBQTBCLENBQUE7SUFDMUIsb0RBQUEsNEJBQTRCLENBQUE7SUFDNUIsNEJBQUEsSUFBSSxDQUFBO0lBR04sNEVBQW1EO0lBQTFDLG1DQUFBLGNBQWMsQ0FBQTtJQUN2QixvRkFBcUQ7SUFBNUMscUNBQUEsWUFBWSxDQUFBO0lBRVIsUUFBQSxXQUFXLEdBQUc7UUFDekIsU0FBUyxxQkFBQTtRQUNULFVBQVUsc0JBQUE7UUFDVixRQUFRLG9CQUFBO1FBQ1IsUUFBUSxvQkFBQTtRQUNSLFVBQVUsc0JBQUE7UUFDVixLQUFLLGlCQUFBO1FBQ0wsVUFBVSxzQkFBQTtRQUNWLFdBQVcsdUJBQUE7S0FDWixDQUFDO0lBRUYsMEVBQWlEO0lBQXhDLGlDQUFBLGFBQWEsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIGRhc2hlcml6ZSxcbiAgZGVjYW1lbGl6ZSxcbiAgY2FtZWxpemUsXG4gIGNsYXNzaWZ5LFxuICB1bmRlcnNjb3JlLFxuICBncm91cCxcbiAgY2FwaXRhbGl6ZSxcbiAgZmVhdHVyZVBhdGgsXG59IGZyb20gJy4vdXRpbGl0eS9zdHJpbmdzJztcblxuZXhwb3J0IHtcbiAgZmluZE5vZGVzLFxuICBnZXRTb3VyY2VOb2RlcyxcbiAgZ2V0RGVjb3JhdG9yTWV0YWRhdGEsXG4gIGdldENvbnRlbnRPZktleUxpdGVyYWwsXG4gIGluc2VydEFmdGVyTGFzdE9jY3VycmVuY2UsXG4gIGFkZEJvb3RzdHJhcFRvTW9kdWxlLFxuICBhZGREZWNsYXJhdGlvblRvTW9kdWxlLFxuICBhZGRFeHBvcnRUb01vZHVsZSxcbiAgYWRkSW1wb3J0VG9Nb2R1bGUsXG4gIGFkZFByb3ZpZGVyVG9Nb2R1bGUsXG59IGZyb20gJy4vdXRpbGl0eS9hc3QtdXRpbHMnO1xuXG5leHBvcnQge1xuICBIb3N0LFxuICBDaGFuZ2UsXG4gIE5vb3BDaGFuZ2UsXG4gIEluc2VydENoYW5nZSxcbiAgUmVtb3ZlQ2hhbmdlLFxuICBSZXBsYWNlQ2hhbmdlLFxufSBmcm9tICcuL3V0aWxpdHkvY2hhbmdlJztcblxuZXhwb3J0IHtcbiAgQXBwQ29uZmlnLFxuICBDbGlDb25maWcsXG4gIGdldEFwcEZyb21Db25maWcsXG4gIGdldENvbmZpZyxcbiAgZ2V0V29ya3NwYWNlLFxuICBnZXRXb3Jrc3BhY2VQYXRoLFxufSBmcm9tICcuL3V0aWxpdHkvY29uZmlnJztcblxuZXhwb3J0IHtcbiAgZmluZE1vZHVsZSxcbiAgZmluZE1vZHVsZUZyb21PcHRpb25zLFxuICBidWlsZFJlbGF0aXZlUGF0aCxcbiAgTW9kdWxlT3B0aW9ucyxcbn0gZnJvbSAnLi91dGlsaXR5L2ZpbmQtbW9kdWxlJztcblxuZXhwb3J0IHtcbiAgYWRkUmVkdWNlclRvU3RhdGUsXG4gIGFkZFJlZHVjZXJUb1N0YXRlSW5mZXJmYWNlLFxuICBhZGRSZWR1Y2VySW1wb3J0VG9OZ01vZHVsZSxcbiAgYWRkUmVkdWNlclRvQWN0aW9uUmVkdWNlck1hcCxcbiAgb21pdCxcbn0gZnJvbSAnLi91dGlsaXR5L25ncngtdXRpbHMnO1xuXG5leHBvcnQgeyBnZXRQcm9qZWN0UGF0aCB9IGZyb20gJy4vdXRpbGl0eS9wcm9qZWN0JztcbmV4cG9ydCB7IGluc2VydEltcG9ydCB9IGZyb20gJy4vdXRpbGl0eS9yb3V0ZS11dGlscyc7XG5cbmV4cG9ydCBjb25zdCBzdHJpbmdVdGlscyA9IHtcbiAgZGFzaGVyaXplLFxuICBkZWNhbWVsaXplLFxuICBjYW1lbGl6ZSxcbiAgY2xhc3NpZnksXG4gIHVuZGVyc2NvcmUsXG4gIGdyb3VwLFxuICBjYXBpdGFsaXplLFxuICBmZWF0dXJlUGF0aCxcbn07XG5cbmV4cG9ydCB7IHVwZGF0ZVBhY2thZ2UgfSBmcm9tICcuL3V0aWxpdHkvdXBkYXRlJztcbiJdfQ==