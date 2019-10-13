import { Router } from '@angular/router';
import { environment } from './../../../environments/environment';
import { getObjectCookie, getCookie, eraseCookie } from '../../app.utils';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';
import * as moment from 'moment';

@Injectable({ providedIn: 'root' })
export class AuthService {

  public token: any;

  constructor(private http: HttpClient, private router: Router) { }

  /**
   * @param {string} email
   * @param {string} password
   * @returns {any}
   * 
   */
  public loginUser(email: string, password: string): any {

    const grant_type: string = environment.GRANT_TYPE;
    const client_id: number = environment.CLIENT_ID;
    const client_secret: string = environment.CLIENT_SECRET;

    return new Observable((observer) => {

      this.http.post(`${environment.API_URL}/oauth/token`, { email, password })
        .subscribe(
          (res: any) => {
            const token = JSON.stringify({ token: res.token, timeLogin: new Date().getTime() });

            this.createTokenData(token);

            observer.next();

          },
          (error: any) => {
            observer.next(error);
            // alert(error.error.message);

          });

    });
  }

  /**
   *
   * @returns {boolean}
   */
  public isLoggedIn(): boolean {

    moment.locale('pt-br');

    const tokenString: string = getCookie('auth_token') || '{}';

    const token: any = JSON.parse(tokenString);

    let result: boolean;

    try {
      if (token && token.token) {

        const timeExpire = moment(parseInt(token.timeLogin, 10)).add(parseInt(token.expires_in, 10), 'seconds');
        const isTokenExpired = timeExpire.isBefore(moment());

        result = token.token != null;
      }

    } catch (error) {
      result = false;
    }

    return result;

  }




  private createTokenData(token: string): void {

    eraseCookie('auth_token');

    const objToken: any = JSON.parse(token);
    const expires: number = (typeof objToken === "object") ? objToken.token.expires_in : 1000000;

    document.cookie = `auth_token=${token};Max-Age=${expires}`;

  }

  /**
   *
   * @returns {any}
   */
  public getToken(): any {

    const jsonData: any = getObjectCookie('auth_token');

    if (_.isEmpty(jsonData) && !(typeof jsonData === "object")) {

      eraseCookie('auth_token');
      this.router.navigate(['']);

    } else {

      return jsonData.token;

    }

  }

  /**
  *
  * @returns {Observable<any>}
  */
  public getUserAuthenticated(): Observable<any> {

    return this.http.post(`${environment.API_URL}/api/user`, {});

  }

  public getUserData(): any {
    var userData = getCookie('auth_user_data');
    return JSON.parse(userData);
  }

  private createUserData(user: string): void {

    eraseCookie('auth_user_data');
    document.cookie = `auth_user_data=${user};Max-Age=21600`;

  }

  public logout(): void {

    eraseCookie('auth_token');
    eraseCookie('auth_user_data');
    // this.share.clearAll();   share data
    this.router.navigate(['']);
    window.stop();

  }






}


