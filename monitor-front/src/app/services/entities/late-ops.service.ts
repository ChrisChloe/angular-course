import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CrudServices } from '../../helpers/crud/crud-service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LateOpsService extends CrudServices {


  constructor(public http: HttpClient) {
    super();
    this.entity = 'lateOps';
  }

  public getLateOps(): Observable<any> {
    return this.http.get(`${environment.API_URL}/${this.entity}`);
  }

  public getLateOpsFinancial(): Observable<any> {
    return this.http.get(`${environment.API_URL}/${this.entity}Financial`);
  }

}
