import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from '../../shared/models/product';
import { AppTheme } from '../../core/theme.service';
import { BasketService } from '../../basket/basket.service';
import { IBasket } from '../../basket/basket.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-card-small',
  templateUrl: './product-card-small.component.html',
  styleUrls: ['./product-card-small.component.scss'],
})
export class ProductCardSmallComponent implements OnInit {
  @Input() product: IProduct;
  @Input() theme: AppTheme;
  constructor(private basketService: BasketService) {}
  basket$: Observable<IBasket>;

  ngOnInit(): void {
    this.basket$ = this.basketService.basket$;
  }

  addItemToBasket() {
    this.basketService.addItemToBasket(this.product);
  }

  addToCartDisplayText(basket: IBasket): string {
    if (!basket) {
      return 'Add To Cart';
    } else {
      const inCartAmount = basket.items.find(
        (item) => item.id === this.product.id
      )?.quantity;
      const displayedNumeral = inCartAmount > 1 ? 'items' : 'item';
      if (inCartAmount !== undefined && inCartAmount > 0) {
        return `${inCartAmount} ${displayedNumeral} in Cart.`;
      } else {
        return `Add To Cart`;
      }
    }
  }

  itemFoundInCart(basket: IBasket): boolean {
    return basket
      ? basket.items.find((item) => item.id === this.product.id) !== undefined
      : false;
  }
}
