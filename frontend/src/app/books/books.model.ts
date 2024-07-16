import { publishFacade } from "@angular/compiler";
import { createDefaultCategory, ICategory } from "../categories/categories.model";

 export interface IBook {
    id: number;
    title: string;
    author: string;
    bookNumber: number;
    category: ICategory;
    publisher: string;
    price: number;
    createdAt: Date;
    updatedAt?: Date;
    deleted?: boolean
 }


 export const createDefaultBook = (): IBook => {
   return {
       id: 0,
       title: '',
       author: '',
       bookNumber: 0,
       category: createDefaultCategory(),
       publisher: '',
       price: 0,
       createdAt: new Date(),
      //  updatedAt: new Date(),
      deleted: false,
   };
};