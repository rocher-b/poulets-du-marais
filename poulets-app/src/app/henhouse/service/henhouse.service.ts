import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { CustomFormService } from '../../shared/service/custom-form.service';

const HENHOUSE = "/henhouses";

@Injectable()
export class HenhouseService extends CustomFormService {

    constructor(protected http: HttpClient) {
        super(http, HENHOUSE);
    }

}
