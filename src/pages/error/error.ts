// Angular and Ionic components
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'page-error',
  templateUrl: 'error.html',
})
export class ErrorPage {

  constructor(
    private router: Router
  ) {
  }

  continue(): void {
    this.router.navigateByUrl('/home');
  }
}
