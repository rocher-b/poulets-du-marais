import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { LayingHenListComponent } from './component/laying-hen-list/laying-hen-list.component';
import { LAYING_HEN_ROUTES } from './route/laying-hen.route';
import { LayingHenService } from './service/laying-hen.service';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        RouterModule.forRoot(LAYING_HEN_ROUTES),
        SharedModule,
    ],
    declarations: [
        LayingHenListComponent
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

