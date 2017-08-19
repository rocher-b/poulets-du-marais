import { Routes } from '@angular/router';
import { CHICKEN_ROUTES } from './chicken/route/chicken.route';
import { CUSTOMER_ROUTES } from './customer/route/customer.route';
import { DELIVERY_ROUTES } from './delivery/route/delivery.route';
import { HENHOUSE_ROUTES } from './henhouse/route/henhouse.route';
import { HomeComponent } from './home/component/home.component';
import { LAYING_HEN_ROUTES } from './laying-hen/route/laying-hen.route';

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
    },
    {
        path: 'chicken',
        children: CHICKEN_ROUTES
    },
    {
        path: 'laying-hen',
        children: LAYING_HEN_ROUTES
    }
];
