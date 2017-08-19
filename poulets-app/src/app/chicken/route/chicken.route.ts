import { Routes } from '@angular/router';
import { ChickenFormComponent } from '../component/chicken-form/chicken-form.component';
import { ChickenListComponent } from '../component/chicken-list/chicken-list.component';

export const CHICKEN_ROUTES: Routes = [
    {
        path: 'list',
        component: ChickenListComponent
    },
    {
        path: ':id/edit',
        component: ChickenFormComponent
    }
];


