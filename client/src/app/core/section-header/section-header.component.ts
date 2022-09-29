import { Component, OnDestroy, OnInit } from '@angular/core';
import { BreadcrumbService } from '../breadcrumb.service';
import { AppTheme, ThemeService } from '../theme.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-section-header',
  templateUrl: './section-header.component.html',
  styleUrls: ['./section-header.component.scss'],
})
export class SectionHeaderComponent implements OnInit, OnDestroy {
  theme: AppTheme;
  themeSub$: Subscription;
  breadcrumbs!: string[];
  constructor(
    private breadcrumbService: BreadcrumbService,
    private themeService: ThemeService
  ) {}

  getLinkForPath(path: string): string {
    return this.breadcrumbService.getLinkForPath(path);
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  ngOnInit(): void {
    this.breadcrumbService.liveBreadCrumbs.subscribe((lastBreadcrumbs) => {
      this.breadcrumbs = lastBreadcrumbs;
    });
    this.theme = this.themeService.theme;
    this.themeSub$ = this.themeService.themeLiveUpdates$.subscribe(
      (updatedTheme) => {
        this.theme = updatedTheme;
      }
    );
  }

  ngOnDestroy(): void {
    this.themeSub$.unsubscribe();
  }
}
