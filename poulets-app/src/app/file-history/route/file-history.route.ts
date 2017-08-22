import { Routes } from '@angular/router';
import { FileHistoryListComponent } from '../component/file-history-list/file-history.component';

export const FILE_HISTORY_ROUTES: Routes = [
    {
        path: 'list',
        component: FileHistoryListComponent
    }
];
