import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UsersComponent, HeaderComponent, HttpClientModule, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend'; 
  backgroundImage = (environment.production) ? 'url(/frontend/browser/assets/images/radu.jpg)' : 'url(/assets/images/radu.jpg)';

      /* for development: *//*  background-image: url(/assets/images/radu.jpg); */ 
    /* for production: */ //background-image: url(/frontend/browser/assets/images/radu.jpg); 
}
