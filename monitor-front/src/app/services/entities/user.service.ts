import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CrudServices } from '../../helpers/crud/crud-service';
import { Injectable } from '@angular/core';
import { FilterCriteria } from 'src/app/helpers/crud/filter-criteria';

@Injectable({
  providedIn: 'root'
})
export class UserService extends CrudServices {


  constructor(public http: HttpClient) {
    super();
    this.entity = 'users';
  }

  public getLoggedUsers(params: any): Observable<any> {
 
      return this.http.get(`${environment.API_URL}/${this.entity}/logged`, { params: params });

  }

  public getLastLogins(params: any): Observable<any> {
    return new Observable((observer) => {

      this.http.get(`${environment.API_URL}/user/getLastLogin`, { params: params })
        .subscribe(
          (res) => {
            observer.next(res);
          },
          () => {
            observer.error();
          }

        );

    });

  }
}
