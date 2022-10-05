import { Component, OnInit } from '@angular/core';
import { BasketService } from '../basket/basket.service';
import { Observable } from 'rxjs';
import { IBasket } from '../basket/basket.interface';
import { BreadcrumbService } from '../core/breadcrumb.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  basket$: Observable<IBasket>;
  constructor(
    private basketService: BasketService,
    private breadcrumbService: BreadcrumbService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.basket$ = this.basketService.basket$;
    this.breadcrumbService.updateBreadcrumbs(this.location.path());
  }
}
