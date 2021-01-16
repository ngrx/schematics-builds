"use strict";
exports.__esModule = true;
exports.createReducers = void 0;
function createReducers(tree, path, project) {
    if (project === void 0) { project = 'bar'; }
    tree.create(path || "/projects/" + project + "/src/app/reducers/index.ts", "\n    import {\n      ActionReducer,\n      ActionReducerMap,\n      createFeatureSelector,\n      createSelector,\n      MetaReducer\n    } from '@ngrx/store';\n    import { environment } from '../../environments/environment';\n    \n    export interface State {\n    \n    }\n    \n    export const reducers: ActionReducerMap<State> = {\n    \n    };\n    \n    \n    export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];\n  ");
    return tree;
}
exports.createReducers = createReducers;
//# sourceMappingURL=create-reducers.js.map