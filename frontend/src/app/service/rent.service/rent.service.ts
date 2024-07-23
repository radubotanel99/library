import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IRent } from '../../rents/rents.model';
import { BehaviorSubject, Observable, ReplaySubject, map } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RentService {
  private rent : BehaviorSubject<IRent | null> = new BehaviorSubject<IRent | null>(null);

  constructor(private http: HttpClient, private router : Router) { 

  }

  // for development, the APIs should not include /backend at the beggining

  getRents() : Observable<IRent[]>{
    return this.http.get<IRent[]>('/backend/api/rents');
  }

  addRent(rent : IRent) : Observable<IRent> {
    return this.http.post<IRent>('/backend/api/rents', rent).pipe(map((rent : IRent) => {
      this.rent.next(rent);
      return rent;
    }));
  }

  getRentByState(rentState: string): Observable<IRent> {
    return this.http.get<IRent>(`/backend/api/rents/${rentState}`);
  }

  finishRent(id: number): Observable<void> {
    return this.http.post<void>(`/backend/api/rents/${id}/finish`, {});
  }
}
