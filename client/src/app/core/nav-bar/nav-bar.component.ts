import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppTheme, ThemeService } from '../theme.service';
import { Observable, Subscription } from 'rxjs';
import { IBasket } from '../../basket/basket.interface';
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
}
