import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Headers, Http, RequestMethod, RequestOptions, ResponseContentType } from '@angular/http';
import * as FileSaver from 'file-saver';

import { Observable } from 'rxjs/Observable';
import { APP_CONSTANTS } from '../../shared/app.constants';
import { AuthHttp } from 'angular2-jwt';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {

    image: Observable<any>;

    constructor(private http: Http) {
    }

    download(): void {

        console.log("hey");


        // Depending on what you are sending to the server
        // and what the server is sending back
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/pdf'
        });
        let options = new RequestOptions({headers: headers});
        // Ensure you set the responseType to Blob.
        options.responseType = ResponseContentType.Blob;


        this.http.get(APP_CONSTANTS.API_PATH + '/attachments/model/download/plaquette2017.pdf',
            options).map(res => {
            const fileBlob = res.blob();
            const filename = 'plaquette2017.pdf';
            const blob = new Blob([fileBlob], {
                type: 'application/pdf' // must match the Accept type
            });

            FileSaver.saveAs(blob, filename);
        }).subscribe();
    }
}


// download(fileName: string, fileContent: Blob): void {
//     const blobURL = window.URL.createObjectURL(fileContent);
// const anchor = document.createElement('a');
// anchor.download = fileName;
// anchor.href = blobURL;
// anchor.click();
// anchor.remove();
// }
//
// downloadURL(fileName: string, fileURL: string) {
//     this.http.get(fileURL, {responseType: ResponseContentType.Blob}).toPromise().then((value: Response) => {
//         this.download(fileName, value.blob());
//     });
// }

// /**
//  * Basically is the download function, but allowing to retrieve the name sent inside the http response
//  * @param response
//  */
// downloadWithFileName(response: Response): void {
//     // We parse the response header to obtain the name of the file. The backend sends a filename inside the request which is not easy to parse,
//     // hence the global try/catch. If for any reason an error is lifted, we
//     // instead give it a simple name with the code retrieved from the period informations.
//
//     // NOTE : The first export is usually quite long
//     let tempNameArray = response.headers.get('Content-Disposition').split('=');
// let fileName = tempNameArray[1];
//
// tempNameArray = fileName.split('"');
// fileName = tempNameArray[1];
// // source: http://stackoverflow.com/questions/35138424/how-do-i-download-a-file-with-angular2
// // launch the download of the file with a readable name and the result provided by the backend
// this.download(fileName, response.blob());
// }
