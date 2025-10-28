import { DEFAULT_PAGE_SIZE_OPTIONS, Direction } from './t-grid.consts';

export interface SortChangeEvent {
  columnName: string;
  direction: Direction;
}

export interface PaginationChangeEvent {
  currentPage: number;
  pageSize: number | null;
}

export type PageSize = (typeof DEFAULT_PAGE_SIZE_OPTIONS)[number];
