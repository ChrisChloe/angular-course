import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CrudServices } from '../../helpers/crud/crud-service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BuscaAereoService extends CrudServices {


  constructor(public http: HttpClient) {
    super();
    this.entity = 'buscaaereo';
  }

  public getBuscaAereoStatus(): Observable<any> {
    return this.http.get(`${environment.API_URL}/${this.entity}/back-end`);
  }

  public getManagerStatus(): Observable<any> {
    return this.http.get(`${environment.API_URL}/${this.entity}/manager`);
  }

  public getCrawlerStatus(): Observable<any> {
    return this.http.get(`${environment.API_URL}/crawler`);
  }

  public getCrmStatus(): Observable<any> {
    return this.http.get(`${environment.API_URL}/crm`);
  }

}
