// src/app/app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule, registerLocaleData } from '@angular/common';

import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { BooksComponent } from './books/books.component';

import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTableModule } from 'ng-zorro-antd/table';

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    AppComponent,
    MatDialogModule,
    BrowserAnimationsModule,
    NzMessageModule,
    NzIconModule,
    NzTableModule,
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }
