import {HttpClient, HttpErrorResponse, HttpParams,} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap, take, withLatestFrom} from 'rxjs/operators';
import {environment} from '../../../../environments/environment';
import {Store} from '@ngrx/store';
import {VaccineFormModel, VaccineFormModelRaw} from '../vaccineFormModel';
import {of} from 'rxjs';

import * as vaccineActions from './vaccine.actions';
import * as fromApp from '../../../core/store/app.reducer';

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
        const uid = (actionData as vaccineActions.FetchVaccineForm).payload;
        const params: HttpParams = new HttpParams()
          .append('orderBy', '"uid"')
          .append('limitToFirst', '1')
          .append('equalTo', '"' + uid + '"');
        return this.http.get<VaccineFormModelRaw>(
          environment.firebaseVaccineURL,
          {params}
        );
      }),
      map((vaccineFormModelRaw: VaccineFormModelRaw) => {
        return new vaccineActions.SetVaccineForm(
          this.convertFromRaw(vaccineFormModelRaw)
        );
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
          return this.http.post<VaccineFormModelRaw>(
            environment.firebaseVaccineURL,
            (actionData as vaccineActions.StoreVaccineForm).payload
          );
        }),
        map((vaccineFormModelRaw: VaccineFormModelRaw) => {
          return new vaccineActions.SetVaccineForm(
            this.convertFromRaw(vaccineFormModelRaw)
          );
        }),
        catchError((errorResponse) => {
          return handleError(errorResponse);
        })
      );
    },
    {dispatch: false}
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>
  ) {
  }

  private convertFromRaw(
    vaccineFormModelRaw: VaccineFormModelRaw
  ): VaccineFormModel | null {
    if (vaccineFormModelRaw) {
      const key: string = Object.keys(vaccineFormModelRaw)[0].toString();
      const birthday = new Date(Date.parse(vaccineFormModelRaw[key].birthday));
      const email = vaccineFormModelRaw[key].email;
      const gender = vaccineFormModelRaw[key].gender;
      const name = vaccineFormModelRaw[key].name;
      const phone = vaccineFormModelRaw[key].phone;
      const socialSecurityNumber =
        vaccineFormModelRaw[key].socialSecurityNumber;
      const symptoms = vaccineFormModelRaw[key].symptoms;
      const terms = vaccineFormModelRaw[key].terms;
      const vaccines = vaccineFormModelRaw[key].vaccines;
      const uid = vaccineFormModelRaw[key].uid;

      const vaccineFormModel = new VaccineFormModel(
        birthday,
        email,
        gender,
        name,
        phone,
        socialSecurityNumber,
        symptoms,
        terms,
        vaccines,
        uid
      );
      return vaccineFormModel;
    }
    return null;
  }

  private getUserId(): string {
    let uid = '';
    this.store.select('auth').pipe(take(1)).subscribe((authState) => {
      uid = authState.user?.id ? authState.user?.id : '';
    });
    return uid;
  }
}
