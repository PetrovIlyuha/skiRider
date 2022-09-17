import { Component, OnInit } from '@angular/core';
import {IProduct} from "../shared/models/product";
import {ShopService} from "./shop.service";
import {IProductBrand} from "../shared/models/ProductBrand";
import {IProductCategory} from "../shared/models/ProductCategory";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  products: IProduct[]
  brands: IProductBrand[]
  categories: IProductCategory[]
  totalProducts: number;
  productBrandIdForFilterSelected?: number;
  productCategoryIdForFilterSelected?: number;
  sortByString: string;
  constructor(private shopService: ShopService) { }

  getProducts() {
    this.shopService.getProducts(this.productBrandIdForFilterSelected,this.productCategoryIdForFilterSelected,this.sortByString).subscribe(response => {
      this.products = response.data;
      this.totalProducts = response.count;
    })
  }
  getBrands() {
    this.shopService.getBrands().subscribe((response) => {
      this.brands = [{id:0,name:"All"},...response];
    })
  }

  getProductCategories() {
    this.shopService.getProductCategories().subscribe((response) => {
      this.categories = [{id:0,name:"All"},...response];
    })
  }
  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getProductCategories();
  }

  performFilterByBrand(brandId: number) {
    this.productBrandIdForFilterSelected = brandId;
    this.getProducts();
  }

  performFilterByCategory(categoryId: number) {
    this.productCategoryIdForFilterSelected = categoryId;
    this.getProducts();
  }

  performSortingOnProducts(sortByString: string) {
    this.sortByString = sortByString;
    this.getProducts();
  }

}
