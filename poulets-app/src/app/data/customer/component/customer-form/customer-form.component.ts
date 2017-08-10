import { Location } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";
import { CustomForm } from '../../../../shared/component/custom-form/custom-form';
import { CustomerService } from '../../service/customer.service';

@Component({
    selector: 'app-customer-form',
    templateUrl: './customer-form.component.html',
    styleUrls: ['customer-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomerFormComponent extends CustomForm implements OnInit {

    constructor( cd: ChangeDetectorRef,
                location: Location,
                private fb: FormBuilder,
                private customerService: CustomerService,
                private activatedRoute: ActivatedRoute, route: Router) {
        super(cd, location, route);

        if (this.activatedRoute.snapshot.params.id) {
            this.customerService.getCustomerDetails(this.activatedRoute.snapshot.params.id).take(1).subscribe(customer => {
                this.updateForm(customer);
            });
        }

    }

    updateForm(obj: any) {
          this.form.patchValue(obj);
    }

    ngOnInit() {
        this.form = this.fb.group({
            firstname: this.fb.control(null),
            lastname: this.fb.control(null),
            address: this.fb.control(null),
            tel: this.fb.control(null),
            abats: this.fb.control(null)
        });
    }
}
