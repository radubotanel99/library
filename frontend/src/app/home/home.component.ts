import { Component } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NZ_ICONS, NzIconModule } from 'ng-zorro-antd/icon';
import { ParametersComponent } from "../parameters/parameters.component";
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { CustomButtonComponent } from '../ui.components/custom-button/custom-button.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NzCardModule, NzIconModule, ParametersComponent, CustomButtonComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  centralImage = 'url(/assets/images/background.jpeg)';
  backgroundImage = (environment.production) ? 'url(/frontend/browser/assets/images/file.png)' : 'url(/assets/images/file.png)';

  /*for development: */  /* background-image: url(/assets/images/file.png) !important; */
  /*for production: */ // background-image: url(/frontend/browser/assets/images/file.png) !important; 

  constructor(private router: Router) {

  }

  goToDeletedBooks() {
    this.router.navigate(['/deleted-books']);
  }
}
