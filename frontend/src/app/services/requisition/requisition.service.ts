import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequisitionService {

  constructor(private http: HttpClient) { }

  save(data): Observable<any>{
    return this.http.post<any>(environment.apiBaseURL + '/requisition/save', data)
  }

  getUsers(): Observable<any>{
    return this.http.get<any>(environment.apiBaseURL + '/users/index')
  }

  index(): Observable<any>{
    return this.http.get<any>(environment.apiBaseURL + '/requisitions/index')
  }
  
  show(id): Observable<any>{
    return this.http.get<any>(environment.apiBaseURL + '/requisition/load/' + id)
  }

  cancel(id): Observable<any>{
    return this.http.post<any>(environment.apiBaseURL + '/requisition/cancel/' + id, "")
  }
  
  accept(id): Observable<any>{
    return this.http.post<any>(environment.apiBaseURL + '/requisition/accept/' + id, "")
  }

  finish(id): Observable<any>{
    return this.http.post<any>(environment.apiBaseURL + '/requisition/finish/' + id, "")
  }
}
