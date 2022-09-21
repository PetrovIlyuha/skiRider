import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PaginationStatsPanelComponent } from './components/pagination-stats-panel/pagination-stats-panel.component';
import { PaginationComponent } from './components/pagination/pagination.component';

@NgModule({
  declarations: [PaginationStatsPanelComponent, PaginationComponent],
  imports: [CommonModule, PaginationModule.forRoot()],
  exports: [
    PaginationModule,
    PaginationStatsPanelComponent,
    PaginationComponent,
  ],
})
export class SharedModule {}
