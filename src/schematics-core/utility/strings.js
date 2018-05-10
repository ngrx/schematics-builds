(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@ngrx/schematics/src/schematics-core/utility/strings", ["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var STRING_DASHERIZE_REGEXP = /[ _]/g;
    var STRING_DECAMELIZE_REGEXP = /([a-z\d])([A-Z])/g;
    var STRING_CAMELIZE_REGEXP = /(-|_|\.|\s)+(.)?/g;
    var STRING_UNDERSCORE_REGEXP_1 = /([a-z\d])([A-Z]+)/g;
    var STRING_UNDERSCORE_REGEXP_2 = /-|\s+/g;
    /**
     * Converts a camelized string into all lower case separated by underscores.
     *
     ```javascript
     decamelize('innerHTML');         // 'inner_html'
     decamelize('action_name');       // 'action_name'
     decamelize('css-class-name');    // 'css-class-name'
     decamelize('my favorite items'); // 'my favorite items'
     ```
    
     @method decamelize
     @param {String} str The string to decamelize.
     @return {String} the decamelized string.
     */
    function decamelize(str) {
        return str.replace(STRING_DECAMELIZE_REGEXP, '$1_$2').toLowerCase();
    }
    exports.decamelize = decamelize;
    /**
     Replaces underscores, spaces, or camelCase with dashes.
    
     ```javascript
     dasherize('innerHTML');         // 'inner-html'
     dasherize('action_name');       // 'action-name'
     dasherize('css-class-name');    // 'css-class-name'
     dasherize('my favorite items'); // 'my-favorite-items'
     ```
    
     @method dasherize
     @param {String} str The string to dasherize.
     @return {String} the dasherized string.
     */
    function dasherize(str) {
        return decamelize(str || '').replace(STRING_DASHERIZE_REGEXP, '-');
    }
    exports.dasherize = dasherize;
    /**
     Returns the lowerCamelCase form of a string.
    
     ```javascript
     camelize('innerHTML');          // 'innerHTML'
     camelize('action_name');        // 'actionName'
     camelize('css-class-name');     // 'cssClassName'
     camelize('my favorite items');  // 'myFavoriteItems'
     camelize('My Favorite Items');  // 'myFavoriteItems'
     ```
    
     @method camelize
     @param {String} str The string to camelize.
     @return {String} the camelized string.
     */
    function camelize(str) {
        return str
            .replace(STRING_CAMELIZE_REGEXP, function (_match, _separator, chr) {
            return chr ? chr.toUpperCase() : '';
        })
            .replace(/^([A-Z])/, function (match) { return match.toLowerCase(); });
    }
    exports.camelize = camelize;
    /**
     Returns the UpperCamelCase form of a string.
    
     ```javascript
     'innerHTML'.classify();          // 'InnerHTML'
     'action_name'.classify();        // 'ActionName'
     'css-class-name'.classify();     // 'CssClassName'
     'my favorite items'.classify();  // 'MyFavoriteItems'
     ```
    
     @method classify
     @param {String} str the string to classify
     @return {String} the classified string
     */
    function classify(str) {
        return str
            .split('.')
            .map(function (part) { return capitalize(camelize(part)); })
            .join('.');
    }
    exports.classify = classify;
    /**
     More general than decamelize. Returns the lower\_case\_and\_underscored
     form of a string.
    
     ```javascript
     'innerHTML'.underscore();          // 'inner_html'
     'action_name'.underscore();        // 'action_name'
     'css-class-name'.underscore();     // 'css_class_name'
     'my favorite items'.underscore();  // 'my_favorite_items'
     ```
    
     @method underscore
     @param {String} str The string to underscore.
     @return {String} the underscored string.
     */
    function underscore(str) {
        return str
            .replace(STRING_UNDERSCORE_REGEXP_1, '$1_$2')
            .replace(STRING_UNDERSCORE_REGEXP_2, '_')
            .toLowerCase();
    }
    exports.underscore = underscore;
    /**
     Returns the Capitalized form of a string
    
     ```javascript
     'innerHTML'.capitalize()         // 'InnerHTML'
     'action_name'.capitalize()       // 'Action_name'
     'css-class-name'.capitalize()    // 'Css-class-name'
     'my favorite items'.capitalize() // 'My favorite items'
     ```
    
     @method capitalize
     @param {String} str The string to capitalize.
     @return {String} The capitalized string.
     */
    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.substr(1);
    }
    exports.capitalize = capitalize;
    function group(name, group) {
        return group ? group + "/" + name : name;
    }
    exports.group = group;
    function featurePath(group, flat, path, name) {
        if (group && !flat) {
            return "../../" + path + "/" + name + "/";
        }
        return group ? "../" + path + "/" : './';
    }
    exports.featurePath = featurePath;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaW5ncy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvc2NoZW1hdGljcy9zcmMvc2NoZW1hdGljcy1jb3JlL3V0aWxpdHkvc3RyaW5ncy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztJQUFBOzs7Ozs7T0FNRztJQUNILElBQU0sdUJBQXVCLEdBQUcsT0FBTyxDQUFDO0lBQ3hDLElBQU0sd0JBQXdCLEdBQUcsbUJBQW1CLENBQUM7SUFDckQsSUFBTSxzQkFBc0IsR0FBRyxtQkFBbUIsQ0FBQztJQUNuRCxJQUFNLDBCQUEwQixHQUFHLG9CQUFvQixDQUFDO0lBQ3hELElBQU0sMEJBQTBCLEdBQUcsUUFBUSxDQUFDO0lBRTVDOzs7Ozs7Ozs7Ozs7O09BYUc7SUFDSCxvQkFBMkIsR0FBVztRQUNwQyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyx3QkFBd0IsRUFBRSxPQUFPLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN0RSxDQUFDO0lBRkQsZ0NBRUM7SUFFRDs7Ozs7Ozs7Ozs7OztPQWFHO0lBQ0gsbUJBQTBCLEdBQVk7UUFDcEMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLHVCQUF1QixFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ3JFLENBQUM7SUFGRCw4QkFFQztJQUVEOzs7Ozs7Ozs7Ozs7OztPQWNHO0lBQ0gsa0JBQXlCLEdBQVc7UUFDbEMsTUFBTSxDQUFDLEdBQUc7YUFDUCxPQUFPLENBQ04sc0JBQXNCLEVBQ3RCLFVBQUMsTUFBYyxFQUFFLFVBQWtCLEVBQUUsR0FBVztZQUM5QyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUN0QyxDQUFDLENBQ0Y7YUFDQSxPQUFPLENBQUMsVUFBVSxFQUFFLFVBQUMsS0FBYSxJQUFLLE9BQUEsS0FBSyxDQUFDLFdBQVcsRUFBRSxFQUFuQixDQUFtQixDQUFDLENBQUM7SUFDakUsQ0FBQztJQVRELDRCQVNDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7T0FhRztJQUNILGtCQUF5QixHQUFXO1FBQ2xDLE1BQU0sQ0FBQyxHQUFHO2FBQ1AsS0FBSyxDQUFDLEdBQUcsQ0FBQzthQUNWLEdBQUcsQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLFVBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBMUIsQ0FBMEIsQ0FBQzthQUN2QyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDZixDQUFDO0lBTEQsNEJBS0M7SUFFRDs7Ozs7Ozs7Ozs7Ozs7T0FjRztJQUNILG9CQUEyQixHQUFXO1FBQ3BDLE1BQU0sQ0FBQyxHQUFHO2FBQ1AsT0FBTyxDQUFDLDBCQUEwQixFQUFFLE9BQU8sQ0FBQzthQUM1QyxPQUFPLENBQUMsMEJBQTBCLEVBQUUsR0FBRyxDQUFDO2FBQ3hDLFdBQVcsRUFBRSxDQUFDO0lBQ25CLENBQUM7SUFMRCxnQ0FLQztJQUVEOzs7Ozs7Ozs7Ozs7O09BYUc7SUFDSCxvQkFBMkIsR0FBVztRQUNwQyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUFGRCxnQ0FFQztJQUVELGVBQXNCLElBQVksRUFBRSxLQUF5QjtRQUMzRCxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBSSxLQUFLLFNBQUksSUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDM0MsQ0FBQztJQUZELHNCQUVDO0lBRUQscUJBQ0UsS0FBMEIsRUFDMUIsSUFBeUIsRUFDekIsSUFBWSxFQUNaLElBQVk7UUFFWixFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ25CLE1BQU0sQ0FBQyxXQUFTLElBQUksU0FBSSxJQUFJLE1BQUcsQ0FBQztRQUNsQyxDQUFDO1FBRUQsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsUUFBTSxJQUFJLE1BQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQ3RDLENBQUM7SUFYRCxrQ0FXQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmNvbnN0IFNUUklOR19EQVNIRVJJWkVfUkVHRVhQID0gL1sgX10vZztcbmNvbnN0IFNUUklOR19ERUNBTUVMSVpFX1JFR0VYUCA9IC8oW2EtelxcZF0pKFtBLVpdKS9nO1xuY29uc3QgU1RSSU5HX0NBTUVMSVpFX1JFR0VYUCA9IC8oLXxffFxcLnxcXHMpKyguKT8vZztcbmNvbnN0IFNUUklOR19VTkRFUlNDT1JFX1JFR0VYUF8xID0gLyhbYS16XFxkXSkoW0EtWl0rKS9nO1xuY29uc3QgU1RSSU5HX1VOREVSU0NPUkVfUkVHRVhQXzIgPSAvLXxcXHMrL2c7XG5cbi8qKlxuICogQ29udmVydHMgYSBjYW1lbGl6ZWQgc3RyaW5nIGludG8gYWxsIGxvd2VyIGNhc2Ugc2VwYXJhdGVkIGJ5IHVuZGVyc2NvcmVzLlxuICpcbiBgYGBqYXZhc2NyaXB0XG4gZGVjYW1lbGl6ZSgnaW5uZXJIVE1MJyk7ICAgICAgICAgLy8gJ2lubmVyX2h0bWwnXG4gZGVjYW1lbGl6ZSgnYWN0aW9uX25hbWUnKTsgICAgICAgLy8gJ2FjdGlvbl9uYW1lJ1xuIGRlY2FtZWxpemUoJ2Nzcy1jbGFzcy1uYW1lJyk7ICAgIC8vICdjc3MtY2xhc3MtbmFtZSdcbiBkZWNhbWVsaXplKCdteSBmYXZvcml0ZSBpdGVtcycpOyAvLyAnbXkgZmF2b3JpdGUgaXRlbXMnXG4gYGBgXG5cbiBAbWV0aG9kIGRlY2FtZWxpemVcbiBAcGFyYW0ge1N0cmluZ30gc3RyIFRoZSBzdHJpbmcgdG8gZGVjYW1lbGl6ZS5cbiBAcmV0dXJuIHtTdHJpbmd9IHRoZSBkZWNhbWVsaXplZCBzdHJpbmcuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZWNhbWVsaXplKHN0cjogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKFNUUklOR19ERUNBTUVMSVpFX1JFR0VYUCwgJyQxXyQyJykudG9Mb3dlckNhc2UoKTtcbn1cblxuLyoqXG4gUmVwbGFjZXMgdW5kZXJzY29yZXMsIHNwYWNlcywgb3IgY2FtZWxDYXNlIHdpdGggZGFzaGVzLlxuXG4gYGBgamF2YXNjcmlwdFxuIGRhc2hlcml6ZSgnaW5uZXJIVE1MJyk7ICAgICAgICAgLy8gJ2lubmVyLWh0bWwnXG4gZGFzaGVyaXplKCdhY3Rpb25fbmFtZScpOyAgICAgICAvLyAnYWN0aW9uLW5hbWUnXG4gZGFzaGVyaXplKCdjc3MtY2xhc3MtbmFtZScpOyAgICAvLyAnY3NzLWNsYXNzLW5hbWUnXG4gZGFzaGVyaXplKCdteSBmYXZvcml0ZSBpdGVtcycpOyAvLyAnbXktZmF2b3JpdGUtaXRlbXMnXG4gYGBgXG5cbiBAbWV0aG9kIGRhc2hlcml6ZVxuIEBwYXJhbSB7U3RyaW5nfSBzdHIgVGhlIHN0cmluZyB0byBkYXNoZXJpemUuXG4gQHJldHVybiB7U3RyaW5nfSB0aGUgZGFzaGVyaXplZCBzdHJpbmcuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkYXNoZXJpemUoc3RyPzogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIGRlY2FtZWxpemUoc3RyIHx8ICcnKS5yZXBsYWNlKFNUUklOR19EQVNIRVJJWkVfUkVHRVhQLCAnLScpO1xufVxuXG4vKipcbiBSZXR1cm5zIHRoZSBsb3dlckNhbWVsQ2FzZSBmb3JtIG9mIGEgc3RyaW5nLlxuXG4gYGBgamF2YXNjcmlwdFxuIGNhbWVsaXplKCdpbm5lckhUTUwnKTsgICAgICAgICAgLy8gJ2lubmVySFRNTCdcbiBjYW1lbGl6ZSgnYWN0aW9uX25hbWUnKTsgICAgICAgIC8vICdhY3Rpb25OYW1lJ1xuIGNhbWVsaXplKCdjc3MtY2xhc3MtbmFtZScpOyAgICAgLy8gJ2Nzc0NsYXNzTmFtZSdcbiBjYW1lbGl6ZSgnbXkgZmF2b3JpdGUgaXRlbXMnKTsgIC8vICdteUZhdm9yaXRlSXRlbXMnXG4gY2FtZWxpemUoJ015IEZhdm9yaXRlIEl0ZW1zJyk7ICAvLyAnbXlGYXZvcml0ZUl0ZW1zJ1xuIGBgYFxuXG4gQG1ldGhvZCBjYW1lbGl6ZVxuIEBwYXJhbSB7U3RyaW5nfSBzdHIgVGhlIHN0cmluZyB0byBjYW1lbGl6ZS5cbiBAcmV0dXJuIHtTdHJpbmd9IHRoZSBjYW1lbGl6ZWQgc3RyaW5nLlxuICovXG5leHBvcnQgZnVuY3Rpb24gY2FtZWxpemUoc3RyOiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gc3RyXG4gICAgLnJlcGxhY2UoXG4gICAgICBTVFJJTkdfQ0FNRUxJWkVfUkVHRVhQLFxuICAgICAgKF9tYXRjaDogc3RyaW5nLCBfc2VwYXJhdG9yOiBzdHJpbmcsIGNocjogc3RyaW5nKSA9PiB7XG4gICAgICAgIHJldHVybiBjaHIgPyBjaHIudG9VcHBlckNhc2UoKSA6ICcnO1xuICAgICAgfVxuICAgIClcbiAgICAucmVwbGFjZSgvXihbQS1aXSkvLCAobWF0Y2g6IHN0cmluZykgPT4gbWF0Y2gudG9Mb3dlckNhc2UoKSk7XG59XG5cbi8qKlxuIFJldHVybnMgdGhlIFVwcGVyQ2FtZWxDYXNlIGZvcm0gb2YgYSBzdHJpbmcuXG5cbiBgYGBqYXZhc2NyaXB0XG4gJ2lubmVySFRNTCcuY2xhc3NpZnkoKTsgICAgICAgICAgLy8gJ0lubmVySFRNTCdcbiAnYWN0aW9uX25hbWUnLmNsYXNzaWZ5KCk7ICAgICAgICAvLyAnQWN0aW9uTmFtZSdcbiAnY3NzLWNsYXNzLW5hbWUnLmNsYXNzaWZ5KCk7ICAgICAvLyAnQ3NzQ2xhc3NOYW1lJ1xuICdteSBmYXZvcml0ZSBpdGVtcycuY2xhc3NpZnkoKTsgIC8vICdNeUZhdm9yaXRlSXRlbXMnXG4gYGBgXG5cbiBAbWV0aG9kIGNsYXNzaWZ5XG4gQHBhcmFtIHtTdHJpbmd9IHN0ciB0aGUgc3RyaW5nIHRvIGNsYXNzaWZ5XG4gQHJldHVybiB7U3RyaW5nfSB0aGUgY2xhc3NpZmllZCBzdHJpbmdcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNsYXNzaWZ5KHN0cjogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIHN0clxuICAgIC5zcGxpdCgnLicpXG4gICAgLm1hcChwYXJ0ID0+IGNhcGl0YWxpemUoY2FtZWxpemUocGFydCkpKVxuICAgIC5qb2luKCcuJyk7XG59XG5cbi8qKlxuIE1vcmUgZ2VuZXJhbCB0aGFuIGRlY2FtZWxpemUuIFJldHVybnMgdGhlIGxvd2VyXFxfY2FzZVxcX2FuZFxcX3VuZGVyc2NvcmVkXG4gZm9ybSBvZiBhIHN0cmluZy5cblxuIGBgYGphdmFzY3JpcHRcbiAnaW5uZXJIVE1MJy51bmRlcnNjb3JlKCk7ICAgICAgICAgIC8vICdpbm5lcl9odG1sJ1xuICdhY3Rpb25fbmFtZScudW5kZXJzY29yZSgpOyAgICAgICAgLy8gJ2FjdGlvbl9uYW1lJ1xuICdjc3MtY2xhc3MtbmFtZScudW5kZXJzY29yZSgpOyAgICAgLy8gJ2Nzc19jbGFzc19uYW1lJ1xuICdteSBmYXZvcml0ZSBpdGVtcycudW5kZXJzY29yZSgpOyAgLy8gJ215X2Zhdm9yaXRlX2l0ZW1zJ1xuIGBgYFxuXG4gQG1ldGhvZCB1bmRlcnNjb3JlXG4gQHBhcmFtIHtTdHJpbmd9IHN0ciBUaGUgc3RyaW5nIHRvIHVuZGVyc2NvcmUuXG4gQHJldHVybiB7U3RyaW5nfSB0aGUgdW5kZXJzY29yZWQgc3RyaW5nLlxuICovXG5leHBvcnQgZnVuY3Rpb24gdW5kZXJzY29yZShzdHI6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBzdHJcbiAgICAucmVwbGFjZShTVFJJTkdfVU5ERVJTQ09SRV9SRUdFWFBfMSwgJyQxXyQyJylcbiAgICAucmVwbGFjZShTVFJJTkdfVU5ERVJTQ09SRV9SRUdFWFBfMiwgJ18nKVxuICAgIC50b0xvd2VyQ2FzZSgpO1xufVxuXG4vKipcbiBSZXR1cm5zIHRoZSBDYXBpdGFsaXplZCBmb3JtIG9mIGEgc3RyaW5nXG5cbiBgYGBqYXZhc2NyaXB0XG4gJ2lubmVySFRNTCcuY2FwaXRhbGl6ZSgpICAgICAgICAgLy8gJ0lubmVySFRNTCdcbiAnYWN0aW9uX25hbWUnLmNhcGl0YWxpemUoKSAgICAgICAvLyAnQWN0aW9uX25hbWUnXG4gJ2Nzcy1jbGFzcy1uYW1lJy5jYXBpdGFsaXplKCkgICAgLy8gJ0Nzcy1jbGFzcy1uYW1lJ1xuICdteSBmYXZvcml0ZSBpdGVtcycuY2FwaXRhbGl6ZSgpIC8vICdNeSBmYXZvcml0ZSBpdGVtcydcbiBgYGBcblxuIEBtZXRob2QgY2FwaXRhbGl6ZVxuIEBwYXJhbSB7U3RyaW5nfSBzdHIgVGhlIHN0cmluZyB0byBjYXBpdGFsaXplLlxuIEByZXR1cm4ge1N0cmluZ30gVGhlIGNhcGl0YWxpemVkIHN0cmluZy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNhcGl0YWxpemUoc3RyOiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gc3RyLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgc3RyLnN1YnN0cigxKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdyb3VwKG5hbWU6IHN0cmluZywgZ3JvdXA6IHN0cmluZyB8IHVuZGVmaW5lZCkge1xuICByZXR1cm4gZ3JvdXAgPyBgJHtncm91cH0vJHtuYW1lfWAgOiBuYW1lO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZmVhdHVyZVBhdGgoXG4gIGdyb3VwOiBib29sZWFuIHwgdW5kZWZpbmVkLFxuICBmbGF0OiBib29sZWFuIHwgdW5kZWZpbmVkLFxuICBwYXRoOiBzdHJpbmcsXG4gIG5hbWU6IHN0cmluZ1xuKSB7XG4gIGlmIChncm91cCAmJiAhZmxhdCkge1xuICAgIHJldHVybiBgLi4vLi4vJHtwYXRofS8ke25hbWV9L2A7XG4gIH1cblxuICByZXR1cm4gZ3JvdXAgPyBgLi4vJHtwYXRofS9gIDogJy4vJztcbn1cbiJdfQ==