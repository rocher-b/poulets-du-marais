import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CustomFormService {

    constructor(protected http: HttpClient) {
    }

    editData(id:string) {
        return this.http.get(APP_CONSTANTS.API_PATH + CUSTOMERS + "/" + id);

    }

}
