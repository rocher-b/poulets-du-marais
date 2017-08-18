import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { CustomFormService } from '../../shared/service/custom-form.service';
import { Chicken } from '../model/chicken.model';
import { Observable } from 'rxjs/Observable';

const CHICKENS = "/Chickens";

@Injectable()
export class ChickenService extends CustomFormService {

    constructor(protected http: HttpClient) {
        super(http, CHICKENS);
    }

    getBlaChicken(): any[] {
        let chicken: any[];

        chicken = [{

            age: "70",
            arrivingDate: "2017-07-04",
            batch: "17",
            cost: {
                foodUP: 0.33,
                purchasingUP: 4.91,
                cullingUP: 3
            },
            culling: [{date: "2017-07-25", quantity: "3"}, {date: "2017-06-26", quantity: "3"}, {date: "2017-07-25", quantity: "3"}],
            cullingDate: "2017-05-30",
            henhouseId: "5988949875599ea4f05e730c",
            id: "59889d9a281856d53193ffca",
            loss: "8",
            quantity: 120
        },
            {
                age: "60",
                arrivingDate: "2017-05-26",
                batch: "16",
                cost: {foodUP: 2.17, purchasingUP: 4.91, cullingUP: 3},
                culling: [{date: "2017-06-26", quantity: "3"}, {date: "2017-07-25", quantity: "3"}],
                cullingDate: "2017-06-26",
                henhouseId: "5988949875599ea4f05e730c",
                id: "59889dcc281856d53193ffcb",
                loss: "2",
                quantity: 144
            }];


        return chicken;
    }

}
