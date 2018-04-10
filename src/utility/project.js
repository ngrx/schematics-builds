"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("../utility/config");
function getProjectPath(host, options) {
    var workspace = config_1.getWorkspace(host);
    if (!options.project) {
        options.project = Object.keys(workspace.projects)[0];
    }
    var project = workspace.projects[options.project];
    if (project.root.substr(-1) === '/') {
        project.root = project.root.substr(0, project.root.length - 1);
    }
    if (options.path === undefined) {
        return "/" + project.root + "/src/app";
    }
    return options.path;
}
exports.getProjectPath = getProjectPath;
//# sourceMappingURL=project.js.map