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

  // for development, the APIs should not include /backend at the beggining

  getUsers() : Observable<IUser[]>{
    return this.http.get<IUser[]>('/backend/api/users');
  }

  addUser(user : IUser) : Observable<IUser> {
    return this.http.post<IUser>('/backend/api/users', user).pipe(map((user : IUser) => {
      this.user.next(user);
      return user;
    }));
  }

  deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`/backend/api/users/${userId}`);
  }

  updateUser(user: IUser): Observable<IUser> {
    return this.http.put<IUser>('/backend/api/users', user); 
  }

  getUserById(userId: number): Observable<IUser> {
    return this.http.get<IUser>(`/backend/api/users/${userId}`);
  }

  getUserByName(userName: string): Observable<IUser> {
    return this.http.get<IUser>(`/backend/api/users/name/${userName}`);
  }
}
