import { Location } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";
import { CustomForm } from '../../../shared/component/custom-form/custom-form';
import { ChickenService } from '../../service/chicken.service';

@Component({
    selector: 'app-chicken-form',
    templateUrl: './chicken-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChickenFormComponent extends CustomForm implements OnInit {

    constructor(cd: ChangeDetectorRef,
                location: Location,
                router: Router,
                activatedRoute: ActivatedRoute,
                private fb: FormBuilder,
                private chickenService: ChickenService) {
        super(location, cd, chickenService, router, activatedRoute);

        if (this.activatedRoute.snapshot.params.id) {
            this.subscriptions.add(this.chickenService.getDetails(this.activatedRoute.snapshot.params.id).take(1).subscribe(chicken => {
                this.updateForm(chicken);
            }));
        }

    }

    updateForm(obj: any) {
        this.form.patchValue(obj);
    }

    ngOnInit() {
        this.form = this.fb.group({
            age: this.fb.control(null),
            arrivingDate: this.fb.control(null),
            batch: this.fb.control(null),
            culling: this.fb.control(null),
            cullingDate: this.fb.control(null),
            id: this.fb.control(null),
            loss: this.fb.control(null),
            quantity: this.fb.control(null)
        });
    }
}


/*
batch age
arrivingDate cullingDate
quantity loss
 */
