import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../core/breadcrumb.service';
import { Location } from '@angular/common';
import { BasketService } from './basket.service';
import { Observable, Subscription } from 'rxjs';
import { IBasket, IBasketItem, IBasketTotals } from './basket.interface';
import { ShopService } from '../shop/shop.service';
import { Router } from '@angular/router';
import { AppTheme, ThemeService } from '../core/theme.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
})
export class BasketComponent implements OnInit {
  basket$: Observable<IBasket>;
  basketTotals$: Observable<IBasketTotals>;
  cartIsEmpty: boolean = false;
  theme: AppTheme;
  themeSub$: Subscription;

  constructor(
    private breadcrumbService: BreadcrumbService,
    private location: Location,
    private basketService: BasketService,
    private themeService: ThemeService,
    private shopService: ShopService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.breadcrumbService.updateBreadcrumbs(this.location.path());
    this.basketTotals$ = this.basketService.basketTotals$;
    this.basket$ = this.basketService.basket$;
    this.basket$.subscribe((value) => {
      if (!value) {
        this.router.navigateByUrl('/shop').then((r) => r);
      }
    });
    this.theme = this.themeService.theme;
    this.themeSub$ = this.themeService.themeLiveUpdates$.subscribe(
      (updatedTheme) => {
        this.theme = updatedTheme;
      }
    );
  }

  changeItemQuantity(item: IBasketItem, quantity = 1) {
    this.basketService.addItemToBasket(item, quantity);
  }

  removeFromBasket(item: IBasketItem) {
    this.basketService.removeItemFromBasket(item);
  }
}
