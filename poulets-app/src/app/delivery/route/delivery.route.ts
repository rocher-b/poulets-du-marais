import { Routes } from '@angular/router';
import { DeliveryListComponent } from '../component/delivery-list/delivery-list.component';
import { DeliveryFormComponent } from '../component/delivery-form/delivery-form.component';

export const DELIVERY_ROUTES: Routes = [
    {
        path: 'list',
        component: DeliveryListComponent
    },
    {
        path: 'create',
        component: DeliveryFormComponent
    },
    {
        path: ':id/edit',
        component: DeliveryFormComponent
    }
];
