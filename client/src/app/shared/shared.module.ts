import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PaginationStatsPanelComponent } from './components/pagination-stats-panel/pagination-stats-panel.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PaginationStatsPanelComponent,
    PaginationComponent,
    OrderSummaryComponent,
  ],
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    RouterModule,
    ReactiveFormsModule,
  ],
  exports: [
    PaginationModule,
    PaginationStatsPanelComponent,
    PaginationComponent,
    OrderSummaryComponent,
    ReactiveFormsModule,
  ],
})
export class SharedModule {}
