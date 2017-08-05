import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { ChickenService } from './service/chicken.service';
import { ChickenComponent } from './component/chicken.component';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        SharedModule,
    ],
    declarations: [
        ChickenComponent
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

