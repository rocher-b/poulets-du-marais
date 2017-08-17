import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CustomerListComponent } from './component/customer-list/customer-list.component';
import { HttpClientModule } from '@angular/common/http';
import { CustomerService } from './service/customer.service';
import { CustomerFormComponent } from './component/customer-form/customer-form.component';
import { CUSTOMER_ROUTES } from './route/customer.route';
import { RouterModule } from "@angular/router";

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        RouterModule.forRoot(CUSTOMER_ROUTES),
        SharedModule
    ],
    declarations: [
        CustomerListComponent,
        CustomerFormComponent
    ],
    schemas: [NO_ERRORS_SCHEMA],
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

