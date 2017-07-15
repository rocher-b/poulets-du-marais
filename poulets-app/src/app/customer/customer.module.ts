import { CommonModule } from '@angular/common';
import {ModuleWithProviders, NgModule} from '@angular/core';

import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { CustomerComponent } from './component/customer.component';
import {CUSTOMER_ROUTES} from "./route/customer.route";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forRoot(CUSTOMER_ROUTES),
        SharedModule,
    ],
    declarations: [
        CustomerComponent
    ],
    exports: []
})
export class CustomerModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: CustomerRootModule,
            providers: []
        };
    }
}

@NgModule({
    imports: [
        CustomerModule
    ],
    exports: [CustomerModule]
})
export class CustomerRootModule {
}

