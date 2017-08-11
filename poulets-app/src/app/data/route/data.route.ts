import { Routes } from '@angular/router';
import { ChickenComponent } from '../chicken/component/chicken.component';
import { LayingHenComponent } from '../laying-hen/component/laying-hen.component';
import { HENHOUSE_ROUTES } from '../henhouse/route/henhouse.route';
import { CUSTOMER_ROUTES } from '../customer/route/customer.route';

export const DATA_ROUTES: Routes = [
    {
        path: 'chicken',
        component: ChickenComponent
    },
    {
        path: 'customers',
        children: CUSTOMER_ROUTES
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
