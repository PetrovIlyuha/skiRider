import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { AccountService } from '../../account/account.service';
import { Router } from '@angular/router';
import { AppTheme, ThemeService } from '../theme.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-dropdown-menu',
  templateUrl: './user-dropdown-menu.component.html',
  styleUrls: ['./user-dropdown-menu.component.scss'],
})
export class UserDropdownMenuComponent implements OnInit, OnDestroy {
  @Input() dropDownOpened!: boolean;
  @Output() toggleDropDownEmitter = new EventEmitter<boolean>();

  theme: AppTheme;
  themeSub$: Subscription;

  constructor(
    private eRef: ElementRef,
    private accountService: AccountService,
    private themeService: ThemeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.enableThemeChanges();
  }

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.toggleDropDownEmitter.emit(false);
    }
  }

  logOut() {
    this.accountService.logout();
    this.toggleDropDownEmitter.emit(false);
  }

  toggleDropDown() {
    this.dropDownOpened = !this.dropDownOpened;
    this.toggleDropDownEmitter.emit(this.dropDownOpened);
  }

  routeTo(route: string) {
    this.toggleDropDownEmitter.emit(false);
    this.router.navigateByUrl(route).then((e) => e);
  }
  enableThemeChanges() {
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

  // TODO!  Styles
  dropDownItemStyles() {
    return {
      'group cursor-pointer flex items-center px-4 py-2 text-sm no-underline transition-all duration-100':
        true,
      'hover:text-green-300 hover:bg-gray-800': this.theme === 'Light',
      'hover:text-gray-800 hover:bg-gray-100': this.theme === 'Dark',
    };
  }

  dropDownButtonStyles() {
    return {
      'inline-flex w-full max-h-[32px] justify-center items-center rounded-md border px-1 py-1 text-sm font-medium text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100':
        true,
      'bg-gray-100': this.theme === 'Light',
      'bg-gray-600': this.theme === 'Dark',
    };
  }

  dropDownLayoutStyles() {
    return {
      'absolute right-0 mt-3 z-10 w-56 origin-top-right divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none transition-all duration-200':
        true,
      'opacity-0 translate-y-[20px]': !this.dropDownOpened,
      'opacity-100 translate-y-0': this.dropDownOpened,
      'bg-gray-100': this.theme === 'Light',
      'bg-gray-800': this.theme === 'Dark',
    };
  }
}
