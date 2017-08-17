import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";

import { SharedModule } from '../shared/shared.module';
import { HenhouseDetailComponent } from './component/henhouse-detail/henhouse-detail.component';
import { HenhouseFormComponent } from './component/henhouse-form/henhouse-form.component';
import { HenhouseListComponent } from './component/henhouse-list/henhouse-list.component';
import { HENHOUSE_ROUTES } from './route/henhouse.route';
import { HenhouseService } from './service/henhouse.service';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        SharedModule,
        RouterModule.forRoot(HENHOUSE_ROUTES),
],
    declarations: [
        HenhouseFormComponent,
        HenhouseListComponent,
        HenhouseDetailComponent
    ],
    exports: []
})
export class HenhouseModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: HenhouseRootModule,
            providers: [
                HenhouseService
            ]
        };
    }
}

@NgModule({
    imports: [
        HenhouseModule
    ],
    exports: [HenhouseModule]
})
export class HenhouseRootModule {
}

