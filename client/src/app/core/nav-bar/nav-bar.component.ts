import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppTheme, ThemeService } from '../theme.service';
import { Observable, Subscription } from 'rxjs';
import { IBasket, IBasketTotals } from '../../basket/basket.interface';
import { BasketService } from '../../basket/basket.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit, OnDestroy {
  theme: AppTheme;
  themeSub$: Subscription;
  showMobileMenu: boolean = false;
  basket$: Observable<IBasket>;
  basketTotals$: Observable<IBasketTotals>;

  constructor(
    private themeService: ThemeService,
    private basketService: BasketService
  ) {}

  ngOnInit(): void {
    this.theme = this.themeService.theme;
    this.themeSub$ = this.themeService.themeLiveUpdates$.subscribe(
      (updatedTheme) => {
        this.theme = updatedTheme;
      }
    );
    this.basketTotals$ = this.basketService.basketTotals$;
    this.basket$ = this.basketService.basket$;
  }

  ngOnDestroy(): void {
    this.themeSub$.unsubscribe();
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
}
