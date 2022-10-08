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

  friendlyLabels = [
    { label: 'email', elevated: false, dirty: false },
    {
      label: 'password',
      elevated: false,
      dirty: false,
    },
  ];
  passwordFieldType: string = 'password';
  fieldErrors = { email: [], password: [] };

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
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{4,40}$'),
      ]),
    });
    Object.keys(this.loginForm.controls).forEach((c) =>
      this.startTrackingFieldErrors(c)
    );
  }

  isFieldDirty(fieldName: string): boolean {
    return this.friendlyLabels.filter((f) => f.label === fieldName)[0]?.dirty;
  }

  startTrackingFieldErrors(fieldName: string) {
    const control = this.loginForm.get(fieldName);
    control.valueChanges.subscribe((value) => {
      if (control.dirty && control.touched) {
        const errors = control.errors;
        if (errors) {
          this.fieldErrors[fieldName] = [
            ...Object.keys(errors).map(
              (e) =>
                this.errorMessages.filter(
                  (m) => m.fieldName === fieldName && m.errorType === e
                )[0].message
            ),
          ];
        } else {
          this.fieldErrors[fieldName] = [];
        }
      }
    });
  }

  errorMessages = [
    { fieldName: 'email', errorType: 'required', message: 'Email is required' },
    { fieldName: 'email', errorType: 'email', message: 'Not a valid email' },
    {
      fieldName: 'password',
      errorType: 'required',
      message: 'Password is required',
    },
    {
      fieldName: 'password',
      errorType: 'pattern',
      message: 'Password is too weak.',
    },
  ];

  showValidationErrorsFor(fieldName: string) {
    return this.fieldErrors[fieldName].length > 0
      ? [...this.fieldErrors[fieldName]]
      : [];
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
          this.friendlyLabels = this.friendlyLabels.map((f) =>
            f.label === fieldName ? { ...f, dirty: false } : f
          );
        } else {
          this.friendlyLabels = this.friendlyLabels.map((f) =>
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
    const field = this.friendlyLabels.filter((l) => l.label === labelName)[0];
    return field.elevated || this.isFieldDirty(labelName);
  }

  toggleMoveInputLabel(labelName: string) {
    this.friendlyLabels = this.friendlyLabels.map((l) =>
      l.label === labelName ? { ...l, elevated: !l.elevated } : l
    );
  }

  ngOnDestroy(): void {
    this.themeSub$.unsubscribe();
    this.fieldChanges$.unsubscribe();
  }
}
