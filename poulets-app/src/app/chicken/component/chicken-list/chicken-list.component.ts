import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Food } from '../../../henhouse/model/henhouse.model';
import { HenhouseService } from '../../../henhouse/service/henhouse.service';
import { APP_CONSTANTS } from '../../../shared/app.constants';
import { buildColumn, buildColumnWithEdit, buildRowWithEdit } from '../../../shared/component/helper/array-builder';
import { Chicken } from '../../model/chicken.model';
import { ChickenService } from '../../service/chicken.service';
import { roundNumber } from '../../../shared/component/helper/helper';


@Component({
    selector: 'app-chicken-list',
    templateUrl: './chicken-list.component.html',
    styleUrls: ['./chicken-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChickenListComponent implements OnInit, OnDestroy {
    columns: any[];
    rows$: Observable<Chicken[]>;

    rowOpened: boolean[];

    totalCost: number;

    subscriptions = new Subscription();

    roundNumber = roundNumber;

    @ViewChild('myTable') table: any;

    constructor(protected http: HttpClient,
                private chickenService: ChickenService,
                private henhouseService: HenhouseService) {

        this.columns = [
            buildColumn("Lot", 'batch', 60),
            buildColumn("N° poulailler", 'henhouse', 120),
            buildColumn("Date d'arrivée", 'arrivingDate'),
            buildColumn("Date d'abbatage", 'cullingDate'),
            buildColumnWithEdit("Editer", 'edit'),
            buildColumnWithEdit("Détails", 'detail')
        ];
    }

    ngOnInit() {
        this.rows$ = this.chickenService.getList()
            .switchMap(chickens => Observable.combineLatest(chickens.map(chicken => {
                    return this.henhouseService.getDetails(chicken.henhouseId).map(henhouse => [chicken, henhouse]);
                })).map((chickenInfos: any[]) => {
                    console.log("hey");
                    return chickenInfos.map(([chicken, henhouse]) => {
                        if (henhouse.number != APP_CONSTANTS.LAYING_HEN_HENHOUSE_NUMBER) {
                            console.log("number: ", henhouse);

                            return buildRowWithEdit({
                                ...chicken,
                                henhouse: henhouse.number,
                                food: henhouse.food,
                                cost: {
                                    cullingUP: (chicken.cost.cullingUP.replace(",", ".")) * 1,
                                    foodUP: (chicken.cost.foodUP.replace(",", ".")) * 1,
                                    purchasingUP: (chicken.cost.purchasingUP.replace(",", ".")) * 1
                                }
                            });
                        }
                        else {
                            return {};
                        }
                    });
                })
            );

        // This is mostly used for the "eye" detail icon
        this.subscriptions.add(this.rows$.subscribe(rows => {
            console.log("hey");
            this.rowOpened = new Array(rows.length);
            this.rowOpened.fill(false);
        }));
    }

    toggleExpandRow(row) {
        this.table.rowDetail.toggleExpandRow(row);
        this.rowOpened[row['$$index']] = !this.rowOpened[row['$$index']];

        this.totalCost = ((row.cost.cullingUP * row.quantity) + (row.cost.foodUP * row.quantity) + (row.cost.purchasingUP * row.quantity));
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
