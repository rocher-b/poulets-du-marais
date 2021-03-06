import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        'layout-fill-width': ''
    }
})
export class AppComponent {
    /**
     * State of the sidenav
     */
    opened = true;

}
