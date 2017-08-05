import { Routes } from '@angular/router';
import { HenhouseListComponent } from '../henhouse-list/henhouse-list.component';
import { HenhouseDetailComponent } from '../henhouse-detail/henhouse-detail.component';

export const HENHOUSE_ROUTES: Routes = [
    {
        path: 'list',
        component: HenhouseListComponent
    },
    {
        path: ':id',
        component: HenhouseDetailComponent
    }
];
