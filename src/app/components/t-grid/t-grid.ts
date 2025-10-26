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
  pageSize = input<number | null>(DEFAULT_PAGE_SIZE_OPTIONS[0]);

  sortChange = output<{ columnName: string; direction: Direction }>();
  paginationChange = output<{ currentPage: number; pageSize: number | null }>();

  @ContentChildren(TColumn) columns!: QueryList<TColumn<T>>;

  resolvedData = signal<T[]>([]);
  localPageSize = signal<number | null>(null);
  currentPage = signal(1);
  sortedColumn = signal<string | null>(null);
  sortDirection = signal<Direction>(Direction.None);

  constructor() {
    effect(() => {
      const src = this.data();
      if (Array.isArray(src)) {
        this.resolvedData.set(src);
      } else if (isObservable(src)) {
        src.subscribe((list) => this.resolvedData.set(list));
      }
    });

    effect(() => {
      this.localPageSize.set(this.pageSize());
    });
  }

  pageSizeOptions = DEFAULT_PAGE_SIZE_OPTIONS;

  sortedData = computed(() => {
    const list = this.resolvedData();
    const col = this.sortedColumn();
    const dir = this.sortDirection();
    if (!col || dir === Direction.None) return list;

    return [...list].sort((a, b) => {
      const key = col as keyof T;
      const av = a[key];
      const bv = b[key];

      if (av == null) return 1;
      if (bv == null) return -1;
      if (av < bv) return dir === Direction.Asc ? -1 : 1;
      if (av > bv) return dir === Direction.Asc ? 1 : -1;
      return 0;
    });
  });

  onHeaderClick(col: TColumn<T>) {
    if (!this.sortable() || !col.sortable()) return;
    const key = col.property() as string;
    const same = key === this.sortedColumn();
    const dir = this.sortDirection();

    let next = Direction.Asc;
    if (same) {
      if (dir === Direction.Asc) next = Direction.Desc;
      else if (dir === Direction.Desc) next = Direction.None;
    }

    this.sortedColumn.set(key);
    this.sortDirection.set(next);
    this.sortChange.emit({ columnName: key, direction: next });
  }

  getSortIcon(col: TColumn<T>): string {
    if (this.sortedColumn() !== col.property()) return '⇅';
    if (this.sortDirection() === Direction.Asc) return '▲';
    if (this.sortDirection() === Direction.Desc) return '▼';
    return '⇅';
  }

  visibleData = computed(() => {
    const list = this.sortedData();
    const size = this.localPageSize();
    const page = this.currentPage();
    if (!size) return list;
    const start = (page - 1) * size;
    return list.slice(start, start + size);
  });

  get totalPages(): number {
    const size = this.localPageSize();
    const count = this.sortedData().length;
    if (!size || size <= 0) return 1;
    return Math.ceil(count / size);
  }

  prevPage() {
    if (this.currentPage() > 1) {
      this.currentPage.update((p) => p - 1);
      this.emitPagination();
    }
  }
  nextPage() {
    if (this.currentPage() < this.totalPages) {
      this.currentPage.update((p) => p + 1);
      this.emitPagination();
    }
  }
  onPageSizeChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    const val = select?.value ?? '';
    const newSize = val === '' ? null : Number(val);
    this.localPageSize.set(newSize);
    this.currentPage.set(1);
    this.emitPagination();
  }
  emitPagination() {
    this.paginationChange.emit({ currentPage: this.currentPage(), pageSize: this.localPageSize() });
  }
}
