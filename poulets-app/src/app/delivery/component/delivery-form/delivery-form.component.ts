// https://scotch.io/tutorials/how-to-build-nested-model-driven-forms-in-angular-2
// https://stackoverflow.com/questions/37955205/angular-2-dynamic-nested-form

import { Location } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";
import { CustomForm } from '../../../shared/component/custom-form/custom-form';
import { CustomerService } from '../../../data/customer/service/customer.service';
import { checkModeWithUrl } from '../../../shared/component/helper/helper';
import { MODE } from '../../../shared/mode-enum';
import { APP_CONSTANTS } from '../../../shared/app.constants';
import { Observable } from 'rxjs/Observable';
import { Delivery } from '../../model/delivery.model';


@Component({
    selector: 'app-delivery-form',
    templateUrl: './delivery-form.component.html',
    styleUrls: ['./delivery-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeliveryFormComponent extends CustomForm implements OnInit {

    createArrayLength: any[];

    customers$: Observable<any[]>;

    deliveryModel: Delivery;

    deliveries: Delivery[] = [];

    constructor(cd: ChangeDetectorRef,
                location: Location,
                router: Router,
                activatedRoute: ActivatedRoute,
                private fb: FormBuilder,
                private customerService: CustomerService) {
        super(location, cd, customerService, router, activatedRoute);

        // Describe deliveryModel which will sync up with the forms
        this.deliveryModel = {
            id: '',
            date: '',
            order: [0],
            name: [''],
            chicken: [0],
            abats: [false],
            eggs: [0],
            conserves: [{
                pate: 0,
                rillettes: 0,
                terrine: 0,
                mousse: 0
            }]
        };

        if (checkModeWithUrl(this.router.url) === MODE.CREATE) {
            // This variable and operation is needed to set a fixed amout of rows in our table
            this.createArrayLength = new Array();
            // We use the variable to get the order of priority displayed
            for (let i = 1; i <= APP_CONSTANTS.CREATE_DELIVERY_ARRAY_LENGTH; i++) {
                this.createArrayLength.push(this.deliveryModel);
            }

            this.form = new FormGroup({
                date: new FormControl(''),
                order: new FormArray([]),
                name: new FormArray([]),
                chicken: new FormArray([]),
                abats: new FormArray([]),
                eggs: new FormArray([]),
                conserves: new FormArray([])
            });

            // We then loop through the created array to pre fill the FormArray so we can loop through it
            for (let i: number = 0; i < 2; i++) {
                this.deliveryModel.order.forEach(order => (<FormArray> this.form.controls.order).push(this.initFormField('order', order)));
                this.deliveryModel.name.forEach(name => (<FormArray> this.form.controls.name).push(this.initFormField('name', name)));
                this.deliveryModel.chicken.forEach(chicken => (<FormArray> this.form.controls.chicken).push(this.initFormField('chicken', chicken)));
                this.deliveryModel.abats.forEach(abats => (<FormArray> this.form.controls.abats).push(this.initFormField('abats', abats)));
                this.deliveryModel.eggs.forEach(eggs => (<FormArray> this.form.controls.eggs).push(this.initFormField('eggs', eggs)));
                this.deliveryModel.conserves.forEach(conserves => (<FormArray> this.form.controls.conserves).push(this.initFormConserves(conserves)));

                this.deliveries.push(this.deliveryModel);
            }

            console.log("deliveryModel: ", this.deliveries);
            console.log("form: ", this.form);

        }

    }


    updateForm(obj: any) {
        this.form.patchValue(obj);
    }

    ngOnInit() {
        this.customers$ = this.customerService.getList();
        //this.initFormArray();

    }

    initFormArray() {
        this.form = this.fb.group({
            date: this.fb.control(null),
            order: this.fb.array([this.initFormField('order')]),
            name: this.fb.array([this.initFormField('name')]),
            chicken: this.fb.array([this.initFormField('chicken')]),
            abats: this.fb.array([this.initFormField('abats')]),
            eggs: this.fb.array([this.initFormField('eggs')]),
            conserves: this.fb.array([this.initFormConserves(null)])
        });
    }

    /**
     *  Initialize one field of a form
     */
    initFormField(field: string, value?: (string | number | boolean)): FormGroup {
        return this.fb.group({[field]: value });
    }

    /**
     * Form Control for the conserves field. Try to merge it with iniFormField ?
     */
    initFormConserves(conserves?: any): FormGroup {
            return this.fb.group({
                conserves: this.fb.group({
                    pate: conserves.pate,
                    rillettes: conserves.rillettes,
                    terrine: conserves.terrine,
                    mousse: conserves.mousse
                })
            });
    }


    addRow(event: Event) {
        event.preventDefault(); // ensure this button doesn't try to submit the form

        const emptyPayOff = {
            order: 0,
            name: '',
            chicken: 0,
            abats: false,
            eggs: 0,
            conserves: {
                pate: 0,
                rillettes: 0,
                terrine: 0,
                mousse: 0
            }
        };

        this.deliveryModel.order.forEach(order => (<FormArray> this.form.controls.order).push(this.initFormField('order', emptyPayOff.order)));
        this.deliveryModel.name.forEach(name => (<FormArray> this.form.controls.name).push(this.initFormField('name', emptyPayOff.name)));
        this.deliveryModel.chicken.forEach(chicken => (<FormArray> this.form.controls.chicken).push(this.initFormField('chicken', emptyPayOff.chicken)));
        this.deliveryModel.abats.forEach(abats => (<FormArray> this.form.controls.abats).push(this.initFormField('abats', emptyPayOff.abats)));
        this.deliveryModel.eggs.forEach(eggs => (<FormArray> this.form.controls.eggs).push(this.initFormField('eggs', emptyPayOff.eggs)));
        this.deliveryModel.conserves.forEach(conserves => (<FormArray> this.form.controls.conserves).push(this.initFormConserves(emptyPayOff.conserves)));

        this.deliveries.push(this.deliveryModel);
    }

    deleteRow(index: number) {
        // delete payoff from both the model and the FormArray
        this.deliveryModel.order.forEach(order => (<FormArray> this.form.controls.order).removeAt(index));
        this.deliveryModel.name.forEach(name => (<FormArray> this.form.controls.name).removeAt(index));
        this.deliveryModel.chicken.forEach(chicken => (<FormArray> this.form.controls.chicken).removeAt(index));
        this.deliveryModel.abats.forEach(abats => (<FormArray> this.form.controls.abats).removeAt(index));
        this.deliveryModel.eggs.forEach(eggs => (<FormArray> this.form.controls.eggs).removeAt(index));
        this.deliveryModel.conserves.forEach(conserves => (<FormArray> this.form.controls.conserves).removeAt(index));

        this.deliveries.splice(index, 1);
    }
}
