import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule} from "@angular/forms";
import { NavBarComponent } from './navigation/nav-bar/nav-bar.component';
import {HttpClientModule} from "@angular/common/http";
import { FilteredProductListComponent } from './storefront/filtered-product-list/filtered-product-list.component';
import { ProductCardSmallComponent } from './storefront/product-card-small/product-card-small.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FilteredProductListComponent,
    ProductCardSmallComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
