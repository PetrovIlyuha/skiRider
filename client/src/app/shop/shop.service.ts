import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {IPagination} from "../shared/models/pagination";
import {IProductBrand} from "../shared/models/ProductBrand";
import {IProductCategory} from "../shared/models/ProductCategory";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  constructor(private http: HttpClient) { }

  getProducts(brandId?: number, typeId?:number,sortByString?:string) {
    let requestParams = new HttpParams();
    if (brandId) {
      requestParams = requestParams.append("brandId", brandId.toString());
    }
    if (typeId) {
      requestParams =requestParams.append("typeId", typeId.toString());
    }
    if (sortByString) {
      requestParams =requestParams.append("sort", sortByString);
    }
    return this.http.get<IPagination>(`${environment.apiUrl}/products?pageSize=100`,{observe: "response", params: requestParams}).pipe(
      map(res => res.body)
    )
  }
  getBrands() {
    return this.http.get<IProductBrand[]>(`${environment.apiUrl}/products/brands`)
  }
  getProductCategories() {
    return this.http.get<IProductCategory[]>(`${environment.apiUrl}/products/types`)
  }
}
