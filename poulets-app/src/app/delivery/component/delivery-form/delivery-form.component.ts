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
import { DeliveryService } from '../../service/delivery.service';


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
                private customerService: CustomerService,
                private deliveryService: DeliveryService) {
        super(location, cd, deliveryService, router, activatedRoute);

        // Describe deliveryModel which will be our model for empty rows
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


    }

    ngOnInit() {
        this.customers$ = this.customerService.getList();

        if (checkModeWithUrl(this.router.url) === MODE.CREATE) {
            this.initForm();

            // We loop through every field (which are arrays) of the delivery model, to push inside the form.controls.
            // Doing this is only to allow us to have a first empty line arriving on the page
            this.deliveryModel.order.forEach(order => (<FormArray> this.form.controls.order).push(this.initFormField('order', order)));
            this.deliveryModel.name.forEach(name => (<FormArray> this.form.controls.name).push(this.initFormField('name', name)));
            this.deliveryModel.chicken.forEach(chicken => (<FormArray> this.form.controls.chicken).push(this.initFormField('chicken', chicken)));
            this.deliveryModel.abats.forEach(abats => (<FormArray> this.form.controls.abats).push(this.initFormField('abats', abats)));
            this.deliveryModel.eggs.forEach(eggs => (<FormArray> this.form.controls.eggs).push(this.initFormField('eggs', eggs)));
            this.deliveryModel.conserves.forEach(conserves => (<FormArray> this.form.controls.conserves).push(this.initFormConserves(conserves)));

            // we have to create an array to allow us to loop through its rows inside the view. It will contain the same type of data
            // as the form array, and be synced to it.
            this.deliveries.push(this.deliveryModel);
        }
    }

    initForm() {
        this.form = new FormGroup({
            date: new FormControl(''),
            order: new FormArray([]),
            name: new FormArray([]),
            chicken: new FormArray([]),
            abats: new FormArray([]),
            eggs: new FormArray([]),
            conserves: new FormArray([])
        });
    }

    /**
     *  Initialize one field of a form
     */
    initFormField(field: string, value?: (string | number | boolean)): FormGroup {
        return this.fb.group({[field]: value});
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

    beforeSubmit(): boolean {
        this.form.controls.date.patchValue(new Date().toLocaleDateString());
        console.log("form: ", this.form);
        console.log("typeof: ", this.form.value.abats[0]);
        return true;
    }

    addRow(event: Event) {
        event.preventDefault(); // ensure this button doesn't try to submit the form

        const emptyRow = {
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

        this.deliveryModel.order.forEach(order => (<FormArray> this.form.controls.order).push(this.initFormField('order', emptyRow.order)));
        this.deliveryModel.name.forEach(name => (<FormArray> this.form.controls.name).push(this.initFormField('name', emptyRow.name)));
        this.deliveryModel.chicken.forEach(chicken => (<FormArray> this.form.controls.chicken).push(this.initFormField('chicken', emptyRow.chicken)));
        this.deliveryModel.abats.forEach(abats => (<FormArray> this.form.controls.abats).push(this.initFormField('abats', emptyRow.abats)));
        this.deliveryModel.eggs.forEach(eggs => (<FormArray> this.form.controls.eggs).push(this.initFormField('eggs', emptyRow.eggs)));
        this.deliveryModel.conserves.forEach(conserves => (<FormArray> this.form.controls.conserves).push(this.initFormConserves(emptyRow.conserves)));

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
