import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { CustomFormService } from '../../shared/service/custom-form.service';

const DELIVERY = "/deliveries";

@Injectable()
export class DeliveryService extends CustomFormService{

    constructor(protected http: HttpClient) {
        super(http, DELIVERY);
    }

}
