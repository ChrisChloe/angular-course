import { OfferService } from '../../offers.service';
import { ActivatedRoute, Params } from '@angular/router';
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

    this.route.parent.params.subscribe((params: Params) => {
      this.offerService.getHowToUseOfferById(params.id)
        .then((description: string) => {
          this.howToUse = description;
      });
    });
  }

}
