import { Direction } from './t-grid.consts';

export interface SortChangeEvent {
  columnName: string;
  direction: Direction;
}

export interface PaginationChangeEvent {
  currentPage: number;
  pageSize: number | null;
}
