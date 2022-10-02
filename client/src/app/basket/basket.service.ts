import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map } from 'rxjs';
import { Basket, IBasket, IBasketItem } from './basket.interface';
import { IProduct } from '../shared/models/product';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  apiUrl = environment.apiUrl;
  private basketSource = new BehaviorSubject<IBasket>(null);
  basket$ = this.basketSource.asObservable();

  constructor(private http: HttpClient) {}

  getBasket(id: string) {
    return this.http.get(`${this.apiUrl}/basket?id=${id}`).pipe(
      map((basket: IBasket) => {
        this.basketSource.next(basket);
      })
    );
  }

  setBasket(basket: IBasket) {
    return this.http.post(`${this.apiUrl}/basket`, basket).subscribe(
      (response: IBasket) => {
        this.basketSource.next(response);
      },
      (error) => {
        console.log({ error });
      }
    );
  }

  getCurrentBasketValue() {
    return this.basketSource.value;
  }

  addItemToBasket(item: IProduct | IBasketItem, quantity = 1) {
    let itemToAdd: IBasketItem;
    if ('description' in item) {
      itemToAdd = this.mapProductToBasketItem(item, quantity);
    } else {
      itemToAdd = item;
    }
    const basket = this.getCurrentBasketValue() ?? this.createBasket();
    basket.items = this.addOrUpdateItem(basket.items, itemToAdd, quantity);
    this.setBasket(basket);
  }

  private mapProductToBasketItem(
    item: IProduct,
    quantity: number
  ): IBasketItem {
    return {
      id: item.id,
      productName: item.name,
      price: item.price,
      pictureUrl: item.pictureUrl,
      quantity,
      brand: item.productBrand,
      type: item.productType,
    };
  }

  private createBasket(): IBasket {
    const basket = new Basket();
    localStorage.setItem('basket_id', basket.id);
    return basket;
  }

  private addOrUpdateItem(
    items: IBasketItem[],
    itemToAdd: IBasketItem,
    quantity: number
  ): IBasketItem[] {
    const foundIdx = items.findIndex((i) => i.id === itemToAdd.id);
    if (foundIdx > -1) {
      if (items[foundIdx].quantity + quantity === 0) {
        items.splice(foundIdx, 1);
      } else {
        items[foundIdx].quantity += quantity;
      }
    } else {
      itemToAdd.quantity = quantity;
      items.push(itemToAdd);
    }
    return items;
  }
}
