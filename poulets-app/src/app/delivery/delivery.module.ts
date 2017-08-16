import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from "@angular/router";
import { DeliveryListComponent } from './component/delivery-list/delivery-list.component';
import { DELIVERY_ROUTES } from './route/delivery.route';
import { SharedModule } from '../shared/shared.module';
import { DeliveryService } from './service/delivery.service';
import { DeliveryFormComponent } from './component/delivery-form/delivery-form.component';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        SharedModule,
        RouterModule.forRoot(DELIVERY_ROUTES),
    ],
    declarations: [
        DeliveryFormComponent,
        DeliveryListComponent
    ],
    exports: []
})
export class DeliveryModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: DeliveryRootModule,
            providers: [
                DeliveryService
            ]
        };
    }
}

@NgModule({
    imports: [
        DeliveryModule
    ],
    exports: [DeliveryModule]
})
export class DeliveryRootModule {
}

