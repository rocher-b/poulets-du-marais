import { Routes } from '@angular/router';
import { CustomerFormComponent } from '../component/customer-form/customer-form.component';
import { CustomerListComponent } from '../customer-list/customer-list.component';

export const CUSTOMER_ROUTES: Routes = [
    {
        path: 'list',
        component: CustomerListComponent
    },
    {
        path: 'create',
        component: CustomerFormComponent
    },
    {
        path: ':id/edit',
        component: CustomerFormComponent
    }
];
