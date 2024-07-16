import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from "ng-zorro-antd/table";


export interface ColumnItem<T> {
  // header: string;
  // key: keyof T;
  name: string;
  sortOrder?: NzTableSortOrder | null;
  sortFn?: NzTableSortFn<T> | null;
  listOfFilter?: NzTableFilterList;
  filterFn?: NzTableFilterFn<T> | null;
  showSearch?: boolean | null;
  filterMultiple?: false,
}