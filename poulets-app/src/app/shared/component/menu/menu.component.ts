import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

/**
 * Displays a menu seen on the left hand-side of the app
 */
@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent {
    /**
     * current route is under the period endpoint
     * TODO: use a dedicated component?
     */
    isUnderPeriod: boolean;

    /**
     * current route is under the admin endpoint
     * TODO: use a dedicated component?
     */
    isUnderAdmin: boolean;

    /**
     * current route is under the axis endpoint
     * TODO: use a dedicated component?
     */
    isUnderAxis: boolean;

    /**
     * current route is under the axis mapping endpoint
     * TODO: use a dedicated component?
     */
    isUnderAxisMapping: boolean;

    /**
     * current route is under the assignment endpoint
     * TODO: use a dedicated component?
     */
    isUnderAssignment: boolean;


    /**
     * group entry is opened
     * TODO: use a generic solution after 2 or 3 like those #KISS
     */
    groupOpened: boolean;

    /**
     * admin entry is opened
     * TODO: use a generic solution after 2 or 3 like those #KISS
     */
    adminOpened: boolean;

    constructor(private route: ActivatedRoute) {
    }

}
