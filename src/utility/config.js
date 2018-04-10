"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var schematics_1 = require("@angular-devkit/schematics");
function getWorkspacePath(host) {
    var possibleFiles = ['/angular.json', '/.angular.json'];
    var path = possibleFiles.filter(function (path) { return host.exists(path); })[0];
    return path;
}
exports.getWorkspacePath = getWorkspacePath;
function getWorkspace(host) {
    var path = getWorkspacePath(host);
    var configBuffer = host.read(path);
    if (configBuffer === null) {
        throw new schematics_1.SchematicsException("Could not find (" + path + ")");
    }
    var config = configBuffer.toString();
    return JSON.parse(config);
}
exports.getWorkspace = getWorkspace;
exports.configPath = '/.angular-cli.json';
function getConfig(host) {
    var configBuffer = host.read(exports.configPath);
    if (configBuffer === null) {
        throw new schematics_1.SchematicsException('Could not find .angular-cli.json');
    }
    var config = JSON.parse(configBuffer.toString());
    return config;
}
exports.getConfig = getConfig;
function getAppFromConfig(config, appIndexOrName) {
    if (!config.apps) {
        return null;
    }
    if (parseInt(appIndexOrName) >= 0) {
        return config.apps[parseInt(appIndexOrName)];
    }
    return config.apps.filter(function (app) { return app.name === appIndexOrName; })[0];
}
exports.getAppFromConfig = getAppFromConfig;
//# sourceMappingURL=config.js.map