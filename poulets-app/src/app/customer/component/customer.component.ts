import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { CustomerService } from '../service/customer.service';
import { MdDialog } from "@angular/material";
import { EditDialogComponent } from '../../shared/component/edit-dialog/edit-dialog.component';


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
            {name: "Prénom", prop: 'firstname'},
            {name: "Nom", prop: 'lastname'},
            {name: "Adresse", prop: 'address'},
            {name: "Téléphone", prop: 'tel'},
            {name: "Email", prop: 'email'},
            {name: "Abats", prop: 'giblets'},
            {name: "Type", prop: 'type'},
            {name: "Editer", prop: 'edit', maxWidth: 80}
        ];
    }

    ngOnInit() {
        // this.rows$ = this.customerService.getCustomers()
        //     .map(customers => customers
        //         .map(customer => {
        //             return {
        //                 firstname: customer.firstname,
        //                 lastname: customer.lastname,
        //                 address: customer.address,
        //                 tel: customer.tel,
        //                 email: customer.email,
        //                 giblets: customer.firstname,
        //                 edit: {
        //                     editButton: true
        //                 }
        //             };
        //         }));
        this.rows = this.customerService.getCustomers().map(customer => {
            return {
                firstname: customer.firstname,
                lastname: customer.lastname,
                address: customer.address,
                tel: customer.tel,
                email: customer.email,
                type: customer.type,
                giblets: customer.giblets,
                edit: { editButton: true }
            };
        });
    }

    openDialog() {
        this.dialog.open(EditDialogComponent);
    }

    tableRowWithAction(obj: any, context: any, entity: any): any {
        obj.action = {
            editButton: true,
            context: context,
            entity: entity
        };

        return obj;
    }
}
