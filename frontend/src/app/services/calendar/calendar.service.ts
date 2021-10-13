import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor(private http: HttpClient) { }

  save(data): Observable<any>{
    return this.http.post<any>(environment.apiBaseURL + '/calendar/save', data)
  }

  index(): Observable<any>{
    return this.http.get<any>(environment.apiBaseURL + '/calendars/index')
  }

  getUsers(): Observable<any>{
    return this.http.get<any>(environment.apiBaseURL + '/users/index')
  }
}
