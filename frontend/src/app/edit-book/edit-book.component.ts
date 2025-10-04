import { Component, OnInit } from '@angular/core';
import { createDefaultBook, IBook } from '../books/books.model';
import { FormsModule } from '@angular/forms';
import { BookService } from '../service/book.service/book.service';
import { CategoryService } from '../service/category.service/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ICategory } from '../categories/categories.model';
import { forkJoin, Observable } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { PageTitleComponent } from "../ui.components/page-title/page-title.component";
import { SearchFilterComponent } from "../ui.components/search-filter/search-filter.component";
import { CustomButtonComponent } from "../ui.components/custom-button/custom-button.component";
import { TranslateModule } from '@ngx-translate/core';
import { ErrorHandlerService } from '../service/error-handler-service';

@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [FormsModule, CommonModule, PageTitleComponent, SearchFilterComponent, CustomButtonComponent, TranslateModule],
  templateUrl: './edit-book.component.html',
  styleUrl: './edit-book.component.css'
})


export class EditBookComponent implements OnInit {
  book: IBook = createDefaultBook();
  categories: ICategory[] = [];
  isEditMode = false;

  constructor(private bookService: BookService, private categoryService: CategoryService, private router: Router, private route: ActivatedRoute, private message: NzMessageService, private errorHandler: ErrorHandlerService) {

  }

  ngOnInit() {
    const bookId = this.route.snapshot.paramMap.get('id');
    if (bookId) {
      this.isEditMode = true;
      this.bookService.getBookById(+bookId).subscribe(book => {
        this.book = book;
      });
    }

    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    })

    
  }

  addBook() {
    this.errorHandler.handleApiCall(
      this.bookService.addBook(this.book),
      'MESSAGES.BOOK_SAVED_SUCCESS'
    ).subscribe({
      next: () => this.router.navigate(['/books'])
    });
  }

  saveBook(): void {
    if (this.isEditMode) {
      this.handleBookSave(this.bookService.updateBook(this.book));
    } else {
      // category <select> is biding just category.id, not the category.
      if (this.book.category && this.book.category.id &&  this.book.category.name === '') {
        this.book.category = this.categories.find(cat => cat.id === this.book.category.id)!
      }
      this.handleBookSave(this.bookService.addBook(this.book));
    }
  }

  handleBookSave(observable: Observable<IBook>): void {
    this.errorHandler.handleApiCall(
      observable,
      'MESSAGES.BOOK_SAVED_SUCCESS'
    ).subscribe({
      next: () => this.router.navigate(['/books'])
    });
  }

  trackByCategory(index: number, category: ICategory): string {
    return category.name;
  }
}
