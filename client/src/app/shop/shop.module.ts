import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { FilteredProductListComponent } from './filtered-product-list/filtered-product-list.component';
import { ProductCardSmallComponent } from './product-card-small/product-card-small.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ShopComponent,
    FilteredProductListComponent,
    ProductCardSmallComponent,
  ],
  exports: [
    ShopComponent,
    FilteredProductListComponent,
    ProductCardSmallComponent,
  ],
  imports: [CommonModule, SharedModule],
})
export class ShopModule {}
