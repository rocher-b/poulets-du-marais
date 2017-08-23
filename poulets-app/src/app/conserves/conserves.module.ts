import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MousseComponent } from './component/mousse/mousse.component';
import { PateComponent } from './component/pate/pate.component';
import { RillettesComponent } from './component/rillettes/rillettes.component';
import { TerrineComponent } from './component/terrine/terrine.component';
import { CONSERVES_ROUTES } from './route/conserves.route';

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        RouterModule.forRoot(CONSERVES_ROUTES),
        SharedModule,
    ],

    declarations: [
        MousseComponent,
        PateComponent,
        RillettesComponent,
        TerrineComponent
    ],
    exports: []

})

export class ConservesModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: ConservesRootModule,
            providers: []
        };
    }
}

@NgModule({
    imports: [
        ConservesModule
    ],
    exports: [ConservesModule]
})
export class ConservesRootModule {
}


