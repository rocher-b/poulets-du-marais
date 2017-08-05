import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { MenuComponent } from './component/menu/menu.component';
import { CustomMaterialModule } from './custom-material.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { EditDialogComponent } from './component/edit-dialog/edit-dialog.component';

/**
 * Module containing everything that needs to be shared accross the app (e.g. confirmation dialog).
 */
@NgModule({
    imports: [
        CommonModule,
        CustomMaterialModule,
        FormsModule,
        NgxDatatableModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
        RouterModule,
    ],
    exports: [
        CustomMaterialModule,
        EditDialogComponent,
        NgxDatatableModule,
        NoopAnimationsModule,
        MenuComponent,
        FormsModule,
        ReactiveFormsModule,
    ],
    entryComponents: [
        EditDialogComponent,
    ],
    declarations: [
        EditDialogComponent,
        MenuComponent,
    ],
    providers: []
})
export class SharedModule {
}
