import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { HenhouseService } from './service/henhouse.service';
import { HenhouseListComponent } from './henhouse-list/henhouse-list.component';
import { HenhouseDetailComponent } from './henhouse-detail/henhouse-detail.component';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        SharedModule
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

