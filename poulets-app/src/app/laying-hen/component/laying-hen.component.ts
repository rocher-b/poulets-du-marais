import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { LayingHenService } from '../service/laying-hen.service';
import { MdDialog } from "@angular/material";
import { buildColumn, buildColumnWithEdit, buildRowWithEdit } from '../../shared/component/helper/array-builder';


@Component({
    selector: 'app-laying-hen',
    templateUrl: './laying-hen.component.html',
    styleUrls: ['./laying-hen.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayingHenComponent {

    columns: any[];

    rows$: Observable<any[]>;

    rows: any[];

    constructor(protected http: HttpClient,
                private LayingHenService: LayingHenService,
                public dialog: MdDialog) {

        this.columns = [
            buildColumn('N° lot','batch', 60),
            buildColumn('Age', 'age'),
            buildColumn('Nombre', 'number'),
            buildColumn('Pertes', 'loss'),
            buildColumn('Vendu', 'sold'),
            buildColumn("Date d'arrivée",'arrivingDate'),
            buildColumnWithEdit("Editer", 'edit'),
        ];
    }

    ngOnInit() {
        this.rows = this.LayingHenService.getLayingHens().map(chickens => {
            return buildRowWithEdit(chickens);
        });
    }
}
