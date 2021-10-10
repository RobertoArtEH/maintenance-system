import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceRequest } from 'src/app/interfaces/services/service-request';
import { User } from 'src/app/interfaces/user/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceRequestService {

  constructor(private http: HttpClient) { }

  save(data): Observable<any>{
    return this.http.post<any>(environment.apiBaseURL + '/service/save', data)
  }

  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(environment.apiBaseURL + '/users/index')
  }

  index(): Observable<any>{
    return this.http.get<any>(environment.apiBaseURL + '/services/index')
  }
  
  show(id): Observable<any>{
    return this.http.get<any>(environment.apiBaseURL + '/service/load/' + id)
  }

  cancel(id): Observable<any>{
    return this.http.post<any>(environment.apiBaseURL + '/service/cancel/' + id, "")
  }
}
