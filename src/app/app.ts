import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { TProgress } from './components/t-progress/t-progress';
import { TGrid } from './components/t-grid/t-grid';
import { TColumn } from './components/t-grid/t-column/t-column';
import { MOCK_DATA, PROGRESS_STEP } from './app.consts';
import { PaginationChangeEvent, SortChangeEvent } from './components/t-grid/t-grid.types';
import { Direction } from './components/t-grid/t-grid.consts';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TProgress, TGrid, TColumn],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  myData = MOCK_DATA;

  onSortChange(event: SortChangeEvent) {
    const { columnName, direction } = event;

    if (direction === Direction.None) {
      this.myData = [...MOCK_DATA];
      return;
    }

    const key = columnName as keyof (typeof this.myData)[number];

    this.myData = [...this.myData].sort((a, b) => {
      const aValue = a[key];
      const bValue = b[key];

      if (aValue == null) {
        return 1;
      }

      if (bValue == null) {
        return -1;
      }

      const result = aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      return direction === Direction.Asc ? result : -result;
    });
  }

  // Note: Pagination logic remains encapsulated within the <t-grid> component.
  // While it could alternatively be handled at the parent or service level, this
  // implementation preserves the provided component contract (inputs/outputs).
  performFetch(event: PaginationChangeEvent) {
    console.log('Pagination changed:', event);
  }

  progress = signal(0);
  isComplete = signal(false);

  increaseProgress() {
    this.isComplete.set(false);
    const updatedProgress = this.progress() >= 100 ? 0 : this.progress() + PROGRESS_STEP;
    this.progress.set(updatedProgress);
  }

  onComplete() {
    this.isComplete.set(true);
  }
}
