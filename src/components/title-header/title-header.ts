// Angular and Ionic components
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

// App components
import { Series } from '../../app/series';
import { Title } from '../../app/title';

@Component({
  selector: 'title-header',
  templateUrl: 'title-header.html'
})
export class TitleHeaderComponent {
  @Input()
  series: Series;
  @Input()
  title: Title;

  constructor(
    private router: Router
  ) {
  }

  navHome(): void {
    this.router.navigateByUrl('/home');
  }
}
