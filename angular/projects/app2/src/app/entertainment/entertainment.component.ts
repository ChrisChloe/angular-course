import { Component, OnInit } from '@angular/core';
import { Offer } from '../shared/offer.model';
import { OfferService } from './../offers.service';

@Component({
  selector: 'app-entertainment',
  templateUrl: './entertainment.component.html',
  styleUrls: ['./entertainment.component.css'],
  providers: [ OfferService ]
})
export class EntertainmentComponent implements OnInit {

  public offers: Offer[];

  constructor(private offerService: OfferService) { }

  ngOnInit() {
    this.offerService.getOffersByCategory('entertainment')
      .then(( offers: Offer[] ) => {
        this.offers = offers;
      });
  }

}
