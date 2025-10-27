import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { TProgress } from './components/t-progress/t-progress';
import { TGrid } from './components/t-grid/t-grid';
import { TColumn } from './components/t-grid/t-column/t-column';
import { MOCK_DATA, PROGRESS_STEP } from './app.consts';
import { PaginationChangeEvent, SortChangeEvent } from './components/t-grid/t-grid.types';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TProgress, TGrid, TColumn],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  progress = signal(0);
  isComplete = signal(false);
  myData = MOCK_DATA;

  increaseProgress() {
    this.isComplete.set(false);
    const updatedProgress = this.progress() >= 100 ? 0 : this.progress() + PROGRESS_STEP;
    this.progress.set(updatedProgress);
  }

  onComplete() {
    this.isComplete.set(true);
    console.log('Progress complete!');
  }

  onSortChange(event: SortChangeEvent) {
    console.log('Sort changed:', event);
  }

  performFetch(event: PaginationChangeEvent) {
    console.log('Pagination changed:', event);
  }
}
