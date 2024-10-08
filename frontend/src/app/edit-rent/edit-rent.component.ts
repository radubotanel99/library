import { Component, OnInit } from '@angular/core';
import { createDefaultRent, IRent } from '../rents/rents.model';
import { FormsModule } from '@angular/forms';
import { RentService } from '../service/rent.service/rent.service';
import { UserService } from '../service/user.service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { forkJoin, Observable } from 'rxjs';
import { IUser } from '../users/users.model';
import { createDefaultBook, IBook } from '../books/books.model';
import { BookService } from '../service/book.service/book.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { PageTitleComponent } from "../ui.components/page-title/page-title.component";
import { CustomButtonComponent } from "../ui.components/custom-button/custom-button.component";

@Component({
  selector: 'app-add-rent',
  standalone: true,
  imports: [FormsModule, CommonModule, PageTitleComponent, CustomButtonComponent],
  templateUrl: './edit-rent.component.html',
  styleUrl: './edit-rent.component.css'
})


export class EditRentComponent implements OnInit {
  rent : IRent = createDefaultRent();
  books : IBook[] = []; 
  users : IUser[] = [];
  bookNumberInput : number = 0;

  constructor(private rentService: RentService, private userService: UserService, private bookService: BookService, private router: Router, 
      private route: ActivatedRoute, private message: NzMessageService,) {

  }

  ngOnInit() {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    })

    this.bookService.getBooks().subscribe(books => {
      this.books = books;
    })
  }

  addRent() {
    this.rentService.addRent(this.rent).subscribe({
      next: () => this.router.navigate(['/rents'])
    });
  }

  saveRent(): void {
    if (this.validateBook()) {
      this.handleBookSave(this.rentService.addRent(this.rent));
    }
  }

  handleBookSave(observable: Observable<IRent>): void {
    observable.subscribe({
      next: () => {
        this.message.success('Rent saved successfully.');
        this.router.navigate(['/rents']);
      },
      error: (error: any) => {
        if (error.status === 400) {
          this.message.error(error.error.message);
        } else {
          this.message.error('An unexpected error occurred. Contact the administrator.');
        }
      }
    });
  }

  validateBook(): boolean {
    const book = this.books.find(book => book.bookNumber === this.bookNumberInput);
    if (!book || book.bookNumber === 0 || book.title === '') {
      this.message.error('There is no book with this number!');
      return false;
    }
    this.rent.book = book;
    return true;
  }
}
