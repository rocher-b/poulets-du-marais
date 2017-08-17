import { Location } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";
import { CustomForm } from '../../../shared/component/custom-form/custom-form';
import { HenhouseService } from '../../service/henhouse.service';

@Component({
    selector: 'app-henhouse-form',
    templateUrl: './henhouse-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HenhouseFormComponent extends CustomForm implements OnInit {

    constructor(cd: ChangeDetectorRef,
                location: Location,
                router: Router,
                activatedRoute: ActivatedRoute,
                private fb: FormBuilder,
                private henhouseService: HenhouseService) {
        super(location, cd, henhouseService, router, activatedRoute);

        if (this.activatedRoute.snapshot.params.id) {
            this.subscriptions.add(this.henhouseService.getDetails(this.activatedRoute.snapshot.params.id).take(1).subscribe(henhouse => {
                this.updateForm(henhouse);
            }));
        }

    }

    updateForm(obj: any) {
        this.form.patchValue(obj);
    }

    ngOnInit() {
        this.form = this.fb.group({
            number: this.fb.control(null),
            cleaningDate: this.fb.control(null),
            food: this.fb.control(null)
        });
    }
}
