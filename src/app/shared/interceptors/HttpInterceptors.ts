import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class HttpConfigInterceptor implements HttpInterceptor {
  constructor() { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string = localStorage.getItem('auth_token');
    if (token) {
      request = request.clone({ headers: request.headers.set('Authorization', `Bearer ${token}`) });
    }
   
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // console.log('event--->>>', event);
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 500) {
            console.log(error.status)
        }
        if (error.status === 403) {
          console.log(error)
        }
        return throwError(error);
      }),
    );
  }
}