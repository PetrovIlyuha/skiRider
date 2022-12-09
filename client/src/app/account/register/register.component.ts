import { AppTheme, ThemeService } from './../../core/theme.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BreadcrumbService } from 'src/app/core/breadcrumb.service';
import { AccountService } from '../account.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  theme: AppTheme;
  themeSub$: Subscription;
  fieldChanges$: Subscription;
  registerForm: FormGroup;

  friendlyLabels = [
    { label: 'displayName', elevated: false, dirty: false },
    { label: 'email', elevated: false, dirty: false },
    {
      label: 'password',
      elevated: false,
      dirty: false,
    },
  ];
  passwordFieldType: string = 'password';
  fieldErrors = { displayName: [], email: [], password: [] };

  constructor(
    private themeService: ThemeService,
    private breadcrumbsService: BreadcrumbService,
    private location: Location,
    private router: Router,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.breadcrumbsService.updateBreadcrumbs(this.location.path());
    this.enableThemeChanges();
    this.createRegisterForm();
    this.trackFormFieldsValues();
  }

  createRegisterForm() {
    this.registerForm = new FormGroup({
      displayName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{4,40}$'),
      ]),
    });
    Object.keys(this.registerForm.controls).forEach((c) => {
      console.log(c);
      this.startTrackingFieldErrors(c);
    });
  }

  isFieldDirty(fieldName: string): boolean {
    return this.friendlyLabels.filter((f) => f.label === fieldName)[0]?.dirty;
  }

  startTrackingFieldErrors(fieldName: string) {
    const control = this.registerForm.get(fieldName);
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
    {
      fieldName: 'displayName',
      errorType: 'required',
      message: 'Display Name is required',
    },
    {
      fieldName: 'displayName',
      errorType: 'minlength',
      message: 'Display name should not be shorter than 3 characters',
    },
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

  thereAreValidationErrorsFor(fieldName: string) {
    return this.fieldErrors[fieldName].length > 0
      ? [...this.fieldErrors[fieldName]]
      : [];
  }

  onSubmit() {
    console.log(this.registerForm.value);
    this.accountService.register(this.registerForm.value).subscribe(
      () => {
        this.router.navigateByUrl('/shop');
      },
      (error) => {
        console.log(error);
      }
    );
  }

  trackFormFieldsValues() {
    this.fieldChanges$ = this.registerForm.valueChanges.subscribe((values) => {
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
