import { OfferService } from '../../offers.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-how-to-use',
  templateUrl: './how-to-use.component.html',
  styleUrls: ['./how-to-use.component.css'],
  providers: [ OfferService ]
})
export class HowToUseComponent implements OnInit {

  public howToUse = '';

  constructor(
      private offerService: OfferService,
      private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.offerService.getHowToUseOfferById(this.route.parent.snapshot.params['id'])
      .then((description: string) => {
        this.howToUse = description;
      });
  }

}
