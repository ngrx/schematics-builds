(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@ngrx/schematics/schematics-core", ["require", "exports", "@ngrx/schematics/schematics-core/utility/strings", "@ngrx/schematics/schematics-core/utility/ast-utils", "@ngrx/schematics/schematics-core/utility/change", "@ngrx/schematics/schematics-core/utility/config", "@ngrx/schematics/schematics-core/utility/find-module", "@ngrx/schematics/schematics-core/utility/ngrx-utils", "@ngrx/schematics/schematics-core/utility/project", "@ngrx/schematics/schematics-core/utility/update", "@ngrx/schematics/schematics-core/utility/parse-name", "@ngrx/schematics/schematics-core/utility/package", "@ngrx/schematics/schematics-core/utility/libs-version", "@ngrx/schematics/schematics-core/utility/visit-utils"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const strings_1 = require("@ngrx/schematics/schematics-core/utility/strings");
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
    };
    var update_1 = require("@ngrx/schematics/schematics-core/utility/update");
    exports.updatePackage = update_1.updatePackage;
    var parse_name_1 = require("@ngrx/schematics/schematics-core/utility/parse-name");
    exports.parseName = parse_name_1.parseName;
    var package_1 = require("@ngrx/schematics/schematics-core/utility/package");
    exports.addPackageToPackageJson = package_1.addPackageToPackageJson;
    var libs_version_1 = require("@ngrx/schematics/schematics-core/utility/libs-version");
    exports.platformVersion = libs_version_1.platformVersion;
    var visit_utils_1 = require("@ngrx/schematics/schematics-core/utility/visit-utils");
    exports.visitTSSourceFiles = visit_utils_1.visitTSSourceFiles;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3NjaGVtYXRpY3Mvc2NoZW1hdGljcy1jb3JlL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0lBQUEsOEVBUzJCO0lBRTNCLGdGQWE2QjtJQVozQixnQ0FBQSxTQUFTLENBQUE7SUFDVCxxQ0FBQSxjQUFjLENBQUE7SUFDZCwyQ0FBQSxvQkFBb0IsQ0FBQTtJQUNwQiw2Q0FBQSxzQkFBc0IsQ0FBQTtJQUN0QixnREFBQSx5QkFBeUIsQ0FBQTtJQUN6QixtQ0FBQSxZQUFZLENBQUE7SUFDWiwyQ0FBQSxvQkFBb0IsQ0FBQTtJQUNwQiw2Q0FBQSxzQkFBc0IsQ0FBQTtJQUN0Qix3Q0FBQSxpQkFBaUIsQ0FBQTtJQUNqQix3Q0FBQSxpQkFBaUIsQ0FBQTtJQUNqQiwwQ0FBQSxtQkFBbUIsQ0FBQTtJQUNuQixvQ0FBQSxhQUFhLENBQUE7SUFHZiwwRUFVMEI7SUFQeEIsOEJBQUEsVUFBVSxDQUFBO0lBQ1YsZ0NBQUEsWUFBWSxDQUFBO0lBQ1osZ0NBQUEsWUFBWSxDQUFBO0lBQ1osaUNBQUEsYUFBYSxDQUFBO0lBQ2IsdUNBQUEsbUJBQW1CLENBQUE7SUFDbkIsd0NBQUEsb0JBQW9CLENBQUE7SUFDcEIsaUNBQUEsYUFBYSxDQUFBO0lBR2YsMEVBQTZFO0lBQXpELGdDQUFBLFlBQVksQ0FBQTtJQUFFLG9DQUFBLGdCQUFnQixDQUFBO0lBRWxELG9GQUsrQjtJQUo3QixtQ0FBQSxVQUFVLENBQUE7SUFDViw4Q0FBQSxxQkFBcUIsQ0FBQTtJQUNyQiwwQ0FBQSxpQkFBaUIsQ0FBQTtJQUluQixrRkFNOEI7SUFMNUIseUNBQUEsaUJBQWlCLENBQUE7SUFDakIsa0RBQUEsMEJBQTBCLENBQUE7SUFDMUIsa0RBQUEsMEJBQTBCLENBQUE7SUFDMUIsb0RBQUEsNEJBQTRCLENBQUE7SUFDNUIsNEJBQUEsSUFBSSxDQUFBO0lBR04sNEVBQXNFO0lBQTdELG1DQUFBLGNBQWMsQ0FBQTtJQUFFLCtCQUFBLFVBQVUsQ0FBQTtJQUFFLDBCQUFBLEtBQUssQ0FBQTtJQUU3QixRQUFBLFdBQVcsR0FBRztRQUN6QixTQUFTLEVBQVQsbUJBQVM7UUFDVCxVQUFVLEVBQVYsb0JBQVU7UUFDVixRQUFRLEVBQVIsa0JBQVE7UUFDUixRQUFRLEVBQVIsa0JBQVE7UUFDUixVQUFVLEVBQVYsb0JBQVU7UUFDVixLQUFLLEVBQUwsZUFBSztRQUNMLFVBQVUsRUFBVixvQkFBVTtRQUNWLFdBQVcsRUFBWCxxQkFBVztLQUNaLENBQUM7SUFFRiwwRUFBaUQ7SUFBeEMsaUNBQUEsYUFBYSxDQUFBO0lBRXRCLGtGQUFpRDtJQUF4QyxpQ0FBQSxTQUFTLENBQUE7SUFFbEIsNEVBQTREO0lBQW5ELDRDQUFBLHVCQUF1QixDQUFBO0lBRWhDLHNGQUF5RDtJQUFoRCx5Q0FBQSxlQUFlLENBQUE7SUFFeEIsb0ZBQTJEO0lBQWxELDJDQUFBLGtCQUFrQixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgZGFzaGVyaXplLFxuICBkZWNhbWVsaXplLFxuICBjYW1lbGl6ZSxcbiAgY2xhc3NpZnksXG4gIHVuZGVyc2NvcmUsXG4gIGdyb3VwLFxuICBjYXBpdGFsaXplLFxuICBmZWF0dXJlUGF0aCxcbn0gZnJvbSAnLi91dGlsaXR5L3N0cmluZ3MnO1xuXG5leHBvcnQge1xuICBmaW5kTm9kZXMsXG4gIGdldFNvdXJjZU5vZGVzLFxuICBnZXREZWNvcmF0b3JNZXRhZGF0YSxcbiAgZ2V0Q29udGVudE9mS2V5TGl0ZXJhbCxcbiAgaW5zZXJ0QWZ0ZXJMYXN0T2NjdXJyZW5jZSxcbiAgaW5zZXJ0SW1wb3J0LFxuICBhZGRCb290c3RyYXBUb01vZHVsZSxcbiAgYWRkRGVjbGFyYXRpb25Ub01vZHVsZSxcbiAgYWRkRXhwb3J0VG9Nb2R1bGUsXG4gIGFkZEltcG9ydFRvTW9kdWxlLFxuICBhZGRQcm92aWRlclRvTW9kdWxlLFxuICByZXBsYWNlSW1wb3J0LFxufSBmcm9tICcuL3V0aWxpdHkvYXN0LXV0aWxzJztcblxuZXhwb3J0IHtcbiAgSG9zdCxcbiAgQ2hhbmdlLFxuICBOb29wQ2hhbmdlLFxuICBJbnNlcnRDaGFuZ2UsXG4gIFJlbW92ZUNoYW5nZSxcbiAgUmVwbGFjZUNoYW5nZSxcbiAgY3JlYXRlUmVwbGFjZUNoYW5nZSxcbiAgY3JlYXRlQ2hhbmdlUmVjb3JkZXIsXG4gIGNvbW1pdENoYW5nZXMsXG59IGZyb20gJy4vdXRpbGl0eS9jaGFuZ2UnO1xuXG5leHBvcnQgeyBBcHBDb25maWcsIGdldFdvcmtzcGFjZSwgZ2V0V29ya3NwYWNlUGF0aCB9IGZyb20gJy4vdXRpbGl0eS9jb25maWcnO1xuXG5leHBvcnQge1xuICBmaW5kTW9kdWxlLFxuICBmaW5kTW9kdWxlRnJvbU9wdGlvbnMsXG4gIGJ1aWxkUmVsYXRpdmVQYXRoLFxuICBNb2R1bGVPcHRpb25zLFxufSBmcm9tICcuL3V0aWxpdHkvZmluZC1tb2R1bGUnO1xuXG5leHBvcnQge1xuICBhZGRSZWR1Y2VyVG9TdGF0ZSxcbiAgYWRkUmVkdWNlclRvU3RhdGVJbnRlcmZhY2UsXG4gIGFkZFJlZHVjZXJJbXBvcnRUb05nTW9kdWxlLFxuICBhZGRSZWR1Y2VyVG9BY3Rpb25SZWR1Y2VyTWFwLFxuICBvbWl0LFxufSBmcm9tICcuL3V0aWxpdHkvbmdyeC11dGlscyc7XG5cbmV4cG9ydCB7IGdldFByb2plY3RQYXRoLCBnZXRQcm9qZWN0LCBpc0xpYiB9IGZyb20gJy4vdXRpbGl0eS9wcm9qZWN0JztcblxuZXhwb3J0IGNvbnN0IHN0cmluZ1V0aWxzID0ge1xuICBkYXNoZXJpemUsXG4gIGRlY2FtZWxpemUsXG4gIGNhbWVsaXplLFxuICBjbGFzc2lmeSxcbiAgdW5kZXJzY29yZSxcbiAgZ3JvdXAsXG4gIGNhcGl0YWxpemUsXG4gIGZlYXR1cmVQYXRoLFxufTtcblxuZXhwb3J0IHsgdXBkYXRlUGFja2FnZSB9IGZyb20gJy4vdXRpbGl0eS91cGRhdGUnO1xuXG5leHBvcnQgeyBwYXJzZU5hbWUgfSBmcm9tICcuL3V0aWxpdHkvcGFyc2UtbmFtZSc7XG5cbmV4cG9ydCB7IGFkZFBhY2thZ2VUb1BhY2thZ2VKc29uIH0gZnJvbSAnLi91dGlsaXR5L3BhY2thZ2UnO1xuXG5leHBvcnQgeyBwbGF0Zm9ybVZlcnNpb24gfSBmcm9tICcuL3V0aWxpdHkvbGlicy12ZXJzaW9uJztcblxuZXhwb3J0IHsgdmlzaXRUU1NvdXJjZUZpbGVzIH0gZnJvbSAnLi91dGlsaXR5L3Zpc2l0LXV0aWxzJztcbiJdfQ==