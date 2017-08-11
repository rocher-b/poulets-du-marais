import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';

/**
 * Displays a confirmation dialog and returns a boolean on close
 */
@Component({
    selector: 'app-deletion-dialog',
    templateUrl: './deletion-dialog.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeletionDialogComponent {

    constructor(public dialogRef: MdDialogRef<DeletionDialogComponent>) {
    }

}
