import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IRent } from '../../rents/rents.model';
import { BehaviorSubject, Observable, ReplaySubject, map } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RentService {
  private rent : BehaviorSubject<IRent | null> = new BehaviorSubject<IRent | null>(null);

  constructor(private http: HttpClient, private router : Router) { 

  }

  private baseUrl: string = (environment.production) ? '/backend/api/rents' : '/api/rents';

  //production API
  //private baseUrl: string = '/backend/api/rents';

  //development API
  // private baseUrl: string = '/api/rents';

  getRents() : Observable<IRent[]>{
    return this.http.get<IRent[]>(this.baseUrl);
  }

  addRent(rent : IRent) : Observable<IRent> {
    return this.http.post<IRent>(this.baseUrl, rent).pipe(map((rent : IRent) => {
      this.rent.next(rent);
      return rent;
    }));
  }

  getRentByState(rentState: string): Observable<IRent> {
    return this.http.get<IRent>(`${this.baseUrl}/${rentState}`);
  }

  finishRent(id: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/${id}/finish`, {});
  }
}
