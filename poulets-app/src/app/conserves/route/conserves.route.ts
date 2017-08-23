import { Routes } from '@angular/router';
import { MousseComponent } from '../component/mousse/mousse.component';
import { PateComponent } from '../component/pate/pate.component';
import { RillettesComponent } from '../component/rillettes/rillettes.component';
import { TerrineComponent } from '../component/terrine/terrine.component';

export const CONSERVES_ROUTES: Routes = [
    {
        path: 'mousse',
        component: MousseComponent,
    },
{
        path: 'pate',
        component: PateComponent,
    },
{
        path: 'rillettes',
        component: RillettesComponent,
    },
{
        path: 'terrine',
        component: TerrineComponent,
    }
];
