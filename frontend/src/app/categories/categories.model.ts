 export interface ICategory {
    id: number;
    name: string;
    description: string;
 }

 export const createDefaultCategory = (): ICategory => {
   return {
       id: 0,
       name: '',
       description: '',
   };
};