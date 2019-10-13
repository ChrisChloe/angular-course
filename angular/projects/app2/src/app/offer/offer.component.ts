import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OfferService } from './../offers.service';
import { CartService } from '../cart.service';

import { Offer } from './../shared/offer.model';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css'],
  providers: [ OfferService ]
})
export class OfferComponent implements OnInit, OnDestroy {

  public offer: Offer;

  constructor(
    private route: ActivatedRoute,
    private offerService: OfferService,
    private cartService: CartService
    ) { }

  ngOnInit() {

    this.route.params.subscribe((params: Params) => {
      this.offerService.getOfferById(params.id)
        .then(( offer: Offer) => {
          this.offer = offer;
        });
    });
  }
  ngOnDestroy() {
  }

  public  addCartItem(offer: Offer): void {
    this.cartService.includeItem(this.offer);
    console.log(this.cartService.showItems());
  }

}
