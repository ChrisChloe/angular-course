import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    this.offerService.getOfferById(this.route.snapshot.params['id'])
      .then(( offer: Offer) => {
        this.offer = offer;
      });

      /*
      this.route.params.subscribe(
        (param: any) => { console.log(param); },
        (error: any) => console.log(error),
        () => console.log('Proccess was classified as succesful')
        );
      */
  }
}
