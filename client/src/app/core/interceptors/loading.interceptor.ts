import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { delay, finalize, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { SpinnerService } from '../spinner.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private spinnerService: SpinnerService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.spinnerService.loading();
    return next.handle(req).pipe(
      // delay(1000),
      finalize(() => {
        this.spinnerService.idle();
      })
    );
  }
}
