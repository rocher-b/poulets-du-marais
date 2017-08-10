import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MdDialog } from "@angular/material";
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { buildColumn, buildColumnWithEdit, buildRowWithEdit } from '../../../shared/component/helper/array-builder';
import { CustomerService } from '../service/customer.service';


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
                private customerService: CustomerService) {

        this.columns = [
            buildColumn("Prénom", 'firstname'),
            buildColumn("Nom", 'lastname'),
            buildColumn("Adresse", 'address'),
            buildColumn("Téléphone", 'tel'),
            buildColumn("Email", 'email'),
            buildColumn("Abats", 'abats'),
            buildColumn("Type", 'type'),
            buildColumnWithEdit("Editer",  'edit')
        ];
    }

    ngOnInit() {
        this.rows$ = this.customerService.getCustomers().map(customers => customers.map(customer => {
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
}
