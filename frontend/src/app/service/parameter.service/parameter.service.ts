import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, map } from 'rxjs';
import { Router } from '@angular/router';
import { IParameter } from '../../parameters/parameters.model';

@Injectable({
  providedIn: 'root'
})
export class ParameterService {
  private parameter : BehaviorSubject<IParameter | null> = new BehaviorSubject<IParameter | null>(null);

  constructor(private http: HttpClient, private router : Router) { 

  }

  // for development, the APIs should not include /backend at the beggining

  
  getParameters() : Observable<IParameter[]>{
    return this.http.get<IParameter[]>('/backend/api/parameters');
  }

  saveParameters(parameters: IParameter[]): Observable<IParameter[]> {
    return this.http.post<IParameter[]>('/backend/api/parameters', parameters).pipe(map((updatedParameters: IParameter[]) => {
      return updatedParameters;
    }));
  }
}
