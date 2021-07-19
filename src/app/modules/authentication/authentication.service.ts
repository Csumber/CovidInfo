import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as FromApp from '../../core/store/app.reducer';
import * as AuthActions from './store/auth.actions';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private tokenExpirationTimer: any = null;

  constructor(private store: Store<FromApp.AppState>) {}

  setLogoutTimer(expirationDuration: number): void {
    this.tokenExpirationTimer = setTimeout(() => {
      this.store.dispatch(new AuthActions.Logout());
    }, expirationDuration);
  }

  clearLogoutTime(): void {
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;
    }
  }
}
