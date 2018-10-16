import { map } from 'rxjs/operators';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Order } from './shared/order.model';
import { Observable } from 'rxjs';

import { URL_API } from './app.api';

@Injectable()
export class PurchaseOrderService {
    constructor(private http: Http) { }

    public confirmPurchase(order: Order): Observable<any> {

        const headers: Headers = new Headers();

        headers.append('Content-type', 'application/json');

        return this.http.post(
          `${URL_API}purchases`,
          JSON.stringify(order),
          new RequestOptions({ headers: headers }))
          .pipe(map((response: Response) => console.log(response.json)));

    }
}
