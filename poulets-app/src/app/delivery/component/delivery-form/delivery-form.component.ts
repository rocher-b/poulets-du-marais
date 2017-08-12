import { Location } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";
import { CustomForm } from '../../../shared/component/custom-form/custom-form';
import { CustomerService } from '../../../data/customer/service/customer.service';
import { checkModeWithUrl } from '../../../shared/component/helper/helper';
import { MODE } from '../../../shared/mode-enum';
import { APP_CONSTANTS } from '../../../shared/app.constants';
import { Observable } from 'rxjs/Observable';


@Component({
    selector: 'app-delivery-form',
    templateUrl: './delivery-form.component.html',
    styleUrls: ['./delivery-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeliveryFormComponent extends CustomForm implements OnInit {

    createArrayLength: any[];

    customers$: Observable<any[]>;

    constructor(cd: ChangeDetectorRef,
                location: Location,
                router: Router,
                activatedRoute: ActivatedRoute,
                private fb: FormBuilder,
                private customerService: CustomerService) {
        super(location, cd, customerService, router, activatedRoute);

        if (checkModeWithUrl(this.router.url) === MODE.CREATE) {
            // This variable and operation is needed to set a fixed amout of rows in our table
            this.createArrayLength = new Array();
            // We use the variable to get the order of priority displayed
            for (let i = 1; i <= APP_CONSTANTS.CREATE_DELIVERY_ARRAY_LENGTH; i++) {
                this.createArrayLength.push(i);
            }
        }


    }

    updateForm(obj: any) {
        this.form.patchValue(obj);
    }

    ngOnInit() {
        this.customers$ = this.customerService.getList();

        this.form = this.fb.group({
            firstname: this.fb.control(null),
            lastname: this.fb.control(null),
            address: this.fb.control(null),
            tel: this.fb.control(null),
            abats: this.fb.control(null)
        });
    }
}
