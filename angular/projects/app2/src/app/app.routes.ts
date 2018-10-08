import { Component } from '@angular/core';
import { Routes } from '@angular/router';

import { HomeComponent} from './home/home.component';
import { RestaurantsComponent} from './restaurants/restaurants.component';
import { EntertainmentComponent } from './entertainment/entertainment.component';

export const ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'restaurants', component: RestaurantsComponent },
  { path: 'entertainment', component: EntertainmentComponent }
]
