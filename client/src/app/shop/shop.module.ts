import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { FilteredProductListComponent } from './filtered-product-list/filtered-product-list.component';
import { ProductCardSmallComponent } from './product-card-small/product-card-small.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ShopComponent,
    FilteredProductListComponent,
    ProductCardSmallComponent,
    ProductDetailsComponent,
  ],
  exports: [
    ShopComponent,
    FilteredProductListComponent,
    ProductCardSmallComponent,
  ],
  imports: [CommonModule, SharedModule, FormsModule, RouterModule],
})
export class ShopModule {}
