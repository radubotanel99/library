import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from "ng-zorro-antd/table";


export interface ColumnItem<T> {
  header: string;
  key: keyof T;
  type: 'text' | 'number' | 'date';
}
