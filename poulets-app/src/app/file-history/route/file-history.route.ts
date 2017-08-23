import { Routes } from '@angular/router';
import { FileHistoryListComponent } from '../component/file-history-list/file-history-list.component';
import { FileHistoryDetailComponent } from '../component/file-history-detail/file-history-detail.component';

export const FILE_HISTORY_ROUTES: Routes = [
    {
        path: 'list',
        component: FileHistoryListComponent
    },
    {
        path:':name',
        component: FileHistoryDetailComponent
    }
];
