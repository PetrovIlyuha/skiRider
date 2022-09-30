import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from '../../shared/models/product';
import { AppTheme } from '../../core/theme.service';

@Component({
  selector: 'app-product-card-small',
  templateUrl: './product-card-small.component.html',
  styleUrls: ['./product-card-small.component.scss'],
})
export class ProductCardSmallComponent implements OnInit {
  @Input() product: IProduct;
  @Input() theme: AppTheme;
  constructor() {}

  ngOnInit(): void {}
}
