import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  busyRequestCount = 0;
  constructor(private spinnerService: NgxSpinnerService) {}

  loading() {
    this.busyRequestCount++;
    this.spinnerService
      .show(undefined, {
        type: 'line-scale-party',
        bdColor: 'rgba(240,240,240,0.8)',
        color: '#333333',
      })
      .then((r) => r);
  }

  idle() {
    this.busyRequestCount--;
    if (this.busyRequestCount <= 0) {
      this.busyRequestCount = 0;
      this.spinnerService.hide().then((e) => e);
    }
  }
}
