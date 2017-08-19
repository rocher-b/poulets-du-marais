import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { HenhouseService } from '../../../henhouse/service/henhouse.service';
import { APP_CONSTANTS } from '../../../shared/app.constants';
import { buildColumn, buildColumnWithEdit, buildRowWithEdit } from '../../../shared/component/helper/array-builder';
import { LayingHen } from '../../model/laying-hen.model';
import { LayingHenService } from '../../service/laying-hen.service';
import { roundNumber } from '../../../shared/component/helper/helper';


@Component({
    selector: 'app-laying-hen-list',
    templateUrl: './laying-hen-list.component.html',
    styleUrls: ['./laying-hen-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayingHenListComponent implements OnInit, OnDestroy {
    columns: any[];
    rows$: Observable<LayingHen[]>;

    rowOpened: boolean[];

    totalCost: number;

    subscriptions = new Subscription();

    roundNumber = roundNumber;

    @ViewChild('myTable') table: any;

    constructor(protected http: HttpClient,
                private layingHenService: LayingHenService,
                private henhouseService: HenhouseService) {

        this.columns = [
            buildColumn("Lot", 'batch', 60),
            buildColumn("N° poulailler", 'henhouse', 120),
            buildColumn("Date d'arrivée", 'arrivingDate'),
            buildColumnWithEdit("Editer", 'edit'),
            buildColumnWithEdit("Détails", 'detail')
        ];
    }

    ngOnInit() {
        this.rows$ = this.layingHenService.getList()
            .switchMap(layingHens =>
                Observable.combineLatest(layingHens.map(layingHen => {
                    return this.henhouseService.getDetails(layingHen.henhouseId).map(henhouse => [layingHen, henhouse]);
                })).map((layingHenInfos: any[]) => {
                    return layingHenInfos.map(([layingHen, henhouse]) => {
                        if (henhouse.number == APP_CONSTANTS.LAYING_HEN_HENHOUSE_NUMBER) {
                            return buildRowWithEdit({
                                ...layingHen,
                                henhouse: henhouse.number,
                                food: henhouse.food,
                                cost: {
                                    foodUP: (layingHen.cost.foodUP.replace(",", ".")) * 1,
                                    purchasingUP: (layingHen.cost.purchasingUP.replace(",", ".")) * 1
                                }
                            });
                        }
                    });
                })
            );


        this.subscriptions.add(this.rows$.subscribe(rows => {
            this.rowOpened = new Array(rows.length);
            this.rowOpened.fill(false);
        }));
    }

    toggleExpandRow(row) {
        this.table.rowDetail.toggleExpandRow(row);
        this.rowOpened[row['$$index']] = !this.rowOpened[row['$$index']];

        this.totalCost = ((row.cost.foodUP * row.actualQuantity) + (row.cost.purchasingUP * row.actualQuantity));
        this.totalCost = this.roundNumber(this.totalCost);
    }

    checkIndexOpened(index: number): boolean {
        return (this.rowOpened[index]);
    }

    onDetailToggle(event, value) {
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }

}
