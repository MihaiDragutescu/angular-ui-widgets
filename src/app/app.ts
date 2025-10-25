import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { TProgress } from './components/t-progress/t-progress';

const PROGRESS_STEP = 10;

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

  increaseProgress() {
    const updatedProgress = this.progress() >= 100 ? 0 : this.progress() + PROGRESS_STEP;
    this.progress.set(updatedProgress);
  }

  onComplete() {
    console.log('Progress complete!');
  }
}
