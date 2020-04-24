// Angular and Ionic components
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: 'app-header.html'
})
export class AppHeaderComponent {
  constructor(
    private router: Router
  ) {
  }

  navHome(): void {
    this.router.navigateByUrl('/home');
  }
}
