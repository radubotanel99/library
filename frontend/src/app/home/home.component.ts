import { Component } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NZ_ICONS, NzIconModule } from 'ng-zorro-antd/icon';
import { ParametersComponent } from "../parameters/parameters.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NzCardModule, NzIconModule, ParametersComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  centralImage = 'url(/assets/images/background.jpeg)';

  constructor(private router: Router) {
  }

  goToDeletedBooks() {
    this.router.navigate(['/deleted-books']);
  }
}
