import { Component, OnInit } from '@angular/core';
import { ICategory } from './categories.model';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../service/category.service/category.service';
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

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule, NzTableModule, NzDropDownModule, FormsModule, NzIconModule, SearchFilterComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit {
  categories: ICategory[];
  categoriesToShow: ICategory[] = [];

  constructor(private categoryService: CategoryService, private router: Router, private i18n: NzI18nService, private message: NzMessageService) {
    this.categories = [];
  }

  ngOnInit() {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
      this.categoriesToShow = [...this.categories];
    })
    this.i18n.setLocale(en_US);
  }


  deleteCategory(categoryId: number): void {
    this.categoryService.deleteCategory(categoryId).subscribe({
      next: () => {
        this.categoryService.getCategories().subscribe(categories => {
          this.categories = categories;
          this.categoriesToShow = this.categories;
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

  editCategory(categoryId: number): void {
    this.router.navigate(['/edit-category', categoryId]);
  }

  addCategory(): void {
    this.router.navigate(['/add-category']);
  }

  onChangeSearchText(result: string): void {
    this.categoriesToShow = this.categories.filter((ctg: ICategory) =>
      ctg.name.indexOf(result) !== -1 ||
      ctg.description.indexOf(result) !== -1
    )
  }

  nameColumn: ColumnItem<ICategory> = {
    name: 'Category Name',
    sortOrder: null,
    sortFn: (a: ICategory, b: ICategory) => a.name.localeCompare(b.name),
  }

  descriptionColumn: ColumnItem<ICategory> = {
    name: 'Description',
    sortOrder: null,
    sortFn: (a: ICategory, b: ICategory) => a.description.localeCompare(b.description),
  }
}
