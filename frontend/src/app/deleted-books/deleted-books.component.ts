import { Component, OnInit, ViewChild } from '@angular/core';
import { IBook } from '../books/books.model';
import { CommonModule, registerLocaleData } from '@angular/common';
import { BookService } from '../service/book.service/book.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { NzTableComponent, NzTableModule } from 'ng-zorro-antd/table';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { FormsModule } from '@angular/forms';
import { NZ_ICONS, NzIconModule } from 'ng-zorro-antd/icon';
import { CustomButtonComponent } from '../ui.components/custom-button/custom-button.component';
import { ColumnItem } from '../ui.components/table.column.interface';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { en_US, NzI18nService } from 'ng-zorro-antd/i18n';
import { NzInputModule } from 'ng-zorro-antd/input';
import { SearchFilterComponent } from "../ui.components/search-filter/search-filter.component";
import { NzMessageService } from 'ng-zorro-antd/message';
import { PageTitleComponent } from "../ui.components/page-title/page-title.component";
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { ExcelService } from '../helpers/excel-service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule, NzTableModule, NzDropDownModule, FormsModule,
    NzIconModule, CustomButtonComponent, NzTableComponent, NzDatePickerModule, NzInputModule, SearchFilterComponent, PageTitleComponent, NzPopconfirmModule],
  templateUrl: './deleted-books.component.html',
  styleUrl: './deleted-books.component.css',
})
export class DeletedBooksComponent implements OnInit {
  books: IBook[];
  searchNumberValue = '';
  searchNumberVisible = false;
  dateFilterValue: Date[] = [];
  dateFilterVisible = false;
  booksFiltered: IBook[] = [];
  booksToShow: IBook[] = [];
  searchedText : string = '';

  constructor(private bookService: BookService, private router: Router, private i18n: NzI18nService, private message: NzMessageService) {
    this.books = [];
  }

  ngOnInit() {
    this.bookService.getBooksByState(true).subscribe(books => {
      this.books = books;
      this.booksFiltered = [...this.books]
      this.booksToShow = [...this.books];
    })
    this.i18n.setLocale(en_US); 
  }

  restoreBook(id: number): void {
    this.router.navigate(['/edit-book', id]);
  }

  searchNumber(): void {
    this.searchNumberVisible = false;
    this.applyFilters();
  }

  resetNumber(): void {
    this.searchNumberValue = '';
    this.applyFilters();
  }

  searchDateFilter(): void {
    this.dateFilterVisible = false;
    this.applyFilters();
  }

  resetDateFilter(): void {
    this.dateFilterValue = [];
    this.applyFilters();
  }

  applyFilters() {
    this.booksFiltered = this.books.filter((book: IBook) => {
      let matches = true;
      if (this.dateFilterValue.length !== 0) {
        matches = matches && book.createdAt! >= this.dateFilterValue[0] && book.createdAt! <= this.dateFilterValue[1];
      }
      if (this.searchNumberValue !== '') {
        matches = matches && book.bookNumber === +this.searchNumberValue;
      }
      return matches;
    });
    this.onChangeSearchText(this.searchedText);
  }

  onChangeSearchText(result: string): void {
    const searchText = result.trim().toLowerCase();
    this.searchedText = result;
    this.booksToShow = this.booksFiltered.filter((book: IBook) =>
      (book.title && book.title.trim().toLowerCase().indexOf(searchText) !== -1) ||
      (book.author && book.author.trim().toLowerCase().indexOf(searchText) !== -1) ||
      (book.category && book.category.name && book.category.name.trim().toLowerCase().indexOf(searchText) !== -1) ||
      (book.publisher && book.publisher.trim().toLowerCase().indexOf(searchText) !== -1)
    )
  }

  titleColumn: ColumnItem<IBook> = {
    name: 'Title',
    sortOrder: null,
    sortFn: (a: IBook | null, b: IBook | null) => (a?.title ?? '').localeCompare(b?.title ?? ''),
  }

  authorColumn: ColumnItem<IBook> = {
    name: 'Author',
    sortOrder: null,
    sortFn: (a: IBook | null, b: IBook | null) => (a?.author ?? '').localeCompare(b?.author ?? ''),
  }

  numberColumn: ColumnItem<IBook> = {
    name: 'Number',
    sortOrder: null,
    sortFn: (a: IBook, b: IBook) => a.bookNumber - b.bookNumber,
  }

  categoryColumn: ColumnItem<IBook> = {
    name: 'Category',
    sortOrder: null,
    sortFn: (a: IBook | null, b: IBook | null) => (a?.category?.name ?? '').localeCompare(b?.category.name ?? ''),
  }

  publisherColumn: ColumnItem<IBook> = {
    name: 'Publisher',
    sortOrder: null,
    sortFn: (a: IBook | null, b: IBook | null) => (a?.publisher ?? '').localeCompare(b?.publisher ?? ''),
  }

  priceColumn: ColumnItem<IBook> = {
    name: 'Price',
    sortOrder: null,
    sortFn: (a: IBook, b: IBook) => a.price - b.price,
  }

  createdAtColumn: ColumnItem<IBook> = {
    name: 'CreatedAt',
    sortOrder: null,
    sortFn: (a: IBook, b: IBook) => new Date(a.createdAt!).getTime() - new Date(b.createdAt!).getTime(),
  }
}
