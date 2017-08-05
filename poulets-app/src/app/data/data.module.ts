import { CommonModule } from '@angular/common';
import {ModuleWithProviders, NgModule} from '@angular/core';

import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { DATA_ROUTES } from './route/data.route';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forRoot(DATA_ROUTES),
        SharedModule,
    ],
    declarations: [
    ],
    exports: []
})
export class DataModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: DataRootModule,
            providers: []
        };
    }
}

@NgModule({
    imports: [
        DataModule
    ],
    exports: [DataModule]
})
export class DataRootModule {
}

