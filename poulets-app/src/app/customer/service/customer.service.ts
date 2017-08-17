import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { CustomFormService } from '../../shared/service/custom-form.service';
import { APP_CONSTANTS } from '../../shared/app.constants';

const CUSTOMERS = "/customers";

@Injectable()
export class CustomerService extends CustomFormService {

    constructor(protected http: HttpClient) {
        super(http, CUSTOMERS);
    }

    delete(entityId: string): any {
        return this.http.delete(APP_CONSTANTS.API_PATH + CUSTOMERS + "/" + entityId);
    }

}
