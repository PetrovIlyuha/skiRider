import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from '../../shared/models/product';
import { last, map, switchMap } from 'rxjs';
import { ShopService } from '../shop.service';
import { Location } from '@angular/common';
import { BreadcrumbService } from '../../core/breadcrumb.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  product!: IProduct;
  constructor(
    private route: ActivatedRoute,
    private shopService: ShopService,
    private breadcrumbService: BreadcrumbService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.breadcrumbService.updateBreadcrumbs(this.location.path());
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
