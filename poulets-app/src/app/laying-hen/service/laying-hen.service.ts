import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

const LAYING_HENS = "/Laying-hens";

@Injectable()
export class LayingHenService {

    constructor(protected http: HttpClient) {
    }

    getLayingHens(): any[] {
        return ([
                {
                    batch: '1',
                    age: '459',
                    number: '42',
                    loss: '1',
                    sold: '3',
                    arrivingDate: '13 Avril 2017',
                }]
        );
    }
}
