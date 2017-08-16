import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { DeliveryService } from '../../service/delivery.service';
import { MdDialog, MdDialogRef } from '@angular/material';
import { DeletionDialogComponent } from '../../../shared/component/deletion-dialog/deletion-dialog.component';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'app-delivery-list',
    templateUrl: './delivery-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeliveryListComponent implements OnInit, OnDestroy {

    deliveries$: Observable<any[]>;

    subscriptions = new Subscription();

    constructor(private cd: ChangeDetectorRef,
                private deliveryService: DeliveryService,
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
                this.subscriptions.add(this.deliveryService.delete(entityId)
                    .subscribe(success => {
                            this.deliveries$ = this.deliveryService.getList();
                            this.cd.markForCheck();
                        }
                    ));
            }
        });
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }

}
