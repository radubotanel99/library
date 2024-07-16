 export interface IUser {
    id: number;
    name: string;
    email: string;
    address: string,
    phoneNumber: string,
    deleted?: boolean
 }

 export const createDefaultUser = (): IUser => {
   return {
      id: 0,
      name: '',
      email: '',
      address: '',
      phoneNumber: '',
      deleted: false,
   };
}