import { Routes } from '@angular/router';
import { HENHOUSE_ROUTES } from './henhouse/route/henhouse.route';
import { DELIVERY_ROUTES } from './delivery/route/delivery.route';
import { HomeComponent } from './home/component/home.component';
import { CUSTOMER_ROUTES } from './customer/route/customer.route';

export const APP_ROUTES: Routes = [
    {
        path: '',
        //redirectTo: 'home',
        component: HomeComponent,
        pathMatch: 'full'
    },
    {
        path: 'customers',
        children: CUSTOMER_ROUTES
    },
    {
        path: 'delivery',
        children: DELIVERY_ROUTES
    },
    {
        path: 'henhouse',
        children: HENHOUSE_ROUTES
    }

];
