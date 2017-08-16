// https://scotch.io/tutorials/how-to-build-nested-model-driven-forms-in-angular-2
// https://stackoverflow.com/questions/37955205/angular-2-dynamic-nested-form

import { Location } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { CustomerService } from '../../../data/customer/service/customer.service';
import { CustomForm } from '../../../shared/component/custom-form/custom-form';
import { checkModeWithUrl } from '../../../shared/component/helper/helper';
import { MODE } from '../../../shared/mode-enum';
import { Delivery } from '../../model/delivery.model';
import { DeliveryService } from '../../service/delivery.service';
import * as _ from 'lodash';


@Component({
    selector: 'app-delivery-form',
    templateUrl: './delivery-form.component.html',
    styleUrls: ['./delivery-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeliveryFormComponent extends CustomForm implements OnInit {

    customers$: Observable<any[]>;

    deliveryModelDefault: Delivery;

    deliveries$: Observable<any[]>;
    deliveries: Delivery[] = [];

    deliveriesRowFormat: Array<any[]>;

    constructor(cd: ChangeDetectorRef,
                location: Location,
                router: Router,
                activatedRoute: ActivatedRoute,
                private fb: FormBuilder,
                private customerService: CustomerService,
                private deliveryService: DeliveryService) {
        super(location, cd, deliveryService, router, activatedRoute);

        // Describe deliveryModelDefault which will be our model for empty rows
        this.deliveryModelDefault = {
            id: ' ',
            date: ' ',
            order: [{order: 0}],
            name: [{name: ''}],
            chicken: [{chicken: 0}],
            abats: [{abats: false}],
            eggs: [{eggs: 0}],
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

        this.initForm();

        // CREATE Mode
        if (checkModeWithUrl(this.router.url) === MODE.CREATE) {
            // We loop through every field (which are arrays) of the delivery model, to push inside the form.controls.
            // Doing this is only to allow us to have a first empty line arriving on the page
            this.deliveryModelDefault.order.forEach(order => (<FormArray> this.form.controls.order).push(this.initFormField(order)));
            this.deliveryModelDefault.name.forEach(name => (<FormArray> this.form.controls.name).push(this.initFormField(name)));
            this.deliveryModelDefault.chicken.forEach(chicken => (<FormArray> this.form.controls.chicken).push(this.initFormField(chicken)));
            this.deliveryModelDefault.abats.forEach(abats => (<FormArray> this.form.controls.abats).push(this.initFormField(abats)));
            this.deliveryModelDefault.eggs.forEach(eggs => (<FormArray> this.form.controls.eggs).push(this.initFormField(eggs)));
            this.deliveryModelDefault.conserves.forEach(conserves => (<FormArray> this.form.controls.conserves).push(this.initFormConserves(conserves)));

            const deliveryAttr: string[] = Object.keys(this.deliveryModelDefault);
            _.remove(deliveryAttr, row => (row === "date" || row === "id"));

            // we have to create an array to allow us to loop through its rows inside the view. It will contain the same type of data
            // as the form array, and be synced to it.

            for (let i = 0; i < deliveryAttr.length; i++) {
                this.deliveries.push(this.deliveryModelDefault[deliveryAttr[i]]);
            }
            this.deliveriesRowFormat = this.buildPrefilledRows(this.deliveries);

            this.deliveries$ = Observable.of(this.deliveriesRowFormat);
        }
        // EDIT Mode
        else if (this.activatedRoute.snapshot.params.id && checkModeWithUrl(this.router.url) === MODE.EDIT) {

            this.deliveries$ = this.deliveryService.getDetails(this.activatedRoute.snapshot.params.id).map(delivery => {
                delivery.order.forEach(order => (<FormArray> this.form.controls.order).push(this.initFormField(order)));
                delivery.name.forEach(name => (<FormArray> this.form.controls.name).push(this.initFormField(name)));
                delivery.chicken.forEach(chicken => (<FormArray> this.form.controls.chicken).push(this.initFormField(chicken)));
                delivery.abats.forEach(abats => (<FormArray> this.form.controls.abats).push(this.initFormField(abats)));
                delivery.eggs.forEach(eggs => (<FormArray> this.form.controls.eggs).push(this.initFormField(eggs)));
                delivery.conserves.forEach(conserves => (<FormArray> this.form.controls.conserves).push(this.initFormConserves(conserves)));
                // gives an array of string, containing all the custom properties. We remove date and id because we don't need it for the view
                const deliveryAttr: string[] = Object.keys(delivery);
                _.remove(deliveryAttr, row => (row === "date" || row === "id"));

                for (let i = 0; i < deliveryAttr.length; i++) {
                    this.deliveries.push(delivery[deliveryAttr[i]]);
                }
                this.deliveriesRowFormat = this.buildPrefilledRows(this.deliveries);

                return this.deliveriesRowFormat;
            });
        }
    }

    preFillTable() {

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

    beforeSubmit(): boolean {
        // set the actual date at the moment of the creation
        let date = new Date();
        this.form.controls.date.patchValue(date.toLocaleString());

        return true;
    }

    /**
     *  Initialize one field of a form
     */
    initFormField(value?: any): FormGroup {
        return this.fb.group(value);
    }

    /**
     * Form Control for the conserves field. Try to merge it with iniFormField ?
     */
    initFormConserves(conserves: any): FormGroup {
        return this.fb.group({
            pate: this.fb.control(conserves.pate),
            rillettes: this.fb.control(conserves.rillettes),
            terrine: this.fb.control(conserves.terrine),
            mousse: this.fb.control(conserves.mousse)
        });
    }

    buildPrefilledRows(delivery: any[]): Array<any[]> {
        const rows = [];

        for (let numberOfRows = 0; numberOfRows < delivery[0].length; numberOfRows++) {
            rows.push(this.indexValuesToRow(delivery, numberOfRows));
        }

        return rows;
    }

    indexValuesToRow(arr: any[], index: number) {
        const row = [];

        for (let i = 0; i < arr.length; i++) {
            row.push(arr[i][index]);
        }

        return row;
    }

    addRow(event: Event) {
        event.preventDefault(); // ensure this button doesn't try to submit the form

        const arrayOfValue = [];

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

        (<FormArray> this.form.controls.order).push(this.fb.group({order: emptyRow.order}));
        (<FormArray> this.form.controls.name).push(this.fb.group({name: emptyRow.name}));
        (<FormArray> this.form.controls.chicken).push(this.fb.group({chicken: emptyRow.chicken}));
        (<FormArray> this.form.controls.abats).push(this.fb.group({abats: emptyRow.abats}));
        (<FormArray> this.form.controls.eggs).push(this.fb.group({eggs: emptyRow.eggs}));
        (<FormArray> this.form.controls.conserves).push(this.fb.group(emptyRow.conserves));

        Object.keys(emptyRow).forEach(el => {
            arrayOfValue.push({[el]: emptyRow[el]});
        });

        this.deliveriesRowFormat.push(arrayOfValue);
        this.deliveries$ = Observable.of(this.deliveriesRowFormat);
    }

    deleteRow(index: number) {
        // delete payoff from both the model and the FormArray
        (<FormArray> this.form.controls.order).removeAt(index);
        (<FormArray> this.form.controls.name).removeAt(index);
        (<FormArray> this.form.controls.chicken).removeAt(index);
        (<FormArray> this.form.controls.abats).removeAt(index);
        (<FormArray> this.form.controls.eggs).removeAt(index);
        (<FormArray> this.form.controls.conserves).removeAt(index);

        this.deliveriesRowFormat.splice(index, 1);
        this.deliveries$ = Observable.of(this.deliveriesRowFormat);
    }

}
