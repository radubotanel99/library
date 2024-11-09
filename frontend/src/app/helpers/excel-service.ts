
import * as XLSX from "xlsx";
import { IBook } from "../books/books.model";
import { IExcelBook, IExcelCategory, IExcelRent, IExcelUser } from "./excel-interfaces";
import { ICategory } from "../categories/categories.model";
import { IUser } from "../users/users.model";
import { IRent } from "../rents/rents.model";

export class ExcelService {

  exportArrayToExcel(arr: any[], name?: string) {
    let { sheetName, fileName } = this.getFileName(name);
  
    var wb = XLSX.utils.book_new();
    var ws = XLSX.utils.json_to_sheet(arr);
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  }

  private getFileName(name?: string): { sheetName: string, fileName: string } {
    const defaultName = 'Sheet1';
    const timestamp = new Date().toISOString();
    return {
      sheetName: name || defaultName,
      fileName: name || `export_${timestamp}`
    };
  }

  exportBooks(books: IBook[]): void {
    let excelBooks: Partial<IExcelBook>[] = [];
    excelBooks = books.map(book => ({
      title: book.title,
      author: book.author,
      bookNumber: book.bookNumber,
      category: book.category.name,
      publisher: book.publisher,
      price: book.price,
      createdAt: this.convertToDateString(book.createdAt)

    }));
    this.exportArrayToExcel(excelBooks, "Books");
  }

  exportCategories(categories: ICategory[]): void {
    let excelCategories: Partial<IExcelCategory>[] = [];
    excelCategories = categories.map(category => ({
      name: category.name,
      description: category.description,
    }));
    this.exportArrayToExcel(excelCategories, "Categories");
  }

  exportUsers(users: IUser[]): void {
    let excelUsers: Partial<IExcelUser>[] = [];
    excelUsers = users.map(user => ({
      name: user.name,
      email: user.email,
      address: user.address,
      phoneNumber: user.phoneNumber,
    }));
    this.exportArrayToExcel(excelUsers, "Users");
  }

  exportRents(rents: IRent[]) : void {
    let exelRents: Partial<IExcelRent>[] = [];
    exelRents = rents.map(rent => ({
      user: rent.user.name,
      book: rent.book.title,
      bookNumber: rent.book.bookNumber,
      state: rent.state,
      createdAt: this.convertToDateString(rent.createdAt),
      finishedAt: this.convertToDateString(rent.finishedAt),
    }))
    this.exportArrayToExcel(exelRents, "Rents");
  }

  private convertToDateString(date: any): string {
    const dateObj = date instanceof Date ? date : new Date(date);
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const year = dateObj.getFullYear();
    return `${day}/${month}/${year}`;
  }
}

