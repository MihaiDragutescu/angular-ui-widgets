import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { TProgress } from './components/t-progress/t-progress';
import { TGrid } from './components/t-grid/t-grid';
import { TColumn } from './components/t-grid/t-column/t-column';
import { Direction } from './components/t-grid/t-grid.consts';

const PROGRESS_STEP = 10;

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

  increaseProgress() {
    const updatedProgress = this.progress() >= 100 ? 0 : this.progress() + PROGRESS_STEP;
    this.progress.set(updatedProgress);
  }

  onComplete() {
    console.log('Progress complete!');
  }

  myData = [
    { firstName: 'Alice', lastName: 'Smith', email: 'alice.smith@example.com' },
    { firstName: 'Bob', lastName: 'Johnson', email: 'bob.johnson@example.com' },
    { firstName: 'Carol', lastName: 'Brown', email: 'carol.brown@example.com' },
    { firstName: 'David', lastName: 'Wilson', email: 'david.wilson@example.com' },
    { firstName: 'Eve', lastName: 'Taylor', email: 'eve.taylor@example.com' },
    { firstName: 'Frank', lastName: 'Davis', email: 'frank.davis@example.com' },
    { firstName: 'Grace', lastName: 'Miller', email: 'grace.miller@example.com' },
    { firstName: 'Hank', lastName: 'Anderson', email: 'hank.anderson@example.com' },
    { firstName: 'Ivy', lastName: 'Thomas', email: 'ivy.thomas@example.com' },
    { firstName: 'Jack', lastName: 'Moore', email: 'jack.moore@example.com' },
    { firstName: 'Karen', lastName: 'Jackson', email: 'karen.jackson@example.com' },
    { firstName: 'Leo', lastName: 'White', email: 'leo.white@example.com' },
    { firstName: 'Mona', lastName: 'Harris', email: 'mona.harris@example.com' },
    { firstName: 'Nate', lastName: 'Martin', email: 'nate.martin@example.com' },
    { firstName: 'Olivia', lastName: 'Thompson', email: 'olivia.thompson@example.com' },
    { firstName: 'Paul', lastName: 'Garcia', email: 'paul.garcia@example.com' },
    { firstName: 'Quinn', lastName: 'Martinez', email: 'quinn.martinez@example.com' },
    { firstName: 'Rita', lastName: 'Robinson', email: 'rita.robinson@example.com' },
    { firstName: 'Sam', lastName: 'Clark', email: 'sam.clark@example.com' },
    { firstName: 'Tina', lastName: 'Rodriguez', email: 'tina.rodriguez@example.com' },
    { firstName: 'Uma', lastName: 'Lewis', email: 'uma.lewis@example.com' },
    { firstName: 'Victor', lastName: 'Lee', email: 'victor.lee@example.com' },
    { firstName: 'Wendy', lastName: 'Walker', email: 'wendy.walker@example.com' },
    { firstName: 'Xavier', lastName: 'Hall', email: 'xavier.hall@example.com' },
    { firstName: 'Yara', lastName: 'Allen', email: 'yara.allen@example.com' },
    { firstName: 'Zane', lastName: 'Young', email: 'zane.young@example.com' },
    { firstName: 'Amelia', lastName: 'Hernandez', email: 'amelia.hernandez@example.com' },
    { firstName: 'Ben', lastName: 'King', email: 'ben.king@example.com' },
    { firstName: 'Clara', lastName: 'Wright', email: 'clara.wright@example.com' },
    { firstName: 'Dylan', lastName: 'Lopez', email: 'dylan.lopez@example.com' },
  ];

  onSortChange(event: { columnName: string; direction: Direction }) {
    console.log('Sort changed:', event);
  }

  performFetch(event: { currentPage: number; pageSize: number | null }) {
    console.log('Pagination changed:', event);
  }
}
