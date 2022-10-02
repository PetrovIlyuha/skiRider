import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../core/breadcrumb.service';
import { Location } from '@angular/common';
import { BasketService } from './basket.service';
import { Observable } from 'rxjs';
import { IBasket, IBasketItem } from './basket.interface';
import { ShopService } from '../shop/shop.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
})
export class BasketComponent implements OnInit {
  basket$: Observable<IBasket>;
  constructor(
    private breadcrumbService: BreadcrumbService,
    private location: Location,
    private basketService: BasketService,
    private shopService: ShopService
  ) {}

  ngOnInit(): void {
    this.breadcrumbService.updateBreadcrumbs(this.location.path());
    this.basket$ = this.basketService.basket$;
  }

  getSubTotal(basket: IBasket | null): number {
    if (basket) {
      return basket.items.reduce((acc, next) => {
        acc += next.price * next.quantity;
        return acc;
      }, 0);
    }
  }

  changeItemQuantity(item: IBasketItem, quantity = 1) {
    this.basketService.addItemToBasket(item, quantity);
  }
}
