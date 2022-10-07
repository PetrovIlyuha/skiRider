import { Component, OnDestroy, OnInit } from '@angular/core';
import { BasketService } from '../basket/basket.service';
import { Observable, Subscription } from 'rxjs';
import { IBasket } from '../basket/basket.interface';
import { BreadcrumbService } from '../core/breadcrumb.service';
import { Location } from '@angular/common';
import { AppTheme, ThemeService } from '../core/theme.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit, OnDestroy {
  theme: AppTheme;
  themeSub$: Subscription;
  basket$: Observable<IBasket>;
  constructor(
    private basketService: BasketService,
    private breadcrumbService: BreadcrumbService,
    private location: Location,
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.basket$ = this.basketService.basket$;
    this.breadcrumbService.updateBreadcrumbs(this.location.path());
    this.enableThemeChanges();
  }

  enableThemeChanges() {
    this.theme = this.themeService.theme;
    this.themeSub$ = this.themeService.themeLiveUpdates$.subscribe(
      (updatedTheme) => {
        this.theme = updatedTheme;
      }
    );
  }

  ngOnDestroy(): void {
    this.themeSub$.unsubscribe();
  }
}
