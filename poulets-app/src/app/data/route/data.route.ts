import { Routes } from '@angular/router';
import { DataComponent } from '../component/data.component';
import { CustomerComponent } from '../../customer/component/customer.component';

export const DATA_ROUTES: Routes = [
    {
        path: 'customer',
        component: CustomerComponent
    }
];
