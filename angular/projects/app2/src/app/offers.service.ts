import { Http } from '@angular/http';
import { Offer } from './shared/offer.model';
import { Injectable, Inject } from '@angular/core';

@Injectable()
export class OfferService {

  constructor(private http: Http) {}

  public getOffers(): Promise<Offer[]> {

    return this.http.get('http://localhost:3000/offers?highlight=true')
        .toPromise()
        .then((response: any) => response.json());
  }

  public getOffersByCategory(category: string): Promise<Offer[]> {
    return this.http.get(`http://localhost:3000/offers?category=${category}`)
        .toPromise()
        .then((response: any) => response.json())

  }

}
