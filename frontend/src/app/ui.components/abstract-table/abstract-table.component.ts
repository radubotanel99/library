// import { Component, Input } from '@angular/core';
// import { ColumnItem } from './abstract.column.interface';

// @Component({
//   selector: 'app-abstract-table',
//   templateUrl: './abstract-table.component.html',
//   styleUrls: ['./abstract-table.component.css']
// })
// export class AbstractTableComponent<T> {
//   @Input() listOfData: T[] = [];
//   @Input() listOfColumns: ColumnItem<T>[] = [];

//   filterValues: { [key: string]: any } = {};
//   listOfDisplayData: T[] = [];

//   constructor() {
//     this.listOfDisplayData = [...this.listOfData];
//   }

//   ngOnChanges(): void {
//     this.applyFilters();
//   }

//   applyFilters(): void {
//     this.listOfDisplayData = this.listOfData.filter(item => {
//       for (const key in this.filterValues) {
//         if (this.filterValues[key] && !this.matchesFilter(item[key], this.filterValues[key], this.listOfColumns.find(col => col.key === key).type)) {
//           return false;
//         }
//       }
//       return true;
//     });
//   }

//   matchesFilter(value: any, filterValue: any, type: 'text' | 'number' | 'date'): boolean {
//     switch (type) {
//       case 'text':
//         return value.toString().toLowerCase().includes(filterValue.toString().toLowerCase());
//       case 'number':
//         return value === filterValue;
//       case 'date':
//         return new Date(value).toLocaleDateString().includes(new Date(filterValue).toLocaleDateString());
//       default:
//         return false;
//     }
//   }
// }
