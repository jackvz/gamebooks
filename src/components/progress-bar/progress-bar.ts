// Angular and Ionic components
import { Component, Input } from '@angular/core';

@Component({
  selector: 'progress-bar',
  templateUrl: 'progress-bar.html'
})
export class ProgressBarComponent {
  @Input()
  percentage: number = 0;

  constructor() {
  }
}
