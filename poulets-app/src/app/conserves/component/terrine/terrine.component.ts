import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-terrine',
    templateUrl: './terrine.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TerrineComponent {

    constructor() {
    }
}
