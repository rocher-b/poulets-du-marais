import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { CustomerService } from '../service/customer.service';

@Component({
    selector: 'app-customer',
    templateUrl: './customer.component.html',
    styleUrls: ['./customer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomerComponent {

    ngxMessages: any;

    columns: any[];

    rows$: Observable<any[]>;

    timeout: any;


    constructor(protected http: HttpClient,
                private customerService: CustomerService) {
        this.ngxMessages = {
            emptyMessage: "",
            totalMessage: ""
        };


        this.columns = [
            {name: "Prénom", prop: 'firstname'},
            {name: "Nom", prop: 'lastname'},
            {name: "Adresse", prop: 'address'},
            {name: "Téléphone", prop: 'tel'},
            {name: "Email", prop: 'email'},
            {name: "Abats", prop: 'giblets'},
            {name: "Type", prop: 'type'}

        ];
    }

    ngOnInit() {
        this.rows$ = this.customerService.getCustomers();

    }
}
