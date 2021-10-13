import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceService {

  constructor(private http: HttpClient) { }

  save(data): Observable<any>{
    return this.http.post<any>(environment.apiBaseURL + '/maintenance/save', data)
  }

  getUsers(): Observable<any>{
    return this.http.get<any>(environment.apiBaseURL + '/users/index')
  }

  index(): Observable<any>{
    return this.http.get<any>(environment.apiBaseURL + '/maintenance/index')
  }
  
  show(id): Observable<any>{
    return this.http.get<any>(environment.apiBaseURL + '/maintenance/load/' + id)
  }

  cancel(id): Observable<any>{
    return this.http.post<any>(environment.apiBaseURL + '/maintenance/cancel/' + id, "")
  }
}
