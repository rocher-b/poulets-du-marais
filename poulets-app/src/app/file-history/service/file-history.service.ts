import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { APP_CONSTANTS } from '../../shared/app.constants';
import { Observable } from 'rxjs/Observable';
import { Http, RequestOptions, ResponseContentType } from '@angular/http';
import * as FileSaver from 'file-saver';
const FILE_HISTORY_TEMPLATES = "/attachments/model";
const FILE_HISTORY_LIST = "/attachments/model/files";

@Injectable()
export class FileHistoryService {

    constructor(protected httpClient: HttpClient,
                protected http: Http) {
    }

    getList(): Observable<any[]> {
        return this.httpClient.get(APP_CONSTANTS.API_PATH + FILE_HISTORY_LIST);
    }

    download(fileName: string) {
        this.http.get(APP_CONSTANTS.API_PATH + '/attachments/model/download/' + fileName,
            {responseType: ResponseContentType.Blob}).map(res => {
            const fileBlob = res.blob();
            const filename = fileName;
            const blob = new Blob([fileBlob], {
                type: 'application/pdf' // must match the Accept type
            });

            FileSaver.saveAs(blob, filename);
        }).subscribe();
    }

}
