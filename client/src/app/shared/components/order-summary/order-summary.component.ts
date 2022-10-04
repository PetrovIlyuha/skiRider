import { Component, OnDestroy, OnInit } from '@angular/core';
import { BasketService } from '../../../basket/basket.service';
import { Observable, Subscription } from 'rxjs';
import { IBasketTotals } from '../../../basket/basket.interface';
import { AppTheme, ThemeService } from '../../../core/theme.service';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss'],
})
export class OrderSummaryComponent implements OnInit, OnDestroy {
  basketTotals$: Observable<IBasketTotals>;
  theme: AppTheme;
  themeSub$: Subscription;
  constructor(
    private basketService: BasketService,
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.basketTotals$ = this.basketService.basketTotals$;
    this.themeSub$ = this.themeService.themeLiveUpdates$.subscribe(
      (value) => (this.theme = value)
    );
  }

  ngOnDestroy(): void {
    this.themeSub$.unsubscribe();
  }
}
