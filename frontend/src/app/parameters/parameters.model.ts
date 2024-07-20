 export interface IParameter {
    name: string;
    value?: number;
 }

 export const createDefaultParameter = (): IParameter => {
   return {
       name: '',
   };
};