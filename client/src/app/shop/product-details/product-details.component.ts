import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from '../../shared/models/product';
import { last, map, Observable, Subscription, switchMap } from 'rxjs';
import { ShopService } from '../shop.service';
import { Location } from '@angular/common';
import { BreadcrumbService } from '../../core/breadcrumb.service';
import { AppTheme, ThemeService } from '../../core/theme.service';
import { BasketService } from '../../basket/basket.service';
import { IBasket } from '../../basket/basket.interface';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  basket$: Observable<IBasket>;
  theme: AppTheme;
  themeSub$: Subscription;
  product!: IProduct;
  constructor(
    private route: ActivatedRoute,
    private shopService: ShopService,
    private breadcrumbService: BreadcrumbService,
    private location: Location,
    private themeService: ThemeService,
    private basketService: BasketService
  ) {}

  ngOnInit(): void {
    this.breadcrumbService.updateBreadcrumbs(this.location.path());
    this.basket$ = this.basketService.basket$;
    this.route.paramMap
      .pipe(
        map((map) => map.get('id')),
        switchMap((id) => this.shopService.getProductById(+id))
      )
      .subscribe((product) => {
        this.product = product;
      });
    this.theme = this.themeService.theme;
    this.themeSub$ = this.themeService.themeLiveUpdates$.subscribe(
      (updatedTheme) => {
        this.theme = updatedTheme;
      }
    );
  }

  addToCartDisplayText(basket: IBasket): string {
    const inCartAmount = basket?.items.find(
      (item) => item.id === this.product.id
    )?.quantity;
    const displayedNumeral = inCartAmount > 1 ? 'are' : 'is';
    if (inCartAmount !== undefined && inCartAmount > 0) {
      return `There ${displayedNumeral} ${inCartAmount} item${
        inCartAmount > 1 ? 's' : ''
      } in Cart. Click to add more`;
    } else {
      return `Add To Cart`;
    }
  }

  addItemToBasket() {
    this.basketService.addItemToBasket(this.product);
  }

  ngOnDestroy(): void {
    this.themeSub$.unsubscribe();
  }
}
