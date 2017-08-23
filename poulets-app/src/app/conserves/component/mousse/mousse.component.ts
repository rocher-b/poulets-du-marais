import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { buildColumn } from '../../../shared/component/helper/array-builder';

@Component({
    selector: 'app-mousse',
    templateUrl: './mousse.component.html',
    styleUrls: ['./mousse.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MousseComponent implements OnInit{

    rows: any[];
    columns: any[];

    constructor() {
    }

    ngOnInit() {
        this.columns = [
            buildColumn("Standard", 'standard'),
            buildColumn("Quantité", 'quantity'),
            buildColumn("Coef utilisation", 'coef'),
            buildColumn("Quantité / 1kg", 'quantity-kg'),
            buildColumn("Prix Unitaire kg/€", 'pu'),
            buildColumn("% unités", 'percentage'),
            buildColumn("Coût 100kg", 'cost-100kg'),
        ];

        this.rows = [
            {'standard': "Gorge de porc", 'quantity': "6,650", 'coef': "1,50", 'quantity-kg': "9,975", 'pu': "2,40", 'percentage': "52", 'cost-100kg': "124,40"},
            {'standard': "foie de volaille", 'quantity': "3,350", 'coef': "1,50", 'quantity-kg': "5,025", 'pu': "2,90", 'percentage': "26", 'cost-100kg': "75,72"},
            {'standard': "persil effeuillé", 'quantity': "0,115", 'coef': "1,50", 'quantity-kg': "0,173", 'pu': "3,75", 'percentage': "1", 'cost-100kg': "3,36"},
            {'standard': "crème épaisse", 'quantity': "0,330", 'coef': "1,50", 'quantity-kg': "0,493", 'pu': "3,27", 'percentage': "3", 'cost-100kg': "8,41"},
            {'standard': "chapelure dorée", 'quantity': "0,330", 'coef': "1,50", 'quantity-kg': "0,495", 'pu': "1,72", 'percentage': "3", 'cost-100kg': "4,43"},
        ];
    }
}
