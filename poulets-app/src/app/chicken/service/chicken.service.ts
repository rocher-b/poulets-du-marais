import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { CustomFormService } from '../../shared/service/custom-form.service';

const CHICKENS = "/Chickens";

@Injectable()
export class ChickenService extends CustomFormService {

    constructor(protected http: HttpClient) {
        super(http, CHICKENS);
    }
}
