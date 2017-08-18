import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { buildColumn, buildColumnWithEdit, buildRowWithEdit } from '../../shared/component/helper/array-builder';
import { ChickenService } from '../service/chicken.service';
import { Chicken } from '../model/chicken.model';
import { Subscription } from 'rxjs/Subscription';
import { HenhouseService } from '../../henhouse/service/henhouse.service';
import { ActivatedRoute } from '@angular/router';
import { Food } from '../../henhouse/model/henhouse.model';


@Component({
    selector: 'app-chicken',
    templateUrl: './chicken.component.html',
    styleUrls: ['./chicken.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChickenComponent implements OnInit, OnDestroy {
    columns: any[];
    rows$: Observable<Chicken[]>;

    rows: any[];
    henhouseFood$: Observable<Food[]>;
    henhouseFood: Food[];

    rowOpened: boolean[];

    totalCost: number;

    subscriptions = new Subscription();

    @ViewChild('myTable') table: any;

    constructor(protected http: HttpClient,
                private chickenService: ChickenService,
                private henhouseService: HenhouseService,
                private activatedRoute: ActivatedRoute) {

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
        // this.rows$ = this.chickenService.getListByHenhouse(this.activatedRoute.snapshot.params.id)
        //     .map(chickens => chickens
        //         .map(chicken => {
        //             return buildRowWithEdit({
        //                 ...chicken,
        //                 cost: {
        //                     cullingUP: (chicken.cost.cullingUP.replace(",", ".")) * 1,
        //                     foodUP: (chicken.cost.foodUP.replace(",", ".")) * 1,
        //                     purchasingUP: (chicken.cost.purchasingUP.replace(",", ".")) * 1
        //                 }
        //             });
        //         }));

        this.rows = this.chickenService.getBlaChicken().map(chicken => {
            return buildRowWithEdit({
                ...chicken,
                henhouse: '2',
                cost: {
                    cullingUP: chicken.cost.cullingUP,
                    foodUP: chicken.cost.foodUP,
                    purchasingUP: chicken.cost.purchasingUP
                }
            });
        });

            this.rowOpened = new Array(2);
            this.rowOpened.fill(false);

            this.henhouseFood = [{date: "13 Juillet 2017", quantity: "4"}, {date: "15 Août 2017", quantity: "7"}];

        // this.subscriptions.add(this.rows$.subscribe(rows => {
        //     this.rowOpened = new Array(rows.length);
        //     this.rowOpened.fill(false);
        // }));



        // this.henhouseService.getDetails(this.activatedRoute.snapshot.params.id).subscribe(res => {
        //     this.henhouseFood$ = res.food;
        // });

    }

    toggleExpandRow(row) {
        this.table.rowDetail.toggleExpandRow(row);
        this.rowOpened[row['$$index']] = !this.rowOpened[row['$$index']];

        this.totalCost = ((row.cost.cullingUP * row.quantity) + ((row.cost.foodUP * row.quantity)) + ((row.cost.purchasingUP * row.quantity)));
        this.totalCost = Math.round(this.totalCost * 1000) / 1000;
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

