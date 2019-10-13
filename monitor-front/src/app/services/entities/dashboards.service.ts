import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CrudServices } from '../../helpers/crud/crud-service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardsService extends CrudServices {


  constructor(public http: HttpClient) {
    super();
    this.entity = 'dashboards';
  }

  public getOpCount(): Observable<any> {
    return this.http.get(`${environment.API_URL}/${this.entity}/op-count`);
  }

  public getSearchCount(): Observable<any> {
    return this.http.get(`${environment.API_URL}/${this.entity}/search-count`);
  }



}
