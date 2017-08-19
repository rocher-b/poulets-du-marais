import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { CustomFormService } from '../../shared/service/custom-form.service';

const LAYING_HENS = "/Laying-hens";

@Injectable()
export class LayingHenService extends CustomFormService {

    constructor(protected http: HttpClient) {
        super(http, LAYING_HENS);
    }
}
