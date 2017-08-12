import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { APP_ROUTES } from "./app.route";
import { RouterModule } from "@angular/router";
import { HomeModule } from "./home/home.module";
import { SharedModule } from './shared/shared.module';
import { DataModule } from './data/data.module';
import { CustomerModule } from './data/customer/customer.module';
import { ChickenModule } from './data/chicken/chicken.module';
import { LayingHenModule } from './data/laying-hen/laying-hen.module';
import { HenhouseModule } from './data/henhouse/henhouse.module';
import { DeliveryModule } from './delivery/delivery.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
      ChickenModule.forRoot(),
      CustomerModule.forRoot(),
      DataModule.forRoot(),
      DeliveryModule.forRoot(),
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
