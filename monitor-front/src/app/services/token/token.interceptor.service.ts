import { environment } from './../../../environments/environment';
import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {

  constructor(public auth: AuthService) {
  }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.auth.getToken()) {
      request = request.clone({
        setHeaders: {
          Authorization: `bearer ${this.auth.getToken()}`
        }
      });
    }

    return next.handle(request).pipe(tap(
    (event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {

        if (event.body.error) {
          throw(event);

        }

      }
    },
    (error: any) => {
      if (error instanceof HttpErrorResponse) {

      }
    }));
  }
}