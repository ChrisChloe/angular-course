import { Routes } from '@angular/router';

// Components
import { HomeComponent} from './home/home.component';
import { RestaurantsComponent} from './restaurants/restaurants.component';
import { EntertainmentComponent } from './entertainment/entertainment.component';
import { OfferComponent } from './offer/offer.component';
import { LocationComponent } from './offer/location/location.component';
import { HowToUseComponent } from './offer/how-to-use/how-to-use.component';
import { PurchaseOrderComponent } from './purchase-order/purchase-order.component';

export const ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'restaurants', component: RestaurantsComponent },
  { path: 'entertainment', component: EntertainmentComponent },
  { path: 'offer', component: HomeComponent },
  { path: 'offer/:id', component: OfferComponent,
      children: [
        { path: '', component: HowToUseComponent },
        { path: 'how-to-use', component: HowToUseComponent },
        { path: 'location', component: LocationComponent },
      ] },
  { path: 'purchase-order', component: PurchaseOrderComponent }
];
