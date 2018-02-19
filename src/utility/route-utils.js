"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("typescript");
var ast_utils_1 = require("./ast-utils");
var change_1 = require("./change");
/**
 * Add Import `import { symbolName } from fileName` if the import doesn't exit
 * already. Assumes fileToEdit can be resolved and accessed.
 * @param fileToEdit (file we want to add import to)
 * @param symbolName (item to import)
 * @param fileName (path to the file)
 * @param isDefault (if true, import follows style for importing default exports)
 * @return Change
 */
function insertImport(source, fileToEdit, symbolName, fileName, isDefault) {
    if (isDefault === void 0) { isDefault = false; }
    var rootNode = source;
    var allImports = ast_utils_1.findNodes(rootNode, ts.SyntaxKind.ImportDeclaration);
    // get nodes that map to import statements from the file fileName
    var relevantImports = allImports.filter(function (node) {
        // StringLiteral of the ImportDeclaration is the import file (fileName in this case).
        var importFiles = node
            .getChildren()
            .filter(function (child) { return child.kind === ts.SyntaxKind.StringLiteral; })
            .map(function (n) { return n.text; });
        return importFiles.filter(function (file) { return file === fileName; }).length === 1;
    });
    if (relevantImports.length > 0) {
        var importsAsterisk_1 = false;
        // imports from import file
        var imports_1 = [];
        relevantImports.forEach(function (n) {
            Array.prototype.push.apply(imports_1, ast_utils_1.findNodes(n, ts.SyntaxKind.Identifier));
            if (ast_utils_1.findNodes(n, ts.SyntaxKind.AsteriskToken).length > 0) {
                importsAsterisk_1 = true;
            }
        });
        // if imports * from fileName, don't add symbolName
        if (importsAsterisk_1) {
            return new change_1.NoopChange();
        }
        var importTextNodes = imports_1.filter(function (n) { return n.text === symbolName; });
        // insert import if it's not there
        if (importTextNodes.length === 0) {
            var fallbackPos_1 = ast_utils_1.findNodes(relevantImports[0], ts.SyntaxKind.CloseBraceToken)[0].getStart() ||
                ast_utils_1.findNodes(relevantImports[0], ts.SyntaxKind.FromKeyword)[0].getStart();
            return ast_utils_1.insertAfterLastOccurrence(imports_1, ", " + symbolName, fileToEdit, fallbackPos_1);
        }
        return new change_1.NoopChange();
    }
    // no such import declaration exists
    var useStrict = ast_utils_1.findNodes(rootNode, ts.SyntaxKind.StringLiteral).filter(function (n) { return n.getText() === 'use strict'; });
    var fallbackPos = 0;
    if (useStrict.length > 0) {
        fallbackPos = useStrict[0].end;
    }
    var open = isDefault ? '' : '{ ';
    var close = isDefault ? '' : ' }';
    // if there are no imports or 'use strict' statement, insert import at beginning of file
    var insertAtBeginning = allImports.length === 0 && useStrict.length === 0;
    var separator = insertAtBeginning ? '' : ';\n';
    var toInsert = separator + "import " + open + symbolName + close +
        (" from '" + fileName + "'" + (insertAtBeginning ? ';\n' : ''));
    return ast_utils_1.insertAfterLastOccurrence(allImports, toInsert, fileToEdit, fallbackPos, ts.SyntaxKind.StringLiteral);
}
exports.insertImport = insertImport;
//# sourceMappingURL=route-utils.js.map