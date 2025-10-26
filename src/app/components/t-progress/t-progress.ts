import { ChangeDetectionStrategy, Component, computed, effect, input, output } from '@angular/core';
import { MIN_RADIUS, STROKE_WIDTH } from './t-progress.consts';

@Component({
  selector: 't-progress',
  standalone: true,
  templateUrl: './t-progress.html',
  styleUrl: './t-progress.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TProgress {
  radius = input.required<number>();
  progress = input.required<number>();
  color = input.required<string>();
  complete = output<void>();

  validRadius = computed(() => Math.max(MIN_RADIUS, this.radius()));
  validProgress = computed(() => Math.min(Math.max(this.progress(), 0), 100));
  diameter = computed(() => this.validRadius() * 2);
  normalizedRadius = computed(() => this.validRadius() - STROKE_WIDTH / 2);
  circumference = computed(() => 2 * Math.PI * this.normalizedRadius());
  dashOffset = computed(
    () => this.circumference() - (this.validProgress() / 100) * this.circumference()
  );

  constructor() {
    effect(() => {
      if (this.validProgress() >= 100) {
        queueMicrotask(() => this.complete.emit());
      }
    });
  }
}
