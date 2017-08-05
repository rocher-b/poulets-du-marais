import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { LayingHenService } from './service/laying-hen.service';
import { LayingHenComponent } from './component/laying-hen.component';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        SharedModule,
    ],
    declarations: [
        LayingHenComponent
    ],
    exports: []
})
export class LayingHenModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: LayingHenRootModule,
            providers: [
                LayingHenService
            ]
        };
    }
}

@NgModule({
    imports: [
        LayingHenModule
    ],
    exports: [LayingHenModule]
})
export class LayingHenRootModule {
}

