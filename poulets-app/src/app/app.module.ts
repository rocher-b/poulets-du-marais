import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from "@angular/router";

import { AppComponent } from './app.component';
import { APP_ROUTES } from "./app.route";
import { ChickenModule } from './chicken/chicken.module';
import { CustomerModule } from './customer/customer.module';
import { DeliveryModule } from './delivery/delivery.module';
import { HenhouseModule } from './henhouse/henhouse.module';
import { HomeModule } from "./home/home.module";
import { LayingHenModule } from './laying-hen/laying-hen.module';
import { SharedModule } from './shared/shared.module';
import { FileHistoryModule } from './file-history/file-history.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
      ChickenModule.forRoot(),
      CustomerModule.forRoot(),
      DeliveryModule.forRoot(),
      FileHistoryModule.forRoot(),
      HenhouseModule.forRoot(),
      HomeModule.forRoot(),
      LayingHenModule.forRoot(),
      RouterModule.forRoot(APP_ROUTES, {enableTracing: false}),
      SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

