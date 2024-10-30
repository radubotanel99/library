import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBook } from '../../books/books.model';
import { BehaviorSubject, Observable, ReplaySubject, catchError, map, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private book : BehaviorSubject<IBook | null> = new BehaviorSubject<IBook | null>(null);
  constructor(private http: HttpClient, private router : Router) { 

  }

  private baseUrl: string = (environment.production) ? '/backend/api/books' : '/api/books';
  
  //production API
  //private baseUrl: string = '/backend/api/books';

  //development API
  // private baseUrl: string = '/api/books';

  getBooks() : Observable<IBook[]>{
    return this.http.get<IBook[]>(this.baseUrl);
  }

  addBook(book : IBook) : Observable<IBook> {
    return this.http.post<IBook>(this.baseUrl, book).pipe(map((book : IBook) => {
      this.book.next(book);
      return book;
    }));
  }

  deleteBook(bookId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${bookId}`);
  }

  updateBook(book: IBook): Observable<IBook> {
    return this.http.put<IBook>(this.baseUrl, book);
  }

  getBookById(id: number): Observable<IBook> {
    return this.http.get<IBook>(`${this.baseUrl}/${id}`);
  }

  getBookByNumber(bookNumber: number): Observable<IBook> {
    return this.http.get<IBook>(`${this.baseUrl}/bookNumber/${bookNumber}`);
  }

  getBooksByState(isDeleted: boolean): Observable<IBook[]> {
    return this.http.get<IBook[]>(`${this.baseUrl}/state/${isDeleted}`);
  }
}
