import { Component, OnInit } from '@angular/core';
import { Observable, Subject, of} from 'rxjs';

import { Offer } from '../shared/offer.model';
import { OfferService } from '../offers.service';
import { switchMap, debounceTime, distinctUntilChanged, catchError} from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [ OfferService ]
})
export class HeaderComponent implements OnInit {

  public offers: Observable<Offer[]>;

  private subjectSearch: Subject<string> = new Subject<string>();

  constructor(private offerService: OfferService) { }

  ngOnInit() {
    this.offers = this.subjectSearch
    .pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap((term: string) => {
      console.log('api http request');

      if (term.trim() === '') {
        return of<Offer[]>([]);
      }
      return this.offerService.searchOffers(term);
      }),
      catchError((err: any) => {
        console.log(err);
        return of<Offer[]>([]);
      }
    )
    );
  }


  public search(searchTerm: string): void {
    console.log('keyup character: ', searchTerm);
    this.subjectSearch.next(searchTerm);
  }

  public cleanSearch(): void {
    this.subjectSearch.next('');
  }
}
