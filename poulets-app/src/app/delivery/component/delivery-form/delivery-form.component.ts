// https://scotch.io/tutorials/how-to-build-nested-model-driven-forms-in-angular-2
// https://stackoverflow.com/questions/37955205/angular-2-dynamic-nested-form

import { Location } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { CustomerService } from '../../../data/customer/service/customer.service';
import { CustomForm } from '../../../shared/component/custom-form/custom-form';
import { checkModeWithUrl } from '../../../shared/component/helper/helper';
import { MODE } from '../../../shared/mode-enum';
import { Delivery } from '../../model/delivery.model';
import { DeliveryService } from '../../service/delivery.service';


@Component({
    selector: 'app-delivery-form',
    templateUrl: './delivery-form.component.html',
    styleUrls: ['./delivery-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeliveryFormComponent extends CustomForm implements OnInit {

    customers$: Observable<any[]>;
    deliveries$: Observable<any[]>;

    deliveryModelDefault: Delivery;

    deliveriesRowFormat: Array<any[]>; // will hold the data received as an array with formatted rows for the view to loop through

    constructor(cd: ChangeDetectorRef,
                location: Location,
                router: Router,
                activatedRoute: ActivatedRoute,
                private fb: FormBuilder,
                private customerService: CustomerService,
                private deliveryService: DeliveryService) {
        super(location, cd, deliveryService, router, activatedRoute);

        // Describe deliveryModelDefault which will be our model for empty rows.
        // It could be handle the same way as new rows are handled, but it allows to change,
        // but it allows more easily to change the default number of rows when arriving on the creating page
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
        // Get customers list to get their names in the view
        this.customers$ = this.customerService.getList();

        this.initForm();

        // CREATE Mode
        if (checkModeWithUrl(this.router.url) === MODE.CREATE) {
            this.formControlHandler(this.deliveryModelDefault, FormAction.INIT);

            this.deliveriesRowFormat = this.buildPrefilledRows(this.deliveryModelDefault);
            this.deliveries$ = Observable.of(this.deliveriesRowFormat);
        }
        // EDIT Mode
        else if (this.activatedRoute.snapshot.params.id && checkModeWithUrl(this.router.url) === MODE.EDIT) {
            this.deliveries$ = this.deliveryService.getDetails(this.activatedRoute.snapshot.params.id)
                .map(delivery => {
                    this.formControlHandler(delivery, FormAction.INIT);

                    this.deliveriesRowFormat = this.buildPrefilledRows(delivery);
                    return this.deliveriesRowFormat;
                });
        }
    }

    /**
     * Handles the form controllers.
     * On INIT, loop through through all fields of an array of arrays to push them as a FormGroup
     * On ADD, take the object givent and push its fields as FormGroups
     * On REMOVE, remove the controlers at the given index
     */
    formControlHandler(values: any, action: FormAction) {
        if (action === FormAction.INIT) {
            // We loop through every field (which are arrays) of the given array ('values', to push inside the form.controls.
            // Doing this is only to allow us to have a first empty line arriving on the page

            // 'values' is an array of arrays of objects (Array{}[])
            values.order.forEach(order => (<FormArray> this.form.controls.order).push(this.initFormField(order)));
            values.name.forEach(name => (<FormArray> this.form.controls.name).push(this.initFormField(name)));
            values.chicken.forEach(chicken => (<FormArray> this.form.controls.chicken).push(this.initFormField(chicken)));
            values.abats.forEach(abats => (<FormArray> this.form.controls.abats).push(this.initFormField(abats)));
            values.eggs.forEach(eggs => (<FormArray> this.form.controls.eggs).push(this.initFormField(eggs)));
            values.conserves.forEach(conserves => (<FormArray> this.form.controls.conserves).push(this.initFormConserves(conserves)));
        }
        else if (action === FormAction.ADD) {
            // 'values' is an object with field prefilled for a new row
            (<FormArray> this.form.controls.order).push(this.fb.group({order: values.order}));
            (<FormArray> this.form.controls.name).push(this.fb.group({name: values.name}));
            (<FormArray> this.form.controls.chicken).push(this.fb.group({chicken: values.chicken}));
            (<FormArray> this.form.controls.abats).push(this.fb.group({abats: values.abats}));
            (<FormArray> this.form.controls.eggs).push(this.fb.group({eggs: values.eggs}));
            (<FormArray> this.form.controls.conserves).push(this.fb.group(values.conserves));
        }
        else {
            // 'values' serves here as an index
            (<FormArray> this.form.controls.order).removeAt(values);
            (<FormArray> this.form.controls.name).removeAt(values);
            (<FormArray> this.form.controls.chicken).removeAt(values);
            (<FormArray> this.form.controls.abats).removeAt(values);
            (<FormArray> this.form.controls.eggs).removeAt(values);
            (<FormArray> this.form.controls.conserves).removeAt(values);
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

    beforeSubmit(): boolean {
        // set the actual date at the moment of the creation
        const date = new Date();
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

    /**
     * Allows to loop through an array of object arrays (Array<{}[]) multiple times,
     * and build the rows that will be displayed in the view
     */
    buildPrefilledRows(modelArray: any): Array<any[]> {
        const rows = [];
        const delivery = [];
        const deliveryAttr: string[] = Object.keys(modelArray); // array of the given object fields as strings

        // Remove 'id' and 'date fields since they are outside of the arrays we run through
        _.remove(deliveryAttr, row => (row === "date" || row === "id"));

        for (let i = 0; i < deliveryAttr.length; i++) {
            delivery.push(modelArray[deliveryAttr[i]]);
        }

        for (let numberOfRows = 0; numberOfRows < delivery[0].length; numberOfRows++) {
            rows.push(this.indexValuesToRow(delivery, numberOfRows));
        }

        return rows;
    }

    /**
     * Called by buildPrefilledRows() above, this functions runs through an array of arrays,
     * pushing the array data at the given index for each array into a temprorary array that will be returned
     */
    indexValuesToRow(arr: any[], index: number) {
        const row = [];

        // For each array inside "arr", retrieved the data at 'index'
        for (let i = 0; i < arr.length; i++) {
            row.push(arr[i][index]);
        }

        return row;
    }

    /**
     *  Add a formatted row "empty" to deliveriesRowFormat and to the form controlers
     */
    addRow(event: Event) {
        // Ensure the add button doesn't try to submit the form
        event.preventDefault();

        // This value will hold the elements of emptyRow, with one field = one element of arrayOfValue
        const arrayOfValue = [];

        // Model of empty row, which will be added to the array
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

        this.formControlHandler(emptyRow, FormAction.ADD);

        Object.keys(emptyRow).forEach(el => {
            arrayOfValue.push({[el]: emptyRow[el]});
        });

        this.deliveriesRowFormat.push(arrayOfValue);
        this.deliveries$ = Observable.of(this.deliveriesRowFormat);
    }

    /**
     *  Remove a row "empty" of deliveriesRowFormat and of the form controlers
     */
    deleteRow(index: number) {
        this.formControlHandler(index, FormAction.DELETE);

        this.deliveriesRowFormat.splice(index, 1);
        this.deliveries$ = Observable.of(this.deliveriesRowFormat);
    }
}

export enum FormAction {
    INIT = 0,
    ADD,
    DELETE
}
