import { map } from 'rxjs/operators';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Order } from './shared/order.model';
import { Observable } from 'rxjs';

import { URL_API } from './app.api';

@Injectable()
export class PurchaseOrderService {
    constructor(private http: Http) { }

    public confirmPurchase(order: Order): Observable<number> {

        const headers: Headers = new Headers();

        headers.append('Content-type', 'application/json');

        return this.http.post(
          `${URL_API}purchases`,
          JSON.stringify(order),
          new RequestOptions({ headers: headers }))
          .pipe(map((response: Response) => response.json().id));

    }
}
