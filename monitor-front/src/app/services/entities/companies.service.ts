import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CrudServices } from '../../helpers/crud/crud-service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService extends CrudServices {


  constructor(public http: HttpClient) {
    super();
    this.entity = 'companies';
  }



}
