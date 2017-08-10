import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { APP_CONSTANTS } from '../../../shared/app.constants';

const CHICKENS = "/Chickens";

@Injectable()
export class ChickenService {

    constructor(protected http: HttpClient) {
    }

    getChickens(filterId?: string): Observable<any[]> {
        return this.http.get(filterId
            ? APP_CONSTANTS.API_PATH + "/chickens?filter[where][henhouseId][like]=" + filterId
            : APP_CONSTANTS.API_PATH + CHICKENS);
    }
}
