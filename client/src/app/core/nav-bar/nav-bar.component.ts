import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppTheme, ThemeService } from '../theme.service';
import { Observable, Subscription } from 'rxjs';
import { IBasket, IBasketTotals } from '../../basket/basket.interface';
import { BasketService } from '../../basket/basket.service';
import { IUser } from '../../shared/models/user';
import { AccountService } from '../../account/account.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit, OnDestroy {
  theme: AppTheme;
  themeSub$: Subscription;
  currentUser$: Observable<IUser>;
  showMobileMenu: boolean = false;
  basket$: Observable<IBasket>;
  basketTotals$: Observable<IBasketTotals>;

  constructor(
    private themeService: ThemeService,
    private basketService: BasketService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.basketTotals$ = this.basketService.basketTotals$;
    this.basket$ = this.basketService.basket$;
    this.currentUser$ = this.accountService.currentUser$;
    this.enableThemeChanges();
  }

  ngOnDestroy(): void {
    this.themeSub$.unsubscribe();
  }

  enableThemeChanges() {
    this.theme = this.themeService.theme;
    this.themeSub$ = this.themeService.themeLiveUpdates$.subscribe(
      (updatedTheme) => {
        this.theme = updatedTheme;
      }
    );
  }

  toggleMobileMenu(): void {
    this.showMobileMenu = !this.showMobileMenu;
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  getTotalItemsInBasket(basket: IBasket | null) {
    return basket.items.reduce((total, item) => item.quantity + total, 0);
  }

  logOut() {
    this.accountService.logout();
  }
}
