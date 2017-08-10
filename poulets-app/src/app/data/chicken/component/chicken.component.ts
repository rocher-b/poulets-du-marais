import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { ChickenService } from '../service/chicken.service';
import { MdDialog } from "@angular/material";
import { buildColumn, buildColumnWithEdit, buildRowWithEdit } from '../../../shared/component/helper/array-builder';


@Component({
    selector: 'app-chicken',
    templateUrl: './chicken.component.html',
    styleUrls: ['./chicken.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChickenComponent {

    columns: any[];

    rows$: Observable<any[]>;

    constructor(protected http: HttpClient,
                private chickenService: ChickenService,
                public dialog: MdDialog) {

        this.columns = [
            buildColumn('N° lot','batch', 60),
            buildColumn('Age', 'age'),
            buildColumn('Nombre', 'number'),
            buildColumn('Pertes', 'loss'),
            buildColumn("Date d'arrivée",'arrivingDate'),
            buildColumn("Date d'abattage", 'cullingDate'),
            buildColumnWithEdit("Editer", 'edit'),
        ];
    }

    ngOnInit() {
        this.rows$ = this.chickenService.getChickens().map(chickens => {
            return buildRowWithEdit(chickens);
        });
    }
}
