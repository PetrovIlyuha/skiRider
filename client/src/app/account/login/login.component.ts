import { Component, OnInit } from '@angular/core';
import { AppTheme, ThemeService } from '../../core/theme.service';
import { Subscription } from 'rxjs';
import { BreadcrumbService } from '../../core/breadcrumb.service';
import { Location } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  theme: AppTheme;
  themeSub$: Subscription;
  fieldChanges$: Subscription;
  loginForm: FormGroup;
  friendlyMovedLabels = [
    { label: 'email', elevated: false, dirty: false },
    { label: 'password', elevated: false, dirty: false },
  ];
  passwordFieldType: string = 'password';

  constructor(
    private themeService: ThemeService,
    private breadcrumbsService: BreadcrumbService,
    private location: Location,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.breadcrumbsService.updateBreadcrumbs(this.location.path());
    this.enableThemeChanges();
    this.createLoginForm();
    this.trackFormFieldsValues();
  }

  createLoginForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  isFieldDirty(fieldName: string): boolean {
    return this.friendlyMovedLabels.filter((f) => f.label === fieldName)[0]
      ?.dirty;
  }

  onSubmit() {
    this.accountService.login(this.loginForm.value).subscribe(() => {
      console.log('user logged in');
    });
  }

  trackFormFieldsValues() {
    this.fieldChanges$ = this.loginForm.valueChanges.subscribe((values) => {
      Object.entries(values).forEach(([fieldName, value]) => {
        if (value === '') {
          this.friendlyMovedLabels = this.friendlyMovedLabels.map((f) =>
            f.label === fieldName ? { ...f, dirty: false } : f
          );
        } else {
          this.friendlyMovedLabels = this.friendlyMovedLabels.map((f) =>
            f.label === fieldName ? { ...f, dirty: true } : f
          );
        }
      });
    });
  }

  enableThemeChanges() {
    this.theme = this.themeService.theme;
    this.themeSub$ = this.themeService.themeLiveUpdates$.subscribe(
      (updatedTheme) => {
        this.theme = updatedTheme;
      }
    );
  }

  toggleShowPassword(): void {
    this.passwordFieldType =
      this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  shouldLabelElevate(labelName: string) {
    const field = this.friendlyMovedLabels.filter(
      (l) => l.label === labelName
    )[0];
    return field.elevated || this.isFieldDirty(labelName);
  }

  toggleMoveInputLabel(labelName: string) {
    this.friendlyMovedLabels = this.friendlyMovedLabels.map((l) =>
      l.label === labelName ? { ...l, elevated: !l.elevated } : l
    );
  }

  ngOnDestroy(): void {
    this.themeSub$.unsubscribe();
    this.fieldChanges$.unsubscribe();
  }
}
