import { Component, OnInit } from '@angular/core';
import { IProduct } from '../shared/models/product';
import { ShopService } from './shop.service';
import { IProductBrand } from '../shared/models/ProductBrand';
import { IProductCategory } from '../shared/models/ProductCategory';
import { ShopParams } from '../shared/models/shopParams';
import { BreadcrumbService } from '../core/breadcrumb.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  products: IProduct[];
  brands: IProductBrand[];
  categories: IProductCategory[];
  totalProducts: number;
  shopParams = new ShopParams();
  constructor(
    private shopService: ShopService,
    private breadcrumbService: BreadcrumbService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.breadcrumbService.updateBreadcrumbs(this.location.path());
    this.getProducts();
    this.getBrands();
    this.getProductCategories();
  }

  getProducts() {
    this.shopService.getProducts(this.shopParams).subscribe((response) => {
      this.products = response.data;
      this.shopParams.pageNumber = response.pageIndex;
      this.shopParams.pageSize = response.pageSize;
      this.totalProducts = response.count;
    });
  }
  getBrands() {
    this.shopService.getBrands().subscribe((response) => {
      this.brands = [{ id: 0, name: 'All' }, ...response];
    });
  }

  getProductCategories() {
    this.shopService.getProductCategories().subscribe((response) => {
      this.categories = [{ id: 0, name: 'All' }, ...response];
    });
  }

  performFilterByBrand(brandId: number) {
    this.shopParams.productBrandIdForFilterSelected = brandId;
    this.getProducts();
  }

  performFilterByCategory(categoryId: number) {
    this.shopParams.productCategoryIdForFilterSelected = categoryId;
    this.getProducts();
  }

  performSortingOnProducts(sortByString: string) {
    this.shopParams.sortByString = sortByString;
    this.getProducts();
  }

  onPageChanged(pageNumber: number) {
    this.shopParams.pageNumber = pageNumber;
    this.getProducts();
  }

  performSearch(event: string) {
    this.shopParams.searchTerm = event;
    this.getProducts();
  }
}
