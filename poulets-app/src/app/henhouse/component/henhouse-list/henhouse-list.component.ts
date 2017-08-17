import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Henhouse } from '../../model/henhouse.model';
import { HenhouseService } from '../../service/henhouse.service';

@Component({
    selector: 'app-henhouse-list',
    templateUrl: './henhouse-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HenhouseListComponent implements OnInit {

    henhouses$: Observable<Henhouse[]>;

    constructor(private henhouseService: HenhouseService) {

    }

    ngOnInit() {
        this.henhouses$ = this.henhouseService.getList();
    }

}
