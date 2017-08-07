import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

const HENHOUSE = "/Henhouses";

@Injectable()
export class HenhouseService {

    constructor(protected http: HttpClient) {
    }

    getHenhousesList(): any {
        return [
            {
                id: '1',
                name: "Poulailler 1"
            },
            {
                id: '2',
                name: "Poulailler 2"
            }
        ];
    }
}
