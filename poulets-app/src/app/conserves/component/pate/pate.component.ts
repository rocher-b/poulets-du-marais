import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-pate',
    templateUrl: './pate.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PateComponent {

    constructor() {
    }
}
