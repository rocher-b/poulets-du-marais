import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-customer',
    templateUrl: './customer.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerComponent {
}
