import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule } from "@angular/router";
import { SharedModule } from '../shared/shared.module';
import { FileHistoryListComponent } from './component/file-history-list/file-history.component';
import { FILE_HISTORY_ROUTES } from './route/file-history.route';
import { FileHistoryService } from './service/file-history.service';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        RouterModule.forRoot(FILE_HISTORY_ROUTES),
        SharedModule
    ],
    declarations: [
        FileHistoryListComponent,
    ],
    schemas: [NO_ERRORS_SCHEMA],
    exports: []
})
export class FileHistoryModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: FileHistoryRootModule,
            providers: [
                FileHistoryService
            ]
        };
    }
}

@NgModule({
    imports: [
        FileHistoryModule
    ],
    exports: [FileHistoryModule]
})
export class FileHistoryRootModule {
}

