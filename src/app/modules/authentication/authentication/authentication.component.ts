import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs';

import * as FromApp from '../../../core/store/app.reducer';
import * as AuthActions from '../store/auth.actions';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit, OnDestroy {
  loading = false;
  passwordMinimumLength = 6;
  authenticateForm = this.fb.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.minLength(this.passwordMinimumLength)]],
  });
  private storeSub: Subscription | null = null;

  constructor(
    private fb: FormBuilder,
    private store: Store<FromApp.AppState>
  ) {
  }

  ngOnInit(): void {
    this.storeSub = this.store.select('auth').subscribe((authState) => {
      this.loading = authState.loading;
    });
  }

  ngOnDestroy(): void {
    this.storeSub?.unsubscribe();
  }

  onLogin(): void {
    const email = this.authenticateForm.value.email;
    const password = this.authenticateForm.value.password;
    this.store.dispatch(new AuthActions.LoginStart({
        email,
        password
      }
    ));
  }

  onSignup(): void {
    const email = this.authenticateForm.value.email;
    const password = this.authenticateForm.value.password;
    this.store.dispatch(new AuthActions.SignupStart({
        email,
        password
      }
    ));
  }
}
