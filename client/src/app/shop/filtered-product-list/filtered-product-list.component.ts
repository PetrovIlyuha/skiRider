import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { IProduct } from '../../shared/models/product';
import { IProductBrand } from '../../shared/models/ProductBrand';
import { IProductCategory } from '../../shared/models/ProductCategory';
import { IShopParams } from '../../shared/models/shopParams';

@Component({
  selector: 'app-filtered-product-list',
  templateUrl: './filtered-product-list.component.html',
  styleUrls: ['./filtered-product-list.component.scss'],
})
export class FilteredProductListComponent implements OnInit {
  // @ViewChild('searchInput', { static: false }) searchTerm: ElementRef;
  searchTerm: string = '';
  @Input() products: IProduct[];
  @Input() totalProducts: number;
  @Input() brands: IProductBrand[];
  @Input() categories: IProductCategory[];
  @Input() shopParams: IShopParams;
  selectedSortMethod: string = 'name';
  selectedFilterBrandId: number = 0;
  selectedCategoryId: number = 0;
  sortingOptions = [
    { name: 'Alphabetically', value: 'name' },
    { name: 'Price Low to High', value: 'priceAsc' },
    { name: 'Price High to Low', value: 'priceDesc' },
  ];
  sortMenuOpened: boolean = false;

  firstIndexForPaginatedItemsForGivenRange(): number {
    return (this.shopParams.pageNumber - 1) * this.shopParams.pageSize + 1;
  }
  lastIndexForPaginatedItemsForGivenRange(): number {
    const expectedMaxInRange =
      this.shopParams.pageNumber * this.shopParams.pageSize;
    return expectedMaxInRange > this.totalProducts
      ? this.totalProducts
      : expectedMaxInRange;
  }

  mobileMenuSectionsOpened: string[] = [];
  mobileMenuOpened: boolean = false;

  @Output() filterByBrand = new EventEmitter<number>();
  @Output() filterByCategory = new EventEmitter<number>();
  @Output() sortByEmitter = new EventEmitter<string>();
  @Output() pageChangedEmitter = new EventEmitter<number>();
  @Output() searchEmitter = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  toggleMobileMenuSection(sectionName: string): void {
    if (this.mobileMenuSectionsOpened.includes(sectionName)) {
      this.mobileMenuSectionsOpened.splice(
        this.mobileMenuSectionsOpened.findIndex((name) => name === sectionName),
        1
      );
    } else {
      this.mobileMenuSectionsOpened.push(sectionName);
    }
  }

  isMobileMenuSectionOpened(sectionName: string): boolean {
    return this.mobileMenuSectionsOpened.includes(sectionName);
  }

  toggleMobileMenuSideBar(): void {
    this.mobileMenuOpened = !this.mobileMenuOpened;
  }

  getSelectedSortingMethodDisplayValue() {
    return this.sortingOptions.filter(
      (o) => o.value === this.selectedSortMethod
    )[0].name;
  }

  applyFilterByBrand(brandId: number): void {
    this.selectedFilterBrandId = brandId;
    this.filterByBrand.emit(brandId);
  }

  applyFilterByCategory(categoryId: number): void {
    this.selectedCategoryId = categoryId;
    this.filterByCategory.emit(categoryId);
  }

  selectSortMethod(method: string): void {
    this.selectedSortMethod = method;
    this.sortMenuOpened = false;
    this.sortByEmitter.emit(this.selectedSortMethod);
  }

  toggleSortMenu(): void {
    this.sortMenuOpened = !this.sortMenuOpened;
  }

  onPageChanged(event: any) {
    this.pageChangedEmitter.emit(event.page);
  }

  onSearch() {
    this.searchEmitter.emit(this.searchTerm);
  }
}
