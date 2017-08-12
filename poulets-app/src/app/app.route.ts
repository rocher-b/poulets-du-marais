import { Routes } from '@angular/router';
import { DATA_ROUTES } from './data/route/data.route';
import { DELIVERY_ROUTES } from './delivery/route/delivery.route';

export const APP_ROUTES: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'delivery',
        children: DELIVERY_ROUTES
    },
    {
        path: 'data',
        children: DATA_ROUTES
    }

];
