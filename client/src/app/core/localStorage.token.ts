import { InjectionToken } from '@angular/core';

export interface LocalStorageToken {
  theme: string;
}

export const localStorageToken = new InjectionToken<LocalStorageToken>(
  'app.local.storage'
);
