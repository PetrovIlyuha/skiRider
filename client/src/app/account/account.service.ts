import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, map, of, ReplaySubject } from 'rxjs';
import { IUser } from '../shared/models/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  apiUrl = environment.apiUrl;
  private currentUserSource = new BehaviorSubject<IUser>(null);
  currentUser$ = this.currentUserSource.asObservable();
  constructor(private http: HttpClient, private router: Router) {}

  loadCurrentUser(token: string) {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/account`, { headers }).pipe(
      map((user: IUser) => {
        if (user) {
          localStorage.setItem('token', user.token);
          this.currentUserSource.next(user);
          this.router.navigateByUrl('/').then((r) => r);
        }
      })
    );
  }

  login(values: any) {
    return this.http.post(`${this.apiUrl}/account/login`, values).pipe(
      map((user: IUser) => {
        if (user) {
          localStorage.setItem('token', user.token);
          this.currentUserSource.next(user);
        }
        this.router.navigateByUrl('/').then((r) => r);
      })
    );
  }

  register(values: any) {
    return this.http.post(`${this.apiUrl}/account/register`, values).pipe(
      map((user: IUser) => {
        if (user) {
          localStorage.setItem('token', user.token);
          this.currentUserSource.next(user);
        }
        this.router.navigateByUrl('/').then((r) => r);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.currentUserSource.next(null);
    this.router.navigateByUrl('/').then((n) => n);
  }

  checkEmailExists(email: string) {
    return this.http.get(`${this.apiUrl}/account/emailexists?email=${email}`);
  }
}
