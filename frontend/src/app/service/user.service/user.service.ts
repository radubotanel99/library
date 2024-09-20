import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../../users/users.model';
import { BehaviorSubject, Observable, ReplaySubject, map } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user : BehaviorSubject<IUser | null> = new BehaviorSubject<IUser | null>(null);

  constructor(private http: HttpClient, private router : Router) { 

  }

  //production API
  // private baseUrl: string = '/backend/api/users';

  //development API
  private baseUrl: string = '/api/users';

  getUsers() : Observable<IUser[]>{
    return this.http.get<IUser[]>(this.baseUrl);
  }

  addUser(user : IUser) : Observable<IUser> {
    return this.http.post<IUser>(this.baseUrl, user).pipe(map((user : IUser) => {
      this.user.next(user);
      return user;
    }));
  }

  deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${userId}`);
  }

  updateUser(user: IUser): Observable<IUser> {
    return this.http.put<IUser>(this.baseUrl, user); 
  }

  getUserById(userId: number): Observable<IUser> {
    return this.http.get<IUser>(`${this.baseUrl}/${userId}`);
  }

  getUserByName(userName: string): Observable<IUser> {
    return this.http.get<IUser>(`${this.baseUrl}/name/${userName}`);
  }
}
