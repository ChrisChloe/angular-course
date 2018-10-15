import { Component, OnInit } from '@angular/core';
import { Offer } from '../shared/offer.model';
import { OfferService } from './../offers.service';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css'],
  providers: [ OfferService ]
})
export class RestaurantsComponent implements OnInit {

  public offers: Offer[];

  public dataTest: any = new Date(2017, 8, 30);

  constructor(private offerService: OfferService) { }

  ngOnInit() {
    this.offerService.getOffersByCategory('restaurant')
      .then(( offers: Offer[] ) => {
        this.offers = offers;
      });
  }

}
