import { publishFacade } from "@angular/compiler";
import { createDefaultBook, IBook } from "../books/books.model";
import { createDefaultUser, IUser } from "../users/users.model";

 export interface IRent {
    id: number;
    book: IBook;
    user: IUser;
    state: string;
    createdAt?: Date;
    updatedAt?: Date;
    finishedAt?: Date;
 }


 export const createDefaultRent = (): IRent => {
   return {
       id: 0,
       book: createDefaultBook(),
       user: createDefaultUser(),
       state: 'ACTIVE',
      //  createdAt: new Date(),
      //  updatedAt: new Date(),
      //  finishedAt: new Date(),
   };
};