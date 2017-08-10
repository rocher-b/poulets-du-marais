import { Location } from '@angular/common';
import { ChangeDetectorRef, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from "rxjs/Subscription";


export abstract class CustomForm implements OnInit, OnDestroy {

    form: FormGroup;

    @Input() valid: boolean;

    @Output() close = new EventEmitter<boolean>();

    formInitData: any;

    subscriptions = new Subscription();

    constructor(private cd: ChangeDetectorRef,
                private location: Location) {
    }

    ngOnInit() {
        this.initForm();
        this.form.valueChanges.subscribe(() => {
            //needed to have the form.valid flag being applied
            // to the submit button
            this.cd.markForCheck();
        });
    }

    beforeSubmit(): boolean {
        return true;
    }

    onSubmit() {

        if (this.beforeSubmit()) {
            this.previousPage();
        }
    }

    previousPage() {
        this.location.back();
    }

    initForm(obj?: any) {
    }

    isValid() {
        return this.form.valid;
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
}
