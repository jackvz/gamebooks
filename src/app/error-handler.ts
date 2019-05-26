// Angular and Ionic components
import { ErrorHandler, Injectable, Injector} from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor(
    private injector: Injector
  ) {
  }

  handleError(error) {
    console.log('Unexpected error', error);

    const router = this.injector.get(Router);
    router.navigateByUrl('/error');
  }
}
