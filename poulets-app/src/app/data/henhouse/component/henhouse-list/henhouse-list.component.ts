import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { HenhouseService } from '../../service/henhouse.service';

@Component({
    selector: 'app-henhouse-list',
    templateUrl: './henhouse-list.component.html',
    styleUrls: ['./henhouse-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HenhouseListComponent {

    henhouses$: Observable<any[]>;

    constructor(protected http: HttpClient,
                private henhouseService: HenhouseService) {

    }

    ngOnInit() {
        this.henhouses$ = this.henhouseService.getList();
    }

}
