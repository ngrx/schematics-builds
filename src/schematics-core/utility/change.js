(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@ngrx/schematics/src/schematics-core/utility/change", ["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * An operation that does nothing.
     */
    var NoopChange = /** @class */ (function () {
        function NoopChange() {
            this.description = 'No operation.';
            this.order = Infinity;
            this.path = null;
        }
        NoopChange.prototype.apply = function () {
            return Promise.resolve();
        };
        return NoopChange;
    }());
    exports.NoopChange = NoopChange;
    /**
     * Will add text to the source code.
     */
    var InsertChange = /** @class */ (function () {
        function InsertChange(path, pos, toAdd) {
            this.path = path;
            this.pos = pos;
            this.toAdd = toAdd;
            if (pos < 0) {
                throw new Error('Negative positions are invalid');
            }
            this.description = "Inserted " + toAdd + " into position " + pos + " of " + path;
            this.order = pos;
        }
        /**
         * This method does not insert spaces if there is none in the original string.
         */
        InsertChange.prototype.apply = function (host) {
            var _this = this;
            return host.read(this.path).then(function (content) {
                var prefix = content.substring(0, _this.pos);
                var suffix = content.substring(_this.pos);
                return host.write(_this.path, "" + prefix + _this.toAdd + suffix);
            });
        };
        return InsertChange;
    }());
    exports.InsertChange = InsertChange;
    /**
     * Will remove text from the source code.
     */
    var RemoveChange = /** @class */ (function () {
        function RemoveChange(path, pos, toRemove) {
            this.path = path;
            this.pos = pos;
            this.toRemove = toRemove;
            if (pos < 0) {
                throw new Error('Negative positions are invalid');
            }
            this.description = "Removed " + toRemove + " into position " + pos + " of " + path;
            this.order = pos;
        }
        RemoveChange.prototype.apply = function (host) {
            var _this = this;
            return host.read(this.path).then(function (content) {
                var prefix = content.substring(0, _this.pos);
                var suffix = content.substring(_this.pos + _this.toRemove.length);
                // TODO: throw error if toRemove doesn't match removed string.
                return host.write(_this.path, "" + prefix + suffix);
            });
        };
        return RemoveChange;
    }());
    exports.RemoveChange = RemoveChange;
    /**
     * Will replace text from the source code.
     */
    var ReplaceChange = /** @class */ (function () {
        function ReplaceChange(path, pos, oldText, newText) {
            this.path = path;
            this.pos = pos;
            this.oldText = oldText;
            this.newText = newText;
            if (pos < 0) {
                throw new Error('Negative positions are invalid');
            }
            this.description = "Replaced " + oldText + " into position " + pos + " of " + path + " with " + newText;
            this.order = pos;
        }
        ReplaceChange.prototype.apply = function (host) {
            var _this = this;
            return host.read(this.path).then(function (content) {
                var prefix = content.substring(0, _this.pos);
                var suffix = content.substring(_this.pos + _this.oldText.length);
                var text = content.substring(_this.pos, _this.pos + _this.oldText.length);
                if (text !== _this.oldText) {
                    return Promise.reject(new Error("Invalid replace: \"" + text + "\" != \"" + _this.oldText + "\"."));
                }
                // TODO: throw error if oldText doesn't match removed string.
                return host.write(_this.path, "" + prefix + _this.newText + suffix);
            });
        };
        return ReplaceChange;
    }());
    exports.ReplaceChange = ReplaceChange;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhbmdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9zY2hlbWF0aWNzL3NyYy9zY2hlbWF0aWNzLWNvcmUvdXRpbGl0eS9jaGFuZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7SUE0QkE7O09BRUc7SUFDSDtRQUFBO1lBQ0UsZ0JBQVcsR0FBRyxlQUFlLENBQUM7WUFDOUIsVUFBSyxHQUFHLFFBQVEsQ0FBQztZQUNqQixTQUFJLEdBQUcsSUFBSSxDQUFDO1FBSWQsQ0FBQztRQUhDLDBCQUFLLEdBQUw7WUFDRSxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQzNCLENBQUM7UUFDSCxpQkFBQztJQUFELENBQUMsQUFQRCxJQU9DO0lBUFksZ0NBQVU7SUFTdkI7O09BRUc7SUFDSDtRQUlFLHNCQUFtQixJQUFZLEVBQVMsR0FBVyxFQUFTLEtBQWE7WUFBdEQsU0FBSSxHQUFKLElBQUksQ0FBUTtZQUFTLFFBQUcsR0FBSCxHQUFHLENBQVE7WUFBUyxVQUFLLEdBQUwsS0FBSyxDQUFRO1lBQ3ZFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNaLE1BQU0sSUFBSSxLQUFLLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztZQUNwRCxDQUFDO1lBQ0QsSUFBSSxDQUFDLFdBQVcsR0FBRyxjQUFZLEtBQUssdUJBQWtCLEdBQUcsWUFBTyxJQUFNLENBQUM7WUFDdkUsSUFBSSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7UUFDbkIsQ0FBQztRQUVEOztXQUVHO1FBQ0gsNEJBQUssR0FBTCxVQUFNLElBQVU7WUFBaEIsaUJBT0M7WUFOQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsT0FBTztnQkFDdEMsSUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFD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TSxJQUFJLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFJLENBQUMsR0FBRyxFQUFFLEtBQUksQ0FBQyxHQUFHLEdBQUcsS0FBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFFekUsRUFBRSxDQUFDLENBQUMsSUFBSSxLQUFLLEtBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO29CQUMxQixNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FDbkIsSUFBSSxLQUFLLENBQUMsd0JBQXFCLElBQUksZ0JBQVMsS0FBSSxDQUFDLE9BQU8sUUFBSSxDQUFDLENBQzlELENBQUM7Z0JBQ0osQ0FBQztnQkFFRCw2REFBNkQ7Z0JBQzdELE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUksQ0FBQyxJQUFJLEVBQUUsS0FBRyxNQUFNLEdBQUcsS0FBSSxDQUFDLE9BQU8sR0FBRyxNQUFRLENBQUMsQ0FBQztZQUNwRSxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUM7UUFDSCxvQkFBQztJQUFELENBQUMsQUFqQ0QsSUFpQ0M7SUFqQ1ksc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBpc3RhbmJ1bCBpZ25vcmUgZmlsZSAqL1xuLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBIb3N0IHtcbiAgd3JpdGUocGF0aDogc3RyaW5nLCBjb250ZW50OiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+O1xuICByZWFkKHBhdGg6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nPjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBDaGFuZ2Uge1xuICBhcHBseShob3N0OiBIb3N0KTogUHJvbWlzZTx2b2lkPjtcblxuICAvLyBUaGUgZmlsZSB0aGlzIGNoYW5nZSBzaG91bGQgYmUgYXBwbGllZCB0by4gU29tZSBjaGFuZ2VzIG1pZ2h0IG5vdCBhcHBseSB0b1xuICAvLyBhIGZpbGUgKG1heWJlIHRoZSBjb25maWcpLlxuICByZWFkb25seSBwYXRoOiBzdHJpbmcgfCBudWxsO1xuXG4gIC8vIFRoZSBvcmRlciB0aGlzIGNoYW5nZSBzaG91bGQgYmUgYXBwbGllZC4gTm9ybWFsbHkgdGhlIHBvc2l0aW9uIGluc2lkZSB0aGUgZmlsZS5cbiAgLy8gQ2hhbmdlcyBhcmUgYXBwbGllZCBmcm9tIHRoZSBib3R0b20gb2YgYSBmaWxlIHRvIHRoZSB0b3AuXG4gIHJlYWRvbmx5IG9yZGVyOiBudW1iZXI7XG5cbiAgLy8gVGhlIGRlc2NyaXB0aW9uIG9mIHRoaXMgY2hhbmdlLiBUaGlzIHdpbGwgYmUgb3V0cHV0dGVkIGluIGEgZHJ5IG9yIHZlcmJvc2UgcnVuLlxuICByZWFkb25seSBkZXNjcmlwdGlvbjogc3RyaW5nO1xufVxuXG4vKipcbiAqIEFuIG9wZXJhdGlvbiB0aGF0IGRvZXMgbm90aGluZy5cbiAqL1xuZXhwb3J0IGNsYXNzIE5vb3BDaGFuZ2UgaW1wbGVtZW50cyBDaGFuZ2Uge1xuICBkZXNjcmlwdGlvbiA9ICdObyBvcGVyYXRpb24uJztcbiAgb3JkZXIgPSBJbmZpbml0eTtcbiAgcGF0aCA9IG51bGw7XG4gIGFwcGx5KCkge1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgfVxufVxuXG4vKipcbiAqIFdpbGwgYWRkIHRleHQgdG8gdGhlIHNvdXJjZSBjb2RlLlxuICovXG5leHBvcnQgY2xhc3MgSW5zZXJ0Q2hhbmdlIGltcGxlbWVudHMgQ2hhbmdlIHtcbiAgb3JkZXI6IG51bWJlcjtcbiAgZGVzY3JpcHRpb246IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgcGF0aDogc3RyaW5nLCBwdWJsaWMgcG9zOiBudW1iZXIsIHB1YmxpYyB0b0FkZDogc3RyaW5nKSB7XG4gICAgaWYgKHBvcyA8IDApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTmVnYXRpdmUgcG9zaXRpb25zIGFyZSBpbnZhbGlkJyk7XG4gICAgfVxuICAgIHRoaXMuZGVzY3JpcHRpb24gPSBgSW5zZXJ0ZWQgJHt0b0FkZH0gaW50byBwb3NpdGlvbiAke3Bvc30gb2YgJHtwYXRofWA7XG4gICAgdGhpcy5vcmRlciA9IHBvcztcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIG1ldGhvZCBkb2VzIG5vdCBpbnNlcnQgc3BhY2VzIGlmIHRoZXJlIGlzIG5vbmUgaW4gdGhlIG9yaWdpbmFsIHN0cmluZy5cbiAgICovXG4gIGFwcGx5KGhvc3Q6IEhvc3QpIHtcbiAgICByZXR1cm4gaG9zdC5yZWFkKHRoaXMucGF0aCkudGhlbihjb250ZW50ID0+IHtcbiAgICAgIGNvbnN0IHByZWZpeCA9IGNvbnRlbnQuc3Vic3RyaW5nKDAsIHRoaXMucG9zKTtcbiAgICAgIGNvbnN0IHN1ZmZpeCA9IGNvbnRlbnQuc3Vic3RyaW5nKHRoaXMucG9zKTtcblxuICAgICAgcmV0dXJuIGhvc3Qud3JpdGUodGhpcy5wYXRoLCBgJHtwcmVmaXh9JHt0aGlzLnRvQWRkfSR7c3VmZml4fWApO1xuICAgIH0pO1xuICB9XG59XG5cbi8qKlxuICogV2lsbCByZW1vdmUgdGV4dCBmcm9tIHRoZSBzb3VyY2UgY29kZS5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlbW92ZUNoYW5nZSBpbXBsZW1lbnRzIENoYW5nZSB7XG4gIG9yZGVyOiBudW1iZXI7XG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIHBhdGg6IHN0cmluZyxcbiAgICBwcml2YXRlIHBvczogbnVtYmVyLFxuICAgIHByaXZhdGUgdG9SZW1vdmU6IHN0cmluZ1xuICApIHtcbiAgICBpZiAocG9zIDwgMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdOZWdhdGl2ZSBwb3NpdGlvbnMgYXJlIGludmFsaWQnKTtcbiAgICB9XG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IGBSZW1vdmVkICR7dG9SZW1vdmV9IGludG8gcG9zaXRpb24gJHtwb3N9IG9mICR7cGF0aH1gO1xuICAgIHRoaXMub3JkZXIgPSBwb3M7XG4gIH1cblxuICBhcHBseShob3N0OiBIb3N0KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIGhvc3QucmVhZCh0aGlzLnBhdGgpLnRoZW4oY29udGVudCA9PiB7XG4gICAgICBjb25zdCBwcmVmaXggPSBjb250ZW50LnN1YnN0cmluZygwLCB0aGlzLnBvcyk7XG4gICAgICBjb25zdCBzdWZmaXggPSBjb250ZW50LnN1YnN0cmluZyh0aGlzLnBvcyArIHRoaXMudG9SZW1vdmUubGVuZ3RoKTtcblxuICAgICAgLy8gVE9ETzogdGhyb3cgZXJyb3IgaWYgdG9SZW1vdmUgZG9lc24ndCBtYXRjaCByZW1vdmVkIHN0cmluZy5cbiAgICAgIHJldHVybiBob3N0LndyaXRlKHRoaXMucGF0aCwgYCR7cHJlZml4fSR7c3VmZml4fWApO1xuICAgIH0pO1xuICB9XG59XG5cbi8qKlxuICogV2lsbCByZXBsYWNlIHRleHQgZnJvbSB0aGUgc291cmNlIGNvZGUuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZXBsYWNlQ2hhbmdlIGltcGxlbWVudHMgQ2hhbmdlIHtcbiAgb3JkZXI6IG51bWJlcjtcbiAgZGVzY3JpcHRpb246IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgcGF0aDogc3RyaW5nLFxuICAgIHByaXZhdGUgcG9zOiBudW1iZXIsXG4gICAgcHVibGljIG9sZFRleHQ6IHN0cmluZyxcbiAgICBwdWJsaWMgbmV3VGV4dDogc3RyaW5nXG4gICkge1xuICAgIGlmIChwb3MgPCAwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ05lZ2F0aXZlIHBvc2l0aW9ucyBhcmUgaW52YWxpZCcpO1xuICAgIH1cbiAgICB0aGlzLmRlc2NyaXB0aW9uID0gYFJlcGxhY2VkICR7b2xkVGV4dH0gaW50byBwb3NpdGlvbiAke3Bvc30gb2YgJHtwYXRofSB3aXRoICR7bmV3VGV4dH1gO1xuICAgIHRoaXMub3JkZXIgPSBwb3M7XG4gIH1cblxuICBhcHBseShob3N0OiBIb3N0KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIGhvc3QucmVhZCh0aGlzLnBhdGgpLnRoZW4oY29udGVudCA9PiB7XG4gICAgICBjb25zdCBwcmVmaXggPSBjb250ZW50LnN1YnN0cmluZygwLCB0aGlzLnBvcyk7XG4gICAgICBjb25zdCBzdWZmaXggPSBjb250ZW50LnN1YnN0cmluZyh0aGlzLnBvcyArIHRoaXMub2xkVGV4dC5sZW5ndGgpO1xuICAgICAgY29uc3QgdGV4dCA9IGNvbnRlbnQuc3Vic3RyaW5nKHRoaXMucG9zLCB0aGlzLnBvcyArIHRoaXMub2xkVGV4dC5sZW5ndGgpO1xuXG4gICAgICBpZiAodGV4dCAhPT0gdGhpcy5vbGRUZXh0KSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChcbiAgICAgICAgICBuZXcgRXJyb3IoYEludmFsaWQgcmVwbGFjZTogXCIke3RleHR9XCIgIT0gXCIke3RoaXMub2xkVGV4dH1cIi5gKVxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICAvLyBUT0RPOiB0aHJvdyBlcnJvciBpZiBvbGRUZXh0IGRvZXNuJ3QgbWF0Y2ggcmVtb3ZlZCBzdHJpbmcuXG4gICAgICByZXR1cm4gaG9zdC53cml0ZSh0aGlzLnBhdGgsIGAke3ByZWZpeH0ke3RoaXMubmV3VGV4dH0ke3N1ZmZpeH1gKTtcbiAgICB9KTtcbiAgfVxufVxuIl19