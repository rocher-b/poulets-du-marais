import { Routes } from '@angular/router';
import { CustomerComponent } from '../component/customer.component';

export const CUSTOMER_ROUTES: Routes = [
    {
        path: 'customer',
        component: CustomerComponent,
        // children: [
        //     {
        //         path: 'list',
        //         component: CustomerListComponent,
        //     }
        // ]
    }
];
