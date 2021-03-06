import { Offer } from './../shared/offer.model';
import { OfferService } from '../offers.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ OfferService ]
})
export class HomeComponent implements OnInit {

  public offers: Offer[];
  data: any;

  constructor(private offerService: OfferService) { }

  ngOnInit() {
    this.offerService.getUsers().subscribe(response => console.log(response.data));

    /*this.offerService.getOffers()
      .then(( offers: Offer[] ) => {
          this.offers = offers;
        })
      .catch(( param: any ) => {
      });*/
  }

}
