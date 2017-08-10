import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { buildColumn, buildColumnWithEdit, buildRowWithEdit } from '../../../../shared/component/helper/array-builder';
import { HenhouseService } from '../../service/henhouse.service';
import { ChickenService } from '../../../chicken/service/chicken.service';
import { ActivatedRoute } from "@angular/router";


@Component({
    selector: 'app-henhouse-detail',
    templateUrl: './henhouse-detail.component.html',
    styleUrls: ['./henhouse-detail.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HenhouseDetailComponent {

    columns: any[];

    rows$: Observable<any[]>;

    constructor(protected http: HttpClient,
                private chickenService: ChickenService,
                private route: ActivatedRoute) {

        this.columns = [
            buildColumn("Lot", 'batch'),
            buildColumnWithEdit("Editer", 'edit')
        ];
    }

    ngOnInit() {
        console.log("route: ", this.route.snapshot.params.id);
    this.rows$ = this.chickenService.getChickens(this.route.snapshot.params.id).map(chickens => chickens.map(chicken => {
            return buildRowWithEdit(chicken);
        }));
    }

}
