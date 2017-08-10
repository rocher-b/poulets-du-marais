import { NgModule } from '@angular/core';
import { MdButtonModule, MdCheckboxModule, MdCardModule, MdChipsModule, MdDialogModule, MdIconModule, MdInputModule, MdMenuModule, MdOptionModule, MdProgressBarModule, MdProgressSpinnerModule, MdSelectModule, MdSidenavModule, MdSnackBarModule, MdTabsModule, MdToolbarModule, MdTooltipModule, OverlayModule } from '@angular/material';

/**
 * Module containing all the used Material components
 * The use of MaterialModule is now deprecated, see https://github.com/angular/material2/releases
 * "MaterialModule (and MaterialRootModule) have been marked as deprecated"
 */

const MATERIAL_MODULES = [
    MdButtonModule,
    MdCardModule,
    MdCheckboxModule,
    MdChipsModule,
    MdDialogModule,
    MdIconModule,
    MdInputModule,
    MdMenuModule,
    MdOptionModule,
    MdProgressBarModule,
    MdProgressSpinnerModule,
    MdSelectModule,
    MdSidenavModule,
    MdSnackBarModule,
    MdTabsModule,
    MdToolbarModule,
    MdTooltipModule,
    OverlayModule
];

@NgModule({
    imports: MATERIAL_MODULES,
    exports: MATERIAL_MODULES
})
export class CustomMaterialModule {
}
