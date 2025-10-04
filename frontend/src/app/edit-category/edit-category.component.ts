import { Component, OnInit } from '@angular/core';
import { createDefaultCategory, ICategory } from '../categories/categories.model';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../service/category.service/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { NzMessageService } from 'ng-zorro-antd/message';
import { PageTitleComponent } from "../ui.components/page-title/page-title.component";
import { CustomButtonComponent } from "../ui.components/custom-button/custom-button.component";
import { ErrorHandlerService } from '../service/error-handler-service';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [FormsModule, CommonModule, PageTitleComponent, CustomButtonComponent],
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.css'
})
export class EditCategoryComponent implements OnInit {
  category: ICategory = createDefaultCategory();
  isEditMode = false;

  constructor(private categoryService: CategoryService, private router: Router, private route: ActivatedRoute, private dialog: MatDialog, private message: NzMessageService, private errorHandler: ErrorHandlerService ) {

  }

  ngOnInit() {
    const categoryId = this.route.snapshot.paramMap.get('id');
    if (categoryId) {
      this.isEditMode = true;
      this.categoryService.getCategoryById(+categoryId).subscribe(category => {
        this.category = category;
      });
    }
  }

  addCategory() {
    this.errorHandler.handleApiCall(
      this.categoryService.addCategory(this.category),
      'MESSAGES.CATEGORY_SAVED_SUCCESS'
    ).subscribe({
      next: () => this.router.navigate(['/categories'])
    });
  }

  saveCategory(): void {
    if (this.isEditMode) {
      this.handleBookSave(this.categoryService.updateCategory(this.category));
    } else {
      this.handleBookSave(this.categoryService.addCategory(this.category));
    }
  }

  handleBookSave(observable: Observable<ICategory>): void {
    this.errorHandler.handleApiCall(
      observable,
      'MESSAGES.CATEGORY_SAVED_SUCCESS'
    ).subscribe({
      next: () => this.router.navigate(['/categories'])
    });
  }
}
