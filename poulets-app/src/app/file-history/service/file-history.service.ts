import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { APP_CONSTANTS } from '../../shared/app.constants';
import { Observable } from 'rxjs/Observable';
import { Http, RequestOptions, ResponseContentType, Headers } from '@angular/http';

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

    getFile(fileName: string) {
        return this.httpClient.get(APP_CONSTANTS.API_PATH + FILE_HISTORY_LIST + '/' + fileName);
    }

    download(fileName: string): any {
        return this.http.get(APP_CONSTANTS.API_PATH + '/attachments/model/download/' + fileName, {responseType: ResponseContentType.Blob});

    }

    upload(event): any {
        const fileList: FileList = event.target.files;

        if (fileList.length > 0) {
            const file: File = fileList[0];
            const formData: FormData = new FormData();
            const headers = new Headers();
            const options = new RequestOptions({headers: headers});

            headers.append('Accept', 'application/pdf');
            formData.append('uploadFile', file, file.name);

            return this.http.post(APP_CONSTANTS.API_PATH + '/attachments/model/upload/', formData, options);
        }
    }

    delete(fileName: string): any {
        return this.http.delete(APP_CONSTANTS.API_PATH + FILE_HISTORY_LIST + '/' + fileName);
    }

}
