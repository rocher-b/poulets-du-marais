import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { HenhouseService } from '../service/henhouse.service';
import { MdDialog } from "@angular/material";
import { EditDialogComponent } from '../../../shared/component/edit-dialog/edit-dialog.component';
import { buildColumn, buildColumnWithEdit, buildRowWithEdit } from '../../../shared/component/helper/array-builder';


@Component({
    selector: 'app-henhouse-detail',
    templateUrl: './henhouse-detail.component.html',
    styleUrls: ['./henhouse-detail.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HenhouseDetailComponent {

    columns: any[];

    rows$: Observable<any[]>;

    rows: any[];

    constructor(protected http: HttpClient,
                private henhouseService: HenhouseService,
                public dialog: MdDialog) {

        this.columns = [
            buildColumn("Type", 'type'),
            buildColumnWithEdit("Editer",  'edit')
        ];
    }

    ngOnInit() {

    }

    openDialog(event, value) {
        this.dialog.open(EditDialogComponent, value);
    }

}
