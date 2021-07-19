import { User } from '../user.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import * as AuthActions from './auth.actions';
import { AuthenticateFail } from './auth.actions';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Location } from '@angular/common';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { AuthenticationService } from '../authentication.service';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

const handleAuthentication = (
  email: string,
  userId: string,
  token: string,
  expiresIn: number
) => {
  const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
  const user = new User(email, userId, token, expirationDate);
  localStorage.setItem('userData', JSON.stringify(user));
  return new AuthActions.AuthenticateSuccess({
    email,
    userId,
    token,
    expirationDate,
    redirect: true,
  });
};

const handleError = (errorResponse: HttpErrorResponse) => {
  let errorMessage = 'An error has occured!';
  if (!errorResponse.error || !errorResponse.error.error) {
    return of(new AuthenticateFail(errorMessage));
  }
  switch (errorResponse.error.error.message) {
    case 'EMAIL_EXISTS':
      errorMessage = 'The email address is already in use by another account.';
      break;
    case 'EMAIL_NOT_FOUND':
      errorMessage =
        'There is no user record corresponding to this identifier. The user may have been deleted.';
      break;
    case 'INVALID_PASSWORD':
      errorMessage =
        'The password is invalid or the user does not have a password.';
      break;
  }
  return of(new AuthActions.AuthenticateFail(errorMessage));
};

@Injectable()
export class AuthEffects {
  // logAction = createEffect(() => {
  //   return this.actions$.pipe(
  //     tap((action: Action) => {
  //       console.log(action.type);
  //     })
  //   )
  // }, {dispatch: false});

  authSignup = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.SIGNUP_START),
      switchMap((signupAction: AuthActions.SignupStart) => {
        return this.http
          .post<AuthResponseData>(
            environment.postFirebaseSignupURL + environment.firebaseAPIKey,
            {
              email: signupAction.payload.email,
              password: signupAction.payload.password,
              returnSecureToken: true,
            }
          )
          .pipe(
            tap((responseData: AuthResponseData) => {
              this.authenticationService.setLogoutTimer(
                +responseData.expiresIn * 1000
              );
            }),
            map((responseData: AuthResponseData) => {
              return handleAuthentication(
                responseData.email,
                responseData.localId,
                responseData.idToken,
                +responseData.expiresIn
              );
            }),
            catchError((errorResponse) => {
              return handleError(errorResponse);
            })
          );
      })
    );
  });

  authLogin = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.LOGIN_START),
      switchMap((signupAction: AuthActions.LoginStart) => {
        return this.http
          .post<AuthResponseData>(
            environment.postFirebaseSignInURL + environment.firebaseAPIKey,
            {
              email: signupAction.payload.email,
              password: signupAction.payload.password,
              returnSecureToken: true,
            }
          )
          .pipe(
            tap((responseData: AuthResponseData) => {
              this.authenticationService.setLogoutTimer(
                +responseData.expiresIn * 1000
              );
            }),
            map((responseData: AuthResponseData) => {
              return handleAuthentication(
                responseData.email,
                responseData.localId,
                responseData.idToken,
                +responseData.expiresIn
              );
            }),
            catchError((errorResponse) => {
              return handleError(errorResponse);
            })
          );
      })
    );
  });

  autoLogin = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.AUTO_LOGIN),
      map(() => {
        const userData: {
          email: string;
          id: string;
          authToken: string;
          tokenExpirationDate: Date;
        } = JSON.parse(localStorage.getItem('userData') as string);
        if (!userData) {
          return { type: 'DUMMY' };
        }

        const loadedUser = new User(
          userData.email,
          userData.id,
          userData.authToken,
          new Date(userData.tokenExpirationDate)
        );

        if (loadedUser.token) {
          const expirationDuration =
            new Date(userData.tokenExpirationDate).getTime() -
            new Date().getTime();
          this.authenticationService.setLogoutTimer(expirationDuration);

          return new AuthActions.AuthenticateSuccess({
            email: loadedUser.email,
            userId: loadedUser.id,
            token: loadedUser.token,
            expirationDate: new Date(userData.tokenExpirationDate),
            redirect: false,
          });
        }
        return { type: 'DUMMY' };
      })
    );
  });

  authRedirect = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.AUTHENTICATE_SUCCESS),
        tap((authSuccessAction: AuthActions.AuthenticateSuccess) => {
          if (authSuccessAction.payload.redirect) {
            const redirectTo =
              this.route.snapshot.queryParamMap.get('redirectTo');
            if (redirectTo) {
              this.router.navigate([redirectTo]);
            } else {
              this.location.back();
            }
          }
        })
      );
    },
    { dispatch: false }
  );

  authLogout = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.LOGOUT),
        tap(() => {
          this.authenticationService.clearLogoutTime();
          localStorage.removeItem('userData');
          this.router.navigate(['..']);
        })
      );
    },
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private location: Location
  ) {}
}
