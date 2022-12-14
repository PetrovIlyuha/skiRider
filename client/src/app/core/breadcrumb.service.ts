import { Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, Event, NavigationEnd, Router } from '@angular/router';
import { ShopService } from '../shop/shop.service';
import { IProduct } from '../shared/models/product';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService implements OnInit {
  breadcrumbsData!: string[];
  pathToPageLinkMap = {
    products: 'shop',
    basket: 'basket',
    checkout: 'checkout',
  };
  liveBreadCrumbs = new Subject<string[]>();

  deepLinks = { basket: 'checkout' };

  updateBreadcrumbs(path: string) {
    this.breadcrumbsData = [];
    const parts = path.split('/');
    const isAccountRelated = parts.some((p) => p === 'account');
    if (isAccountRelated) {
      this.breadcrumbsData = [];
    } else if (
      parts[1] !== '' &&
      !Object.values(this.deepLinks).includes(parts[1])
    ) {
      this.breadcrumbsData.push(parts[1]);
    } else {
      const previousLink = Object.keys(this.deepLinks).find(
        (key) => this.deepLinks[key] === parts[1]
      );
      this.breadcrumbsData.push(previousLink, parts[1]);
    }
    this.getProductByIdFromParams(parts);
    this.liveBreadCrumbs.next(this.breadcrumbsData);
  }

  private getProductByIdFromParams(parts: string[]) {
    if (!Number.isNaN(parseInt(parts[2]))) {
      this.shopService
        .getProductById(+parts[2])
        .subscribe((product: IProduct) => {
          this.breadcrumbsData.push(product.name);
        });
    }
  }

  constructor(private shopService: ShopService) {}

  ngOnInit(): void {
    this.liveBreadCrumbs.next(this.breadcrumbsData);
  }

  getLinkForPath(path: string): string {
    return this.pathToPageLinkMap[path.toLowerCase()];
  }
}
