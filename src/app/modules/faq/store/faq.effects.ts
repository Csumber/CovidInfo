import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {map, switchMap, withLatestFrom} from 'rxjs/operators';
import {Category} from '../question.model';
import {environment} from '../../../../environments/environment';

import * as FaqActions from './faq.actions';
import * as FromApp from '../../../core/store/app.reducer';

@Injectable()
export class FaqEffects {

  fetchCategories = createEffect(() => {
    return this.actions$.pipe(
      ofType(FaqActions.FETCH_CATEGORIES),
      switchMap(() => {
        return this.http.get<Category[]>(
          environment.firebaseFaqURL
        );
      }),
      map((categories: Category[]) => {
        return new FaqActions.SetCategories(categories);
      })
    );
  });

  storeCategories = createEffect(() => {
    return this.actions$.pipe(
      ofType(FaqActions.STORE_CATEGORIES),
      withLatestFrom(this.store.select('faq')),
      switchMap(([actionData, questionsState]) => {
        return this.http.put(
          environment.firebaseFaqURL,
          questionsState.categories
        );
      })
    );
  }, {dispatch: false});

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private store: Store<FromApp.AppState>
  ) {
  }

}
