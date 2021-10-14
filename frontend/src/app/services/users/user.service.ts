import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiBaseUrl = environment.apiBaseURL;
  
  constructor(private http: HttpClient) { }

  getallUsers() {
    return this.http.get<any>(`${this.apiBaseUrl}/users/index`);
  }

  saveUser(data): Observable<any>{
    return this.http.post<any>(environment.apiBaseURL + '/user/save', data)
  }
  
  show(id): Observable<any>{
    return this.http.get<any>(environment.apiBaseURL + '/user/load/' + id);
  }

}
