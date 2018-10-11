import { OfferService } from './../../offers.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css'],
  providers: [ OfferService ]
})
export class LocationComponent implements OnInit {

  public location = '';

  constructor(
    private route: ActivatedRoute,
    private offerService: OfferService
    ) { }

  ngOnInit() {
    this.offerService.getLocationById(this.route.parent.snapshot.params['id'])
      .then((description: string) => {
        this.location = description;
      });
  }

}
