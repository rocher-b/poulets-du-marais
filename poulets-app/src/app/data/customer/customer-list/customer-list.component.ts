import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { buildColumn, buildColumnWithEdit, buildRowWithEdit } from '../../../shared/component/helper/array-builder';
import { CustomerService } from '../service/customer.service';
import { DeletionDialogComponent } from '../../../shared/component/deletion-dialog/deletion-dialog.component';
import { MdDialog, MdDialogRef } from '@angular/material';


@Component({
    selector: 'app-customer',
    templateUrl: './customer-list.component.html',
    styleUrls: ['./customer-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomerListComponent implements OnInit{

    columns: any[];

    rows$: Observable<any[]>;

    constructor(protected http: HttpClient,
                private customerService: CustomerService,
                public dialog: MdDialog) {

        this.columns = [
            buildColumn("Prénom", 'firstname'),
            buildColumn("Nom", 'lastname'),
            buildColumn("Adresse", 'address'),
            buildColumn("Téléphone", 'tel'),
            buildColumn("Email", 'email'),
            buildColumn("Abats", 'abats'),
            buildColumnWithEdit("Editer",  'edit')
        ];
    }

    ngOnInit() {
        this.rows$ = this.customerService.getList().map(customers => customers.map(customer => {
            return buildRowWithEdit(customer, customer.id);
        }));
    }

    setValue(value: any) {
        if (typeof value === 'boolean')
            return value === true ? 'oui' : 'non';
        else {
            return value ? value : '-';
        }
    }

    openDeletionDialog(entityId: string) {
        let dialogRef: MdDialogRef<DeletionDialogComponent>;

        dialogRef = this.dialog.open(DeletionDialogComponent);
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.customerService.delete(entityId).subscribe();
                setTimeout(() => {
                    this.rows$ = this.customerService.getList().map(customers => customers.map(customer => {
                        return buildRowWithEdit(customer, customer.id);
                    }));
                },150);
            }
        });
    }
}

