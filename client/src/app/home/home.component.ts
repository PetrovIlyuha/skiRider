import { Component, OnInit } from '@angular/core';
import { IProduct } from '../shared/models/product';
import { ShopService } from '../shop/shop.service';
import { ShopParams } from '../shared/models/shopParams';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  featuredProducts!: IProduct[];
  trendingProducts!: IProduct[];
  constructor(private shopService: ShopService) {}

  ngOnInit(): void {
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
