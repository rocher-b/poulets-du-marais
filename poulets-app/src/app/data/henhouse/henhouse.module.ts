import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { HenhouseService } from './service/henhouse.service';
import { HenhouseListComponent } from './component/henhouse-list/henhouse-list.component';
import { HenhouseDetailComponent } from './component/henhouse-detail/henhouse-detail.component';
import { RouterModule } from "@angular/router";
import { HENHOUSE_ROUTES } from './route/henhouse.route';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        SharedModule,
        RouterModule.forRoot(HENHOUSE_ROUTES),
],
    declarations: [
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

