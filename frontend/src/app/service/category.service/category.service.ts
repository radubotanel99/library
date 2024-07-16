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

  getCategories() : Observable<ICategory[]>{
    return this.http.get<ICategory[]>('/api/categories');
  }

  addCategory(category : ICategory) : Observable<ICategory> {
    return this.http.post<ICategory>('/api/categories', category).pipe(map((category : ICategory) => {
      this.category.next(category);
      return category;
    }));
  }

  deleteCategory(categoryId: number): Observable<void> {
    return this.http.delete<void>(`/api/categories/${categoryId}`);
  }

  updateCategory(category: ICategory): Observable<ICategory> {
    return this.http.put<ICategory>('/api/categories', category); 
  }

  getCategoryById(categoryId: number): Observable<ICategory> {
    return this.http.get<ICategory>(`/api/categories/${categoryId}`);
  }

  getCategoryByName(categoryName: string): Observable<ICategory> {
    return this.http.get<ICategory>(`/api/categories/name/${categoryName}`);
  }
}
