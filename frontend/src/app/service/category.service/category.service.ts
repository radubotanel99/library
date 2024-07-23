import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICategory } from '../../categories/categories.model';
import { BehaviorSubject, Observable, ReplaySubject, map } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private category : BehaviorSubject<ICategory | null> = new BehaviorSubject<ICategory | null>(null);

  constructor(private http: HttpClient, private router : Router) { 

  }

  // for development, the APIs should not include /backend at the beggining

  getCategories() : Observable<ICategory[]>{
    return this.http.get<ICategory[]>('/backend/api/categories');
  }

  addCategory(category : ICategory) : Observable<ICategory> {
    return this.http.post<ICategory>('/backend/api/categories', category).pipe(map((category : ICategory) => {
      this.category.next(category);
      return category;
    }));
  }

  deleteCategory(categoryId: number): Observable<void> {
    return this.http.delete<void>(`/backend/api/categories/${categoryId}`);
  }

  updateCategory(category: ICategory): Observable<ICategory> {
    return this.http.put<ICategory>('/backend/api/categories', category); 
  }

  getCategoryById(categoryId: number): Observable<ICategory> {
    return this.http.get<ICategory>(`/backend/api/categories/${categoryId}`);
  }

  getCategoryByName(categoryName: string): Observable<ICategory> {
    return this.http.get<ICategory>(`/backend/api/categories/name/${categoryName}`);
  }
}
