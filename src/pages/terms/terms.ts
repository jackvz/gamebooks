// Angular and Ionic components
import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

// Global vars
declare var gtag: any;

@Component({
  selector: 'page-terms',
  templateUrl: 'terms.html'
})
export class TermsPage {

  constructor(
    private storage: Storage,
    private router: Router,
  ) {
  }

  ngOnInit() {
    (<any>$('page-terms')).foundation();

    <any>gtag('View', 'Terms');
  }

  agreeTerms(): void {
    this.storage.set('termsAgreed', true);
    this.router.navigateByUrl('/home');
  }
}
