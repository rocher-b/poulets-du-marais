import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Observable } from 'rxjs/Observable';
import { ChickenService } from '../../../chicken/service/chicken.service';
import { buildColumn, buildColumnWithEdit, buildRowWithEdit } from '../../../shared/component/helper/array-builder';
import { HenhouseService } from '../../service/henhouse.service';


@Component({
    selector: 'app-henhouse-detail',
    templateUrl: './henhouse-detail.component.html',
    styleUrls: ['./henhouse-detail.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HenhouseDetailComponent implements OnInit {

    columns: any[];

    rows$: Observable<any[]>;

    henhouse: any;

    totalCost: number = 0;

    @ViewChild('myTable') table: any;

    constructor(protected http: HttpClient,
                private chickenService: ChickenService,
                private henhouseService: HenhouseService,
                private activatedRoute: ActivatedRoute) {

        this.columns = [
            buildColumn("Lot", 'batch', 60),
            buildColumn("Date d'arrivée", 'arrivingDate'),
            buildColumn("Date d'abbatage", 'cullingDate'),
            buildColumnWithEdit("Editer", 'edit'),
            buildColumnWithEdit("Détails", 'detail')
        ];
    }

    ngOnInit() {
        this.rows$ = this.chickenService.getListByHenhouse(this.activatedRoute.snapshot.params.id).map(chickens => chickens.map(chicken => {
            console.log("chicken:", chicken);
            return buildRowWithEdit({
                ...chicken,
                cost: {
                    cullingUP: (chicken.cost.cullingUP.replace(",", ".")) * 1,
                    foodUP: (chicken.cost.foodUP.replace(",", ".")) * 1,
                    purchasingUP: (chicken.cost.purchasingUP.replace(",", ".")) * 1,
                }
            });
        }));

        this.henhouseService.getDetails(this.activatedRoute.snapshot.params.id).subscribe(res => {
            this.henhouse = res.food;
        });

    }

    toggleExpandRow(row) {
        this.table.rowDetail.toggleExpandRow(row);

        this.totalCost = ((row.cost.cullingUP * row.quantity) + ((row.cost.foodUP * row.quantity)) + ((row.cost.purchasingUP * row.quantity)));
        this.totalCost = Math.round(this.totalCost * 1000) / 1000;
    }

    onDetailToggle(event, value) {
    }

}
