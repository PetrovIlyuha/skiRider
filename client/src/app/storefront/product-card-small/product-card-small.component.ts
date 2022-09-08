import {Component, Input, OnInit} from '@angular/core';
import {IProduct} from "../../models/product";

@Component({
  selector: 'app-product-card-small',
  templateUrl: './product-card-small.component.html',
  styleUrls: ['./product-card-small.component.scss']
})
export class ProductCardSmallComponent implements OnInit {
  @Input() product: IProduct;
  constructor() { }

  ngOnInit(): void {
  }

}
