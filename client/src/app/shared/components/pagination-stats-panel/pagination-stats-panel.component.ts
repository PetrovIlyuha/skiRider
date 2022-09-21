import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagination-stats-panel',
  templateUrl: './pagination-stats-panel.component.html',
  styleUrls: ['./pagination-stats-panel.component.scss'],
})
export class PaginationStatsPanelComponent implements OnInit {
  @Input() totalItems!: number;
  @Input() firstIndexInRangeForPageSize!: number;
  @Input() lastIndexInRangeForPageSize!: number;
  constructor() {}

  ngOnInit(): void {}
}
