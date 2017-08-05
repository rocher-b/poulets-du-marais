import { Routes } from '@angular/router';
import { CustomerComponent } from '../customer/component/customer.component';
import { ChickenComponent } from '../chicken/component/chicken.component';
import { LayingHenComponent } from '../laying-hen/component/laying-hen.component';

export const DATA_ROUTES: Routes = [
    {
        path: 'chicken',
        component: ChickenComponent
    },
    {
        path: 'customer',
        component: CustomerComponent
    },
    {
        path: 'laying-hen',
        component: LayingHenComponent
    }
];
