import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { ChickenFormComponent } from './component/chicken-form/chicken-form.component';
import { ChickenListComponent } from './component/chicken-list/chicken-list.component';
import { CHICKEN_ROUTES } from './route/chicken.route';
import { ChickenService } from './service/chicken.service';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        RouterModule.forRoot(CHICKEN_ROUTES),
        SharedModule,
    ],
    declarations: [
        ChickenFormComponent,
        ChickenListComponent
    ],
    exports: []
})
export class ChickenModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: ChickenRootModule,
            providers: [
                ChickenService
            ]
        };
    }
}

@NgModule({
    imports: [
        ChickenModule
    ],
    exports: [ChickenModule]
})
export class ChickenRootModule {
}

