import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { buildColumn, buildColumnWithEdit, buildRowWithEdit } from '../../../shared/component/helper/array-builder';
import { ChickenService } from '../service/chicken.service';


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
                private chickenService: ChickenService) {

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
        this.rows$ = this.chickenService.getList().map(chickens => {
            return buildRowWithEdit(chickens);
        });
    }
}
