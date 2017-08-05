import { Routes } from '@angular/router';
import { DATA_ROUTES } from './data/route/data.route';

export const APP_ROUTES: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'data',
        children: DATA_ROUTES,
    }

];
