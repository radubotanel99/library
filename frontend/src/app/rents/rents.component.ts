import { Component, OnInit } from '@angular/core';
import { IRent } from './rents.model';
import { CommonModule } from '@angular/common';
import { RentService } from '../service/rent.service/rent.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { FormsModule } from '@angular/forms';
import { NZ_ICONS, NzIconModule } from 'ng-zorro-antd/icon';
import { ColumnItem } from '../ui.components/table.column.interface';
import { en_US, NzI18nService } from 'ng-zorro-antd/i18n';
import { SearchFilterComponent } from "../ui.components/search-filter/search-filter.component";
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { PageTitleComponent } from "../ui.components/page-title/page-title.component";
import { CustomButtonComponent } from "../ui.components/custom-button/custom-button.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule, NzTableModule, NzDropDownModule, FormsModule, NzIconModule, SearchFilterComponent, NzDatePickerModule, PageTitleComponent, CustomButtonComponent],
  templateUrl: './rents.component.html',
  styleUrl: './rents.component.css'
})
export class RentsComponent implements OnInit {
  rents: IRent[];
  rentsFiltered: IRent[] = [];
  rentsToShow: IRent[] = [];
  dateCreatedFilterValue: Date[] = [];
  dateCreatedFilterVisible = false;
  dateFinishedFilterValue: Date[] = [];
  dateFinishedFilterVisible = false;
  searchNumberValue = '';
  searchNumberVisible = false;
  searchedText : string = '';
  
  constructor(private rentService: RentService, private router: Router, private i18n: NzI18nService) {
    this.rents = [];
  }

  ngOnInit() {
    this.rentService.getRents().subscribe(rents => {
      this.rents = rents;
      this.rentsFiltered = [...this.rents];
      this.rentsToShow = [...this.rentsFiltered];
    })
    this.i18n.setLocale(en_US); 
  }

  addRent(): void {
    this.router.navigate(['/add-rent']);
  }

  finishRent(rentId: number): void {
    this.rentService.finishRent(rentId).subscribe(() => {
      this.rentService.getRents().subscribe(rents => {
        this.rents = rents;
        this.applyFilters();
      });
    });
  }

  searchCreatedDateFilter(): void {
    this.dateCreatedFilterVisible = false;
    this.applyFilters();
  }

  resetCreatedDateFilter(): void {
    this.dateCreatedFilterValue = [];
    this.applyFilters();
  }

  searchFinishedDateFilter(): void {
    this.dateFinishedFilterVisible = false;
    this.applyFilters();
  }

  resetFinishedDateFilter(): void {
    this.dateFinishedFilterValue = [];
    this.applyFilters();
  }

  searchNumber(): void {
    this.searchNumberVisible = false;
    this.applyFilters();
  }

  resetNumber(): void {
    this.searchNumberValue = '';
    this.applyFilters();
  }

  applyFilters() {
    this.rentsFiltered = this.rents.filter((rent: IRent) => {
      let matches = true;
      if (this.dateFinishedFilterValue.length !== 0) {
        matches = matches && rent.finishedAt! >= this.dateFinishedFilterValue[0] && rent.finishedAt! <= this.dateFinishedFilterValue[1];
      }
      if (this.dateCreatedFilterValue.length !== 0) {
        matches = matches && rent.createdAt! >= this.dateCreatedFilterValue[0] && rent.createdAt! <= this.dateCreatedFilterValue[1];
      }
      if (this.searchNumberValue !== '') {
        matches = matches && rent.book.bookNumber === +this.searchNumberValue;
      }
      return matches;
    });
    this.onChangeSearchText(this.searchedText);
  }

  onChangeSearchText(result: string): void {
    const searchText = result.trim().toLowerCase();
    this.searchedText = result;
    this.rentsToShow = this.rentsFiltered.filter((rent: IRent) =>
      (rent.book && rent.book.title && rent.book.title.trim().toLowerCase().indexOf(searchText)) !== -1 ||
      (rent.user && rent.user.name && rent.user.name.trim().toLowerCase().indexOf(searchText)) !== -1 
    )
  }

  bookColumn: ColumnItem<IRent> = {
    name: 'Book',
    sortOrder: null,
    sortFn: (a: IRent, b: IRent) => a.book.title.localeCompare(b.book.title),
  }

  userColumn: ColumnItem<IRent> = {
    name: 'User',
    sortOrder: null,
    sortFn: (a: IRent, b: IRent) => a.user.name.localeCompare(b.user.name),
  }

  bookNumberColumn: ColumnItem<IRent> = {
    name: 'Number',
    sortOrder: null,
    sortFn: (a: IRent, b: IRent) => a.book.bookNumber - b.book.bookNumber,
  }

  stateColumn: ColumnItem<IRent> = {
    name: 'State',
    sortOrder: null,
    sortFn: (a: IRent, b: IRent) => a.state.localeCompare(b.state),
    listOfFilter: [
      { text: 'ACTIVE', value: 'ACTIVE' },
      { text: 'LATE', value: 'LATE'},
      { text: 'FINISHED', value: 'FINISHED' }
    ],
    filterMultiple: false,
    filterFn: (state: string, rent: IRent) => rent.state === state,
  }

  createdAtColumn: ColumnItem<IRent> = {
    name: 'Created',
    sortOrder: null,
    sortFn: (a: IRent, b: IRent) => new Date(a.createdAt!).getTime() - new Date(b.createdAt!).getTime(),
  }

  finishedAtColumn: ColumnItem<IRent> = {
    name: 'Finished',
    sortOrder: null,
    sortFn: (a: IRent, b: IRent) => new Date(a.finishedAt!).getTime() - new Date(b.finishedAt!).getTime(),
  }
}
