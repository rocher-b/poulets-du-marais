import { ChangeDetectionStrategy, Component } from '@angular/core';
import 'rxjs/add/operator/map';

@Component({
    selector: 'app-data',
    templateUrl: './data.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataComponent {
}
