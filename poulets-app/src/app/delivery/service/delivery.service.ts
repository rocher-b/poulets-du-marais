import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { CustomFormService } from '../../shared/service/custom-form.service';
import { APP_CONSTANTS } from '../../shared/app.constants';

const DELIVERY = "/deliveries";

@Injectable()
export class DeliveryService extends CustomFormService{

    constructor(protected http: HttpClient) {
        super(http, DELIVERY);
    }

    delete(entityId: string): any {
        return this.http.delete(APP_CONSTANTS.API_PATH + DELIVERY + "/" + entityId);
    }

}
