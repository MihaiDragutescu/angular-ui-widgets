import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 't-column',
  standalone: true,
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TColumn<T> {
  name = input.required<string>();
  property = input.required<keyof T>();
  sortable = input<boolean>(false);
}
