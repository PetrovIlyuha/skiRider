import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProduct } from './shared/models/product';
import { IPagination } from './shared/models/pagination';
import { AppTheme, ThemeService } from './core/theme.service';
import { Subscription } from 'rxjs';
import { BasketService } from './basket/basket.service';
import { AccountService } from './account/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  theme: AppTheme;
  themeSub$: Subscription;

  constructor(
    private themeService: ThemeService,
    private basketService: BasketService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.loadBasket();
    this.loadUser();
    this.handleThemeChangeAndStorageWithPreloadOnAppStart();
  }

  handleThemeChangeAndStorageWithPreloadOnAppStart() {
    const storedAppTheme = JSON.parse(localStorage.getItem('app.theme'));
    if (storedAppTheme) {
      this.themeService.preloadTheme(storedAppTheme);
    }
    this.theme = this.themeService.theme;
    this.themeSub$ = this.themeService.themeLiveUpdates$.subscribe(
      (updatedTheme) => {
        this.theme = updatedTheme;
      }
    );
  }

  loadBasket() {
    const basketId = localStorage.getItem('basket_id');
    if (basketId) {
      this.basketService.getBasket(basketId).subscribe(() => {
        console.log("Loaded Current User's Basket");
      });
    }
  }

  loadUser() {
    const token = localStorage.getItem('token');
    if (token) {
      this.accountService.loadCurrentUser(token).subscribe(() => {
        console.log('Loaded Current User');
      });
    }
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  ngOnDestroy(): void {
    this.themeSub$.unsubscribe();
  }
}
