import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { APP_ROUTES } from "./app.route";
import { RouterModule } from "@angular/router";
import { HomeModule } from "./home/home.module";
import { SharedModule } from './shared/shared.module';
import { DataModule } from './data/data.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
      DataModule.forRoot(),
      HomeModule.forRoot(),
      RouterModule.forRoot(APP_ROUTES, {enableTracing: false}),
      SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
