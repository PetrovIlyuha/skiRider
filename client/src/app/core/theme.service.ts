import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

export enum AppTheme {
  Light = 'Light',
  Dark = 'Dark',
}

@Injectable({
  providedIn: 'root',
})
export class ThemeService implements OnInit {
  theme: AppTheme = AppTheme.Light;
  themeLiveUpdates$ = new Subject<AppTheme>();

  constructor() {}
  ngOnInit(): void {
    this.themeLiveUpdates$.next(this.theme);
  }

  toggleTheme(): void {
    if (this.theme === AppTheme.Light) {
      this.theme = AppTheme.Dark;
      this.themeLiveUpdates$.next(this.theme);
    } else {
      this.theme = AppTheme.Light;
      this.themeLiveUpdates$.next(this.theme);
    }
  }
}
