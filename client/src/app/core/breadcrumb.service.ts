import { Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, Event, NavigationEnd, Router } from '@angular/router';
import { ShopService } from '../shop/shop.service';
import { IProduct } from '../shared/models/product';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService implements OnInit {
  breadcrumbsData: string[] = [];
  pathToPageLinkMap = {
    products: 'shop',
    basket: 'basket',
    checkout: 'checkout',
  };
  liveBreadCrumbs = new Subject<string[]>();

  updateBreadcrumbs(path: string) {
    this.breadcrumbsData = [];
    const parts = path.split('/');
    console.log(parts);
    if (parts[1] === 'shop') {
      this.breadcrumbsData.push('Products');
    }
    if (parts[1] === 'basket') {
      this.breadcrumbsData.push('Basket');
    }
    if (parts[1] === 'checkout') {
      this.breadcrumbsData.push('Checkout');
    }
    if (!Number.isNaN(parseInt(parts[2]))) {
      this.shopService
        .getProductById(+parts[2])
        .subscribe((product: IProduct) => {
          this.breadcrumbsData.push(product.name);
        });
    }
    this.liveBreadCrumbs.next(this.breadcrumbsData);
  }

  constructor(private shopService: ShopService) {}

  ngOnInit(): void {
    this.liveBreadCrumbs.next(this.breadcrumbsData);
  }

  getLinkForPath(path: string): string {
    return this.pathToPageLinkMap[path.toLowerCase()];
  }
}
