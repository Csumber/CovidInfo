import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { switchMap } from 'rxjs/operators';

import * as FaqActions from './news.actions';
import { ARTICLES } from '../articles.mock';
import { of } from 'rxjs';

@Injectable()
export class NewsEffects {
  fetchArticles = createEffect(() => {
    return this.actions$.pipe(
      ofType(FaqActions.FETCH_ARTICLES),
      switchMap(() => {
        return of(new FaqActions.SetArticles(ARTICLES.articles));
      })
    );
  });

  constructor(private actions$: Actions, private http: HttpClient) {}
}
