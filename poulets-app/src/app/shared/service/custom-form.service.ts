import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { APP_CONSTANTS } from '../app.constants';
import { Observable } from 'rxjs/Observable';

@Injectable()
export abstract class CustomFormService {

    PATH: string;

    constructor(protected http: HttpClient,
                protected entityPath: string) {
        this.PATH = APP_CONSTANTS.API_PATH + entityPath;
    }

    create(entity: any): Observable<any[]> {
        return this.http.post(this.PATH, entity);
    }

    update(id: string, entity: any): Observable<any[]> {
        return this.http.put(this.PATH + "/" + id, entity);
    }

    getList(): Observable<any[]> {
        return this.http.get(this.PATH);
    }

    getListByHenhouse(filterId?: string): Observable<any[]> {
        return this.http.get(filterId
            ? this.PATH + "?filter[where][henhouseId][like]=" + filterId
            : this.PATH);
    }

    getDetails(id: string): any {
        return this.http.get(this.PATH + "/" + id);

    }

}
