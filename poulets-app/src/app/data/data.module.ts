import { CommonModule } from '@angular/common';
import {ModuleWithProviders, NgModule} from '@angular/core';

import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { DataComponent } from './component/data.component';
import { DATA_ROUTES } from './route/data.route';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forRoot(DATA_ROUTES),
        SharedModule,
    ],
    declarations: [
        DataComponent
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

