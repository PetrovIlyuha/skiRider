import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { ShopService } from '../shop/shop.service';
import { IProduct } from '../shared/models/product';
import { ShopParams } from '../shared/models/shopParams';
import { CarouselModule } from 'ngx-bootstrap/carousel';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, RouterModule, CarouselModule],
  exports: [HomeComponent],
})
export class HomeModule {}
