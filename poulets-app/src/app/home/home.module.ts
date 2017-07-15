import { CommonModule } from '@angular/common';
import {ModuleWithProviders, NgModule} from '@angular/core';

import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './component/home.component';
import {HOME_ROUTES} from "./route/home.route";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forRoot(HOME_ROUTES),
        SharedModule,
    ],
    declarations: [
        HomeComponent
    ],
    exports: []
})
export class HomeModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: HomeRootModule,
            providers: []
        };
    }
}

@NgModule({
    imports: [
        HomeModule
    ],
    exports: [HomeModule]
})
export class HomeRootModule {
}

