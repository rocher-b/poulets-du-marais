import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { CustomerService } from '../service/customer.service';
import { MdDialog } from "@angular/material";
import { EditDialogComponent } from '../../../shared/component/edit-dialog/edit-dialog.component';
import { buildColumn, buildColumnWithEdit, buildRowWithEdit } from '../../../shared/component/helper/array-builder';
import 'rxjs/Rx';


@Component({
    selector: 'app-customer',
    templateUrl: './customer.component.html',
    styleUrls: ['./customer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomerComponent {

    columns: any[];

    rows$: Observable<any[]>;

    rows: any[];

    constructor(protected http: HttpClient,
                private customerService: CustomerService,
                public dialog: MdDialog) {

        this.columns = [
            buildColumn("Prénom", 'firstname'),
            buildColumn("Nom", 'lastname'),
            buildColumn("Adresse", 'address'),
            buildColumn("Téléphone", 'tel'),
            buildColumn("Email", 'email'),
            buildColumn("Abats", 'giblets'),
            buildColumn("Type", 'type'),
            buildColumnWithEdit("Editer",  'edit')
        ];
    }

    ngOnInit() {
        this.rows$ = this.customerService.getCustomers().map(customers => customers.map(customer => {
            return buildRowWithEdit(customer);
        }));
    }

    openDialog(event, value) {
        this.dialog.open(EditDialogComponent, value);
    }

}
