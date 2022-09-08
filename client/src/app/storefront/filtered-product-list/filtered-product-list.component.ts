import {Component, Input, OnInit} from '@angular/core';
import {IProduct} from "../../models/product";

@Component({
  selector: 'app-filtered-product-list',
  templateUrl: './filtered-product-list.component.html',
  styleUrls: ['./filtered-product-list.component.scss']
})
export class FilteredProductListComponent implements OnInit {
  @Input() products: IProduct[];
  constructor() { }

  ngOnInit(): void {
  }

}
