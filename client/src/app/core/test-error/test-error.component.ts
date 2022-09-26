import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
  styleUrls: ['./test-error.component.scss'],
})
export class TestErrorComponent implements OnInit {
  constructor(private http: HttpClient) {}
  validationErrors: any;

  ngOnInit(): void {}

  get404Error(): void {
    this.http.get(`${environment.apiUrl}/products/1230`).subscribe(
      (response) => {
        console.log({ response });
      },
      (error) => {
        console.error({ error });
      }
    );
  }

  get500Error() {
    this.http.get(`${environment.apiUrl}/buggy/servererror`).subscribe(
      (response) => {
        console.log({ response });
      },
      (error) => {
        console.error({ error });
      }
    );
  }
  get400Error() {
    this.http.get(`${environment.apiUrl}/buggy/badrequest`).subscribe(
      (response) => {
        console.log({ response });
      },
      (error) => {
        console.error({ error });
      }
    );
  }
  get400ValidationError() {
    this.http.get(`${environment.apiUrl}/buggy/badrequest/10one`).subscribe(
      (response) => {
        console.log({ response });
      },
      (error) => {
        console.error({ error });
        this.validationErrors = error.errors;
      }
    );
  }
}
