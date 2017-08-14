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

    boolAbats:boolean[] = [false];

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

        if (checkModeWithUrl(this.router.url) === MODE.CREATE) {
            // We loop through every field (which are arrays) of the delivery model, to push inside the form.controls.
            // Doing this is only to allow us to have a first empty line arriving on the page
                this.deliveryModelDefault.order.forEach(order => (<FormArray> this.form.controls.order).push(this.initFormField('order', order)));
                this.deliveryModelDefault.name.forEach(name => (<FormArray> this.form.controls.name).push(this.initFormField('name', name)));
                this.deliveryModelDefault.chicken.forEach(chicken => (<FormArray> this.form.controls.chicken).push(this.initFormField('chicken', chicken)));
                this.deliveryModelDefault.abats.forEach(abats => (<FormArray> this.form.controls.abats).push(this.initFormField('abats', abats)));
                this.deliveryModelDefault.eggs.forEach(eggs => (<FormArray> this.form.controls.eggs).push(this.initFormField('eggs', eggs)));
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
        else if (this.activatedRoute.snapshot.params.id && checkModeWithUrl(this.router.url) === MODE.EDIT) {

            this.deliveries$ = this.deliveryService.getDetails(this.activatedRoute.snapshot.params.id).map(delivery => {
                delivery.order.forEach(order => (<FormArray> this.form.controls.order).push(this.initFormField('order', order)));
                delivery.name.forEach(name => (<FormArray> this.form.controls.name).push(this.initFormField('name', name)));
                delivery.chicken.forEach(chicken => (<FormArray> this.form.controls.chicken).push(this.initFormField('chicken', chicken)));
                delivery.abats.forEach(abats => (<FormArray> this.form.controls.abats).push(this.initFormField('abats', abats)));
                delivery.eggs.forEach(eggs => (<FormArray> this.form.controls.eggs).push(this.initFormField('eggs', eggs)));
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
    initFormField(field: string, value?: any): FormGroup {
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

    buildPrefilledRows(delivery: any[]): Array<any[]> {

        let rows: Array<any[]>;

        rows = new Array();

            for (let numberOfRows = 0; numberOfRows < delivery[0].length; numberOfRows++) {
                const temporaryRow = [];

                for (let i = 0; i < delivery.length; i++) {
                    temporaryRow.push(delivery[i][numberOfRows]);
                }
                rows.push(temporaryRow);
            }
        return rows;
    }

    beforeSubmit(): boolean {
        this.form.controls.date.patchValue(new Date().toLocaleDateString());

        return true;
    }

    addRow(event: Event) {
        event.preventDefault(); // ensure this button doesn't try to submit the form

        const emptyRow ={
            order: {order: 0},
            name: {name: ''},
            chicken: {chicken: 0},
            abats: {abats: false},
            eggs: {eggs: 0},
            conserves: {
                pate: 0,
                rillettes: 0,
                terrine: 0,
                mousse: 0
            }
        };

        const deliveryAttr: string[] = Object.keys(emptyRow);

        this.deliveries = [];

        for (let i = 0; i < deliveryAttr.length; i++) {
            this.deliveries.push(emptyRow[deliveryAttr[i]]);
        }
        this.deliveriesRowFormat.push(this.deliveries);

        this.deliveryModelDefault.order.forEach(order => (<FormArray> this.form.controls.order).push(this.initFormField('order', emptyRow.order)));
        this.deliveryModelDefault.name.forEach(name => (<FormArray> this.form.controls.name).push(this.initFormField('name', emptyRow.name)));
        this.deliveryModelDefault.chicken.forEach(chicken => (<FormArray> this.form.controls.chicken).push(this.initFormField('chicken', emptyRow.chicken)));
        this.deliveryModelDefault.abats.forEach(abats => (<FormArray> this.form.controls.abats).push(this.initFormField('abats', emptyRow.abats)));
        this.deliveryModelDefault.eggs.forEach(eggs => (<FormArray> this.form.controls.eggs).push(this.initFormField('eggs', emptyRow.eggs)));
        this.deliveryModelDefault.conserves.forEach(conserves => (<FormArray> this.form.controls.conserves).push(this.initFormConserves(emptyRow.conserves)));

    }

    deleteRow(index: number) {
        // delete payoff from both the model and the FormArray
        this.deliveryModelDefault.order.forEach(order => (<FormArray> this.form.controls.order).removeAt(index));
        this.deliveryModelDefault.name.forEach(name => (<FormArray> this.form.controls.name).removeAt(index));
        this.deliveryModelDefault.chicken.forEach(chicken => (<FormArray> this.form.controls.chicken).removeAt(index));
        this.deliveryModelDefault.abats.forEach(abats => (<FormArray> this.form.controls.abats).removeAt(index));
        this.deliveryModelDefault.eggs.forEach(eggs => (<FormArray> this.form.controls.eggs).removeAt(index));
        this.deliveryModelDefault.conserves.forEach(conserves => (<FormArray> this.form.controls.conserves).removeAt(index));

        this.deliveriesRowFormat.splice(index, 1);
    }
}
