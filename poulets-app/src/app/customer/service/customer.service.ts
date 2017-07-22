import { Injectable } from "@angular/core";
import { APP_CONSTANTS } from '../../shared/app.constants';
import { Observable } from "rxjs/Observable";
import { HttpClient } from '@angular/common/http';

const CUSTOMERS = "/Customers";
const CUSTOMER = "/Customer";

@Injectable()
export class CustomerService  {

    constructor(protected http: HttpClient) {
    }

    getCustomers() : Observable<{}> {
            return this.http.get(APP_CONSTANTS.API_PATH + CUSTOMERS);
    }

}
