import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
    selector: 'app-edit-dialog',
    templateUrl: './edit-dialog.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditDialogComponent {

    constructor(public dialogRef: MdDialogRef<EditDialogComponent>) {
    }

}
