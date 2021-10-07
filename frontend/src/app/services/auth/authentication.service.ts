import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap, mapTo, catchError } from 'rxjs/operators';
import jwt_decode from 'node_modules/jwt-decode'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  apiBaseUrl = environment.apiBaseURL;
  requestCount = 0;
  name: string;
  email: string;
  password: string;
  token: string;
  role: number;
  constructor(private http: HttpClient) {}

  login(data: any): any {
    return this.http.post(`${this.apiBaseUrl}/login`,data);
  }

  register(data: any): any {
    return this.http.post(`${this.apiBaseUrl}/register`,data);
  }

  logout() {
    return this.http.post<any>(`${this.apiBaseUrl}/logout`, {
      'refresh_token': this.getRefreshToken()
    }).pipe(
      tap(() => this.removeAll()),
      mapTo(200),
      catchError(error => {
        return of(error);
      }));
  }

  setToken(token: string, refreshToken: string) {
    localStorage.setItem('token', token)
    localStorage.setItem('refreshToken', refreshToken)
  }

  isLoggedIn() {
    return !!this.getJwtToken();
  }

  getJwtToken() {
    return localStorage.getItem('token')
  }

  getRefreshToken() {
    return localStorage.getItem('refreshToken')
  }

  removeAll() {
    localStorage.clear()
  }
  
  removeTokens() {
    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')
  }

  // getRole(){
  //   var decoded = jwt_decode(this.getJwtToken());
  //   return decoded.role;
  // }
 
}