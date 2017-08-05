import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

const CHICKENS = "/Chickens";

@Injectable()
export class ChickenService {

    constructor(protected http: HttpClient) {
    }

    getChickens(): any[] {
        return ([
                {
                    batch: '14',
                    age: '84',
                    number: '48',
                    loss: '1',
                    arrivingDate: '13 Avril 2017',
                    cullingDate: '20 Avril 2017'
                }]
        );
    }
}
