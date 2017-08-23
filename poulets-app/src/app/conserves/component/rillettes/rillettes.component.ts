import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-rillettes',
    templateUrl: './rillettes.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RillettesComponent {

    constructor() {
    }
}
