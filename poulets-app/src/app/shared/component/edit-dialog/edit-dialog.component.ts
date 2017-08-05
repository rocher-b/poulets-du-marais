import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({
    selector: 'app-edit-dialog',
    templateUrl: './edit-dialog.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditDialogComponent {
    @Input() value;

    form: FormGroup;

    constructor(public dialogRef: MdDialogRef<EditDialogComponent>,
                private fb: FormBuilder) {

        this.form = this.fb.group({
            firstname: this.fb.control(this.value)
        });

    }


}
