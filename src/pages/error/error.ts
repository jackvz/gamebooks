// Angular and Ionic components
import { Component } from '@angular/core';
import { Router } from '@angular/router';

// Global vars
declare var gtag: any;

@Component({
  selector: 'page-error',
  templateUrl: 'error.html',
})
export class ErrorPage {

  constructor(
    private router: Router,
  ) {
  }

  ngOnInit() {
    <any>gtag('View', 'Error');
  }

  continue(): void {
    this.router.navigateByUrl('/home');
  }
}
