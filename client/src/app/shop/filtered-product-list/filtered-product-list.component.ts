import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IProduct} from "../../shared/models/product";
import {IProductBrand} from "../../shared/models/ProductBrand";
import {IProductCategory} from "../../shared/models/ProductCategory";

@Component({
  selector: 'app-filtered-product-list',
  templateUrl: './filtered-product-list.component.html',
  styleUrls: ['./filtered-product-list.component.scss']
})
export class FilteredProductListComponent implements OnInit {
  @Input() products: IProduct[];
  @Input() totalProducts: number;
  @Input() brands: IProductBrand[];
  @Input() categories: IProductCategory[];
  selectedSortMethod: string = "name";
  selectedFilterBrandId: number = 0;
  selectedCategoryId: number = 0;
  sortingOptions = [{name: "Alphabetically", value: "name"},{name:"Price Low to High", value: "priceAsc"},{name:  "Price High to Low", value: "priceDesc"}]
  sortMenuOpened: boolean = false;

  @Output() filterByBrand = new EventEmitter<number>();
  @Output() filterByCategory = new EventEmitter<number>();
  @Output() sortByEmitter = new EventEmitter<string>();

  getSelectedSortingMethodDisplayValue() {
    return this.sortingOptions.filter(o => o.value === this.selectedSortMethod)[0].name;
  }

  applyFilterByBrand(brandId: number) :void {
    this.selectedFilterBrandId = brandId;
    this.filterByBrand.emit(brandId);
  }

  applyFilterByCategory(categoryId: number): void {
    this.selectedCategoryId = categoryId;
    this.filterByCategory.emit(categoryId);
  }

  applySortingMethod() {

  }

  selectSortMethod(method: string): void {
    this.selectedSortMethod = method;
    this.sortMenuOpened = false;
    this.sortByEmitter.emit(this.selectedSortMethod);
  }

  constructor() { }

  toggleSortMenu() :void {
    this.sortMenuOpened = !this.sortMenuOpened;
  }


  ngOnInit(): void {
  }

}
