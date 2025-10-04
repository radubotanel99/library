import { Component, OnInit } from '@angular/core';
import { createDefaultUser, IUser } from '../users/users.model';
import { FormsModule } from '@angular/forms';
import { UserService } from '../service/user.service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { PageTitleComponent } from "../ui.components/page-title/page-title.component";
import { CustomButtonComponent } from "../ui.components/custom-button/custom-button.component";
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [FormsModule, CommonModule, PageTitleComponent, CustomButtonComponent, TranslateModule],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent implements OnInit {
  user: IUser = createDefaultUser();
  isEditMode = false;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private message: NzMessageService) {

  }

  ngOnInit() {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.isEditMode = true;
      this.userService.getUserById(+userId).subscribe(user => {
        this.user = user;
      });
    }
  }

  addUser() {
    this.userService.addUser(this.user).subscribe({
      next: () => this.router.navigate(['/users'])
    });
  }

  saveUser(): void {
    if (this.isEditMode) {
      this.handleUserSave(this.userService.updateUser(this.user));
    } else {
      this.handleUserSave(this.userService.addUser(this.user));
    }
  }

  handleUserSave(observable: Observable<IUser>): void {
    observable.subscribe({
      next: () => {
        this.message.success('User saved successfully.');
        this.router.navigate(['/users']);
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
}
