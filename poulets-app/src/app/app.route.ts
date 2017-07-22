import { Routes } from '@angular/router';
import { DATA_ROUTES } from './data/route/data.route';
import { DataComponent } from './data/component/data.component';

export const APP_ROUTES: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'data',
        component: DataComponent,
        children: DATA_ROUTES,
    }

];
