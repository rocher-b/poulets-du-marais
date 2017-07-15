import { Routes } from '@angular/router';
import { DataComponent } from '../component/data.component';

export const DATA_ROUTES: Routes = [
    {
        path: 'data',
        component: DataComponent,
        children: [
            {
                path: 'customer',
                redirectTo: 'customer'
            }
        ]
    }
];
