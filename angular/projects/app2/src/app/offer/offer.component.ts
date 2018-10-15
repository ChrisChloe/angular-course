import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Offer } from './../shared/offer.model';
import { OfferService } from './../offers.service';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css'],
  providers: [ OfferService ]
})
export class OfferComponent implements OnInit {

  public offer: Offer;

  constructor(
    private route: ActivatedRoute,
    private offerService: OfferService ) { }

  ngOnInit() {

    this.route.params.subscribe((params: Params) => {
      this.offerService.getOfferById(params.id)
        .then(( offer: Offer) => {
          this.offer = offer;
        });
    });
  }
}
