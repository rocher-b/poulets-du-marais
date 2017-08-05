import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { CustomerComponent } from './component/customer.component';
import { HttpClientModule } from '@angular/common/http';
import { CustomerService } from './service/customer.service';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
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
            providers: [
                CustomerService
            ]
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

