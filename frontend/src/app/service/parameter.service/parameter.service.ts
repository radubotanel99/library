import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, map } from 'rxjs';
import { Router } from '@angular/router';
import { IParameter } from '../../parameters/parameters.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ParameterService {
  private parameter : BehaviorSubject<IParameter | null> = new BehaviorSubject<IParameter | null>(null);

  constructor(private http: HttpClient, private router : Router) { 

  }

  private baseUrl: string = (environment.production) ? '/backend/api/parameters' : '/api/parameters';

  //production API
  //private baseUrl: string = '/backend/api/parameters';

  //development API
  // private baseUrl: string = '/api/parameters';
  
  getParameters() : Observable<IParameter[]>{
    return this.http.get<IParameter[]>(this.baseUrl);
  }

  saveParameters(parameters: IParameter[]): Observable<IParameter[]> {
    return this.http.post<IParameter[]>(this.baseUrl, parameters).pipe(map((updatedParameters: IParameter[]) => {
      return updatedParameters;
    }));
  }
}
