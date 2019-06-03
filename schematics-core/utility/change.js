(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@ngrx/schematics/schematics-core/utility/change", ["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * An operation that does nothing.
     */
    class NoopChange {
        constructor() {
            this.description = 'No operation.';
            this.order = Infinity;
            this.path = null;
        }
        apply() {
            return Promise.resolve();
        }
    }
    exports.NoopChange = NoopChange;
    /**
     * Will add text to the source code.
     */
    class InsertChange {
        constructor(path, pos, toAdd) {
            this.path = path;
            this.pos = pos;
            this.toAdd = toAdd;
            if (pos < 0) {
                throw new Error('Negative positions are invalid');
            }
            this.description = `Inserted ${toAdd} into position ${pos} of ${path}`;
            this.order = pos;
        }
        /**
         * This method does not insert spaces if there is none in the original string.
         */
        apply(host) {
            return host.read(this.path).then(content => {
                const prefix = content.substring(0, this.pos);
                const suffix = content.substring(this.pos);
                return host.write(this.path, `${prefix}${this.toAdd}${suffix}`);
            });
        }
    }
    exports.InsertChange = InsertChange;
    /**
     * Will remove text from the source code.
     */
    class RemoveChange {
        constructor(path, pos, end) {
            this.path = path;
            this.pos = pos;
            this.end = end;
            if (pos < 0 || end < 0) {
                throw new Error('Negative positions are invalid');
            }
            this.description = `Removed text in position ${pos} to ${end} of ${path}`;
            this.order = pos;
        }
        apply(host) {
            return host.read(this.path).then(content => {
                const prefix = content.substring(0, this.pos);
                const suffix = content.substring(this.end);
                // TODO: throw error if toRemove doesn't match removed string.
                return host.write(this.path, `${prefix}${suffix}`);
            });
        }
    }
    exports.RemoveChange = RemoveChange;
    /**
     * Will replace text from the source code.
     */
    class ReplaceChange {
        constructor(path, pos, oldText, newText) {
            this.path = path;
            this.pos = pos;
            this.oldText = oldText;
            this.newText = newText;
            if (pos < 0) {
                throw new Error('Negative positions are invalid');
            }
            this.description = `Replaced ${oldText} into position ${pos} of ${path} with ${newText}`;
            this.order = pos;
        }
        apply(host) {
            return host.read(this.path).then(content => {
                const prefix = content.substring(0, this.pos);
                const suffix = content.substring(this.pos + this.oldText.length);
                const text = content.substring(this.pos, this.pos + this.oldText.length);
                if (text !== this.oldText) {
                    return Promise.reject(new Error(`Invalid replace: "${text}" != "${this.oldText}".`));
                }
                // TODO: throw error if oldText doesn't match removed string.
                return host.write(this.path, `${prefix}${this.newText}${suffix}`);
            });
        }
    }
    exports.ReplaceChange = ReplaceChange;
    function createReplaceChange(sourceFile, path, node, oldText, newText) {
        return new ReplaceChange(path, node.getStart(sourceFile), oldText, newText);
    }
    exports.createReplaceChange = createReplaceChange;
    function createChangeRecorder(tree, path, changes) {
        const recorder = tree.beginUpdate(path);
        for (const change of changes) {
            if (change instanceof InsertChange) {
                recorder.insertLeft(change.pos, change.toAdd);
            }
            else if (change instanceof RemoveChange) {
                recorder.remove(change.pos, change.end - change.pos);
            }
            else if (change instanceof ReplaceChange) {
                recorder.remove(change.pos, change.oldText.length);
                recorder.insertLeft(change.pos, change.newText);
            }
        }
        return recorder;
    }
    exports.createChangeRecorder = createChangeRecorder;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhbmdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9zY2hlbWF0aWNzL3NjaGVtYXRpY3MtY29yZS91dGlsaXR5L2NoYW5nZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztJQWdDQTs7T0FFRztJQUNILE1BQWEsVUFBVTtRQUF2QjtZQUNFLGdCQUFXLEdBQUcsZUFBZSxDQUFDO1lBQzlCLFVBQUssR0FBRyxRQUFRLENBQUM7WUFDakIsU0FBSSxHQUFHLElBQUksQ0FBQztRQUlkLENBQUM7UUFIQyxLQUFLO1lBQ0gsT0FBTyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDM0IsQ0FBQztLQUNGO0lBUEQsZ0NBT0M7SUFFRDs7T0FFRztJQUNILE1BQWEsWUFBWTtRQUl2QixZQUFtQixJQUFZLEVBQVMsR0FBVyxFQUFTLEtBQWE7WUFBdEQsU0FBSSxHQUFKLElBQUksQ0FBUTtZQUFTLFFBQUcsR0FBSCxHQUFHLENBQVE7WUFBUyxVQUFLLEdBQUwsS0FBSyxDQUFRO1lBQ3ZFLElBQUksR0FBRyxHQUFHLENBQUMsRUFBRTtnQkFDWCxNQUFNLElBQUksS0FBSyxDQUFDLGdDQUFnQyxDQUFDLENBQUM7YUFDbkQ7WUFDRCxJQUFJLENBQUMsV0FBVyxHQUFHLFlBQVksS0FBSyxrQkFBa0IsR0FBRyxPQUFPLElBQUksRUFBRSxDQUFDO1lBQ3ZFLElBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO1FBQ25CLENBQUM7UUFFRDs7V0FFRztRQUNILEtBQUssQ0FBQyxJQUFVO1lBQ2QsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ3pDLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDOUMsTUFBTSxNQUFN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LENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ25ELFFBQVEsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDakQ7U0FDRjtRQUNELE9BQU8sUUFBUSxDQUFDO0lBQ2xCLENBQUM7SUFqQkQsb0RBaUJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgdHMgZnJvbSAndHlwZXNjcmlwdCc7XG5pbXBvcnQgeyBUcmVlLCBVcGRhdGVSZWNvcmRlciB9IGZyb20gJ0Bhbmd1bGFyLWRldmtpdC9zY2hlbWF0aWNzJztcbmltcG9ydCB7IFBhdGggfSBmcm9tICdAYW5ndWxhci1kZXZraXQvY29yZSc7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBmaWxlICovXG4vKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5leHBvcnQgaW50ZXJmYWNlIEhvc3Qge1xuICB3cml0ZShwYXRoOiBzdHJpbmcsIGNvbnRlbnQ6IHN0cmluZyk6IFByb21pc2U8dm9pZD47XG4gIHJlYWQocGF0aDogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIENoYW5nZSB7XG4gIGFwcGx5KGhvc3Q6IEhvc3QpOiBQcm9taXNlPHZvaWQ+O1xuXG4gIC8vIFRoZSBmaWxlIHRoaXMgY2hhbmdlIHNob3VsZCBiZSBhcHBsaWVkIHRvLiBTb21lIGNoYW5nZXMgbWlnaHQgbm90IGFwcGx5IHRvXG4gIC8vIGEgZmlsZSAobWF5YmUgdGhlIGNvbmZpZykuXG4gIHJlYWRvbmx5IHBhdGg6IHN0cmluZyB8IG51bGw7XG5cbiAgLy8gVGhlIG9yZGVyIHRoaXMgY2hhbmdlIHNob3VsZCBiZSBhcHBsaWVkLiBOb3JtYWxseSB0aGUgcG9zaXRpb24gaW5zaWRlIHRoZSBmaWxlLlxuICAvLyBDaGFuZ2VzIGFyZSBhcHBsaWVkIGZyb20gdGhlIGJvdHRvbSBvZiBhIGZpbGUgdG8gdGhlIHRvcC5cbiAgcmVhZG9ubHkgb3JkZXI6IG51bWJlcjtcblxuICAvLyBUaGUgZGVzY3JpcHRpb24gb2YgdGhpcyBjaGFuZ2UuIFRoaXMgd2lsbCBiZSBvdXRwdXR0ZWQgaW4gYSBkcnkgb3IgdmVyYm9zZSBydW4uXG4gIHJlYWRvbmx5IGRlc2NyaXB0aW9uOiBzdHJpbmc7XG59XG5cbi8qKlxuICogQW4gb3BlcmF0aW9uIHRoYXQgZG9lcyBub3RoaW5nLlxuICovXG5leHBvcnQgY2xhc3MgTm9vcENoYW5nZSBpbXBsZW1lbnRzIENoYW5nZSB7XG4gIGRlc2NyaXB0aW9uID0gJ05vIG9wZXJhdGlvbi4nO1xuICBvcmRlciA9IEluZmluaXR5O1xuICBwYXRoID0gbnVsbDtcbiAgYXBwbHkoKSB7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICB9XG59XG5cbi8qKlxuICogV2lsbCBhZGQgdGV4dCB0byB0aGUgc291cmNlIGNvZGUuXG4gKi9cbmV4cG9ydCBjbGFzcyBJbnNlcnRDaGFuZ2UgaW1wbGVtZW50cyBDaGFuZ2Uge1xuICBvcmRlcjogbnVtYmVyO1xuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBwYXRoOiBzdHJpbmcsIHB1YmxpYyBwb3M6IG51bWJlciwgcHVibGljIHRvQWRkOiBzdHJpbmcpIHtcbiAgICBpZiAocG9zIDwgMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdOZWdhdGl2ZSBwb3NpdGlvbnMgYXJlIGludmFsaWQnKTtcbiAgICB9XG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IGBJbnNlcnRlZCAke3RvQWRkfSBpbnRvIHBvc2l0aW9uICR7cG9zfSBvZiAke3BhdGh9YDtcbiAgICB0aGlzLm9yZGVyID0gcG9zO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgbWV0aG9kIGRvZXMgbm90IGluc2VydCBzcGFjZXMgaWYgdGhlcmUgaXMgbm9uZSBpbiB0aGUgb3JpZ2luYWwgc3RyaW5nLlxuICAgKi9cbiAgYXBwbHkoaG9zdDogSG9zdCkge1xuICAgIHJldHVybiBob3N0LnJlYWQodGhpcy5wYXRoKS50aGVuKGNvbnRlbnQgPT4ge1xuICAgICAgY29uc3QgcHJlZml4ID0gY29udGVudC5zdWJzdHJpbmcoMCwgdGhpcy5wb3MpO1xuICAgICAgY29uc3Qgc3VmZml4ID0gY29udGVudC5zdWJzdHJpbmcodGhpcy5wb3MpO1xuXG4gICAgICByZXR1cm4gaG9zdC53cml0ZSh0aGlzLnBhdGgsIGAke3ByZWZpeH0ke3RoaXMudG9BZGR9JHtzdWZmaXh9YCk7XG4gICAgfSk7XG4gIH1cbn1cblxuLyoqXG4gKiBXaWxsIHJlbW92ZSB0ZXh0IGZyb20gdGhlIHNvdXJjZSBjb2RlLlxuICovXG5leHBvcnQgY2xhc3MgUmVtb3ZlQ2hhbmdlIGltcGxlbWVudHMgQ2hhbmdlIHtcbiAgb3JkZXI6IG51bWJlcjtcbiAgZGVzY3JpcHRpb246IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgcGF0aDogc3RyaW5nLCBwdWJsaWMgcG9zOiBudW1iZXIsIHB1YmxpYyBlbmQ6IG51bWJlcikge1xuICAgIGlmIChwb3MgPCAwIHx8IGVuZCA8IDApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTmVnYXRpdmUgcG9zaXRpb25zIGFyZSBpbnZhbGlkJyk7XG4gICAgfVxuICAgIHRoaXMuZGVzY3JpcHRpb24gPSBgUmVtb3ZlZCB0ZXh0IGluIHBvc2l0aW9uICR7cG9zfSB0byAke2VuZH0gb2YgJHtwYXRofWA7XG4gICAgdGhpcy5vcmRlciA9IHBvcztcbiAgfVxuXG4gIGFwcGx5KGhvc3Q6IEhvc3QpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gaG9zdC5yZWFkKHRoaXMucGF0aCkudGhlbihjb250ZW50ID0+IHtcbiAgICAgIGNvbnN0IHByZWZpeCA9IGNvbnRlbnQuc3Vic3RyaW5nKDAsIHRoaXMucG9zKTtcbiAgICAgIGNvbnN0IHN1ZmZpeCA9IGNvbnRlbnQuc3Vic3RyaW5nKHRoaXMuZW5kKTtcblxuICAgICAgLy8gVE9ETzogdGhyb3cgZXJyb3IgaWYgdG9SZW1vdmUgZG9lc24ndCBtYXRjaCByZW1vdmVkIHN0cmluZy5cbiAgICAgIHJldHVybiBob3N0LndyaXRlKHRoaXMucGF0aCwgYCR7cHJlZml4fSR7c3VmZml4fWApO1xuICAgIH0pO1xuICB9XG59XG5cbi8qKlxuICogV2lsbCByZXBsYWNlIHRleHQgZnJvbSB0aGUgc291cmNlIGNvZGUuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZXBsYWNlQ2hhbmdlIGltcGxlbWVudHMgQ2hhbmdlIHtcbiAgb3JkZXI6IG51bWJlcjtcbiAgZGVzY3JpcHRpb246IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgcGF0aDogc3RyaW5nLFxuICAgIHB1YmxpYyBwb3M6IG51bWJlcixcbiAgICBwdWJsaWMgb2xkVGV4dDogc3RyaW5nLFxuICAgIHB1YmxpYyBuZXdUZXh0OiBzdHJpbmdcbiAgKSB7XG4gICAgaWYgKHBvcyA8IDApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTmVnYXRpdmUgcG9zaXRpb25zIGFyZSBpbnZhbGlkJyk7XG4gICAgfVxuICAgIHRoaXMuZGVzY3JpcHRpb24gPSBgUmVwbGFjZWQgJHtvbGRUZXh0fSBpbnRvIHBvc2l0aW9uICR7cG9zfSBvZiAke3BhdGh9IHdpdGggJHtuZXdUZXh0fWA7XG4gICAgdGhpcy5vcmRlciA9IHBvcztcbiAgfVxuXG4gIGFwcGx5KGhvc3Q6IEhvc3QpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gaG9zdC5yZWFkKHRoaXMucGF0aCkudGhlbihjb250ZW50ID0+IHtcbiAgICAgIGNvbnN0IHByZWZpeCA9IGNvbnRlbnQuc3Vic3RyaW5nKDAsIHRoaXMucG9zKTtcbiAgICAgIGNvbnN0IHN1ZmZpeCA9IGNvbnRlbnQuc3Vic3RyaW5nKHRoaXMucG9zICsgdGhpcy5vbGRUZXh0Lmxlbmd0aCk7XG4gICAgICBjb25zdCB0ZXh0ID0gY29udGVudC5zdWJzdHJpbmcodGhpcy5wb3MsIHRoaXMucG9zICsgdGhpcy5vbGRUZXh0Lmxlbmd0aCk7XG5cbiAgICAgIGlmICh0ZXh0ICE9PSB0aGlzLm9sZFRleHQpIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KFxuICAgICAgICAgIG5ldyBFcnJvcihgSW52YWxpZCByZXBsYWNlOiBcIiR7dGV4dH1cIiAhPSBcIiR7dGhpcy5vbGRUZXh0fVwiLmApXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIC8vIFRPRE86IHRocm93IGVycm9yIGlmIG9sZFRleHQgZG9lc24ndCBtYXRjaCByZW1vdmVkIHN0cmluZy5cbiAgICAgIHJldHVybiBob3N0LndyaXRlKHRoaXMucGF0aCwgYCR7cHJlZml4fSR7dGhpcy5uZXdUZXh0fSR7c3VmZml4fWApO1xuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVSZXBsYWNlQ2hhbmdlKFxuICBzb3VyY2VGaWxlOiB0cy5Tb3VyY2VGaWxlLFxuICBwYXRoOiBQYXRoLFxuICBub2RlOiB0cy5Ob2RlLFxuICBvbGRUZXh0OiBzdHJpbmcsXG4gIG5ld1RleHQ6IHN0cmluZ1xuKTogUmVwbGFjZUNoYW5nZSB7XG4gIHJldHVybiBuZXcgUmVwbGFjZUNoYW5nZShwYXRoLCBub2RlLmdldFN0YXJ0KHNvdXJjZUZpbGUpLCBvbGRUZXh0LCBuZXdUZXh0KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUNoYW5nZVJlY29yZGVyKFxuICB0cmVlOiBUcmVlLFxuICBwYXRoOiBzdHJpbmcsXG4gIGNoYW5nZXM6IENoYW5nZVtdXG4pOiBVcGRhdGVSZWNvcmRlciB7XG4gIGNvbnN0IHJlY29yZGVyID0gdHJlZS5iZWdpblVwZGF0ZShwYXRoKTtcbiAgZm9yIChjb25zdCBjaGFuZ2Ugb2YgY2hhbmdlcykge1xuICAgIGlmIChjaGFuZ2UgaW5zdGFuY2VvZiBJbnNlcnRDaGFuZ2UpIHtcbiAgICAgIHJlY29yZGVyLmluc2VydExlZnQoY2hhbmdlLnBvcywgY2hhbmdlLnRvQWRkKTtcbiAgICB9IGVsc2UgaWYgKGNoYW5nZSBpbnN0YW5jZW9mIFJlbW92ZUNoYW5nZSkge1xuICAgICAgcmVjb3JkZXIucmVtb3ZlKGNoYW5nZS5wb3MsIGNoYW5nZS5lbmQgLSBjaGFuZ2UucG9zKTtcbiAgICB9IGVsc2UgaWYgKGNoYW5nZSBpbnN0YW5jZW9mIFJlcGxhY2VDaGFuZ2UpIHtcbiAgICAgIHJlY29yZGVyLnJlbW92ZShjaGFuZ2UucG9zLCBjaGFuZ2Uub2xkVGV4dC5sZW5ndGgpO1xuICAgICAgcmVjb3JkZXIuaW5zZXJ0TGVmdChjaGFuZ2UucG9zLCBjaGFuZ2UubmV3VGV4dCk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZWNvcmRlcjtcbn1cbiJdfQ==