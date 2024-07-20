import { Component, OnInit } from '@angular/core';
import { IUser } from './users.model';
import { CommonModule } from '@angular/common';
import { UserService } from '../service/user.service/user.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { FormsModule } from '@angular/forms';
import { NZ_ICONS, NzIconModule } from 'ng-zorro-antd/icon';
import { ColumnItem } from '../ui.components/table.column.interface';
import { SearchFilterComponent } from "../ui.components/search-filter/search-filter.component";
import { en_US, NzI18nService } from 'ng-zorro-antd/i18n';
import { NzMessageService } from 'ng-zorro-antd/message';
import { PageTitleComponent } from "../ui.components/page-title/page-title.component";
import { CustomButtonComponent } from "../ui.components/custom-button/custom-button.component";
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { ExcelService } from '../helpers/excel-service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule, NzTableModule, NzDropDownModule, FormsModule, NzIconModule, SearchFilterComponent, PageTitleComponent, 
    CustomButtonComponent, NzPopconfirmModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
  users: IUser[];
  usersToShow : IUser[] = []; 
  searchedText: string = '';

  constructor(private userService: UserService, private router: Router, private i18n: NzI18nService, private message: NzMessageService) {
    this.users = [];
  }


  ngOnInit() {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
      this.usersToShow = [...this.users]
    })
    this.i18n.setLocale(en_US);
  }

  deleteUser(userId: number): void {
    this.userService.deleteUser(userId).subscribe({
      next: () => {
        this.message.success("Successfully deleted.");
        this.userService.getUsers().subscribe(users => {
          this.users = users;
          this.onChangeSearchText(this.searchedText);
        });
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

  editUser(userId: number): void {
    this.router.navigate(['/edit-user', userId]);
  }

  addUser(): void {
    this.router.navigate(['/add-user']);
  }

  onChangeSearchText(result: string): void {
    this.searchedText = result.trim().toLowerCase();
    const searchText = result.trim().toLowerCase();
    this.usersToShow = this.users.filter((user: IUser) =>
      (user.name && user.name.trim().toLowerCase().indexOf(searchText) !== -1) ||
      (user.email &&user.email.trim().toLowerCase().indexOf(searchText) !== -1) ||
      (user.address && user.address.trim().toLowerCase().indexOf(searchText) !== -1) ||
      (user.phoneNumber && user.phoneNumber.trim().toLowerCase().indexOf(searchText)) !== -1
    )
  }

  exportTable(){
    const excelService = new ExcelService();
    excelService.exportUsers(this.usersToShow);
  }
  
  nameColumn: ColumnItem<IUser> = {
    name: 'Name',
    sortOrder: null,
    sortFn: (a: IUser, b: IUser) => a.name.localeCompare(b.name),
  }

  emailColumn: ColumnItem<IUser> = {
    name: 'Email',
    sortOrder: null,
    sortFn: (a: IUser, b: IUser) => a.email.localeCompare(b.email),
  }

  addressColumn: ColumnItem<IUser> = {
    name: 'Address',
    sortOrder: null,
    sortFn: (a: IUser, b: IUser) => a.address.localeCompare(b.address),
  }

  phoneColumn: ColumnItem<IUser> = {
    name: 'Phone Number',
  }

}
