/// <amd-module name="@ngrx/schematics/schematics-core/utility/parse-name" />
import { Path } from '@angular-devkit/core';
export interface Location {
    name: string;
    path: Path;
}
export declare function parseName(path: string, name: string): Location;
