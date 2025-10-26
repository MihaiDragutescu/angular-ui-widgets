import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { TProgress } from './components/t-progress/t-progress';

const PROGRESS_STEP = 25;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TProgress],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  progress = signal(0);
  isComplete = signal(false);

  increaseProgress() {
    this.isComplete.set(false);
    const updatedProgress = this.progress() >= 100 ? 0 : this.progress() + PROGRESS_STEP;
    this.progress.set(updatedProgress);
  }

  onComplete() {
    this.isComplete.set(true);
    console.log('Progress complete!');
  }
}
