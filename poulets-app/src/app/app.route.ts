import { Routes } from '@angular/router';
import { DATA_ROUTES } from './data/route/data.route';
import { DELIVERY_ROUTES } from './delivery/route/delivery.route';
import { HomeComponent } from './home/component/home.component';

export const APP_ROUTES: Routes = [
    {
        path: '',
        //redirectTo: 'home',
        component: HomeComponent,
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
