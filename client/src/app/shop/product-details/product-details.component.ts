import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from '../../shared/models/product';
import { last, map, Subscription, switchMap } from 'rxjs';
import { ShopService } from '../shop.service';
import { Location } from '@angular/common';
import { BreadcrumbService } from '../../core/breadcrumb.service';
import { AppTheme, ThemeService } from '../../core/theme.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  theme: AppTheme;
  themeSub$: Subscription;
  product!: IProduct;
  constructor(
    private route: ActivatedRoute,
    private shopService: ShopService,
    private breadcrumbService: BreadcrumbService,
    private location: Location,
    private themeService: ThemeService
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
    this.theme = this.themeService.theme;
    this.themeSub$ = this.themeService.themeLiveUpdates$.subscribe(
      (updatedTheme) => {
        this.theme = updatedTheme;
      }
    );
  }

  ngOnDestroy(): void {
    this.themeSub$.unsubscribe();
  }
}
