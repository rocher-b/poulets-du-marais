//https://stackoverflow.com/questions/36639486/angular2-manually-firing-click-event-on-particular-element

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Subscription } from "rxjs/Subscription";
import { DeletionDialogComponent } from '../../../shared/component/deletion-dialog/deletion-dialog.component';
import { FileHistoryService } from '../../service/file-history.service';

import * as FileSaver from 'file-saver';

@Component({
    selector: 'app-file-history',
    templateUrl: './file-history-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileHistoryListComponent implements OnInit, OnDestroy {

    fileList$: Observable<any[]>;

    subscriptions = new Subscription();

    @ViewChild('fileInput') fileInput:ElementRef;

    constructor(private cd: ChangeDetectorRef,
                private fileHistoryService: FileHistoryService,
                public dialog: MdDialog) {
    }


    ngOnInit() {
        this.fileList$ = this.fileHistoryService.getList();
    }

    openFileBrowser() {
        const event = new MouseEvent('click', {bubbles: true});

        this.fileInput.nativeElement.dispatchEvent(event);
    }

    upload(event) {
        this.subscriptions.add(this.fileHistoryService.upload(event)
            .subscribe(success => {
                    this.fileList$ = this.fileHistoryService.getList();
                    this.cd.markForCheck();
                }
            ));

    }

    displayFile(fileName: string) {
        this.fileHistoryService.download(fileName).map(res => {
            const fileBlob = res.blob();
            const blob = new Blob([fileBlob], {
                type: 'application/pdf' // must match the Accept type
            });
            var fileURL = URL.createObjectURL(blob);
            window.open(fileURL);
        }).subscribe();

    }

    download(fileName: string) {
        this.fileHistoryService.download(fileName).map(res => {
            const fileBlob = res.blob();
            const filename = fileName;
            const blob = new Blob([fileBlob], {
                type: 'application/pdf' // must match the Accept type
            });

            FileSaver.saveAs(blob, filename);
        }).subscribe();

    }

    openDeletionDialog(fileName: string) {
        let dialogRef: MdDialogRef<DeletionDialogComponent>;

        dialogRef = this.dialog.open(DeletionDialogComponent);
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.subscriptions.add(this.fileHistoryService.delete(fileName)
                    .subscribe(success => {
                            this.fileList$ = this.fileHistoryService.getList();
                            this.cd.markForCheck();
                        }
                    ));
            }
        });
    }

    getDate(date: any): any {
        return (new Date(date));
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
}
