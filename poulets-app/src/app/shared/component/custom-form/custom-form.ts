import { Location } from '@angular/common';
import { ChangeDetectorRef, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from "rxjs/Subscription";
import { CustomFormService } from '../../service/custom-form.service';
import { MODE } from '../../mode-enum';
import { checkModeWithUrl } from '../helper/helper';

export abstract class CustomForm implements OnInit, OnDestroy {

    @Input() valid: boolean;

    @Output() submit = new EventEmitter<boolean>();

    form: FormGroup;

    router: Router;

    activatedRoute: ActivatedRoute;

    customFormService: CustomFormService;

    subscriptions = new Subscription();

    cd: ChangeDetectorRef;

    constructor(protected location: Location,
                cd: ChangeDetectorRef,
                customFormService: CustomFormService,
                router: Router,
                activatedRoute: ActivatedRoute) {
        this.router = router;
        this.customFormService = customFormService;
        this.cd = cd;
        this.activatedRoute = activatedRoute;
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
        debugger;
            if (checkModeWithUrl(this.router.url) == MODE.EDIT) {
                this.subscriptions.add(this.customFormService.update(this.activatedRoute.snapshot.params.id, this.form.value).subscribe());
            }
            else {
                this.subscriptions.add(this.customFormService.create(this.form.value).subscribe());
            }
        this.previousPage();
    }

    previousPage() {
        /* back not refreshed in time after an update, we apparently should flush the session on the back-side */
        setTimeout(() => {
            this.location.back();
        },150);
    }

    initForm(obj?: any) {
    }

    submitForm() {
        this.submit.emit(true);
    }

    isValid() {
        return this.form.valid;
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
}
