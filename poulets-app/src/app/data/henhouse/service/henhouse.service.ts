import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { APP_CONSTANTS } from '../../../shared/app.constants';

const HENHOUSE = "/Henhouses";

@Injectable()
export class HenhouseService {

    constructor(protected http: HttpClient) {
    }

    getHenhousesList(): Observable<any[]> {
        return this.http.get(APP_CONSTANTS.API_PATH + HENHOUSE);
    }
}
