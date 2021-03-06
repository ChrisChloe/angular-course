import {Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {getObjectCookie, getCookie, eraseCookie} from '../../app.utils';
import { environment } from '../../../environments/environment';
import { Observable, Subject } from 'rxjs';
import * as moment from 'moment';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  public loginSubject = new Subject<boolean>();

  constructor(
    private router: Router,
    private http: HttpClient,
    ) {}

  private createUserData(user: string): void {

     eraseCookie('user_data');
     document.cookie = `user_data=${user};Max-Age=21600`;
     const user_request = JSON.parse(user);
  }

  public confirmAccount(token) {
    return this.http.get(`${environment.API_URL}/activate/${token}`);
  }

  private createTokenData(token: string): void {

    eraseCookie('auth_token');

    const objToken: any = JSON.parse(token);
    const expires: number = (_.isObject(objToken)) ? objToken.token.expires_in : 21600;

    document.cookie = `auth_token=${token};Max-Age=${expires}`;
  }

  public getToken(): any {

    const jsonData: any = getObjectCookie('auth_token');

    if (_.isEmpty(jsonData) && !_.isObject(jsonData)) {

      eraseCookie('auth_token');
      this.router.navigate(['']);
    } else {

      return jsonData.token.access_token;
    }
  }

  public getDataUser(): any {

    const jsonData: any = getObjectCookie('user_data');

    if (_.isEmpty(jsonData) && !_.isObject(jsonData)) {
      this.logout();
    }

    return jsonData;
  }

  public isLoggedIn(): boolean {

    const tokenString: string = getCookie('auth_token') || '{}';
    const userString: string = getCookie('user_data') || '{}';

    const token: any = JSON.parse(tokenString);
    const user: any = JSON.parse(userString);

    let result: boolean;

    try {
      if ((token && token.token && token.token.access_token) && (user && user.id)) {

        const timeExpire = moment(parseInt(token.timeLogin, 10)).add(parseInt(token.token.expires_in, 10), 'seconds');
        const isTokenExpired = timeExpire.isBefore(moment());

        result = token.token.access_token != null && !isTokenExpired;
      }

    } catch (error) {
      result = false;
    }

    return result;
  }

  public loginInfo(boolean) {
      this.loginSubject.next(boolean);
  }

  public logout(): void {

    eraseCookie('auth_token');
    eraseCookie('user_data');
    window.stop();
    this.loginInfo(false);
    this.router.navigate(['']);
  }
  public getUserAuthenticated(): Observable<any> {
    return this.http.get(`${environment.API_URL}/auth`, {});
  }

  public loginUser(username: string, password: string): any {

    const grant_type: string = environment.GRANT_TYPE;
    const client_id: any = environment.CLIENT_ID;
    const client_secret: string = environment.CLIENT_SECRET;

    return new Observable((observer) => {

            this.http.post(`${environment.API_URL}/oauth/token`,
            {username, password, grant_type, client_id, client_secret}).subscribe(
              ($token) => {

                const token: string = JSON.stringify({ token: $token, timeLogin: new Date().getTime() });
                this.createTokenData(token);

                this.getUserAuthenticated().subscribe(
                  ($user) => {
                    const user = JSON.stringify($user);
                    this.createUserData(user);
                    observer.next();
                  },
                  (error: any) => {
                    this.logout();
                    observer.error(error.error);
                  });
              },
              (error) => {
                observer.error(error.error);
              });
    });
  }
}
