import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Area } from 'src/app/interfaces/area/area';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AreasService {

  constructor(private http: HttpClient) { }

  index(): Observable<Area[]>{
    return this.http.get<Area[]>(environment.apiBaseURL + '/areas/index')
  }
}
