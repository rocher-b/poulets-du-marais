import { Routes } from '@angular/router';
import { CustomerFormComponent } from './component/customer-form/customer-form.component';
import { CustomerComponent } from './component/customer.component';

export const CUSTOMER_ROUTES: Routes = [
    {
        path: 'list',
        component: CustomerComponent,
    },
    {
        path: ':id/edit',
        component: CustomerFormComponent
    }
];
