import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Headers, Http, RequestOptions, ResponseContentType } from '@angular/http';
import * as FileSaver from 'file-saver';
import { APP_CONSTANTS } from '../../../shared/app.constants';
import { Observable } from 'rxjs/Observable';
import { FileHistoryService } from '../../service/file-history.service';


@Component({
    selector: 'app-file-history',
    templateUrl: './file-history.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileHistoryListComponent implements OnInit {

    fileList$: Observable<any>;

    constructor(private http: Http,
                private fileHistoryService: FileHistoryService) {
    }

    ngOnInit() {
        this.fileList$ = this.fileHistoryService.getList();
    }
    download(fileName: string) {
        this.fileHistoryService.download(fileName);

    }
}
