import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiBaseUrl = environment.apiBaseURL;
  
  constructor(private http: HttpClient) { }

  getallUsers() {
    return this.http.get<any>(`${this.apiBaseUrl}/users/index`);
  }

  registerUser(data: any): any {
    return this.http.post(`${this.apiBaseUrl}/user/save`, data);
  }
  
}
