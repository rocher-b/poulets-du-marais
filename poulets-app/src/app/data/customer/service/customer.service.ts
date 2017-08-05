import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

const CUSTOMERS = "/Customers";
const CUSTOMER = "/Customer";

@Injectable()
export class CustomerService {

    constructor(protected http: HttpClient) {
    }

    getCustomers(): any[] {
        return ([
            {
                firstname: "Toto",
                lastname: "Tata",
                address: "blabla",
                tel: "12324",
                email: "azraz@raer",
                type: "lol",
                giblets: "true",
            },
            {
                firstname: "bla",
                lastname: "bleu",
                address: "boum",
                tel: "bada",
                email: "boum",
                type: "paow",
                giblets: "false"
            }]); //this.http.get(APP_CONSTANTS.API_PATH + CUSTOMERS);
    }
}
