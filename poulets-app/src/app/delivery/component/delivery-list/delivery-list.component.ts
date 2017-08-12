import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { DeliveryService } from '../../service/delivery.service';

@Component({
    selector: 'app-delivery-list',
    templateUrl: './delivery-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeliveryListComponent implements OnInit {

    deliveries$: Observable<any[]>;

    constructor(private deliveryService: DeliveryService) {

    }

    ngOnInit() {
        this.deliveries$ = this.deliveryService.getList();
    }

}
