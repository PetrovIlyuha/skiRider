import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../breadcrumb.service';

@Component({
  selector: 'app-section-header',
  templateUrl: './section-header.component.html',
  styleUrls: ['./section-header.component.scss'],
})
export class SectionHeaderComponent implements OnInit {
  breadcrumbs!: string[];
  constructor(private breadcrumbService: BreadcrumbService) {}

  ngOnInit(): void {
    this.breadcrumbService.liveBreadCrumbs.subscribe((lastBreadcrumbs) => {
      this.breadcrumbs = lastBreadcrumbs;
    });
  }
  getLinkForPath(path: string): string {
    return this.breadcrumbService.getLinkForPath(path);
  }
}
