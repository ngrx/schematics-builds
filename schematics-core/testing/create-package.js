"use strict";
exports.__esModule = true;
exports.createPackageJson = exports.packagePath = void 0;
exports.packagePath = '/package.json';
function createPackageJson(prefix, pkg, tree, version, packagePath) {
    if (version === void 0) { version = '5.2.0'; }
    if (packagePath === void 0) { packagePath = '/package.json'; }
    tree.create(packagePath, "{\n      \"dependencies\": {\n        \"@ngrx/" + pkg + "\": \"" + prefix + version + "\"\n      }\n    }");
    return tree;
}
exports.createPackageJson = createPackageJson;
//# sourceMappingURL=create-package.js.map