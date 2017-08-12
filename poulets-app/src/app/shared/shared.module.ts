import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DeletionDialogComponent } from './component/deletion-dialog/deletion-dialog.component';
import { InlineEditComponent } from './component/inline-edit/inline-edit.component';
import { MenuComponent } from './component/menu/menu.component';
import { CustomMaterialModule } from './custom-material.module';

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
        RouterModule
    ],
    exports: [
        CustomMaterialModule,
        InlineEditComponent,
        NgxDatatableModule,
        NoopAnimationsModule,
        MenuComponent,
        FormsModule,
        ReactiveFormsModule
    ],
    entryComponents: [
        DeletionDialogComponent
    ],
    declarations: [
        DeletionDialogComponent,
        InlineEditComponent,
        MenuComponent
    ],
    providers: []
})
export class SharedModule {
}
