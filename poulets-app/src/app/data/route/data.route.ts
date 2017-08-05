import { Routes } from '@angular/router';
import { CustomerComponent } from '../customer/component/customer.component';
import { ChickenComponent } from '../chicken/component/chicken.component';
import { LayingHenComponent } from '../laying-hen/component/laying-hen.component';
import { HENHOUSE_ROUTES } from '../henhouse/route/henhouse.route';

export const DATA_ROUTES: Routes = [
    {
        path: 'chicken',
        component: ChickenComponent
    },
    {
        path: 'customers',
        component: CustomerComponent
    },
    {
        path: 'laying-hens',
        component: LayingHenComponent
    },
    {
        path: 'henhouses',
        children: HENHOUSE_ROUTES
    }
];
