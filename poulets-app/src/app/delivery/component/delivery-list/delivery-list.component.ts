import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { DeliveryService } from '../../service/delivery.service';
import { MdDialog, MdDialogRef } from '@angular/material';
import { DeletionDialogComponent } from '../../../shared/component/deletion-dialog/deletion-dialog.component';

@Component({
    selector: 'app-delivery-list',
    templateUrl: './delivery-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeliveryListComponent implements OnInit {

    deliveries$: Observable<any[]>;

    constructor(private deliveryService: DeliveryService,
                public dialog: MdDialog) {

    }

    ngOnInit() {
        this.deliveries$ = this.deliveryService.getList();
    }

    openDeletionDialog(entityId: string) {
        let dialogRef: MdDialogRef<DeletionDialogComponent>;

        dialogRef = this.dialog.open(DeletionDialogComponent);
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.deliveryService.delete(entityId).subscribe();
                setTimeout(() => {
                    this.deliveries$ = this.deliveryService.getList();
                }, 300);
            }
        });
    }

}
