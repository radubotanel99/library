import { Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { EditBookComponent } from './edit-book/edit-book.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { BooksComponent } from './books/books.component';
import { CategoriesComponent } from './categories/categories.component';
import { RentsComponent } from './rents/rents.component';
import { EditRentComponent } from './edit-rent/edit-rent.component';
import { HomeComponent } from './home/home.component';
import { DeletedBooksComponent } from './deleted-books/deleted-books.component';

export const routes: Routes = [

    { path: '', component: HomeComponent },

    { path: 'home', component: HomeComponent },

    { path: 'users', component: UsersComponent },
    { path: 'add-user', component: EditUserComponent },
    { path: 'edit-user/:id', component: EditUserComponent },

    { path: 'books', component: BooksComponent },
    { path: 'add-book', component: EditBookComponent },
    { path: 'edit-book/:id', component: EditBookComponent },
    { path: 'deleted-books', component: DeletedBooksComponent},

    { path: 'categories', component: CategoriesComponent },
    { path: 'add-category', component: EditCategoryComponent },
    { path: 'edit-category/:id', component: EditCategoryComponent },

    { path: 'rents', component: RentsComponent },
    { path: 'add-rent', component: EditRentComponent },
];
