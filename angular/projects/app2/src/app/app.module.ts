import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';


import { ROUTES } from './app.routes';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { EntertainmentComponent } from './entertainment/entertainment.component';
import { OfferComponent } from './offer/offer.component';
import { HowToUseComponent } from './offer/how-to-use/how-to-use.component';
import { LocationComponent } from './offer/location/location.component';

import { ReducedDescription } from './utils/reduced-description.pipe';
import { PurchaseOrderComponent } from './purchase-order/purchase-order.component';
import { PurchaseOrderSuccessComponent } from './purchase-order-success/purchase-order-success.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    RestaurantsComponent,
    EntertainmentComponent,
    OfferComponent,
    HowToUseComponent,
    LocationComponent,
    ReducedDescription,
    PurchaseOrderComponent,
    PurchaseOrderSuccessComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(ROUTES),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
