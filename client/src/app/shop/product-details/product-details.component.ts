import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from '../../shared/models/product';
import { map, switchMap } from 'rxjs';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  product!: IProduct;
  constructor(
    private route: ActivatedRoute,
    private shopService: ShopService
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        map((map) => map.get('id')),
        switchMap((id) => this.shopService.getProductById(+id))
      )
      .subscribe((product) => {
        this.product = product;
      });
  }
}
