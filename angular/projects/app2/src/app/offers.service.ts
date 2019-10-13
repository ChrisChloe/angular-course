import { Http, Response } from '@angular/http';
import { Offer } from './shared/offer.model';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { map, retry } from 'rxjs/operators';

import { URL_API } from './app.api';

@Injectable()
export class OfferService {

  constructor(private http: Http) {}

  public getOffers(): Promise<Offer[]> {

    return this.http.get(`${URL_API}offers?highlight=true`)
        .toPromise()
        .then((response: Response) => response.json());
  }

  public getOffersByCategory(category: string): Promise<Offer[]> {
    return this.http.get(`${URL_API}offers?category=${category}`)
        .toPromise()
        .then((response: Response) => response.json());

  }
  public getOfferById(id: number): Promise<Offer> {
    return this.http.get(`${URL_API}offers?id=${id}`)
        .toPromise()
        .then((response: Response) => response.json().shift());
  }
  public getHowToUseOfferById(id: number): Promise<string> {
    return this.http.get(`${URL_API}how-to-use?id=${id}`)
        .toPromise()
        .then((response: Response) => response.json().shift().description);
  }
  public getLocationById(id: number): Promise<string> {
    return this.http.get(`${URL_API}location?id=${id}`)
        .toPromise()
        .then((response: Response) => response.json().shift().description);
  }
  public searchOffers(term: string): Observable<Offer[]> {
    return this.http.get(`${URL_API}offers?title_like=${term}`)
    .pipe(retry(1), map((response: Response) => response.json()));

  }
  public getUsers() {
    return this.http.get(`${URL_API}/offers`);
}

}
