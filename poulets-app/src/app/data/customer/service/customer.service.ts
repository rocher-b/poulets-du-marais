import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { APP_CONSTANTS } from '../../../shared/app.constants';

const CUSTOMERS = "/Customers";

@Injectable()
export class CustomerService {

    constructor(protected http: HttpClient) {
    }

    getCustomers(): Observable<any[]> {
        return this.http.get(APP_CONSTANTS.API_PATH + CUSTOMERS);
    }

    getCustomerDetails(id: string): any {
        return this.http.get(APP_CONSTANTS.API_PATH + CUSTOMERS + "/" + id);
    }
}
