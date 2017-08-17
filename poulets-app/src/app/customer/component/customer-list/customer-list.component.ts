import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { DeletionDialogComponent } from '../../../shared/component/deletion-dialog/deletion-dialog.component';
import { buildColumn, buildColumnWithEdit, buildRowWithEdit } from '../../../shared/component/helper/array-builder';
import { CustomerService } from '../../service/customer.service';
import { Customer } from '../../model/customer.model';


@Component({
    selector: 'app-customer',
    templateUrl: './customer-list.component.html',
    styleUrls: ['./customer-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomerListComponent implements OnInit, OnDestroy {

    columns: any[];

    rows$: Observable<Customer[]>;

    subscriptions = new Subscription();

    constructor(private cd: ChangeDetectorRef,
                protected http: HttpClient,
                private customerService: CustomerService,
                public dialog: MdDialog) {

        this.columns = [
            buildColumn("Prénom", 'firstname'),
            buildColumn("Nom", 'lastname'),
            buildColumn("Adresse", 'address'),
            buildColumn("Téléphone", 'tel'),
            buildColumn("Email", 'email'),
            buildColumn("Abats", 'abats', 60),
            buildColumnWithEdit("Editer", 'edit')
        ];
    }

    ngOnInit() {
        this.rows$ = this.customerService.getList().map(customers => customers.map(customer => {
            return buildRowWithEdit(customer, customer.id);
        }));
    }

    setValue(value: any) {
        if (typeof value === 'boolean')
            return value;
        else {
            return value ? value : '-';
        }
    }

    isBoolean(val) {
        return typeof val === 'boolean';
    }

    openDeletionDialog(entityId: string) {
        let dialogRef: MdDialogRef<DeletionDialogComponent>;

        dialogRef = this.dialog.open(DeletionDialogComponent);
        this.subscriptions.add(dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.subscriptions.add(this.customerService.delete(entityId)
                    .subscribe(success => {
                        this.rows$ = this.customerService.getList().map(customers => customers.map(customer => {
                            return buildRowWithEdit(customer, customer.id);
                        }));
                        this.cd.markForCheck();
                    }));
            }
        }));
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe();

    }
}

