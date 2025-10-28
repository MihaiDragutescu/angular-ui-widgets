import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ContentChildren,
  effect,
  input,
  output,
  QueryList,
  signal,
} from '@angular/core';
import { isObservable, Observable } from 'rxjs';
import { DEFAULT_PAGE_SIZE_OPTIONS, Direction } from './t-grid.consts';
import { TColumn } from './t-column/t-column';
import { PageSize, PaginationChangeEvent, SortChangeEvent } from './t-grid.types';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 't-grid',
  standalone: true,
  templateUrl: './t-grid.html',
  styleUrl: './t-grid.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TGrid<T> {
  data = input.required<T[] | Observable<T[]>>();
  sortable = input<boolean>(false);
  pageSize = input<PageSize | null>(null);

  sortChange = output<SortChangeEvent>();
  paginationChange = output<PaginationChangeEvent>();

  @ContentChildren(TColumn) columns!: QueryList<TColumn<T>>;

  localPageSize = signal<number | null>(null);
  currentPage = signal(1);
  pageSizeOptions = DEFAULT_PAGE_SIZE_OPTIONS;

  private resolvedData = signal<T[]>([]);
  private sortedColumn = signal<keyof T | null>(null);
  private sortDirection = signal<Direction>(Direction.None);

  constructor() {
    effect(() => {
      const inputData = this.data();

      if (Array.isArray(inputData)) {
        this.resolvedData.set(inputData);
      } else if (isObservable(inputData)) {
        inputData.pipe(takeUntilDestroyed()).subscribe((list) => this.resolvedData.set(list));
      }
    });

    effect(() => {
      this.localPageSize.set(this.pageSize());
    });
  }

  paginatedData = computed(() => {
    const data = this.resolvedData();
    const pageSize = this.localPageSize();
    const currentPage = this.currentPage();

    if (!pageSize) {
      return data;
    }

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    return data.slice(startIndex, endIndex);
  });

  totalPages = computed(() => {
    const pageSize = this.localPageSize();
    const count = this.resolvedData().length;

    if (!pageSize || pageSize <= 0 || count === 0) {
      return 1;
    }

    return Math.ceil(count / pageSize);
  });

  onHeaderClick(col: TColumn<T>) {
    if (!this.sortable() || !col.sortable()) {
      return;
    }

    const clickedColumnKey = col.property() as keyof T;
    const currentlySortedColumn = this.sortedColumn();
    const direction = this.sortDirection();

    let nextDirection = Direction.Asc;
    if (clickedColumnKey === currentlySortedColumn) {
      if (direction === Direction.Asc) {
        nextDirection = Direction.Desc;
      } else if (direction === Direction.Desc) {
        nextDirection = Direction.None;
      }
    }

    this.sortedColumn.set(clickedColumnKey);
    this.sortDirection.set(nextDirection);

    this.currentPage.set(1);
    this.notifyPaginationChange();

    this.sortChange.emit({ columnName: String(clickedColumnKey), direction: nextDirection });
  }

  getSortIcon(col: TColumn<T>): string {
    const activeColumn = this.sortedColumn();
    const direction = this.sortDirection();

    if (activeColumn !== col.property()) {
      return '\u21C5';
    }

    switch (direction) {
      case Direction.Asc:
        return '\u25B2';
      case Direction.Desc:
        return '\u25BC';
      default:
        return '\u21C5';
    }
  }

  prevPage() {
    if (this.currentPage() > 1) {
      this.currentPage.update((p) => p - 1);
      this.notifyPaginationChange();
    }
  }

  nextPage() {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.update((p) => p + 1);
      this.notifyPaginationChange();
    }
  }

  onPageSizeChange(event: Event) {
    const selectInput = event.target as HTMLSelectElement;
    const value = selectInput?.value ?? '';
    const newSize = value === '' ? null : Number(value);

    this.localPageSize.set(newSize);
    this.currentPage.set(1);
    this.notifyPaginationChange();
  }

  private notifyPaginationChange() {
    this.paginationChange.emit({ currentPage: this.currentPage(), pageSize: this.localPageSize() });
  }
}
