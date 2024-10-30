import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICategory } from '../../categories/categories.model';
import { BehaviorSubject, Observable, ReplaySubject, map } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private category : BehaviorSubject<ICategory | null> = new BehaviorSubject<ICategory | null>(null);

  constructor(private http: HttpClient, private router : Router) { 

  }

  private baseUrl: string = (environment.production) ? '/backend/api/categories' : '/api/categories';

  //production API
  //private baseUrl: string = '/backend/api/categories';

  //development API
  // private baseUrl: string = '/api/categories';

  getCategories() : Observable<ICategory[]>{
    return this.http.get<ICategory[]>(this.baseUrl);
  }

  addCategory(category : ICategory) : Observable<ICategory> {
    return this.http.post<ICategory>(this.baseUrl, category).pipe(map((category : ICategory) => {
      this.category.next(category);
      return category;
    }));
  }

  deleteCategory(categoryId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${categoryId}`);
  }

  updateCategory(category: ICategory): Observable<ICategory> {
    return this.http.put<ICategory>(this.baseUrl, category); 
  }

  getCategoryById(categoryId: number): Observable<ICategory> {
    return this.http.get<ICategory>(`${this.baseUrl}/${categoryId}`);
  }

  getCategoryByName(categoryName: string): Observable<ICategory> {
    return this.http.get<ICategory>(`${this.baseUrl}/name/${categoryName}`);
  }
}
