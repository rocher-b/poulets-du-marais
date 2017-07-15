import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'data',
        redirectTo: '/data',
    }

];
