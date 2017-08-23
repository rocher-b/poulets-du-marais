//https://stackoverflow.com/questions/40300252/angular2-displaying-pdf
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { FileHistoryService } from '../../service/file-history.service';
import { SafeResourceUrl } from '@angular/platform-browser';


@Component({
    selector: 'app-file-history-detail',
    templateUrl: './file-history-detail.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileHistoryDetailComponent implements OnInit {
    fileURL: any = "https://vadimdez.github.io/ng2-pdf-viewer/pdf-test.pdf";
    fileURL$: Observable<any>;

    page: number = 1;
    pageurl: SafeResourceUrl;

    constructor(private fileHistoryService: FileHistoryService,
                private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        console.log("name: ", this.activatedRoute.snapshot.params.name);
        this.fileHistoryService.download(this.activatedRoute.snapshot.params.name)
            .subscribe((res => {
                const fileBlob = res.blob();
                const blob = new Blob([fileBlob], {
                    type: 'application/pdf' // must match the Accept type
                });


                this.fileURL = URL.createObjectURL(blob);
                console.log("url: ",URL.createObjectURL(blob));

            }));
    }
}
