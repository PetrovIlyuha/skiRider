import { Component, OnInit } from '@angular/core';
import { IProduct } from '../shared/models/product';
import { ShopService } from '../shop/shop.service';
import { ShopParams } from '../shared/models/shopParams';
import { BreadcrumbService } from '../core/breadcrumb.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  featuredProducts!: IProduct[];
  trendingProducts!: IProduct[];
  constructor(
    private shopService: ShopService,
    private breadcrumbService: BreadcrumbService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.breadcrumbService.updateBreadcrumbs(this.location.path());
    const shopParams = new ShopParams();
    shopParams.sortByString = 'priceDesc';
    shopParams.pageSize = 50;
    this.shopService.getProducts(shopParams).subscribe((products) => {
      this.featuredProducts = products.data;
      this.trendingProducts = [];
      products.data.forEach((product) => {
        const foundWithType = this.trendingProducts.find(
          (p) => p.productType === product.productType
        );
        if (!foundWithType) {
          this.trendingProducts.push(product);
        }
      });
    });
  }
}
