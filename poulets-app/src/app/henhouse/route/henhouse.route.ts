import { Routes } from '@angular/router';
import { HenhouseDetailComponent } from '../component/henhouse-detail/henhouse-detail.component';
import { HenhouseFormComponent } from '../component/henhouse-form/henhouse-form.component';
import { HenhouseListComponent } from '../component/henhouse-list/henhouse-list.component';

export const HENHOUSE_ROUTES: Routes = [
    {
        path: 'list',
        component: HenhouseListComponent
    },
    {
        path: ':id',
        component: HenhouseDetailComponent
    },
    {
        path: ':id/edit',
        component: HenhouseFormComponent
    }
];
