import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBook } from '../../books/books.model';
import { BehaviorSubject, Observable, ReplaySubject, catchError, map, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private book : BehaviorSubject<IBook | null> = new BehaviorSubject<IBook | null>(null);

  constructor(private http: HttpClient, private router : Router) { 

  }

  getBooks() : Observable<IBook[]>{
    return this.http.get<IBook[]>('/api/books');
  }

  addBook(book : IBook) : Observable<IBook> {
    return this.http.post<IBook>('/api/books', book).pipe(map((book : IBook) => {
      this.book.next(book);
      return book;
    }));
  }

  deleteBook(bookId: number): Observable<void> {
    return this.http.delete<void>(`/api/books/${bookId}`);
  }

  updateBook(book: IBook): Observable<IBook> {
    return this.http.put<IBook>('/api/books', book); 
  }

  getBookById(id: number): Observable<IBook> {
    return this.http.get<IBook>(`/api/books/${id}`);
  }

  getBookByNumber(bookNumber: number): Observable<IBook> {
    return this.http.get<IBook>(`/api/books/bookNumber/${bookNumber}`);
  }

  getBooksByState(isDeleted: boolean): Observable<IBook[]> {
    return this.http.get<IBook[]>(`/api/books/state/${isDeleted}`);
  }
}
