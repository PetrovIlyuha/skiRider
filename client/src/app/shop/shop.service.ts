import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { IPagination } from '../shared/models/pagination';
import { IProductBrand } from '../shared/models/ProductBrand';
import { IProductCategory } from '../shared/models/ProductCategory';
import { map } from 'rxjs';
import { ShopParams } from '../shared/models/shopParams';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  constructor(private http: HttpClient) {}

  getProducts(shopParams: ShopParams) {
    let requestParams = new HttpParams();
    if (shopParams.productBrandIdForFilterSelected !== 0) {
      requestParams = requestParams.append(
        'brandId',
        shopParams.productBrandIdForFilterSelected.toString()
      );
    }
    if (shopParams.productCategoryIdForFilterSelected !== 0) {
      requestParams = requestParams.append(
        'typeId',
        shopParams.productCategoryIdForFilterSelected.toString()
      );
    }
    if (shopParams.searchTerm) {
      requestParams = requestParams.append('search', shopParams.searchTerm);
    }
    requestParams = requestParams.append('sort', shopParams.sortByString);
    requestParams = requestParams.append(
      'pageIndex',
      shopParams.pageNumber.toString()
    );
    requestParams = requestParams.append(
      'pageSize',
      shopParams.pageSize.toString()
    );
    return this.http
      .get<IPagination>(`${environment.apiUrl}/products`, {
        observe: 'response',
        params: requestParams,
      })
      .pipe(map((res) => res.body));
  }
  getBrands() {
    return this.http.get<IProductBrand[]>(
      `${environment.apiUrl}/products/brands`
    );
  }
  getProductCategories() {
    return this.http.get<IProductCategory[]>(
      `${environment.apiUrl}/products/types`
    );
  }
}
