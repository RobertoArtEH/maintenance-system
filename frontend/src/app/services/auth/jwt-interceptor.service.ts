import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { catchError, switchMap } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { AuthenticationService } from '../auth/authentication.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService {

  constructor(private authService: AuthenticationService,
    private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getJwtToken();
    const refreshToken = this.authService.getRefreshToken();

    if (token) {
      request = this.addToken(request, token);
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error instanceof HttpErrorResponse) {

          if (error.url.includes('/login')) {
            return throwError(error);
          }
          if (error.error.message === 'InvalidJwtToken' ) {
            this.logout();
          }
          if (error.error.message === 'InvalidRefreshToken') {
            this.logout();
          }
          if (error.error.code === 400) {
            return throwError(error);
          }
          if (error instanceof HttpErrorResponse && error.status === 401) {
            this.authService.requestCount++;
            if (this.authService.requestCount > 3) {
              this.authService.requestCount = 0;
              this.logout();
              return throwError(error);
            }
            return this.unauthorized(request, next, refreshToken);
          } else {
            return throwError(error);
          }
        }
      })
    );
  }

  private addToken(req: HttpRequest<any>, token: string) {
    return req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  private unauthorized(
    request: HttpRequest<any>,
    next: HttpHandler,
    refreshToken: string
  ): Observable<HttpEvent<any>> {
    return this.authService.refreshToken().pipe(
      switchMap(tokenData => {
        this.authService.setToken(tokenData.token, tokenData.refreshToken);
        request = this.addToken(request, tokenData.token);
        return next.handle(request);
      }),
      catchError(error => {
        // if (error.error.error.name === 'InvalidRefreshToken'
        //     || error.error.error.name === 'E_INVALID_JWT_REFRESH_TOKEN') {
        //   this.logout();
        //   return next.handle(request);
        // }
        if (error.error.message === 'InvalidRefreshToken') {
          this.logout();
          return next.handle(request);
        }
      })
    );
  }

  private logout() {
    this.authService.removeAll()
    this.router.navigate(['/login']);
  }
}