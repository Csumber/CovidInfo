import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  map,
  switchMap,
  take,
  withLatestFrom,
} from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { of, throwError } from 'rxjs';

import * as vaccineActions from './vaccine.actions';
import * as fromApp from '../../../core/store/app.reducer';
import { AngularFirestore } from '@angular/fire/firestore';
import { fromPromise } from 'rxjs/internal-compatibility';
import firebase from 'firebase';
import { VaccineFormModel } from '../vaccineFormModel';
import Item = firebase.analytics.Item;

const handleError = (errorResponse: HttpErrorResponse) => {
  return of(new vaccineActions.FailVaccineForm());
};

@Injectable()
export class VaccineEffects {
  fetchFormData = createEffect(() => {
    return this.actions$.pipe(
      ofType(vaccineActions.FETCH_VACCINE_FORM),
      withLatestFrom(this.store.select('vaccine')),
      switchMap(([actionData, state]) => {
        const uid = (actionData as vaccineActions.StoreVaccineForm).payload;

        return this.firestore
          .doc<VaccineFormModel>('vaccines/' + uid)
          .valueChanges();
      }),
      map((response: VaccineFormModel | undefined) => {
        if (!response) {
          throwError('Nicht gefunden');
          return new vaccineActions.SetVaccineForm(null);
        }
        return new vaccineActions.SetVaccineForm(response);
      }),
      catchError((errorResponse) => {
        return handleError(errorResponse);
      })
    );
  });

  storeVaccineForm = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(vaccineActions.STORE_VACCINE_FORM),
        withLatestFrom(this.store.select('vaccine')),
        switchMap(([actionData, state]) => {
          const uid = (actionData as vaccineActions.StoreVaccineForm).payload
            .uid;
          const formData = (actionData as vaccineActions.StoreVaccineForm)
            .payload;

          return this.firestore
            .collection('vaccines')
            .doc(uid)
            .set(JSON.parse(JSON.stringify(formData)));
        }),
        catchError((errorResponse) => {
          return handleError(errorResponse);
        })
      );
    },
    { dispatch: false }
  );

  deleteFormData = createEffect(() => {
    return this.actions$.pipe(
      ofType(vaccineActions.DELETE_VACCINE_FORM),
      withLatestFrom(this.store.select('vaccine')),
      switchMap(([actionData, state]) => {
        const uid = (actionData as vaccineActions.FetchVaccineForm).payload;

        return fromPromise(
          this.firestore.doc<Item>('vaccines/' + uid).delete()
        );
      }),
      map((response) => {
        return new vaccineActions.SetVaccineForm(null);
      }),
      catchError((errorResponse) => {
        return handleError(errorResponse);
      })
    );
  });

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>,
    private firestore: AngularFirestore
  ) {}

  private getUserId(): string {
    let uid = '';
    this.store
      .select('auth')
      .pipe(take(1))
      .subscribe((authState) => {
        uid = authState.user?.id ? authState.user?.id : '';
      });
    return uid;
  }
}
