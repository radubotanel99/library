import { ICategory } from "../categories/categories.model";


export interface IExcelBook {
    title: string;
    author: string;
    bookNumber: number;
    category: ICategory;
    publisher: string;
    price: number;
    createdAt: string;
  }

export interface IExcelCategory {
    name: string;
    description: string;
}

export interface IExcelUser {
    name: string;
    email: string;
    address: string;
    phoneNumber: string;
}

export interface IExcelRent {
    user: string;
    book: string;
    bookNumber: number;
    state: string;
    publisher: string;
    createdAt: string;
    finishedAt: string;
  }