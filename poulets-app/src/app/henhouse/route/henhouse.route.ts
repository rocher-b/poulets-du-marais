import { Routes } from '@angular/router';
import { ChickenComponent } from '../../chicken/component/chicken.component';
import { LayingHenComponent } from '../../laying-hen/component/laying-hen.component';
import { HenhouseListComponent } from '../component/henhouse-list/henhouse-list.component';
import { HenhouseDetailComponent } from '../component/henhouse-detail/henhouse-detail.component';
import { HenhouseFormComponent } from '../component/henhouse-form/henhouse-form.component';

export const HENHOUSE_ROUTES: Routes = [
    {
        path: 'chicken',
        component: ChickenComponent
    },
    {
        path: 'laying-hen',
        component: LayingHenComponent
    },
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
